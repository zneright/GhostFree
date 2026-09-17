// ==============================================================================
// GhostFree — CivilianFaqAccordion Component (Dribbble Modular SaaS Style)
// Accessible accordion with Framer Motion AnimatePresence smooth expand/collapse
// ==============================================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export const CivilianFaqAccordion: React.FC<{
  faqs: FaqItem[];
  t: (key: string, fallback?: string) => string;
}> = ({ faqs, t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-4xl mx-auto">
      <div className="text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t("faqSectionTag", "Mga Karaniwang Tanong")}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight"
        >
          {t("faqSectionTitle", "Sagot para sa mga Mamamayan")}
        </motion.h2>
      </div>

      <div className="space-y-3.5">
        {faqs.map((f, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden glass-card transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4.5 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="p-4.5 sm:p-5 pt-3 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CivilianFaqAccordion;
