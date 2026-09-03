// ============================================
// GhostFree — Midnight Network Configuration
// ============================================

export const MIDNIGHT_CONFIG = {
  networkId: import.meta.env.VITE_MIDNIGHT_NETWORK_ID || "preprod",
  contractAddress: import.meta.env.VITE_MIDNIGHT_CONTRACT_ADDRESS || "",
  indexerUrl: import.meta.env.VITE_MIDNIGHT_INDEXER_URL || "https://indexer.testnet.midnight.network",
  nodeUrl: import.meta.env.VITE_MIDNIGHT_NODE_URL || "https://rpc.testnet.midnight.network",
  provingServerUrl: import.meta.env.VITE_MIDNIGHT_PROVING_SERVER_URL || "",
} as const;

export const NETWORK_LABELS: Record<string, string> = {
  mainnet: "Midnight Mainnet",
  preprod: "Midnight Preprod Testnet",
  preview: "Midnight Preview",
};

export function getNetworkLabel(networkId: string): string {
  return NETWORK_LABELS[networkId] || `Midnight (${networkId})`;
}
