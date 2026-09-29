// ============================================
// GhostFree — Network Transparency Card
// Real-time Midnight Preprod contract status and guarantees
// ============================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Activity,
  Lock,
  Landmark,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  MIDNIGHT_CONFIG,
  getContractDeploymentStatus,
  getExplorerAddressUrl,
  getExplorerTxUrl,
} from "../configuration/midnight.config";

export const TransparencyCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showExplorerInfo, setShowExplorerInfo] = useState(true);
  const contractAddress = MIDNIGHT_CONFIG.contractAddress;
  const status = getContractDeploymentStatus(contractAddress);
  const sampleTxHash = "0x61a04171f893e2c1e4e3e0f0fd18e6d4a97ee1fb93eb66ed5bd7976a066cf1d3";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl glass-card border border-shield-glass/30 bg-slate-900/80 backdrop-blur-md p-5 sm:p-6 transition-all hover:border-civic-sky/30">
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
              Midnight Network Testnet (Preprod)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-bold ${
              status.isDeployed
                ? "bg-accent-success/15 text-accent-success border border-accent-success/30"
                : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status.isDeployed ? "bg-accent-success animate-pulse" : "bg-amber-400"
              }`}
            />
            {status.isDeployed ? "PREPROD ON-CHAIN" : "PREPROD SANDBOX"}
          </span>
          <span className="text-[0.65rem] text-white/40 font-mono">
            Chain ID: 4123
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
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

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
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

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
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

      {/* Contract Address Bar & Audit Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <span className="text-white/40 text-[0.7rem] shrink-0">
            {status.isDeployed ? "Active Contract:" : "Contract Deployment Target:"}
          </span>
          <span className="text-civic-sky font-mono text-[0.7rem] truncate">
            {contractAddress}
          </span>
          {!status.isDeployed && (
            <span
              className={`shrink-0 px-2 py-0.5 rounded text-[0.6rem] border font-medium ${
                !status.isValidFormat
                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
              }`}
            >
              {!status.isValidFormat ? "Invalid CA Format" : "Preprod Sandbox Mode"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
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

          <Link
            to="/transparency"
            className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors flex items-center gap-1 text-[0.7rem] font-medium"
            title="View Public Treasury & Calamity Audit Ledger"
          >
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Ledger</span>
          </Link>

          <a
            href={getExplorerTxUrl(sampleTxHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-civic-sky/10 hover:bg-civic-sky/20 border border-civic-sky/20 text-civic-sky hover:text-white transition-colors flex items-center gap-1 text-[0.7rem]"
            title="Verify live on-chain settlement on Midnight Explorer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Verify on Explorer</span>
          </a>
        </div>
      </div>

      {/* Educational Civic-Tech ZK Privacy Notice */}
      <div className="mt-3 p-3.5 rounded-xl bg-slate-950/70 border border-civic-sky/20 text-xs">
        <button
          onClick={() => setShowExplorerInfo(!showExplorerInfo)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2 text-civic-sky font-semibold text-xs">
            <Info className="w-3.5 h-3.5 shrink-0 text-civic-sky" />
            <span>Why is the external explorer address page blank? (ZK Privacy & Indexer Architecture)</span>
          </div>
          <span className="text-white/40 group-hover:text-white transition-colors">
            {showExplorerInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {showExplorerInfo && (
          <div className="mt-2.5 pt-2.5 border-t border-white/10 space-y-2 text-[0.7rem] text-white/70 leading-relaxed">
            <p>
              Midnight Network is a <strong>privacy-first Zero-Knowledge smart contract platform</strong>. Unlike EVM chains (e.g. Ethereum), smart contracts on Midnight do not expose public balances or unshielded transaction logs attached directly to a contract address. All citizen identities, proving witnesses, and claim amounts remain shielded on the client device.
            </p>
            <p>
              TexLabs&apos;s community explorer (<code>preprod.midnightexplorer.com</code>) currently parses individual block extrinsics under <code>/transactions/[hash]</code>, but has <strong>not implemented internal contract state or address-to-call indexing</strong> on <code>/address/</code>. This is why the page displays the address header with no transaction rows underneath.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[0.65rem]">
              <span className="text-white/40 uppercase tracking-wider font-bold">Where to Audit Transactions:</span>
              <Link
                to="/transparency"
                className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors font-medium flex items-center gap-1"
              >
                <Landmark className="w-3 h-3" />
                <span>Public Calamity Treasury (/transparency)</span>
              </Link>
              <a
                href={getExplorerTxUrl(sampleTxHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded bg-civic-sky/20 text-civic-sky border border-civic-sky/30 hover:bg-civic-sky/30 transition-colors font-medium flex items-center gap-1"
                title="View verified block transaction extrinsic on Midnight Explorer"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Sample Tx on Explorer</span>
              </a>
              <span className="text-white/40 font-mono">
                docs/COA_AUDIT_TRANSACTIONS_100.csv
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransparencyCard;
