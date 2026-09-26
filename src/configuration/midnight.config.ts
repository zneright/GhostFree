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
  indexerUrl: import.meta.env.VITE_MIDNIGHT_INDEXER_URL || "https://indexer.preprod.midnight.network/api/v4/graphql",
  nodeUrl: import.meta.env.VITE_MIDNIGHT_NODE_URL || "https://rpc.preprod.midnight.network",
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

export const KNOWN_PLACEHOLDER_ADDRESSES = new Set([
  "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43",
  "02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf",
  "0000000000000000000000000000000000000000000000000000000000000000",
]);

export function getContractDeploymentStatus(address?: string): {
  isDeployed: boolean;
  isPlaceholder: boolean;
  statusLabel: string;
} {
  const addr = address || MIDNIGHT_CONFIG.contractAddress;
  if (!addr || addr.length !== 66 && addr.length !== 64) {
    return {
      isDeployed: false,
      isPlaceholder: true,
      statusLabel: "Invalid Address Format",
    };
  }

  if (KNOWN_PLACEHOLDER_ADDRESSES.has(addr)) {
    return {
      isDeployed: false,
      isPlaceholder: true,
      statusLabel: "Preprod Sandbox / Unverified Contract",
    };
  }

  return {
    isDeployed: true,
    isPlaceholder: false,
    statusLabel: "Verified On-Chain",
  };
}
