// ==============================================================================
// GhostFree — CircuitCall Component (Level 2 Specification)
// Invokes Compact smart contract circuits on Midnight Preprod, generates ZK
// proofs locally in the browser, displays on-chain results, and strictly enforces
// witness confidentiality ('Proved without revealing your input').
// ==============================================================================

import React, { useState } from "react";
import {
  Zap,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldAlert,
  ArrowRight,
  Fingerprint,
  FileCheck,
} from "lucide-react";
import { useMidnight } from "../hooks/useMidnight";
import { useMidnightWallet } from "../contexts/MidnightWalletContext";

export const CircuitCall: React.FC = () => {
  const { connected } = useMidnightWallet();
  const {
    contractState,
    proving,
    submitting,
    error,
    txResult,
    contractAddress,
    callIncrement,
  } = useMidnight();

  const [secretPin, setSecretPin] = useState("88214");
  const [incrementAmount, setIncrementAmount] = useState(25);
  const [localSuccess, setLocalSuccess] = useState(false);

  const handleExecuteCircuit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) return;

    try {
      setLocalSuccess(false);
      await callIncrement(secretPin, BigInt(incrementAmount));
      setLocalSuccess(true);
    } catch (err) {
      console.error("Circuit invocation error:", err);
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-shield-glass/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
      {/* Header & Confidentiality Guarantee */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-civic-trust px-2.5 py-0.5 rounded-full bg-civic-trust/10 border border-civic-trust/20">
              Midnight Compact Circuit
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Contract: {contractAddress ? `${contractAddress.slice(0, 10)}...${contractAddress.slice(-6)}` : "Preprod"}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Execute Private Increment Circuit
          </h3>
        </div>

        {/* Mandatory Level 2 Privacy Guarantee Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-success/15 border border-accent-success/30 text-accent-success text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Proved without revealing your input</span>
        </div>
      </div>

      {/* Public Ledger State Display */}
      <div className="grid grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">
            Public Ledger Counter
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {contractState.counter.toString()}
          </div>
          <span className="text-[0.7rem] text-slate-500">Cumulative on-chain state</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">
            Total Circuit Increments
          </span>
          <div className="text-2xl sm:text-3xl font-black text-civic-sky mt-1">
            {contractState.totalIncrements.toString()}
          </div>
          <span className="text-[0.7rem] text-slate-500">ZK state transitions verified</span>
        </div>
      </div>

      {/* Circuit Execution Form */}
      <form onSubmit={handleExecuteCircuit} className="space-y-5">
        {/* Private Witness Input: Kept Local */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5 text-accent-purple" />
              Private Secret Voucher PIN (Witness Input)
            </label>
            <span className="text-[0.7rem] text-accent-purple font-mono">
              Never transmitted to blockchain
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              value={secretPin}
              onChange={(e) => setSecretPin(e.target.value)}
              placeholder="Enter your confidential resident PIN"
              disabled={proving || submitting}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-civic-trust focus:ring-1 focus:ring-civic-trust transition-all font-mono"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 flex items-center gap-1 pointer-events-none">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Local WASM Witness</span>
            </div>
          </div>
          <p className="text-[0.7rem] text-slate-400 mt-1">
            This private authorization witness remains strictly in your browser. Only the zero-knowledge proof is published.
          </p>
        </div>

        {/* Increment Amount Input */}
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Step Amount (Operational Constraint: 1 - 100)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(Number(e.target.value))}
            disabled={proving || submitting}
            className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-civic-trust focus:ring-1 focus:ring-civic-trust font-mono"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!connected || proving || submitting}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
              !connected
                ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                : proving
                ? "bg-accent-purple text-white shadow-accent-purple/20"
                : submitting
                ? "bg-civic-blue text-white shadow-civic-blue/20"
                : "bg-gradient-to-r from-civic-blue via-civic-trust to-accent-success text-white hover:opacity-95 shadow-civic-trust/20"
            }`}
            id="btn-execute-circuit"
          >
            {proving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Zero-Knowledge Proof locally in browser...</span>
              </>
            ) : submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting verified proof to Midnight Preprod...</span>
              </>
            ) : !connected ? (
              <>
                <ShieldAlert className="w-5 h-5" />
                <span>Connect Lace Wallet to Call Circuit</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Call Circuit on Preprod (Prove Privately)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Real-time State / Result Feed */}
      {txResult && (
        <div className="mt-6 p-5 rounded-2xl bg-slate-950/90 border border-accent-success/40 text-xs font-mono space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-accent-success font-bold flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              Circuit Call Succeeded & Confirmed On-Chain
            </span>
            <span className="text-slate-400">{txResult.timestamp}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
            <div>
              <span className="text-slate-500">Transaction ID: </span>
              <span className="text-white select-all">{txResult.txHash}</span>
            </div>
            <div>
              <span className="text-slate-500">Block Height: </span>
              <span className="text-civic-sky">#{txResult.blockHeight}</span>
            </div>
            <div>
              <span className="text-slate-500">Operation: </span>
              <span className="text-accent-purple">{txResult.operation}</span>
            </div>
            <div>
              <span className="text-slate-500">New Public Counter: </span>
              <span className="text-accent-success font-bold">{txResult.newCounter.toString()}</span>
            </div>
          </div>
          <div className="pt-2 text-[0.7rem] text-accent-success flex items-center gap-1 font-sans">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Witness privacy preserved: Private secret voucher PIN was NEVER exposed on-chain.</span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default CircuitCall;
