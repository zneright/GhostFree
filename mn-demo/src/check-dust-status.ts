import { WebSocket } from 'ws';
import * as Rx from 'rxjs';
import { resolveNetwork, getOrCreateWallet } from './network';
import { createWallet } from './wallet';

// @ts-expect-error Required for wallet sync in Node.js
globalThis.WebSocket = WebSocket;

async function checkCoins() {
  const network = 'preprod';
  const { config: networkConfig } = resolveNetwork({ argv: ['--network', network] });
  const WALLET = getOrCreateWallet(network);
  const walletCtx = await createWallet({ network, networkConfig, seed: WALLET.seed });

  console.log('Waiting for wallet state...');
  const state = await Rx.firstValueFrom(
    walletCtx.wallet.state().pipe(
      Rx.filter((s: any) => s.unshielded?.availableCoins?.length > 0)
    )
  );

  const coins = state.unshielded.availableCoins;
  console.log('Available coins:', coins.length);
  for (const c of coins) {
    console.log('Coin:', {
      value: c.value,
      meta: c.meta,
      registeredForDust: c.meta?.registeredForDustGeneration,
      dustPublicKey: c.meta?.dustPublicKey,
    });
  }

  const dustBal = state.dust?.balance?.(new Date()) ?? 0n;
  console.log('Current DUST balance:', dustBal.toString());

  await walletCtx.wallet.stop();
  process.exit(0);
}

checkCoins().catch(console.error);
