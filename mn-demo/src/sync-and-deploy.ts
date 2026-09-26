/**
 * GhostFree — Full On-Chain Midnight Preprod Deployment Pipeline
 * 1. Load wallet and detect funded unshielded NIGHT coins
 * 2. Estimate DUST registration fee via wallet.estimateRegistration()
 * 3. Wait for UTXO to accumulate fee via wallet.waitForGeneratedDust()
 * 4. Register UTXO for DUST generation via wallet.registerNightUtxosForDustGeneration()
 * 5. Submit registration to Midnight Preprod RPC
 * 6. Accumulate DUST gas tokens for smart contract deployment
 * 7. Deploy GhostFree contract to Preprod ledger
 * 8. Update frontend configuration (.env & midnight.config.ts)
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';
import * as Rx from 'rxjs';

import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { resolveNetwork, getOrCreateWallet } from './network';
import { createWallet, persistWalletState, unshieldedToken, type WalletContext } from './wallet';

// @ts-expect-error Required for WebSocket in Node.js
globalThis.WebSocket = WebSocket;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');
const zkConfigPath = path.resolve(rootDir, 'managed', 'GhostFree');
const contractPath = path.join(zkConfigPath, 'contract', 'index.cjs');

const network = 'preprod';
const { config: networkConfig } = resolveNetwork({ argv: ['--network', network] });
const WALLET = getOrCreateWallet(network);

async function waitForProofServer(url: string): Promise<boolean> {
  for (let i = 0; i < 10; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.status === 200 || res.status === 404) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
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
          return await (walletCtx.wallet as any).submitTransaction(tx, 'Submitted');
        } catch (err) {
          console.warn(`  submitTx attempt ${attempt}/5 failed: ${(err as any)?.message || err}`);
          if (attempt === 5) throw err;
          await new Promise((r) => setTimeout(r, 3000));
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
  console.log('       GHOSTFREE — FULL ON-CHAIN PREPROD DEPLOYMENT PIPELINE    ');
  console.log('================================================================\n');

  console.log('1. Checking local Proof Server on port 6300...');
  const proofUp = await waitForProofServer(networkConfig.proofServer);
  if (!proofUp) {
    console.error('❌ Proof server offline at http://127.0.0.1:6300');
    process.exit(1);
  }
  console.log('✓ Proof server responsive on port 6300.\n');

  console.log('2. Initializing deployer wallet on Midnight Preprod...');
  const walletCtx = await createWallet({ network, networkConfig, seed: WALLET.seed });
  const address = walletCtx.unshieldedKeystore.getBech32Address().toString();
  console.log('   Address:', address);

  console.log('\n3. Detecting funded unshielded NIGHT coins on Preprod...');
  const stateWithFunds: any = await Rx.firstValueFrom(
    walletCtx.wallet.state().pipe(
      Rx.filter((s: any) => (s.unshielded?.availableCoins?.length ?? 0) > 0)
    )
  );

  const availableCoins = stateWithFunds.unshielded.availableCoins;
  console.log(`✓ Detected ${availableCoins.length} unshielded coin(s)!`);
  const totalNight = stateWithFunds.unshielded?.balances?.[unshieldedToken().raw] ?? 0n;
  console.log(`   tNIGHT Balance: ${totalNight.toLocaleString()} atomic units (${totalNight / 1_000_000n} tNIGHT)`);

  const unregistered = availableCoins.filter((c: any) => !c.meta?.registeredForDustGeneration);

  if (unregistered.length > 0) {
    console.log(`\n4. Waiting for ${unregistered.length} UTXO(s) to generate DUST to cover registration fee...`);
    await walletCtx.wallet.waitForGeneratedDust(unregistered, 500_000n);
    console.log('✓ Required DUST reached!');

    console.log('   Generating registration recipe...');
    const recipe = await walletCtx.wallet.registerNightUtxosForDustGeneration(
      unregistered,
      walletCtx.unshieldedKeystore.getPublicKey(),
      (payload) => walletCtx.unshieldedKeystore.signData(payload),
    );
    const finalized = await walletCtx.wallet.finalizeRecipe(recipe);

    console.log('   Submitting DUST registration to Midnight Preprod RPC...');
    const txId = await (walletCtx.wallet as any).submitTransaction(finalized, 'Submitted');
    console.log(`✓ DUST Registration transaction submitted! TX: ${txId}`);
  } else {
    console.log('\n4. UTXOs are already registered for DUST generation.');
  }

  console.log('\n5. Waiting for DUST gas tokens to accumulate for contract deployment...');
  // A standard deployment transaction takes ~100k - 500k DUST
  await walletCtx.wallet.waitForGeneratedDust(availableCoins, 500_000n);
  console.log('✓ Sufficient DUST gas tokens accumulated!');

  console.log('\n6. Loading GhostFree contract and building deployment transaction...');
  const GhostFreeModule = await import(pathToFileURL(contractPath).href);
  const compiledContract = CompiledContract.make('GhostFree', GhostFreeModule.Contract).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(zkConfigPath),
  );

  const providers = await createProviders(walletCtx);

  const initialMerkleRoot = new Uint8Array(32).fill(0xaa);
  const perClaimAmount = 5000n;
  const operationName = new TextEncoder().encode("Typhoon Marce QRF 2026");

  console.log('7. Deploying GhostFree contract to Midnight Preprod ledger...');
  const deployed = await deployContract(providers, {
    compiledContract: compiledContract as any,
    privateStateId: 'ghostfree-preprod-state',
    initialPrivateState: {},
    args: [initialMerkleRoot, perClaimAmount, operationName],
  });

  const deployedCA = deployed.deployTxData.public.contractAddress;
  const txId = deployed.deployTxData.public.txId;

  console.log('\n================================================================');
  console.log('🎉🎉🎉 GHOSTFREE DEPLOYED ON-CHAIN TO MIDNIGHT PREPROD! 🎉🎉🎉');
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
    console.log(`✓ Updated .env with verified contract address: ${deployedCA}`);
  }

  // Update midnight.config.ts
  const cfgPath = path.resolve(rootDir, 'src', 'configuration', 'midnight.config.ts');
  if (fs.existsSync(cfgPath)) {
    let cfg = fs.readFileSync(cfgPath, 'utf8');
    cfg = cfg.replace(
      /02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43/g,
      deployedCA
    );
    fs.writeFileSync(cfgPath, cfg);
    console.log(`✓ Updated midnight.config.ts with verified contract address: ${deployedCA}`);
  }

  await persistWalletState(network, walletCtx);
  await walletCtx.wallet.stop();
  console.log('\nDeployment process finished successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Deployment failed:', err);
  process.exit(1);
});
