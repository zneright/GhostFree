// ============================================
// GhostFree — Midnight Network Configuration
// ============================================

export const MIDNIGHT_CONFIG = {
  networkId: import.meta.env.VITE_MIDNIGHT_NETWORK_ID || "preprod",
  contractAddress:
    import.meta.env.VITE_MIDNIGHT_CONTRACT_ADDRESS ||
    "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43",
  previewContractAddress:
    import.meta.env.VITE_MIDNIGHT_PREVIEW_CONTRACT_ADDRESS ||
    "02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf",
  indexerUrl: import.meta.env.VITE_MIDNIGHT_INDEXER_URL || "https://indexer.testnet.midnight.network",
  nodeUrl: import.meta.env.VITE_MIDNIGHT_NODE_URL || "https://rpc.testnet.midnight.network",
  provingServerUrl: import.meta.env.VITE_MIDNIGHT_PROVING_SERVER_URL || "http://localhost:6300",
} as const;

export const NETWORK_LABELS: Record<string, string> = {
  mainnet: "Midnight Mainnet",
  preprod: "Midnight Preprod Testnet",
  preview: "Midnight Preview",
};

export function getNetworkLabel(networkId: string): string {
  return NETWORK_LABELS[networkId] || `Midnight (${networkId})`;
}
