// ==============================================================================
// GhostFree — BottomCtaBanner Component (Dribbble Modular SaaS Style)
// High-conversion disaster relief deployment card with dual primary/secondary action
// ==============================================================================

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Landmark, Sparkles } from "lucide-react";

export const BottomCtaBanner: React.FC<{
  t: (key: string, fallback?: string) => string;
}> = ({ t }) => {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-14 bg-gradient-to-r from-amber-500/20 via-slate-900 to-sky-500/20 border-2 border-amber-400/40 shadow-2xl backdrop-blur-2xl overflow-hidden text-center glass-card"
      >
        {/* Background glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("ctaTag", "Handa na ba ang inyong Komunidad?")}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            {t("ctaTitle", "Stop the Ghosts. Protect the People.")}
          </h2>

          <p className="text-sm sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            {t(
              "ctaSubtitle",
              "Subukan ang Zero-Knowledge Calamity Aid Distribution sa Midnight Network. Mabilis para sa biktima, ligtas sa pandaraya, at 100% transparent sa COA."
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/claim")}
              className="btn-civic-gold w-full sm:w-auto px-8 py-4 text-base font-black flex items-center justify-center gap-2.5 shadow-xl tap-scale"
              id="bottom-cta-claim-btn"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{t("claimAidButton", "Claim Calamity Aid (₱5,000)")}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/transparency")}
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2.5 shadow-lg tap-scale"
              id="bottom-cta-treasury-btn"
            >
              <Landmark className="w-5 h-5 text-amber-400" />
              <span>{t("treasuryExplorerButton", "Open Treasury Explorer")}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BottomCtaBanner;
