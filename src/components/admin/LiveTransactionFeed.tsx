// ============================================
// GhostFree — Live Transaction Feed (Admin v2.0)
// Real-time circuit execution monitoring panel & simulation cockpit
// High-volume batch testing · COA Audit Export · Zero-Knowledge compliance
// ============================================

import React, { useState, useMemo } from "react";
import {
  MIDNIGHT_CONFIG,
  getContractDeploymentStatus,
  getExplorerTxUrl,
} from "../../configuration/midnight.config";
import { formatContractAddress } from "../../utils/contract";
import { useTransactionFeed } from "../../contexts/TransactionContext";
import type { TransactionRecord, TxStatus } from "../../types";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Clock,
  Activity,
  Copy,
  ExternalLink,
  Trash2,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Layers,
  ShieldAlert,
  Play,
  Pause,
  Download,
  Search,
  Filter,
  Check,
  Sparkles,
  Radio,
} from "lucide-react";

const STATUS_CONFIG: Record<
  TxStatus,
  { icon: React.ReactNode; badge: string; dot: string; label: string }
> = {
  pending: {
    icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400 animate-pulse",
    label: "Pending",
  },
  proving: {
    icon: <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />,
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    dot: "bg-sky-400 animate-ping",
    label: "Proving (ZK)",
  },
  submitting: {
    icon: <Loader2 className="w-3.5 h-3.5 text-violet-400 animate-spin" />,
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    dot: "bg-violet-400 animate-pulse",
    label: "Submitting",
  },
  confirmed: {
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
    label: "Confirmed",
  },
  failed: {
    icon: <XCircle className="w-3.5 h-3.5 text-red-400" />,
    badge: "bg-red-500/15 text-red-300 border-red-500/30",
    dot: "bg-red-400",
    label: "Rejected",
  },
  retrying: {
    icon: <RefreshCw className="w-3.5 h-3.5 text-orange-400 animate-spin" />,
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    dot: "bg-orange-400 animate-pulse",
    label: "Retrying",
  },
};

const CIRCUIT_LABELS: Record<string, string> = {
  claimAid: "Calamity Relief Claim (claimAid)",
  increment: "Counter Increment",
  deployReliefFund: "Fund Escrow Deployment",
  authorizeTrancheQuorum: "Dual-Key Quorum Authorization",
};

function formatElapsed(startedAt: string, confirmedAt?: string): string {
  const end = confirmedAt ? new Date(confirmedAt) : new Date();
  const ms = end.getTime() - new Date(startedAt).getTime();
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
}

function TxRow({ record }: { record: TransactionRecord }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const cfg = STATUS_CONFIG[record.status] || STATUS_CONFIG.pending;
  const circuitLabel = CIRCUIT_LABELS[record.circuitName] ?? record.circuitName;
  const shortHash = record.txHash
    ? `${record.txHash.slice(0, 14)}…${record.txHash.slice(-8)}`
    : null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (record.txHash) {
      navigator.clipboard.writeText(record.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm
        ${
          record.status === "confirmed"
            ? "border-emerald-500/20 bg-slate-900/60 hover:border-emerald-500/40"
            : record.status === "failed"
            ? "border-red-500/20 bg-red-950/20 hover:border-red-500/40"
            : "border-sky-500/30 bg-sky-950/20 hover:border-sky-500/50"
        }
      `}
    >
      {/* Main row */}
      <button
        className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-white/[0.03] transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Status dot */}
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />

        {/* Circuit & Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white truncate">{circuitLabel}</span>
            {record.amount !== undefined && (
              <span className="text-[0.7rem] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                ₱{record.amount.toLocaleString()}
              </span>
            )}
          </div>
          {shortHash && (
            <div className="text-[0.65rem] font-mono text-slate-400 truncate mt-0.5">
              TX: {shortHash}
            </div>
          )}
        </div>

        {/* Status badge */}
        <span
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-bold border shrink-0 ${cfg.badge}`}
        >
          {cfg.icon}
          <span>{cfg.label}</span>
          {record.retryCount > 0 && (
            <span className="ml-0.5 text-orange-400">#{record.retryCount}</span>
          )}
        </span>

        {/* Elapsed */}
        <span className="text-[0.65rem] text-slate-400 tabular-nums shrink-0 ml-1 hidden sm:inline">
          {formatElapsed(record.startedAt, record.confirmedAt)}
        </span>

        {/* Expand toggle */}
        <span className="text-slate-400 shrink-0">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-3.5 pt-1 border-t border-white/5 space-y-2.5 bg-black/20 text-xs">
          {record.txHash && (
            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-slate-400 shrink-0 font-medium">Midnight TX Hash:</span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-emerald-300 text-[0.7rem] truncate select-all">
                  {record.txHash}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy Transaction Hash"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={getExplorerTxUrl(record.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-sky-400 transition-colors shrink-0"
                  title="View on Explorer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {record.nullifierSnippet && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 shrink-0 font-medium">Private Nullifier:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-amber-300 text-[0.7rem]">
                  {record.nullifierSnippet}
                </span>
                <span title="Cryptographic Nullifier — identity remains 100% private">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>
            </div>
          )}

          {record.blockHeight !== undefined && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 shrink-0 font-medium">Preprod Block Height:</span>
              <span className="text-sky-300 font-mono font-bold">#{record.blockHeight}</span>
            </div>
          )}

          {record.errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Anti-Ghost Protection Triggered</span>
                <span>{record.errorMessage}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-[0.68rem] text-slate-500 pt-1 border-t border-white/5">
            <span>Started: {new Date(record.startedAt).toLocaleTimeString()}</span>
            {record.confirmedAt && (
              <span>Confirmed: {new Date(record.confirmedAt).toLocaleTimeString()}</span>
            )}
            <span className="text-slate-400 font-mono">Network: Midnight Preprod</span>
          </div>
        </div>
      )}
    </div>
  );
}

const LiveTransactionFeed: React.FC = () => {
  const {
    txFeed,
    pendingCount,
    confirmedCount,
    failedCount,
    totalSettledAmount,
    clearCompletedTx,
    simulateClaimTransaction,
    simulateBatchClaims,
    simulateDoubleClaimRejection,
    toggleLiveInflowStream,
    isLiveStreaming,
    resetToDefaults,
  } = useTransactionFeed();

  const contractStatus = useMemo(
    () => getContractDeploymentStatus(MIDNIGHT_CONFIG.contractAddress),
    []
  );

  const [filter, setFilter] = useState<"all" | "confirmed" | "active" | "failed">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSimulatingBatch, setIsSimulatingBatch] = useState(false);

  // Filtered transactions
  const filteredFeed = useMemo(() => {
    return txFeed.filter((item) => {
      // Status filter
      if (filter === "confirmed" && item.status !== "confirmed") return false;
      if (
        filter === "active" &&
        item.status !== "pending" &&
        item.status !== "proving" &&
        item.status !== "submitting" &&
        item.status !== "retrying"
      )
        return false;
      if (filter === "failed" && item.status !== "failed") return false;

      // Search filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchHash = item.txHash?.toLowerCase().includes(term);
        const matchNullifier = item.nullifierSnippet?.toLowerCase().includes(term);
        const matchCircuit = item.circuitName.toLowerCase().includes(term);
        return matchHash || matchNullifier || matchCircuit;
      }

      return true;
    });
  }, [txFeed, filter, searchTerm]);

  // Handle batch simulation click
  const handleBatchClick = async () => {
    setIsSimulatingBatch(true);
    await simulateBatchClaims(5);
    setTimeout(() => setIsSimulatingBatch(false), 2000);
  };

  // Export CSV for COA audit compliance
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Circuit",
      "Status",
      "Transaction Hash",
      "Nullifier Snippet",
      "Amount (PHP)",
      "Block Height",
      "Started At",
      "Confirmed At",
      "Error Message",
    ];
    const rows = txFeed.map((r) => [
      r.id,
      r.circuitName,
      r.status,
      r.txHash || "",
      r.nullifierSnippet || "",
      r.amount || "",
      r.blockHeight || "",
      r.startedAt,
      r.confirmedAt || "",
      r.errorMessage ? `"${r.errorMessage.replace(/"/g, '""')}"` : "",
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GhostFree_Transactions_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner: Preprod Network Health */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white">Midnight Preprod Environment</h3>
              <span
                className={`px-2 py-0.5 rounded-full text-[0.62rem] font-bold ${
                  contractStatus.isDeployed
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                }`}
              >
                {contractStatus.isDeployed ? "VERIFIED ON-CHAIN" : "SANDBOX / LOCAL PROVER MODE"}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Contract Address:{" "}
              <code
                className={`font-mono ${
                  contractStatus.isDeployed ? "text-emerald-300" : "text-amber-300"
                }`}
              >
                {formatContractAddress(MIDNIGHT_CONFIG.contractAddress, 8)}
              </code>{" "}
              · {contractStatus.isDeployed ? "Live Midnight Preprod Ledger" : "Simulated Preprod Ledger"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLiveInflowStream}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isLiveStreaming
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-white/10 hover:bg-white/15 text-white"
            }`}
          >
            {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveStreaming ? "Streaming Active (11s)" : "Start Live Stream"}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-1.5"
            title="Download CSV report for Commission on Audit"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 bg-slate-900/70">
          <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider block">
            Settled Volume
          </span>
          <div className="text-2xl font-black text-emerald-400 tracking-tight mt-1">
            ₱{totalSettledAmount.toLocaleString()}
          </div>
          <span className="text-[0.65rem] text-emerald-400/80 block mt-1">
            Settled with Zero-Knowledge
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-sky-500/20 bg-slate-900/70">
          <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider block">
            Confirmed Claims
          </span>
          <div className="text-2xl font-black text-white tracking-tight mt-1">
            {confirmedCount}{" "}
            <span className="text-xs font-normal text-slate-400">/ {txFeed.length} Total</span>
          </div>
          <span className="text-[0.65rem] text-sky-400/80 block mt-1">
            Anti-Ghost Nullifiers sealed
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/20 bg-slate-900/70">
          <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider block">
            In-Flight Proofs
          </span>
          <div className="text-2xl font-black text-amber-400 tracking-tight mt-1">
            {pendingCount}
          </div>
          <span className="text-[0.65rem] text-slate-400 block mt-1">
            Local WASM prover active
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-red-500/20 bg-slate-900/70">
          <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider block">
            Double Claims Blocked
          </span>
          <div className="text-2xl font-black text-red-400 tracking-tight mt-1">
            {failedCount}
          </div>
          <span className="text-[0.65rem] text-red-400/80 block mt-1">
            Nullifier collisions rejected
          </span>
        </div>
      </div>

      {/* Cockpit: Interactive Transaction Generators */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Interactive Test & Simulation Cockpit
            </h4>
          </div>
          <span className="text-[0.68rem] text-slate-400">
            Click to fire live transactions and watch realtime toasts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          <button
            onClick={() => simulateClaimTransaction(5000)}
            className="p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-bold text-xs transition-all flex items-center justify-center gap-2 tap-scale"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>⚡ Simulate Rapid Claim</span>
          </button>

          <button
            onClick={handleBatchClick}
            disabled={isSimulatingBatch}
            className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-2 tap-scale"
          >
            {isSimulatingBatch ? (
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
            ) : (
              <Layers className="w-4 h-4 text-emerald-400" />
            )}
            <span>🚀 Batch Inflow (+5 TXs)</span>
          </button>

          <button
            onClick={simulateDoubleClaimRejection}
            className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-bold text-xs transition-all flex items-center justify-center gap-2 tap-scale"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>🛡️ Test Double-Claim Defense</span>
          </button>

          <button
            onClick={resetToDefaults}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-2 tap-scale"
          >
            <RefreshCw className="w-4 h-4 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Filter chips */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "all" ? "bg-sky-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            All ({txFeed.length})
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "confirmed" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "active" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            In-Flight ({pendingCount})
          </button>
          <button
            onClick={() => setFilter("failed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "failed" ? "bg-red-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Anti-Ghost Blocks ({failedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search TX hash or nullifier…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Transaction Feed List */}
      <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
        {filteredFeed.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
            <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-medium">
              No transactions match your current filters.
            </p>
          </div>
        ) : (
          filteredFeed.map((record) => <TxRow key={record.id} record={record} />)
        )}
      </div>

      {/* Footer privacy guarantee */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/60 border border-white/5 text-[0.68rem] text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Zero-Knowledge Sovereignty:</strong> Citizen PhilSys IDs, PINs, and identity data are NEVER committed to the ledger.
          </span>
        </div>
        <span className="font-mono text-slate-500">Midnight Compact v0.15</span>
      </div>
    </div>
  );
};

export default LiveTransactionFeed;
