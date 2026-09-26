import { WebSocket } from 'ws';
import { resolveNetwork, getOrCreateWallet } from './network';
import { createWallet, unshieldedToken } from './wallet';

// @ts-expect-error Required for wallet sync in Node.js
globalThis.WebSocket = WebSocket;

async function main() {
  const { network, config: networkConfig } = resolveNetwork();
  const WALLET = getOrCreateWallet(network);

  const walletCtx = await createWallet({ network, networkConfig, seed: WALLET.seed });
  const w = walletCtx.wallet as any;

  console.log('Subscribing to wallet.state()...');

  const sub = w.state().subscribe((s: any) => {
    const unshieldedBalances = s.unshielded?.balances;
    const rawBalance = unshieldedBalances?.[unshieldedToken().raw] ?? 0n;
    const dustBalance = s.dust?.balance?.(new Date()) ?? 0n;

    console.log(`[STATE EMIT] Unshielded tNIGHT: ${rawBalance.toLocaleString()} | DUST: ${dustBalance.toLocaleString()}`);

    if (rawBalance > 0n) {
      console.log('🎉 FUNDS CONFIRMED: Found', rawBalance.toLocaleString(), 'tNIGHT!');
    }
  });

  // Listen for 15 seconds
  await new Promise((r) => setTimeout(r, 15000));
  sub.unsubscribe();
  await walletCtx.wallet.stop();
  process.exit(0);
}

main().catch(console.error);
