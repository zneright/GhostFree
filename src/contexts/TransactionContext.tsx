// ============================================
// GhostFree — Transaction Context (v2.0)
// High-volume real-time TX feed · Automated batch simulations · Toast queue
// ZK-Safe: Never stores private witnesses or citizen PII
// ============================================

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import type { TransactionRecord, TxStatus, TxToastNotification } from "../types";
import { generateSeedTransactions } from "../data/seedTransactions";

// Max toasts shown simultaneously
const MAX_TOASTS = 4;
// Max transactions to keep in the live feed
const MAX_FEED_RECORDS = 250;

// Storage key for persistent live feed
const STORAGE_KEY = "ghostfree_tx_feed_v3";

interface TransactionContextValue {
  // Live transaction feed (most recent first)
  txFeed: TransactionRecord[];
  // Active toast queue
  toasts: TxToastNotification[];

  // Core TX mutation methods
  beginTransaction(circuitName: string, amount?: number): string;
  updateTransaction(id: string, updates: Partial<TransactionRecord>): void;
  confirmTransaction(id: string, txHash: string, blockHeight?: number): void;
  failTransaction(id: string, errorMessage: string): void;
  retryTransaction(id: string): void;

  // Manual toast dismissal
  dismissToast(id: string): void;
  clearCompletedTx(): void;

  // High-volume simulation helpers
  simulateClaimTransaction(customAmount?: number): Promise<string>;
  simulateBatchClaims(count?: number, turbo?: boolean): Promise<void>;
  simulateDoubleClaimRejection(): Promise<string>;
  toggleLiveInflowStream(): void;
  isLiveStreaming: boolean;
  resetToDefaults(): void;

  // Summary counts & telemetry
  pendingCount: number;
  confirmedCount: number;
  failedCount: number;
  totalSettledAmount: number;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [txFeed, setTxFeed] = useState<TransactionRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return generateSeedTransactions();
  });

  const [toasts, setToasts] = useState<TxToastNotification[]>([]);
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const toastTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const liveStreamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync feed to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(txFeed.slice(0, MAX_FEED_RECORDS)));
      } catch {
        // ignore
      }
    }
  }, [txFeed]);

  const pushToast = useCallback((toast: TxToastNotification) => {
    setToasts((prev) => {
      const filtered = prev.filter((t) => t.id !== toast.id);
      return [toast, ...filtered].slice(0, MAX_TOASTS);
    });

    const duration =
      toast.autoDismissMs ??
      (toast.status === "confirmed" ? 4500 : toast.status === "failed" ? 6500 : 0);

    if (duration > 0) {
      const existing = toastTimers.current.get(toast.id);
      if (existing) clearTimeout(existing);
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        toastTimers.current.delete(toast.id);
      }, duration);
      toastTimers.current.set(toast.id, timer);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = toastTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimers.current.delete(id);
    }
  }, []);

  const beginTransaction = useCallback(
    (circuitName: string, amount?: number): string => {
      const id = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const record: TransactionRecord = {
        id,
        circuitName,
        status: "pending",
        amount,
        retryCount: 0,
        startedAt: new Date().toISOString(),
      };
      setTxFeed((prev) => [record, ...prev].slice(0, MAX_FEED_RECORDS));
      pushToast({
        id,
        status: "pending",
        message: circuitName === "claimAid" ? "Initiating private aid claim…" : "Starting transaction…",
      });
      return id;
    },
    [pushToast]
  );

  const updateTransaction = useCallback(
    (id: string, updates: Partial<TransactionRecord>) => {
      setTxFeed((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
      if (updates.status) {
        const statusMessages: Record<TxStatus, string> = {
          pending: "Preparing transaction…",
          proving: "Verifying eligibility privately with ZK proof…",
          submitting: "Submitting to Midnight Preprod…",
          confirmed: "Aid claim settled on-chain!",
          failed: updates.errorMessage || "Transaction failed",
          retrying: "Retrying transaction…",
        };
        pushToast({
          id,
          status: updates.status,
          message: statusMessages[updates.status] ?? "Processing…",
          txHash: updates.txHash,
        });
      }
    },
    [pushToast]
  );

  const confirmTransaction = useCallback(
    (id: string, txHash: string, blockHeight?: number) => {
      const confirmedAt = new Date().toISOString();
      setTxFeed((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: "confirmed" as TxStatus, txHash, blockHeight: blockHeight || 812935, confirmedAt }
            : r
        )
      );
      pushToast({
        id,
        status: "confirmed",
        message: "₱5,000 calamity aid confirmed on Midnight!",
        txHash,
        autoDismissMs: 6000,
      });
    },
    [pushToast]
  );

  const failTransaction = useCallback(
    (id: string, errorMessage: string) => {
      setTxFeed((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "failed" as TxStatus, errorMessage } : r))
      );
      pushToast({
        id,
        status: "failed",
        message: errorMessage.includes("ALREADY_CLAIMED")
          ? "Anti-Ghost: This identity has already received aid."
          : "Transaction failed — please try again.",
        autoDismissMs: 7000,
      });
    },
    [pushToast]
  );

  const retryTransaction = useCallback(
    (id: string) => {
      setTxFeed((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: "retrying" as TxStatus, retryCount: r.retryCount + 1, errorMessage: undefined }
            : r
        )
      );
      pushToast({ id, status: "retrying", message: "Retrying transaction…" });
    },
    [pushToast]
  );

  const clearCompletedTx = useCallback(() => {
    setTxFeed((prev) => prev.filter((r) => r.status !== "confirmed" && r.status !== "failed"));
  }, []);

  const resetToDefaults = useCallback(() => {
    const seeds = generateSeedTransactions();
    setTxFeed(seeds);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
      } catch {
        // ignore
      }
    }
  }, []);

  /**
   * Simulate a realistic single claim lifecycle (Pending -> Proving -> Submitting -> Confirmed)
   */
  const simulateClaimTransaction = useCallback(
    async (customAmount: number = 5000): Promise<string> => {
      const txId = beginTransaction("claimAid", customAmount);
      const randomHex = Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
      ).join("");
      const nullifierSnippet = `0x${randomHex.slice(0, 6)}...${randomHex.slice(-4)}`;

      // Step 1: Proving
      await new Promise((r) => setTimeout(r, 600));
      updateTransaction(txId, { status: "proving", nullifierSnippet });

      // Step 2: Submitting
      await new Promise((r) => setTimeout(r, 800));
      updateTransaction(txId, { status: "submitting" });

      // Step 3: Confirmed
      await new Promise((r) => setTimeout(r, 700));
      const fullHash = `0200${randomHex}${Date.now().toString(16).padStart(12, "0")}${Math.random().toString(16).slice(2, 10)}`;
      const randomBlock = 812930 + Math.floor(Math.random() * 20);
      confirmTransaction(txId, fullHash, randomBlock);

      return fullHash;
    },
    [beginTransaction, updateTransaction, confirmTransaction]
  );

  /**
   * Simulate batch incoming claims (+5, +10, +25, or +50 transactions)
   */
  const simulateBatchClaims = useCallback(
    async (count: number = 10, turbo: boolean = false): Promise<void> => {
      const amounts = [5000, 5000, 2500, 5000, 10000];
      const delayBetween = turbo || count >= 10 ? 80 : 250;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          simulateClaimTransaction(amounts[i % amounts.length]);
        }, i * delayBetween);
      }
    },
    [simulateClaimTransaction]
  );

  /**
   * Simulate an anti-ghost double-claim attack rejection
   */
  const simulateDoubleClaimRejection = useCallback(async (): Promise<string> => {
    const txId = beginTransaction("claimAid", 5000);
    const nullifierSnippet = "0x5a76e93a...3bba";

    await new Promise((r) => setTimeout(r, 700));
    updateTransaction(txId, { status: "proving", nullifierSnippet });

    await new Promise((r) => setTimeout(r, 600));
    failTransaction(
      txId,
      "ALREADY_CLAIMED: Nullifier 0x5a76e93a is already spent in contract escrow."
    );

    return txId;
  }, [beginTransaction, updateTransaction, failTransaction]);

  /**
   * Toggle automated stream of incoming transactions
   */
  const toggleLiveInflowStream = useCallback(() => {
    setIsLiveStreaming((prev) => {
      const next = !prev;
      if (next) {
        // Launch one right away
        simulateClaimTransaction();
        liveStreamIntervalRef.current = setInterval(() => {
          simulateClaimTransaction();
        }, 11000);
      } else {
        if (liveStreamIntervalRef.current) {
          clearInterval(liveStreamIntervalRef.current);
          liveStreamIntervalRef.current = null;
        }
      }
      return next;
    });
  }, [simulateClaimTransaction]);

  // Clean up interval and timers
  useEffect(() => {
    const timers = toastTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (liveStreamIntervalRef.current) {
        clearInterval(liveStreamIntervalRef.current);
      }
    };
  }, []);

  const pendingCount = txFeed.filter(
    (r) =>
      r.status === "pending" ||
      r.status === "proving" ||
      r.status === "submitting" ||
      r.status === "retrying"
  ).length;
  const confirmedCount = txFeed.filter((r) => r.status === "confirmed").length;
  const failedCount = txFeed.filter((r) => r.status === "failed").length;
  const totalSettledAmount = txFeed
    .filter((r) => r.status === "confirmed" && r.amount)
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  return (
    <TransactionContext.Provider
      value={{
        txFeed,
        toasts,
        beginTransaction,
        updateTransaction,
        confirmTransaction,
        failTransaction,
        retryTransaction,
        dismissToast,
        clearCompletedTx,
        simulateClaimTransaction,
        simulateBatchClaims,
        simulateDoubleClaimRejection,
        toggleLiveInflowStream,
        isLiveStreaming,
        resetToDefaults,
        pendingCount,
        confirmedCount,
        failedCount,
        totalSettledAmount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionFeed(): TransactionContextValue {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactionFeed must be used inside <TransactionProvider>");
  return ctx;
}
