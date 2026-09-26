import { WebSocket } from 'ws';
import * as Rx from 'rxjs';
import { resolveNetwork, getOrCreateWallet } from './network';
import { createWallet } from './wallet';

// @ts-expect-error Required for wallet sync in Node.js
globalThis.WebSocket = WebSocket;

async function checkSync() {
  const network = 'preprod';
  const { config: networkConfig } = resolveNetwork({ argv: ['--network', network] });
  const WALLET = getOrCreateWallet(network);
  console.log('Connecting wallet on preprod...');
  const walletCtx = await createWallet({ network, networkConfig, seed: WALLET.seed });

  console.log('Watching wallet state stream...');
  let count = 0;
  const sub = walletCtx.wallet.state().subscribe((s: any) => {
    count++;
    console.log(`[Update #${count}] isSynced: ${s.isSynced}, availableCoins: ${s.unshielded?.availableCoins?.length ?? 0}, dust: ${s.dust?.balance?.(new Date()) ?? 0n}`);
  });

  // Wait up to 30s
  for (let i = 0; i < 6; i++) {
    await new Promise((r) => setTimeout(r, 5000));
  }

  sub.unsubscribe();
  await walletCtx.wallet.stop();
  process.exit(0);
}

checkSync().catch(console.error);
