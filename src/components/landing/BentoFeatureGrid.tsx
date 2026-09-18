// ==============================================================================
// GhostFree — BentoFeatureGrid Component
// Asymmetric 5-tile Bento Box with full dynamic Sunlight & Dark Mode support
// Rich Framer Motion spring physics, hover elevation, and interactive fraud simulation
// ==============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Landmark,
  WifiOff,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  QrCode,
  Check,
  AlertTriangle,
  Cpu,
} from "lucide-react";

export const BentoFeatureGrid: React.FC<{
  t: (key: string, fallback?: string) => string;
}> = ({ t }) => {
  const [duplicateSimulated, setDuplicateSimulated] = useState(false);

  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-400/30 text-sky-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3 cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("bentoTag", "Soberanya sa Pribasiya at Seguridad")}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {t("bentoTitle", "Next-Gen Disaster Aid Architecture")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed"
        >
          {t(
            "bentoSubtitle",
            "Combining Zero-Knowledge cryptography on Midnight Network with institutional accountability for local governments."
          )}
        </motion.p>
      </div>

      {/* 5-Tile Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {/* ============================================================
            TILE 1: CLIENT-SIDE WASM PROVING ENGINE (Wide 7 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-sky-400/40 transition-colors"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-400/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[0.65rem] font-bold bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 uppercase tracking-wider">
                100% On-Device Prover
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile1Title", "Zero-Knowledge Witness Sovereignty")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {t(
                "bentoTile1Desc",
                "Your PhilSys National ID and 4-digit PIN are private mathematical witnesses. Proof synthesis occurs entirely in local phone memory (WASM). Zero personal data touches the internet."
              )}
            </p>
          </div>

          {/* Interactive Micro Pipeline Visualization */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 space-y-3 relative z-10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-mono">Input: PhilSys ID + PIN</span>
              <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">Local WASM Circuit</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">Ledger Nullifier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-500/30 text-center font-mono text-[0.7rem] text-sky-700 dark:text-sky-300 font-bold truncate">
                PSN-2024-••••-••••
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/40 text-center font-mono text-[0.7rem] text-amber-700 dark:text-amber-300 font-bold">
                Poseidon Hash
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/40 text-center font-mono text-[0.7rem] text-emerald-700 dark:text-emerald-300 font-bold truncate">
                0x7b2a...9c1d
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            TILE 2: ANTI-GHOST NULLIFIER SHIELD (Narrow 5 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-amber-400/40 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm">
                <Lock className="w-6 h-6" />
              </div>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={() => setDuplicateSimulated(!duplicateSimulated)}
                className="px-3 py-1 rounded-full text-[0.68rem] font-bold bg-amber-50 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-400/30 border border-amber-200 dark:border-amber-400/40 transition-all flex items-center gap-1 shadow-sm"
              >
                <span>{duplicateSimulated ? "Reset Test" : "Simulate Double Claim"}</span>
              </motion.button>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile2Title", "Anti-Ghost Nullifier Shield")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {t(
                "bentoTile2Desc",
                "Deterministic nullifiers prevent double-claiming mathematically. Even if a corrupt official re-enters your identity, the smart contract immediately rejects it."
              )}
            </p>
          </div>

          {/* Interactive Simulation Status Box */}
          <motion.div
            layout
            className={`p-3.5 rounded-2xl border transition-all ${
              duplicateSimulated
                ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/40"
                : "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/40"
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-bold">
              {duplicateSimulated ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  <span className="text-red-700 dark:text-red-300">COLLISION BLOCKED: Nullifier already spent!</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-emerald-700 dark:text-emerald-300">UNIQUE NULLIFIER: 1st claim approved (₱5,000)</span>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ============================================================
            TILE 3: DUAL-KEY MUNICIPAL QUORUM (4 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.015 }}
          className="md:col-span-4 rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-emerald-400/40 transition-colors"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-sm">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile3Title", "Dual-Key Governance")}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t(
                "bentoTile3Desc",
                "Requires multi-signature authorization from both the DRRM Officer and Municipal Treasurer before funds can be released."
              )}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. MDRRM Officer</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> SEALED
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Municipal Treasurer</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> SEALED
              </span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            TILE 4: OFFLINE EVACUATION RESILIENCE (4 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.015 }}
          className="md:col-span-4 rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-sky-400/40 transition-colors"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-400/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 shadow-sm">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile4Title", "Disaster Resilience")}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t(
                "bentoTile4Desc",
                "Engineered for catastrophe zones with zero cellular signal. Draft proofs cache locally in IndexedDB and sync automatically when restored."
              )}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center gap-3">
            <QrCode className="w-8 h-8 text-sky-600 dark:text-sky-400 shrink-0" />
            <div>
              <span className="text-[0.65rem] font-bold text-sky-700 dark:text-sky-300 block uppercase">
                Physical Slip Voucher
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                Printable QR fallback for checkpoint gates
              </span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            TILE 5: REAL-TIME PUBLIC COA TELEMETRY (4 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.015 }}
          className="md:col-span-4 rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-amber-400/40 transition-colors"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 shadow-sm">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile5Title", "COA Audit Compliance")}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t(
                "bentoTile5Desc",
                "Complies with Philippine Republic Act 10121 and COA accounting circulars with 1-click verifiable CSV reports."
              )}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Preprod Ledger</span>
            </div>
            <span className="text-[0.65rem] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
              AUDIT CERTIFIED
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoFeatureGrid;
