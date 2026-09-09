// ============================================
// GhostFree — Midnight Network Root Configuration
// ============================================

export const MIDNIGHT_CONFIG = {
  networkId: "preprod",
  contractAddress: "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43",
  previewContractAddress: "02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf",
  indexerUrl: "https://indexer.testnet.midnight.network",
  nodeUrl: "https://rpc.testnet.midnight.network",
  provingServerUrl: "http://localhost:6300",
} as const;

export const NETWORK_LABELS: Record<string, string> = {
  mainnet: "Midnight Mainnet",
  preprod: "Midnight Preprod Testnet",
  preview: "Midnight Preview",
};

export function getNetworkLabel(networkId: string): string {
  return NETWORK_LABELS[networkId] || `Midnight (${networkId})`;
}

export default MIDNIGHT_CONFIG;
