// ==============================================================================
// GhostFree — CalamityReliefHub Component
// Consolidates 3 previously sprawling sections (Eligibility, Basket, Evacuation)
// into an elegant, interactive 3-tab modern civic-tech hub.
// ==============================================================================

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Wheat,
  UtensilsCrossed,
  Droplets,
  HeartPulse,
  Hammer,
  ShieldCheck,
  Building2,
  MapPin,
  ArrowRight,
  Coins,
} from "lucide-react";

interface CalamityReliefHubProps {
  t: (key: string, fallback?: string) => string;
  lang: string;
}

export const CalamityReliefHub: React.FC<CalamityReliefHubProps> = ({ t, lang }) => {
  const navigate = useNavigate();
  type ActiveTab = "eligibility" | "basket" | "centers";
  const [activeTab, setActiveTab] = useState<ActiveTab>("eligibility");

  // Eligibility Search State
  const [barangayInput, setBarangayInput] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<{
    checked: boolean;
    eligible: boolean;
    location: string;
    amount: number;
    tranche: string;
  } | null>(null);

  // Calamity zones
  const DECLARED_CALAMITY_ZONES = useMemo(() => [
    { name: "San Roque", municipality: "Gonzaga, Cagayan", tranche: "Typhoon Marce QRF Tranche #1", amount: 5000 },
    { name: "Centro 01", municipality: "Tuguegarao City, Cagayan", tranche: "Typhoon Marce QRF Tranche #1", amount: 5000 },
    { name: "Casambalangan", municipality: "Santa Ana, Cagayan", tranche: "Typhoon Marce QRF Tranche #1", amount: 5000 },
    { name: "Punta", municipality: "Aparri, Cagayan", tranche: "Cagayan River Basin Overflow QRF", amount: 5000 },
  ], []);

  const handleCheckEligibility = (locationName?: string) => {
    const raw = locationName || barangayInput;
    const query = raw.trim().toLowerCase();
    if (!query) {
      setEligibilityResult({
        checked: true,
        eligible: true,
        location: "Barangay San Roque, Gonzaga, Cagayan (Evacuation Zone A)",
        amount: 5000,
        tranche: "Typhoon Marce Quick Response Fund Tranche #1",
      });
      return;
    }

    const matched = DECLARED_CALAMITY_ZONES.find(
      (z) => query.includes(z.name.toLowerCase()) || z.municipality.toLowerCase().includes(query)
    );

    if (matched) {
      setEligibilityResult({
        checked: true,
        eligible: true,
        location: `Barangay ${matched.name}, ${matched.municipality}`,
        amount: matched.amount,
        tranche: matched.tranche,
      });
    } else {
      setEligibilityResult({
        checked: true,
        eligible: false,
        location: raw.includes("Brgy") || raw.includes("Barangay") ? raw : `Barangay ${raw}`,
        amount: 0,
        tranche: "Outside Declared Signal No. 3 Zone (Use Evaluator Sandbox for testing)",
      });
    }
  };

  // Relief Basket Items
  const reliefBasketItems = useMemo(() => [
    {
      id: "rice",
      name: t("basketRiceName", "25kg NFA Well-Milled Rice"),
      tagalog: t("basketRiceTag", "Bigas para sa 3 linggo"),
      amount: 1250,
      icon: <Wheat className="w-5 h-5 text-amber-500" />,
      desc: t("basketRiceDesc", "Sapat na pangunahing pagkain para sa isang pamilyang may 5 miyembro sa buong emergency period."),
    },
    {
      id: "foodpack",
      name: t("basketFoodName", "DSWD Family Food Packs"),
      tagalog: t("basketFoodTag", "Canned Goods, Noodles, Kape"),
      amount: 1500,
      icon: <UtensilsCrossed className="w-5 h-5 text-emerald-500" />,
      desc: t("basketFoodDesc", "12 latang sardinas at corned beef, 10 packs instant noodles, cereal drink, at kape para sa almusal at hapunan."),
    },
    {
      id: "water",
      name: t("basketWaterName", "Clean Water & Hygiene Kit"),
      tagalog: t("basketWaterTag", "Malinis na Tubig & Sanitation"),
      amount: 1000,
      icon: <Droplets className="w-5 h-5 text-sky-500" />,
      desc: t("basketWaterDesc", "2x 5-gallon purified drinking water containers, sabon, shampoo, toothpaste, sanitary napkins, at bleach."),
    },
    {
      id: "medicine",
      name: t("basketMedName", "Emergency First Aid & Medicine"),
      tagalog: t("basketMedTag", "Paracetamol, Gamot, Antiseptic"),
      amount: 750,
      icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
      desc: t("basketMedDesc", "Paracetamol para sa lagnat, oral rehydration salts para sa dehydration, band-aids, betadine, at alcohol."),
    },
    {
      id: "shelter",
      name: t("basketShelterName", "Emergency Shelter Repair Kit"),
      tagalog: t("basketShelterTag", "Trapal, Lubid, Pako"),
      amount: 500,
      icon: <Hammer className="w-5 h-5 text-indigo-500" />,
      desc: t("basketShelterDesc", "Mabigat na trapal (tarpaulin), nylon rope, at pako upang pansamantalang protektahan ang bubong."),
    },
  ], [lang, t]);

  // Evacuation Centers
  const evacuationCenters = [
    {
      name: "Tuguegarao City People's Coliseum",
      municipality: "Tuguegarao City, Cagayan",
      activeDisasters: "Tropical Cyclone Marce — Signal No. 3",
      capacity: 450,
      disbursed: 423,
      sectorId: "DSWD-R02-TUG-01",
      status: "Actively Disbursing",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      name: "Gonzaga Municipal Gymnasium",
      municipality: "Gonzaga, Cagayan",
      activeDisasters: "Coastal Storm Surge Evacuation",
      capacity: 280,
      disbursed: 247,
      sectorId: "DSWD-R02-GON-02",
      status: "Actively Disbursing",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      name: "Santa Ana Fisherfolk Multi-Purpose Center",
      municipality: "Santa Ana, Cagayan",
      activeDisasters: "Flash Flood Quick Response",
      capacity: 190,
      disbursed: 190,
      sectorId: "DSWD-R02-STA-03",
      status: "100% Fully Disbursed",
      statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    },
    {
      name: "Aparri Coastal Evacuation Staging Post",
      municipality: "Aparri, Cagayan",
      activeDisasters: "Cagayan River Basin Overflow Alert",
      capacity: 310,
      disbursed: 282,
      sectorId: "DSWD-R02-APA-04",
      status: "Actively Disbursing",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
  ];

  return (
    <section id="calamity-relief-hub" className="px-4 sm:px-6 py-12 sm:py-16 max-w-5xl mx-auto rounded-3xl my-6 text-left">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>R.A. 10121 DRRM Operation Hub</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Calamity Relief Operations Explorer
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
          Verify resident eligibility, inspect itemized emergency food baskets, and monitor active evacuation sector disbursements.
        </p>
      </div>

      {/* Segmented Capsule Tab Bar */}
      <div className="flex items-center justify-center mb-8">
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-lg backdrop-blur-xl flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("eligibility")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "eligibility"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Check Eligibility</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("basket")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "basket"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>₱5,000 Relief Basket</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("centers")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "centers"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Evacuation Centers</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* TAB 1: ELIGIBILITY CHECKER */}
          {activeTab === "eligibility" && (
            <motion.div
              key="eligibility"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  30-Second Calamity Eligibility Check
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Check if your barangay or evacuation sector is actively funded under Typhoon Marce Quick Response Fund.
                </p>
              </div>

              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 flex items-center gap-2 shadow-inner">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter barangay or town (e.g., San Roque, Centro 01)..."
                    value={barangayInput}
                    onChange={(e) => setBarangayInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheckEligibility()}
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-transparent border-0 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleCheckEligibility()}
                  className="btn-civic-gold px-5 py-2.5 text-xs font-black shrink-0 tap-scale"
                >
                  Verify
                </button>
              </div>

              {/* Quick suggestion chips */}
              <div className="flex items-center gap-2 px-1 overflow-x-auto text-[0.7rem] text-slate-500 dark:text-slate-400 pt-1">
                <span className="shrink-0 font-medium">Quick Test:</span>
                {[
                  { label: "San Roque (Gonzaga)", query: "San Roque" },
                  { label: "Centro 01 (Tuguegarao)", query: "Centro 01" },
                  { label: "Casambalangan (Santa Ana)", query: "Casambalangan" },
                  { label: "Punta (Aparri)", query: "Punta" },
                ].map((chip) => (
                  <button
                    key={chip.query}
                    type="button"
                    onClick={() => {
                      setBarangayInput(chip.query);
                      handleCheckEligibility(chip.query);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors shrink-0 text-xs"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {eligibilityResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-4 p-4 rounded-2xl border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    eligibilityResult.eligible
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-amber-500/10 border-amber-500/30"
                  }`}
                >
                  <div>
                    <span className={`font-bold flex items-center gap-1.5 ${
                      eligibilityResult.eligible ? "text-emerald-400" : "text-amber-400"
                    }`}>
                      {eligibilityResult.eligible ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      {eligibilityResult.eligible
                        ? `Eligible for Emergency Relief: ₱${eligibilityResult.amount.toLocaleString()} Payout`
                        : "Sector Registry Outside Signal No. 3 Roster"}
                    </span>
                    <span className="text-slate-300 block mt-1 font-medium">{eligibilityResult.location}</span>
                    <span className="text-[0.7rem] text-slate-400 font-mono mt-0.5 block">{eligibilityResult.tranche}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/claim")}
                    className={`text-xs px-4 py-2.5 shrink-0 font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      eligibilityResult.eligible ? "btn-civic-gold" : "btn-secondary"
                    }`}
                  >
                    <span>{eligibilityResult.eligible ? "Claim Aid Now" : "Test in Sandbox"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 2: RELIEF BASKET BREAKDOWN */}
          {activeTab === "basket" && (
            <motion.div
              key="basket"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    ₱5,000 Emergency Calamity Relief Goods Breakdown
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Itemized allocation mandated under DSWD and MDRRM disaster assistance standards.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                  100% Direct Payout
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {reliefBasketItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="font-mono text-sm font-black text-emerald-500 dark:text-emerald-400">
                          ₱{item.amount.toLocaleString()}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                      <span className="text-[0.7rem] text-amber-500 dark:text-amber-400 font-medium block mt-0.5">{item.tagalog}</span>
                      <p className="text-[0.72rem] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Summary Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-sky-600/20 border-2 border-emerald-500/40 flex flex-col justify-between">
                  <div>
                    <span className="text-[0.68rem] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      Total Guaranteed Allocation
                    </span>
                    <h4 className="text-2xl font-black text-white">₱5,000.00</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Zero deductions, zero transaction gas fees. Escrow fees are fully sponsored by DRRM.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/claim")}
                    className="btn-civic-gold w-full mt-4 py-2.5 text-xs font-black flex items-center justify-center gap-1.5"
                  >
                    <span>Claim Your Family's Share</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: EVACUATION CENTER DIRECTORY */}
          {activeTab === "centers" && (
            <motion.div
              key="centers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    Regional Evacuation Staging Centers
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Official relief sectors with active zero-knowledge disbursement marshals.
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Region II Cagayan Valley
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evacuationCenters.map((center) => {
                  const percentage = Math.round((center.disbursed / center.capacity) * 100);
                  return (
                    <div
                      key={center.sectorId}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{center.name}</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            {center.municipality}
                          </span>
                        </div>
                        <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full border shrink-0 ${center.statusColor}`}>
                          {center.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>Disbursement Progress:</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {center.disbursed} / {center.capacity} Families ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[0.68rem] text-slate-500 dark:text-slate-400 pt-0.5">
                          <span>Sector Code: <span className="font-mono font-bold text-sky-400">{center.sectorId}</span></span>
                          <span className="truncate max-w-[180px]">{center.activeDisasters}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
