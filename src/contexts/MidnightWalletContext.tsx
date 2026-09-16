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
  isSandbox?: boolean;
  connect: (networkId?: string) => Promise<void>;
  connectSandbox: () => void;
  disconnect: () => void;
}

const MidnightWalletContext = createContext<MidnightWalletContextType | undefined>(undefined);

const STORAGE_KEY = "gf_wallet_address";
const NETWORK_KEY = "gf_wallet_network";
const SANDBOX_KEY = "gf_wallet_is_sandbox";

export const MidnightWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );
  const [networkId, setNetworkId] = useState<string | null>(
    () => localStorage.getItem(NETWORK_KEY)
  );
  const [isSandbox, setIsSandbox] = useState<boolean>(
    () => localStorage.getItem(SANDBOX_KEY) === "true"
  );
  const [walletApi, setWalletApi] = useState<MidnightWalletAPI | ConnectedAPI | null>(() => {
    if (localStorage.getItem(SANDBOX_KEY) === "true") {
      const savedAddr = localStorage.getItem(STORAGE_KEY) || "mn_preprod_0x4a9b2c8e1d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b";
      return {
        getUnshieldedAddress: async () => savedAddr,
        getShieldedAddress: async () => savedAddr,
        getBalance: async () => ({ unshielded: "5000", shielded: "10000" }),
      };
    }
    return null;
  });
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
      setIsSandbox(false);

      localStorage.setItem(STORAGE_KEY, addr);
      localStorage.setItem(NETWORK_KEY, network);
      localStorage.removeItem(SANDBOX_KEY);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect wallet.";
      setError(msg);
      throw err;
    } finally {
      setConnecting(false);
    }
  }, []);

  const connectSandbox = useCallback(() => {
    const sandboxAddr = "mn_preprod_0x4a9b2c8e1d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b";
    const mockApi: MidnightWalletAPI = {
      getUnshieldedAddress: async () => sandboxAddr,
      getShieldedAddress: async () => sandboxAddr,
      getBalance: async () => ({ unshielded: "5000", shielded: "10000" }),
    };
    setWalletApi(mockApi as unknown as ConnectedAPI);
    setAddress(sandboxAddr);
    setNetworkId("preprod");
    setIsSandbox(true);
    setError(null);
    localStorage.setItem(STORAGE_KEY, sandboxAddr);
    localStorage.setItem(NETWORK_KEY, "preprod");
    localStorage.setItem(SANDBOX_KEY, "true");
  }, []);

  const disconnect = useCallback(() => {
    disconnectLaceWallet();
    setWalletApi(null);
    setAddress(null);
    setNetworkId(null);
    setError(null);
    setIsSandbox(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NETWORK_KEY);
    localStorage.removeItem(SANDBOX_KEY);
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
        isSandbox,
        connect,
        connectSandbox,
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
