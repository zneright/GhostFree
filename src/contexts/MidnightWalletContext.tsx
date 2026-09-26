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

export const MidnightWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ephemeral in-memory wallet state (strictly client-side, never stored in localStorage)
  const [address, setAddress] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [isSandbox, setIsSandbox] = useState<boolean>(false);
  const [walletApi, setWalletApi] = useState<MidnightWalletAPI | ConnectedAPI | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLaceInstalled, setIsLaceInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Clear any legacy persisted wallet keys from shared devices
    try {
      localStorage.removeItem("gf_wallet_address");
      localStorage.removeItem("gf_wallet_network");
      localStorage.removeItem("gf_wallet_is_sandbox");
    } catch {
      // Ignore storage errors in restricted iframe/incognito
    }

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
  }, []);

  const disconnect = useCallback(() => {
    disconnectLaceWallet();
    setWalletApi(null);
    setAddress(null);
    setNetworkId(null);
    setError(null);
    setIsSandbox(false);
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
