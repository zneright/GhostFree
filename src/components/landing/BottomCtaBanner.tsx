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
    <section className="section-env-cta px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto rounded-3xl sm:rounded-[2.5rem] my-8">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-400/15 border border-amber-200 dark:border-amber-400/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("ctaTag", "Handa na ba ang inyong Komunidad?")}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          {t("ctaTitle", "Stop the Ghosts. Protect the People.")}
        </h2>

        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          {t(
            "ctaSubtitle",
            "Subukan ang Zero-Knowledge Calamity Aid Distribution sa Midnight Network. Mabilis para sa biktima, ligtas sa pandaraya, at 100% transparent sa pamahalaan."
          )}
        </p>
      </div>

      {/* Dual Emergency Action Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto text-left">
        {/* PATH 1: CITIZEN */}
        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border-2 border-amber-300 dark:border-amber-400/40 shadow-xl backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300 border border-amber-200 dark:border-amber-400/30">
                Para sa mga Biktima ng Sakuna
              </span>
              <ShieldCheck className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              Mag-claim ng Ayuda (₱5,000)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Direktang tanggapin ang pondo gamit ang iyong PhilSys QR o Resident ID nang hindi kinakaltasan o inilalantad ang personal na datos.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/claim")}
            className="btn-civic-gold w-full py-3.5 text-sm font-black flex items-center justify-center gap-2 shadow-lg tap-scale"
            id="bottom-cta-claim-btn"
          >
            <span>Pumunta sa Citizen Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* PATH 2: LGU OFFICIAL */}
        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border-2 border-sky-300 dark:border-sky-400/40 shadow-xl backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 dark:bg-sky-400/20 dark:text-sky-300 border border-sky-200 dark:border-sky-400/30">
                Para sa LGU & DRRM Responders
              </span>
              <Landmark className="w-6 h-6 text-sky-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              LGU Emergency Fund Portal
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              I-deploy ang Quick Response Fund ng munisipyo, aprubahan ang evacuation vouchers, at i-audit ang bawat tranche alinsunod sa R.A. 10121.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="btn-secondary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md tap-scale"
            id="bottom-cta-lgu-btn"
          >
            <span>Buksan ang LGU Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Auxiliary Link */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => navigate("/transparency")}
          className="text-xs font-bold text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>{t("treasuryExplorerButton", "Tingnan ang Publikong Talaan ng Pondo (COA Treasury Explorer)")}</span>
        </button>
      </div>
    </section>
  );
};

export default BottomCtaBanner;
