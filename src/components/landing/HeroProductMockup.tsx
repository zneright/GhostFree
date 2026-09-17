// ==============================================================================
// GhostFree — Abstract Hero Product Mockup Component (Dribbble Outcrowd Style)
// Features a floating 3D/glassmorphic terminal with Framer Motion floating telemetry widgets
// ==============================================================================

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  Activity,
  Cpu,
  Fingerprint,
} from "lucide-react";

export const HeroProductMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16 px-2 sm:px-4">
      {/* Ambient background glow behind the terminal */}
      <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-amber-500/20 via-sky-500/15 to-emerald-500/20 rounded-[2.5rem] blur-3xl opacity-70 pointer-events-none" />

      {/* Main Terminal Shell */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl sm:rounded-[2.25rem] bg-slate-900/90 border border-white/15 p-4 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden glass-card"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-5 sm:mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-[0.68rem] sm:text-xs text-slate-400 font-medium hidden sm:inline-block">
              ghostfree.midnight.network/v2/disaster-qrf
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ZK PROVER ONLINE
            </span>
          </div>
        </div>

        {/* Terminal Core Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left Column: Proving Pipeline Visualization */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[0.65rem] uppercase tracking-wider text-amber-400 font-bold block">
                  Active Calamity Operation
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Typhoon Marce Quick Response Fund
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                ₱5,000 / Pamilya
              </span>
            </div>

            {/* Visual Step Pipeline Bar */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Fingerprint className="w-4 h-4 text-sky-400" />
                  PhilSys Witness Ingestion
                </span>
                <span className="text-emerald-400 font-mono text-[0.7rem] bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  WITNESS SECURE
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 h-full rounded-full"
                  initial={{ width: "20%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                />
              </div>
              <div className="flex items-center justify-between text-[0.68rem] text-slate-400 font-mono">
                <span>Poseidon Hash: 0x8f4c...3e1a</span>
                <span>Circuit Proof: 1.18s WASM</span>
              </div>
            </div>

            {/* Micro Data Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-[0.65rem] text-slate-400 block font-medium">Disbursed</span>
                <span className="text-sm sm:text-base font-black text-emerald-400">₱15,000,000</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-[0.65rem] text-slate-400 block font-medium">Ghost Blocked</span>
                <span className="text-sm sm:text-base font-black text-amber-400">18 Claims</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-[0.65rem] text-slate-400 block font-medium">Gas Paid By Citizen</span>
                <span className="text-sm sm:text-base font-black text-sky-400">₱0.00 (Free)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Circuit Radar */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-slate-950/80 to-slate-900/60 border border-white/10 relative">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-sky-400/30 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-amber-400/40"
              />
              <div className="absolute inset-7 rounded-full bg-emerald-500/10 border border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-white mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Compact Circuit Verified
            </span>
            <span className="text-[0.65rem] text-slate-400 mt-0.5">Midnight Preprod Smart Contract</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Badge 1: Top Left (+₱5,000 Cash Assistance) */}
      <motion.div
        animate={{ y: [0, -9, 0], x: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-3 sm:-left-8 z-20 hidden sm:flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl backdrop-blur-xl"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
            Automatic Settlement
          </span>
          <span className="text-xs sm:text-sm font-black text-white">
            +₱5,000 Aid Deposited
          </span>
        </div>
      </motion.div>

      {/* Floating Badge 2: Top Right (Anti-Ghost Nullifier Lock) */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-6 -right-3 sm:-right-8 z-20 hidden sm:flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl"
      >
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
            Anti-Ghost Cryptography
          </span>
          <span className="text-xs sm:text-sm font-black text-amber-300">
            Nullifier 100% Unique
          </span>
        </div>
      </motion.div>

      {/* Floating Badge 3: Bottom Left (WASM Client Prover) */}
      <motion.div
        animate={{ y: [0, -7, 0], x: [0, -3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-5 left-4 sm:left-10 z-20 hidden md:flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-900/95 border border-sky-500/40 shadow-2xl backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
            Client-Side Prover
          </span>
          <span className="text-xs font-black text-white">
            0 Personal Data Exposed
          </span>
        </div>
      </motion.div>

      {/* Floating Badge 4: Bottom Right (COA Real-time Compliance) */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, 3, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -bottom-5 right-4 sm:right-10 z-20 hidden md:flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
            COA Public Audit
          </span>
          <span className="text-xs font-black text-emerald-300">
            R.A. 10121 Compliant
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroProductMockup;
