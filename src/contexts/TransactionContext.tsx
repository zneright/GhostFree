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

// Max toasts shown simultaneously
const MAX_TOASTS = 4;
// Max transactions to keep in the live feed
const MAX_FEED_RECORDS = 100;

// Storage key for persistent live feed
const STORAGE_KEY = "ghostfree_tx_feed_v2";

/**
 * 25+ realistic preprod transactions reflecting active calamity operations:
 * Typhoon Marce QRF, Siargao Flash Flood, Davao Earthquake Tranche 1.
 */
function generateSeedTransactions(): TransactionRecord[] {
  const now = Date.now();
  const minute = 60 * 1000;

  return [
    {
      id: "tx_seed_01",
      txHash: "02008f12cc3e819b02a77b10fa982a5c48b291c94d13e7102e3a76b91129ac88",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x8f12cc3e...ac88",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 1.5 * minute).toISOString(),
      confirmedAt: new Date(now - 1.2 * minute).toISOString(),
      blockHeight: 812932,
    },
    {
      id: "tx_seed_02",
      txHash: "02003c77d291ba40f9012e87a201b1f945d820c81249b561c2018ea34912fa01",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x3c77d291...fa01",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 3.8 * minute).toISOString(),
      confirmedAt: new Date(now - 3.5 * minute).toISOString(),
      blockHeight: 812930,
    },
    {
      id: "tx_seed_03",
      txHash: "0200b39f71ac2e690f9119aac39812df598124b8109312c982301fa9471b02cc",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xb39f71ac...02cc",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 6.2 * minute).toISOString(),
      confirmedAt: new Date(now - 5.9 * minute).toISOString(),
      blockHeight: 812928,
    },
    {
      id: "tx_seed_04",
      txHash: "02005a76e93a86c0b938f97b102948c901923fa8102938c9201948ba81203bba",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x5a76e93a...3bba",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 9.1 * minute).toISOString(),
      confirmedAt: new Date(now - 8.8 * minute).toISOString(),
      blockHeight: 812926,
    },
    {
      id: "tx_seed_05",
      txHash: "02009d43ab881c300f88bb2c4901823a9481029c8192384a019238fb019237cc",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x9d43ab88...37cc",
      amount: 2500,
      retryCount: 0,
      startedAt: new Date(now - 12.4 * minute).toISOString(),
      confirmedAt: new Date(now - 12.0 * minute).toISOString(),
      blockHeight: 812924,
    },
    {
      id: "tx_seed_06",
      txHash: "02007e21fa90124ba910283c7490182ca9102938a192039481029384b019283f",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x7e21fa90...283f",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 15.6 * minute).toISOString(),
      confirmedAt: new Date(now - 15.2 * minute).toISOString(),
      blockHeight: 812922,
    },
    {
      id: "tx_seed_07",
      circuitName: "claimAid",
      status: "failed",
      nullifierSnippet: "0x5a76e93a...3bba",
      amount: 5000,
      errorMessage: "ALREADY_CLAIMED: Nullifier 0x5a76e93a is already spent in contract escrow.",
      retryCount: 1,
      startedAt: new Date(now - 18.2 * minute).toISOString(),
    },
    {
      id: "tx_seed_08",
      txHash: "02001c90fa124ba901827364501928374901823a9481029384019283fa01928b",
      circuitName: "authorizeTrancheQuorum",
      status: "confirmed",
      amount: 500000,
      retryCount: 0,
      startedAt: new Date(now - 22.0 * minute).toISOString(),
      confirmedAt: new Date(now - 21.7 * minute).toISOString(),
      blockHeight: 812918,
    },
    {
      id: "tx_seed_09",
      txHash: "0200448192301fa9471b02ccb39f71ac2e690f9119aac39812df598124b81093",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x44819230...1093",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 26.5 * minute).toISOString(),
      confirmedAt: new Date(now - 26.2 * minute).toISOString(),
      blockHeight: 812915,
    },
    {
      id: "tx_seed_10",
      txHash: "0200923fa8102938c9201948ba81203bba5a76e93a86c0b938f97b102948c901",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x923fa810...c901",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 31.0 * minute).toISOString(),
      confirmedAt: new Date(now - 30.6 * minute).toISOString(),
      blockHeight: 812912,
    },
    {
      id: "tx_seed_11",
      txHash: "0200a1827364501928374901823a9481029384019283fa01928b1c90fa124ba9",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xa1827364...4ba9",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 35.8 * minute).toISOString(),
      confirmedAt: new Date(now - 35.4 * minute).toISOString(),
      blockHeight: 812909,
    },
    {
      id: "tx_seed_12",
      txHash: "0200e3a76b91129ac888f12cc3e819b02a77b10fa982a5c48b291c94d13e7102",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xe3a76b91...7102",
      amount: 10000,
      retryCount: 0,
      startedAt: new Date(now - 42.1 * minute).toISOString(),
      confirmedAt: new Date(now - 41.7 * minute).toISOString(),
      blockHeight: 812905,
    },
    {
      id: "tx_seed_13",
      txHash: "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43",
      circuitName: "deployReliefFund",
      status: "confirmed",
      amount: 2500000,
      retryCount: 0,
      startedAt: new Date(now - 55.0 * minute).toISOString(),
      confirmedAt: new Date(now - 54.3 * minute).toISOString(),
      blockHeight: 812898,
    },
    {
      id: "tx_seed_14",
      txHash: "020066b1820491029384b019283f7e21fa90124ba910283c7490182ca9102938",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x66b18204...2938",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 62.0 * minute).toISOString(),
      confirmedAt: new Date(now - 61.6 * minute).toISOString(),
      blockHeight: 812892,
    },
    {
      id: "tx_seed_15",
      txHash: "020088bb2c4901823a9481029c8192384a019238fb019237cc9d43ab881c300f",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x88bb2c49...300f",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 70.4 * minute).toISOString(),
      confirmedAt: new Date(now - 70.0 * minute).toISOString(),
      blockHeight: 812885,
    },
    {
      id: "tx_seed_16",
      txHash: "020012df598124b8109312c982301fa9471b02ccb39f71ac2e690f9119aac398",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x12df5981...c398",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 81.0 * minute).toISOString(),
      confirmedAt: new Date(now - 80.6 * minute).toISOString(),
      blockHeight: 812879,
    },
    {
      id: "tx_seed_17",
      txHash: "020081203bba5a76e93a86c0b938f97b102948c901923fa8102938c9201948ba",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x81203bba...48ba",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 92.5 * minute).toISOString(),
      confirmedAt: new Date(now - 92.1 * minute).toISOString(),
      blockHeight: 812870,
    },
    {
      id: "tx_seed_18",
      txHash: "020019283fa01928b1c90fa124ba901827364501928374901823a94810293840",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x19283fa0...3840",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 105.0 * minute).toISOString(),
      confirmedAt: new Date(now - 104.6 * minute).toISOString(),
      blockHeight: 812860,
    },
    {
      id: "tx_seed_19",
      txHash: "0200d13e7102e3a76b91129ac888f12cc3e819b02a77b10fa982a5c48b291c94",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xd13e7102...1c94",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 118.0 * minute).toISOString(),
      confirmedAt: new Date(now - 117.5 * minute).toISOString(),
      blockHeight: 812851,
    },
    {
      id: "tx_seed_20",
      circuitName: "claimAid",
      status: "failed",
      nullifierSnippet: "0x3c77d291...fa01",
      amount: 5000,
      errorMessage: "ALREADY_CLAIMED: Nullifier collision detected. Identity has already received aid.",
      retryCount: 1,
      startedAt: new Date(now - 125.0 * minute).toISOString(),
    },
  ];
}

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
  simulateBatchClaims(count?: number): Promise<void>;
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
   * Simulate batch incoming claims (+5 or +10 transactions)
   */
  const simulateBatchClaims = useCallback(
    async (count: number = 5): Promise<void> => {
      const amounts = [5000, 5000, 2500, 5000, 10000];
      for (let i = 0; i < count; i++) {
        // Stagger launches
        setTimeout(() => {
          simulateClaimTransaction(amounts[i % amounts.length]);
        }, i * 350);
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
