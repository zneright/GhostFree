// ============================================
// GhostFree — useLaceWallet Hook
// Ergonomic hook for connecting and interacting with Lace on Midnight
// ============================================

import { useMidnightWallet } from "../contexts/MidnightWalletContext";

export function useLaceWallet() {
  const {
    address,
    connected,
    connecting,
    networkId,
    error,
    walletApi,
    connect,
    disconnect,
  } = useMidnightWallet();

  const formattedAddress = address
    ? `${address.slice(0, 8)}...${address.slice(-6)}`
    : null;

  return {
    address,
    formattedAddress,
    connected,
    connecting,
    networkId,
    error,
    walletApi,
    connect: (network = "preprod") => connect(network),
    disconnect,
  };
}

export default useLaceWallet;
