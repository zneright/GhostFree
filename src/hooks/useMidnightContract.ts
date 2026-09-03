// ============================================
// GhostFree — useMidnightContract Hook
// Reads Compact contract public ledger state
// ============================================


import { useState, useEffect, useCallback } from "react";
import { MIDNIGHT_CONFIG } from "../configuration/midnight.config";
import type { ContractState } from "../types";

/**
 * Hook to read the public state of the GhostFree Compact contract.
 * In production, this queries the Midnight indexer or node RPC.
 * Currently provides a placeholder implementation.
 */
export function useMidnightContract(contractAddress?: string) {
  const [state, setState] = useState<ContractState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const address = contractAddress || MIDNIGHT_CONFIG.contractAddress;

  const refresh = useCallback(async () => {
    if (!address) {
      setError("No contract address configured.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual Midnight indexer/RPC call
      // const response = await fetch(`${MIDNIGHT_CONFIG.indexerUrl}/contract/${address}/state`);
      // const data = await response.json();
      // setState(data);

      // Placeholder for development
      setState({
        merkleRoot: "0".repeat(64),
        fundBalance: 0,
        perClaimAmount: 0,
        operationName: "",
        totalClaimed: 0,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fetch contract state.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      refresh();
    }
  }, [address, refresh]);

  return {
    state,
    loading,
    error,
    refresh,
    contractAddress: address,
  };
}
