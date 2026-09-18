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
    <section className="section-env-bento px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto rounded-3xl sm:rounded-[2.5rem] my-8 text-left">
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
            "Pinagsasama ang Zero-Knowledge cryptography sa Midnight Network at institutional accountability para sa mga pamahalaang lokal."
          )}
        </motion.p>
      </div>

      {/* 5-Tile Asymmetric Bento Grid with Structured 2D Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {/* ============================================================
            TILE 1: CLIENT-SIDE WASM PROVING ENGINE (Wide 7 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-sky-400/40 transition-colors"
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
                "Ang PhilSys National ID at 4-digit PIN ay private mathematical witnesses. Ang proof synthesis ay 100% nagaganap sa lokal na memorya ng telepono (WASM). Walang sensitibong datos na lumalabas sa internet."
              )}
            </p>
          </div>

          {/* Structured 2D Linear Proof Flow Diagram */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 space-y-3 relative z-10">
            <div className="flex items-center justify-between text-[0.68rem] text-slate-500 dark:text-slate-400 font-mono font-semibold">
              <span>1. Private Witness</span>
              <span>2. Local Circuit</span>
              <span>3. ZK-Proof (π)</span>
              <span>4. Ledger State</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 items-center">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-500/30 text-center">
                <span className="text-[0.62rem] text-slate-400 block">PhilSys ID</span>
                <span className="font-mono text-[0.68rem] font-bold text-sky-700 dark:text-sky-300 truncate block">PSN-••••</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/40 text-center">
                <span className="text-[0.62rem] text-amber-600 dark:text-amber-400 block">WASM Prover</span>
                <span className="font-mono text-[0.68rem] font-bold text-amber-700 dark:text-amber-300 block">1.18s</span>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-400/40 text-center">
                <span className="text-[0.62rem] text-indigo-600 dark:text-indigo-400 block">SNARK Proof</span>
                <span className="font-mono text-[0.68rem] font-bold text-indigo-700 dark:text-indigo-300 truncate block">π-valid</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/40 text-center">
                <span className="text-[0.62rem] text-emerald-600 dark:text-emerald-400 block">Midnight</span>
                <span className="font-mono text-[0.68rem] font-bold text-emerald-700 dark:text-emerald-300 block">₱5,000</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[0.65rem] text-slate-500 dark:text-slate-400">
              <span>Poseidon Merkle Root Check: <strong className="text-emerald-600 dark:text-emerald-400">VERIFIED</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 Data Transmitted</span>
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
          whileHover={{ y: -4 }}
          className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-amber-400/40 transition-colors"
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
                <span>{duplicateSimulated ? "Reset Test" : "Subukan ang Double Claim"}</span>
              </motion.button>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile2Title", "Anti-Ghost Nullifier Shield")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t(
                "bentoTile2Desc",
                "Pinipigilan ang dobleng pag-claim sa pamamagitan ng deterministic nullifiers: nullifier = Hash(leaf + contract). Kahit ipasok muli ng tiwaling opisyal, awtomatikong binabasura ng smart contract."
              )}
            </p>
          </div>

          {/* Structured 2D Dual-Attempt Status Comparison */}
          <div className="space-y-2 relative z-10">
            {/* Attempt 1 */}
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">Unang Pag-Claim (Claim A)</span>
              <span className="font-mono text-[0.65rem] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded">
                ₱5,000 RELEASED
              </span>
            </div>

            {/* Attempt 2 (Interactive) */}
            <div className={`p-2.5 rounded-xl border transition-all text-xs ${
              duplicateSimulated
                ? "bg-red-50 dark:bg-red-500/15 border-red-200 dark:border-red-500/40"
                : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-white/10"
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {duplicateSimulated ? "Pangalawang Pag-Claim (Duplicate)" : "Subukang Mag-Claim Muli"}
                </span>
                {duplicateSimulated ? (
                  <span className="font-mono text-[0.65rem] font-bold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> BLOCKED (SPENT)
                  </span>
                ) : (
                  <span className="font-mono text-[0.65rem] text-slate-400">
                    Pindutin ang button sa itaas
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            TILE 3: DUAL-KEY MUNICIPAL QUORUM (4 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="md:col-span-4 rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-emerald-400/40 transition-colors"
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
                "Kinakailangan ang multi-signature authorization mula sa DRRM Officer at Municipal Treasurer bago maipamahagi ang pondo alinsunod sa R.A. 10121."
              )}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. MDRRM Officer</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono text-[0.68rem]">
                <Check className="w-3.5 h-3.5" /> AUTHORIZED
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Municipal Treasurer</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono text-[0.68rem]">
                <Check className="w-3.5 h-3.5" /> ESCROW RELEASED
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
          whileHover={{ y: -4 }}
          className="md:col-span-4 rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-sky-400/40 transition-colors"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-400/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 shadow-sm">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile4Title", "Offline Disaster Resilience")}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t(
                "bentoTile4Desc",
                "Dinisenyo para sa evacuation centers na walang signal. Ang proof ay pansamantalang naka-cache sa IndexedDB at awtomatikong nagsi-sync kapag may koneksyon na."
              )}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center gap-3">
            <QrCode className="w-8 h-8 text-sky-600 dark:text-sky-400 shrink-0" />
            <div>
              <span className="text-[0.65rem] font-bold text-sky-700 dark:text-sky-300 block uppercase">
                Offline QR Voucher Support
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                Lokal na snapshot para sa checkpoint validation
              </span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            TILE 5: REAL-TIME PUBLIC COA TELEMETRY & GAS DELEGATION (4 cols)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="md:col-span-4 rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-amber-400/40 transition-colors"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 shadow-sm">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
              {t("bentoTile5Title", "COA Audit & Gas Delegation")}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {t(
                "bentoTile5Desc",
                "Libre ang transaction fee (tDUST sponsored) para sa biktima. Bawat tranche ay may exportable CSV audit trail para sa COA Circular No. 2014-002."
              )}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Citizen Gas = ₱0.00</span>
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
