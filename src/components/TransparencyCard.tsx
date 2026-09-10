// ============================================
// GhostFree — Network Transparency Card
// Real-time Midnight Preprod contract status and guarantees
// ============================================

import React, { useState } from "react";
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Activity,
  Lock,
  Landmark,
} from "lucide-react";
import { MIDNIGHT_CONFIG } from "../configuration/midnight.config";

export const TransparencyCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = MIDNIGHT_CONFIG.contractAddress;

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5 sm:p-6 transition-all hover:border-civic-sky/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-civic-sky/10 border border-civic-sky/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-civic-sky" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">
              Preprod Settlement & Protocol Transparency
            </h4>
            <p className="text-[0.7rem] text-white/50">
              Verifiable on Midnight Network Testnet
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-accent-success/15 text-accent-success border border-accent-success/30">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
            PREPROD LIVE
          </span>
          <span className="text-[0.65rem] text-white/40 font-mono">
            Chain ID: 4123
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-black/20 border border-white/5">
          <span className="text-[0.65rem] text-white/40 uppercase tracking-wider block mb-1">
            Gas Sponsorship
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <Zap className="w-3.5 h-3.5 text-accent-gold" />
            <span>0 tDUST for Citizens</span>
          </div>
          <span className="text-[0.6rem] text-white/50 block mt-0.5">
            LGU official sponsors gas
          </span>
        </div>

        <div className="p-3 rounded-xl bg-black/20 border border-white/5">
          <span className="text-[0.65rem] text-white/40 uppercase tracking-wider block mb-1">
            Zero-Knowledge Privacy
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-success" />
            <span>Witness Invariance</span>
          </div>
          <span className="text-[0.6rem] text-white/50 block mt-0.5">
            Local WASM client execution
          </span>
        </div>

        <div className="p-3 rounded-xl bg-black/20 border border-white/5">
          <span className="text-[0.65rem] text-white/40 uppercase tracking-wider block mb-1">
            Anti-Ghost Mechanism
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <Lock className="w-3.5 h-3.5 text-civic-sky" />
            <span>Deterministic Nullifier</span>
          </div>
          <span className="text-[0.6rem] text-white/50 block mt-0.5">
            Reverts on duplicate claim
          </span>
        </div>
      </div>

      {/* Contract Address Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-white/40 text-[0.7rem] shrink-0">
            Active Contract:
          </span>
          <span className="text-civic-sky font-mono text-[0.7rem] truncate">
            {contractAddress}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1 text-[0.7rem]"
            title="Copy Contract Address"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-accent-success" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransparencyCard;
