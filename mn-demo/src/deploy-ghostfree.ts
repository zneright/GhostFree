/**
 * GhostFree — Midnight Preprod Contract Deployment Script
 * Deploys GhostFree.compact to Midnight Preprod Testnet using Midnight.js SDK
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';
import * as Rx from 'rxjs';

// Midnight SDK imports
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { resolveNetwork, getOrCreateWallet } from './network';
import { createWallet, persistWalletState, unshieldedToken, type WalletContext } from './wallet';

// @ts-expect-error Required for wallet sync in Node.js
globalThis.WebSocket = WebSocket;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Locate GhostFree compiled contract
const rootDir = path.resolve(__dirname, '..', '..');
const zkConfigPath = path.resolve(rootDir, 'managed', 'GhostFree');
const contractPath = path.join(zkConfigPath, 'contract', 'index.cjs');

if (!fs.existsSync(contractPath)) {
  console.error('\n❌ GhostFree contract artifact not found at:', contractPath);
  process.exit(1);
}

const network = 'preprod';
const { config: networkConfig } = resolveNetwork({ argv: ['--network', network] });
const WALLET = getOrCreateWallet(network);
const SEED = WALLET.seed;

async function waitForProofServer(url: string, maxAttempts = 10, delayMs = 1000): Promise<boolean> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.status === 200 || res.status === 404) return true;
    } catch {
      // retry
    }
    if (attempt < maxAttempts) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return false;
}

async function createProviders(walletCtx: WalletContext) {
  const privateStatePassword = process.env.PRIVATE_STATE_PASSWORD?.trim() || 'GhostFree-Preprod-Secure-Storage-Key-1234';

  const walletProvider = {
    getCoinPublicKey: () => walletCtx.shieldedSecretKeys.coinPublicKey,
    getEncryptionPublicKey: () => walletCtx.shieldedSecretKeys.encryptionPublicKey,
    async balanceTx(tx: any, ttl?: Date) {
      const recipe = await walletCtx.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: walletCtx.shieldedSecretKeys, dustSecretKey: walletCtx.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
      );
      return walletCtx.wallet.finalizeRecipe(recipe);
    },
    submitTx: async (tx: any) => {
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          return await walletCtx.wallet.submitTransaction(tx) as any;
        } catch (err) {
          console.warn(`  Submit attempt ${attempt}/5 failed (${(err as any)?.message || err}), retrying in 2s...`);
          if (attempt === 5) throw err;
          await new Promise((r) => setTimeout(r, 2500));
        }
      }
    },
  };

  const zkConfigProvider = new NodeZkConfigProvider(zkConfigPath);
  const accountId = walletCtx.unshieldedKeystore.getBech32Address().toString();

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: 'ghostfree-preprod-state',
      accountId,
      privateStoragePasswordProvider: () => privateStatePassword,
    }),
    publicDataProvider: indexerPublicDataProvider(networkConfig.indexer, networkConfig.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(networkConfig.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };
}

async function main() {
  console.log('\n================================================================');
  console.log('       GHOSTFREE — MIDNIGHT PREPROD ON-CHAIN DEPLOYER           ');
  console.log('================================================================\n');

  console.log('1. Checking Proof Server on', networkConfig.proofServer, '...');
  const proofServerUp = await waitForProofServer(networkConfig.proofServer);
  if (!proofServerUp) {
    console.error('\n❌ Proof server is offline! Start it via Docker:');
    console.error('   docker run -d --name midnight-proof-server -p 6300:6300 midnightntwrk/proof-server:8.1.0\n');
    process.exit(1);
  }
  console.log('✓ Proof server is online and responsive on port 6300.\n');

  console.log('2. Connecting Deployer Wallet on Midnight Preprod...');
  const walletCtx = await createWallet({ network, networkConfig, seed: SEED });
  const address = walletCtx.unshieldedKeystore.getBech32Address();
  console.log('   Deployer Address:', address);

  console.log('   Syncing wallet with Midnight Preprod network...');
  const syncStart = Date.now();
  const syncInterval = setInterval(() => {
    const elapsed = Math.round((Date.now() - syncStart) / 1000);
    process.stdout.write(`\r   ⏳ Syncing... (${elapsed}s elapsed)   `);
  }, 5000);
  const state = await walletCtx.wallet.waitForSyncedState();
  clearInterval(syncInterval);
  process.stdout.write('\r   ✓ Synced with Midnight Preprod network.              \n');

  // Persist sync state so a later failure doesn't waste the sync work.
  await persistWalletState(network, walletCtx);

  const balance = state.unshielded.balances[unshieldedToken().raw] ?? 0n;
  console.log(`   tNIGHT Balance: ${balance.toLocaleString()} atomic (${balance / 1_000_000n} tNIGHT)`);

  if (balance === 0n) {
    console.error('\n❌ Wallet has zero tNIGHT! Fund it from the faucet first.');
    console.error(`   Address: ${address}`);
    console.error('   Faucet:  https://midnight-tmnight-preprod.nethermind.dev\n');
    await walletCtx.wallet.stop();
    process.exit(1);
  }

  // ─── DUST Registration ─────────────────────────────────────────────
  console.log('\n   Registering NIGHT UTXOs for DUST gas generation...');
  const dustState = await Rx.firstValueFrom(walletCtx.wallet.state().pipe(Rx.filter((s: any) => s.isSynced)));

  const unregisteredUtxos = dustState.unshielded.availableCoins.filter(
    (c: any) => !c.meta?.registeredForDustGeneration,
  );

  if (unregisteredUtxos.length > 0) {
    console.log(`   Found ${unregisteredUtxos.length} unregistered NIGHT UTXO(s). Submitting registration tx...`);
    const recipe = await walletCtx.wallet.registerNightUtxosForDustGeneration(
      unregisteredUtxos,
      walletCtx.unshieldedKeystore.getPublicKey(),
      (payload: Uint8Array) => walletCtx.unshieldedKeystore.signData(payload),
    );
    const finalized = await walletCtx.wallet.finalizeRecipe(recipe);
    await walletCtx.wallet.submitTransaction(finalized);
    console.log('   ✓ DUST registration transaction submitted!');
  } else {
    console.log('   ✓ NIGHT UTXOs already registered for DUST generation.');
  }

  // Wait for DUST to accumulate
  const currentDust = dustState.dust.balance(new Date());
  if (currentDust === 0n) {
    console.log('   Waiting for DUST tokens to generate (up to 3 min)...');
    const DUST_TIMEOUT_MS = 3 * 60 * 1000;
    try {
      await Rx.firstValueFrom(
        walletCtx.wallet.state().pipe(
          Rx.throttleTime(5000),
          Rx.filter((s: any) => s.isSynced),
          Rx.filter((s: any) => s.dust.balance(new Date()) > 0n),
          Rx.timeout({ first: DUST_TIMEOUT_MS }),
        ),
      );
    } catch {
      console.error('\n❌ No DUST generated after 3 minutes. Check that your NIGHT UTXOs are settled.');
      await walletCtx.wallet.stop();
      process.exit(1);
    }
  }
  const finalDust = (await Rx.firstValueFrom(walletCtx.wallet.state().pipe(Rx.filter((s: any) => s.isSynced)))).dust.balance(new Date());
  console.log(`   ✓ DUST tokens ready! Balance: ${finalDust.toLocaleString()}\n`);

  console.log('\n3. Loading GhostFree.compact compiled bindings...');
  const GhostFreeContract = await import(pathToFileURL(contractPath).href);
  const compiledContract = CompiledContract.make('GhostFree', GhostFreeContract.Contract).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(zkConfigPath),
  );

  console.log('4. Initializing providers and synthesizing constructor proof...');
  const providers = await createProviders(walletCtx);

  // Initial disaster relief parameters:
  // Root: 32 bytes
  // Claim amount: 5000 tNIGHT
  // Operation Name: Typhoon Marce QRF 2026
  const initialMerkleRoot = new Uint8Array(32).fill(0xaa);
  const perClaimAmount = 5000n;
  const operationName = new TextEncoder().encode("Typhoon Marce QRF 2026");

  console.log('5. Broadcasting deployment transaction to Midnight Preprod RPC...');
  const deployed = await deployContract(providers, {
    compiledContract: compiledContract as any,
    privateStateId: 'ghostfree-preprod-state',
    initialPrivateState: {},
    args: [initialMerkleRoot, perClaimAmount, operationName],
  });

  const deployedCA = deployed.deployTxData.public.contractAddress;
  const txId = deployed.deployTxData.public.txId;

  console.log('\n🎉 ================================================================');
  console.log('   SUCCESS! GHOSTFREE DEPLOYED ON MIDNIGHT PREPROD ON-CHAIN!');
  console.log('================================================================');
  console.log(`   Contract Address: ${deployedCA}`);
  console.log(`   Transaction ID:   ${txId}`);
  console.log('================================================================\n');

  // Update .env
  const envPath = path.resolve(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(
      /VITE_MIDNIGHT_CONTRACT_ADDRESS=.*/,
      `VITE_MIDNIGHT_CONTRACT_ADDRESS=${deployedCA}`
    );
    fs.writeFileSync(envPath, envContent);
    console.log('✓ Updated .env with new verified on-chain contract address!');
  }

  // Update midnight.config.ts
  const cfgPath = path.resolve(rootDir, 'src', 'configuration', 'midnight.config.ts');
  if (fs.existsSync(cfgPath)) {
    let cfgContent = fs.readFileSync(cfgPath, 'utf8');
    cfgContent = cfgContent.replace(
      /02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43/g,
      deployedCA
    );
    fs.writeFileSync(cfgPath, cfgContent);
    console.log('✓ Updated midnight.config.ts with verified contract address!');
  }

  await persistWalletState(network, walletCtx);
  await walletCtx.wallet.stop();
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Deployment failed:', err);
  process.exit(1);
});
