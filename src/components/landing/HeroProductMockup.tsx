// ==============================================================================
// GhostFree — Abstract Hero Product Mockup Component
// Self-contained, dual-theme Calamity Aid Telemetry Terminal
// Rich Framer Motion micro-interactions, floating physics, and interactive hover
// ==============================================================================

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Activity,
  Cpu,
  Fingerprint,
} from "lucide-react";

export const HeroProductMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-4">
      {/* Ambient background glow with soft animated breathing */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-amber-500/20 via-sky-500/15 to-emerald-500/20 rounded-[2.5rem] blur-3xl opacity-50 dark:opacity-75 pointer-events-none"
      />

      {/* Main Terminal Shell with subtle organic floating physics */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative rounded-3xl sm:rounded-[2.25rem] bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden glass-card"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 sm:pb-4 mb-5 sm:mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:scale-125 transition-transform cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:scale-125 transition-transform cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:scale-125 transition-transform cursor-pointer" />
            <span className="ml-2 font-mono text-[0.68rem] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline-block">
              ghostfree.midnight.network/v2/disaster-qrf
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              ZK PROVER ONLINE
            </motion.span>
          </div>
        </div>

        {/* Terminal Core Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left Column: Proving Pipeline Visualization */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[0.65rem] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">
                  Active Calamity Operation
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Typhoon Marce Quick Response Fund
                </h3>
              </div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/30 shadow-sm"
              >
                ₱5,000 / Pamilya
              </motion.span>
            </div>

            {/* Visual Step Pipeline Bar */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Fingerprint className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  PhilSys Witness Ingestion
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[0.7rem] bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/20">
                  WITNESS SECURE
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-sky-500 via-amber-500 to-emerald-500 h-full rounded-full"
                  initial={{ width: "25%" }}
                  animate={{ width: ["25%", "95%", "100%", "25%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="flex items-center justify-between text-[0.68rem] text-slate-500 dark:text-slate-400 font-mono">
                <span>Poseidon Hash: 0x8f4c...3e1a</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Activity className="w-3 h-3 animate-pulse" /> Circuit: 1.18s WASM
                </span>
              </div>
            </div>

            {/* Micro Data Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <motion.div
                whileHover={{ y: -2 }}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 transition-colors hover:border-emerald-500/40"
              >
                <span className="text-[0.65rem] text-slate-500 dark:text-slate-400 block font-medium">Disbursed</span>
                <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">₱15,000,000</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 transition-colors hover:border-amber-500/40"
              >
                <span className="text-[0.65rem] text-slate-500 dark:text-slate-400 block font-medium">Ghost Blocked</span>
                <span className="text-sm sm:text-base font-black text-amber-600 dark:text-amber-400">18 Claims</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 transition-colors hover:border-sky-500/40"
              >
                <span className="text-[0.65rem] text-slate-500 dark:text-slate-400 block font-medium">Gas Paid By Citizen</span>
                <span className="text-sm sm:text-base font-black text-sky-600 dark:text-sky-400">₱0.00 (Free)</span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Holographic Circuit Radar */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 relative">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-sky-500/30 dark:border-sky-400/30 border-dashed"
              />
              {/* Counter-rotating inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-amber-500/40 dark:border-amber-400/40"
              />
              {/* Pulsing center shield */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-7 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/25"
              >
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
            </div>
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
              Compact Circuit Verified
            </span>
            <span className="text-[0.65rem] text-slate-500 dark:text-slate-400 mt-0.5">
              Midnight Preprod Smart Contract
            </span>
          </div>
        </div>

        {/* Integrated In-Card Telemetry Bar with Spring Hover */}
        <div className="mt-5 pt-4 sm:pt-5 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {/* 1. Automatic Settlement */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 hover:border-emerald-400/40 transition-colors cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[0.6rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block truncate">
                Automatic Settlement
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                +₱5,000 Aid Deposited
              </span>
            </div>
          </motion.div>

          {/* 2. Anti-Ghost Cryptography */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 hover:border-amber-400/40 transition-colors cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[0.6rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block truncate">
                Anti-Ghost Lock
              </span>
              <span className="text-xs font-black text-amber-700 dark:text-amber-300 truncate block">
                Nullifier 100% Unique
              </span>
            </div>
          </motion.div>

          {/* 3. Client-Side Prover */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 hover:border-sky-400/40 transition-colors cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[0.6rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block truncate">
                Client-Side Prover
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                0 Data Leaked
              </span>
            </div>
          </motion.div>

          {/* 4. COA Public Audit */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 hover:border-emerald-400/40 transition-colors cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[0.6rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block truncate">
                COA Public Audit
              </span>
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 truncate block">
                R.A. 10121 Ready
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroProductMockup;
