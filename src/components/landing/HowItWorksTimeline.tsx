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
import WorkflowScene from "../3d/WorkflowScene";

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

  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto overflow-hidden">
      {/* Dedicated Section 3D Scene: 4-Stage Progressive Pipeline */}
      <WorkflowScene className="opacity-70 dark:opacity-85" />
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("workflowTag", "Apat na Hakbang sa Ayuda")}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight"
        >
          {t("workflowTitle", "Paano Gumagana ang GhostFree")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed"
        >
          {t(
            "workflowSubtitle",
            "Mula sa evacuation slip hanggang sa pagtanggap ng ₱5,000 pondo nang hindi inilalantad ang iyong National ID."
          )}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {steps.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-3xl p-6 bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl relative overflow-hidden glass-card flex flex-col justify-between hover:border-amber-400/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center shadow-md shadow-amber-500/30 cursor-default"
                >
                  {s.id}
                </motion.div>
                <span className="text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {s.tag}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{s.desc}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[0.68rem] text-emerald-400/90 font-medium">
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
