import { WebSocket } from 'ws';
import * as Rx from 'rxjs';
import { resolveNetwork, getOrCreateWallet } from './network';
import { createWallet, unshieldedToken, persistWalletState } from './wallet';

// @ts-expect-error Required for wallet sync in Node.js
globalThis.WebSocket = WebSocket;

async function retry<T>(fn: () => Promise<T>, attempts = 4, delay = 2000): Promise<T> {
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`  Attempt ${i}/${attempts} failed:`, (err as any)?.message || err);
      if (i === attempts) throw err;
      await new Promise((r) => setTimeout(r, delay * i));
    }
  }
  throw new Error("Retry failed");
}

async function main() {
  console.log('==================================================');
  console.log('       GHOSTFREE — DUST GENERATION REGISTRATION    ');
  console.log('==================================================\n');

  const network = 'preprod';
  const { config: networkConfig } = resolveNetwork({ argv: ['--network', network] });
  const WALLET = getOrCreateWallet(network);

  console.log('1. Initializing wallet facade...');
  const walletCtx = await createWallet({ network, networkConfig, seed: WALLET.seed });

  console.log('2. Waiting for unshielded available coins...');
  const currentState = await Rx.firstValueFrom(
    walletCtx.wallet.state().pipe(
      Rx.filter((s: any) => s.unshielded?.availableCoins?.length > 0)
    )
  );

  const coins = currentState.unshielded.availableCoins;
  console.log(`   Found ${coins.length} unshielded coin(s).`);

  const unregisteredUtxos = coins.filter((c: any) => !c.meta?.registeredForDustGeneration);
  console.log(`   Unregistered for DUST: ${unregisteredUtxos.length}`);

  if (unregisteredUtxos.length > 0) {
    console.log('3. Registering NIGHT UTXOs for DUST generation...');
    const recipe = await walletCtx.wallet.registerNightUtxosForDustGeneration(
      unregisteredUtxos,
      walletCtx.unshieldedKeystore.getPublicKey(),
      (payload) => walletCtx.unshieldedKeystore.signData(payload),
    );
    const finalized = await walletCtx.wallet.finalizeRecipe(recipe);

    console.log('   Submitting DUST registration to Midnight Preprod RPC...');
    const txId = await retry(async () => {
      return await (walletCtx.wallet as any).submitTransaction(finalized);
    });
    console.log('✓ DUST Registration transaction submitted! TX:', txId);
  } else {
    console.log('✓ Coins already registered for DUST generation.');
  }

  console.log('4. Checking current DUST balance...');
  const dustBal = currentState.dust?.balance?.(new Date()) ?? 0n;
  console.log('   DUST Balance:', dustBal.toLocaleString());

  await persistWalletState(network, walletCtx);
  await walletCtx.wallet.stop();
  console.log('\n==================================================\n');
  process.exit(0);
}

main().catch(console.error);
