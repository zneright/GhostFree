// ============================================
// GhostFree — Midnight Wallet Module
// Lace Wallet integration via window.midnight.mnLace
// ============================================

import type { InitialAPI, ConnectedAPI } from "@midnight-ntwrk/dapp-connector-api";
import type { MidnightWalletAPI } from "../types";

export type LaceInitialAPI = InitialAPI;
export type LaceConnectedAPI = ConnectedAPI;

const DETECTION_INTERVAL_MS = 100;
const DETECTION_TIMEOUT_MS = 5000;

function getLaceInjected(): InitialAPI | undefined {
  if (typeof window === "undefined") return undefined;
  return window.midnight?.mnLace as InitialAPI | undefined;
}

/**
 * Wait for the Lace wallet extension to inject its API into window.midnight.
 * Polls every 100ms for up to 5 seconds.
 */
export async function detectLaceWallet(): Promise<boolean> {
  if (getLaceInjected()) return true;

  return new Promise((resolve) => {
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += DETECTION_INTERVAL_MS;
      if (getLaceInjected()) {
        clearInterval(interval);
        resolve(true);
      } else if (elapsed >= DETECTION_TIMEOUT_MS) {
        clearInterval(interval);
        resolve(false);
      }
    }, DETECTION_INTERVAL_MS);
  });
}

/**
 * Connect to the Lace wallet on the specified Midnight network.
 */
export async function connectLaceWallet(
  networkId: string = "preprod"
): Promise<ConnectedAPI | MidnightWalletAPI> {
  const detected = await detectLaceWallet();
  const lace = getLaceInjected();

  if (!detected || !lace) {
    throw new Error(
      "Lace wallet not detected. Please install the Lace browser extension and refresh the page."
    );
  }

  try {
    const api = await lace.connect(networkId);
    return api as ConnectedAPI | MidnightWalletAPI;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("rejected") || msg.includes("denied") || msg.includes("cancelled")) {
      throw new Error("Wallet connection was declined. Please approve the connection in Lace to continue.");
    }
    throw new Error(`Failed to connect to Lace wallet: ${msg}`);
  }
}

/**
 * Get the unshielded (public) address from a connected wallet API.
 */
export async function getWalletAddress(api: ConnectedAPI | MidnightWalletAPI): Promise<string> {
  try {
    const addr = await api.getUnshieldedAddress();
    return typeof addr === "string" ? addr : JSON.stringify(addr);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to retrieve wallet address: ${msg}`);
  }
}

/**
 * Disconnect from the Lace wallet (client-side state reset only).
 */
export function disconnectLaceWallet(): void {
  // Lace wallet does not expose a disconnect method;
  // we clear local state in the context provider.
}
