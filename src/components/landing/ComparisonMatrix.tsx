// ==============================================================================
// GhostFree — ComparisonMatrix Component (Dribbble Modular SaaS Style)
// Side-by-side card matrix comparing traditional aid vs GhostFree on Midnight
// ==============================================================================

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, X, Check, Sparkles } from "lucide-react";

interface ComparisonItem {
  feature: string;
  oldWay: string;
  ghostFree: string;
}

export const ComparisonMatrix: React.FC<{
  comparisons: ComparisonItem[];
  t: (key: string, fallback?: string) => string;
}> = ({ comparisons, t }) => {
  return (
    <section className="section-env-matrix px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto rounded-3xl sm:rounded-[2.5rem] my-8 text-left">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-400/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("compareBadge", "Bakit GhostFree ang Sagot")}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {t("compareTitle", "The Old Way vs. The GhostFree Way")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed"
        >
          {t(
            "compareSubtitle",
            "Tingnan ang malaking pagkakaiba ng tradisyunal na ayuda sa makabagong Zero-Knowledge calamity aid."
          )}
        </motion.p>
      </div>

      {/* Structured 2D Visual Flow Comparison Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Old Way Flow */}
        <div className="p-3.5 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30 flex items-center justify-between text-[0.68rem] font-mono">
          <span className="text-red-700 dark:text-red-300 font-bold">LUMANG DALOY:</span>
          <span className="text-slate-600 dark:text-slate-400">Papel na Listahan ➔ Pila ➔ Delikado sa Ghosts ⚠️</span>
        </div>

        {/* GhostFree Flow */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between text-[0.68rem] font-mono">
          <span className="text-emerald-700 dark:text-emerald-300 font-bold">GHOSTFREE:</span>
          <span className="text-slate-600 dark:text-slate-400">PhilSys QR ➔ WASM Prover ➔ Nullifier ➔ ₱5,000 🛡️</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* The Old Way Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/90 border-2 border-red-200 dark:border-red-500/30 shadow-xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-200 dark:border-red-500/20">
            <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-500/15 border border-red-200 dark:border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400 shadow-sm">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {t("compareOldHeader", "❌ Lumang Sistema ng Ayuda")}
              </h3>
              <span className="text-[0.68rem] text-red-600 dark:text-red-400 block font-medium">
                Mabagal, delikado sa privacy, laganap ang ghosts
              </span>
            </div>
          </div>

          <ul className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {comparisons.map((c, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 dark:bg-red-500/[0.04]">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">{c.feature}:</strong>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{c.oldWay}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The GhostFree Way Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/90 border-2 border-emerald-200 dark:border-emerald-500/40 shadow-xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-200 dark:border-emerald-500/20">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {t("compareGhostFreeHeader", "✅ GhostFree sa Midnight Network")}
              </h3>
              <span className="text-[0.68rem] text-emerald-600 dark:text-emerald-400 block font-medium">
                Agad-agad, 100% ZK Private, zero gas fees
              </span>
            </div>
          </div>

          <ul className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {comparisons.map((c, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-500/[0.06]">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">{c.feature}:</strong>
                  <span className="text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">{c.ghostFree}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonMatrix;
