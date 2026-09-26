// ============================================
// GhostFree — TxToastManager
// Floating real-time transaction notification toasts
// Stacked bottom-right, animated slide-in/fade-out
// ============================================

import React from "react";
import { useTransactionFeed } from "../contexts/TransactionContext";
import type { TxStatus } from "../types";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Clock,
  X,
  Copy,
  ExternalLink,
} from "lucide-react";

const STATUS_CONFIG: Record<
  TxStatus,
  { icon: React.ReactNode; color: string; border: string; glow: string; label: string }
> = {
  pending: {
    icon: <Clock className="w-4 h-4 text-amber-400" />,
    color: "text-amber-300",
    border: "border-amber-500/30",
    glow: "bg-amber-500/10",
    label: "Pending",
  },
  proving: {
    icon: <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />,
    color: "text-sky-300",
    border: "border-sky-500/30",
    glow: "bg-sky-500/10",
    label: "Proving",
  },
  submitting: {
    icon: <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />,
    color: "text-violet-300",
    border: "border-violet-500/30",
    glow: "bg-violet-500/10",
    label: "Submitting",
  },
  confirmed: {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    color: "text-emerald-300",
    border: "border-emerald-500/40",
    glow: "bg-emerald-500/10",
    label: "Confirmed",
  },
  failed: {
    icon: <XCircle className="w-4 h-4 text-red-400" />,
    color: "text-red-300",
    border: "border-red-500/30",
    glow: "bg-red-500/10",
    label: "Failed",
  },
  retrying: {
    icon: <RefreshCw className="w-4 h-4 text-orange-400 animate-spin" />,
    color: "text-orange-300",
    border: "border-orange-500/30",
    glow: "bg-orange-500/10",
    label: "Retrying",
  },
};

const MIDNIGHT_EXPLORER_BASE = "https://midnight.network/explorer/tx/";

const TxToastManager: React.FC = () => {
  const { toasts, dismissToast } = useTransactionFeed();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-4 z-[9999] flex flex-col gap-2.5 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const cfg = STATUS_CONFIG[toast.status];
        const shortHash = toast.txHash
          ? `${toast.txHash.slice(0, 10)}…${toast.txHash.slice(-6)}`
          : null;

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl
              backdrop-blur-xl border shadow-2xl shadow-black/50
              min-w-[280px] max-w-[340px] w-full
              ${cfg.glow} ${cfg.border}
              animate-toast-in
            `}
            style={{
              background: "rgba(10, 22, 40, 0.92)",
            }}
          >
            {/* Status icon */}
            <div className="mt-0.5 shrink-0">{cfg.icon}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`text-[0.65rem] font-extrabold uppercase tracking-widest ${cfg.color}`}
                >
                  {cfg.label}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {toast.message}
              </p>
              {shortHash && (
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-mono text-[0.68rem] text-slate-400 truncate">
                    {shortHash}
                  </span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(toast.txHash ?? "")
                    }
                    className="text-slate-500 hover:text-slate-200 transition-colors"
                    title="Copy full hash"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <a
                    href={`${MIDNIGHT_EXPLORER_BASE}${toast.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-sky-400 transition-colors"
                    title="View on Midnight Explorer"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Dismiss */}
            <button
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-slate-500 hover:text-white transition-colors mt-0.5"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TxToastManager;
