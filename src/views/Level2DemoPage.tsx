// ==============================================================================
// GhostFree — Level 2 Interactive Circuit Demo Page
// Displays WalletConnect and CircuitCall components for recording the Level 2 demo
// and evaluating client-side zero-knowledge proof generation on Midnight Preprod.
// ==============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Sparkles, ExternalLink } from "lucide-react";
import { WalletConnect } from "../components/WalletConnect";
import { CircuitCall } from "../components/CircuitCall";
import { MIDNIGHT_CONFIG } from "../configuration/midnight.config";

export const Level2DemoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-civic-navy relative overflow-hidden text-slate-100 selection:bg-civic-blue selection:text-white pb-16">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-civic-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-success/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 border-b border-shield-glass/10 backdrop-blur-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-civic-trust/20 text-civic-trust border border-civic-trust/30 uppercase tracking-wider">
            Midnight Builder Challenge — Level 2
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-10 space-y-8">
        {/* Title Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Zero-Knowledge Frontend Demo</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Midnight Smart Contract Telemetry
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect your Lace wallet on Midnight Preprod, execute the Compact increment circuit,
            generate the ZK proof locally in your browser, and observe the on-chain state update.
          </p>
        </div>

        {/* 1. Wallet Connect Component */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 1: Midnight Lace Wallet Integration
          </h2>
          <WalletConnect />
        </section>

        {/* 2. Circuit Call Component */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 2: Client-Side Proof Generation & On-Chain Execution
          </h2>
          <CircuitCall />
        </section>

        {/* Preprod Contract Information Box */}
        <div className="glass-card p-5 rounded-2xl border border-shield-glass/20 bg-slate-950/60 text-xs text-slate-400 font-mono space-y-2">
          <div className="flex items-center justify-between text-slate-300 font-bold font-sans">
            <span>Preprod Contract Details</span>
            <a
              href="https://faucet.preprod.midnight.network"
              target="_blank"
              rel="noreferrer"
              className="text-civic-sky flex items-center gap-1 hover:underline text-xs"
            >
              Preprod Faucet
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="break-all">
            <span className="text-slate-500">Contract Address: </span>
            <span className="text-white select-all">
              {MIDNIGHT_CONFIG.contractAddress || "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43"}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Network: </span>
            <span className="text-civic-sky uppercase">Midnight Preprod</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level2DemoPage;
