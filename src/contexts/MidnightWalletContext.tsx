// ============================================
// GhostFree — MidnightWalletContext
// Lace wallet on Midnight Network integration
// ============================================


import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ConnectedAPI } from "@midnight-ntwrk/dapp-connector-api";
import { connectLaceWallet, getWalletAddress, disconnectLaceWallet, detectLaceWallet } from "../wallet/midnight-wallet";
import type { MidnightWalletAPI, WalletState } from "../types";

interface MidnightWalletContextType extends WalletState {
  walletApi: MidnightWalletAPI | ConnectedAPI | null;
  isLaceInstalled: boolean;
  connect: (networkId?: string) => Promise<void>;
  disconnect: () => void;
}

const MidnightWalletContext = createContext<MidnightWalletContextType | undefined>(undefined);

const STORAGE_KEY = "gf_wallet_address";
const NETWORK_KEY = "gf_wallet_network";

export const MidnightWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );
  const [networkId, setNetworkId] = useState<string | null>(
    () => localStorage.getItem(NETWORK_KEY)
  );
  const [walletApi, setWalletApi] = useState<MidnightWalletAPI | ConnectedAPI | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLaceInstalled, setIsLaceInstalled] = useState<boolean>(false);

  useEffect(() => {
    detectLaceWallet().then((detected) => setIsLaceInstalled(detected));
  }, []);

  const connect = useCallback(async (network: string = "preprod") => {
    setConnecting(true);
    setError(null);

    try {
      const api = await connectLaceWallet(network);
      const addr = await getWalletAddress(api);

      setWalletApi(api);
      setAddress(addr);
      setNetworkId(network);
      setIsLaceInstalled(true);

      localStorage.setItem(STORAGE_KEY, addr);
      localStorage.setItem(NETWORK_KEY, network);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect wallet.";
      setError(msg);
      throw err;
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    disconnectLaceWallet();
    setWalletApi(null);
    setAddress(null);
    setNetworkId(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NETWORK_KEY);
  }, []);

  return (
    <MidnightWalletContext.Provider
      value={{
        address,
        connected: !!address && !!walletApi,
        connecting,
        networkId,
        error,
        walletApi,
        isLaceInstalled,
        connect,
        disconnect,
      }}
    >
      {children}
    </MidnightWalletContext.Provider>
  );
};

export const useMidnightWallet = () => {
  const context = useContext(MidnightWalletContext);
  if (!context) {
    throw new Error("useMidnightWallet must be used within a MidnightWalletProvider");
  }
  return context;
};
