// ==============================================================================
// GhostFree — HowItWorksTimeline Component (Dribbble Modular SaaS Style)
// Progressive 4-step interactive zero-knowledge pipeline with Framer Motion
// ==============================================================================

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  ShieldCheck,
  Lock,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";

interface StepItem {
  id: number;
  title: string;
  tag: string;
  desc: string;
  staysPrivate: string;
}

export const HowItWorksTimeline: React.FC<{
  steps: StepItem[];
  t: (key: string, fallback?: string) => string;
}> = ({ steps, t }) => {
  const icons = [
    <Smartphone className="w-5 h-5" />,
    <ShieldCheck className="w-5 h-5" />,
    <Lock className="w-5 h-5" />,
    <CircleDollarSign className="w-5 h-5" />,
  ];

  const stepStates = [
    { label: "READY TO SCAN", color: "bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-500/30" },
    { label: "LOCAL INPUT", color: "bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30" },
    { label: "WASM PROVING", color: "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30" },
    { label: "PAYOUT RELEASED", color: "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" },
  ];

  return (
    <section className="section-env-workflow px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto rounded-3xl sm:rounded-[2.5rem] my-8 overflow-hidden text-left">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-400/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("workflowTag", "Apat na Hakbang sa Ayuda")}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {t("workflowTitle", "Paano Gumagana ang GhostFree")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed"
        >
          {t(
            "workflowSubtitle",
            "Mula sa evacuation slip hanggang sa pagtanggap ng ₱5,000 pondo nang hindi inilalantad ang iyong National ID."
          )}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
        {steps.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-amber-400/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center shadow-md shadow-amber-500/30">
                    {s.id}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                </div>
                <span className={`text-[0.62rem] font-mono font-bold px-2 py-0.5 rounded-full border ${stepStates[idx]?.color || "bg-slate-100 text-slate-600"}`}>
                  {stepStates[idx]?.label}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{s.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-[0.68rem] text-emerald-700 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{s.staysPrivate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksTimeline;
