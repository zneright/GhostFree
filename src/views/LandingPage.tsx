// =======================================================
// GhostFree — Premier Dribbble-Inspired SaaS Landing Page (v3.0)
// High-End Modern Civic-Tech & Fintech Aesthetic (Outcrowd Reference)
// Interactive ZK Terminal Mockup · 5-Box Bento Grid · Framer Motion
// =======================================================

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Landmark,
  ArrowRight,
  Search,
  Check,
  MapPin,
  Building2,
  Wheat,
  UtensilsCrossed,
  Droplets,
  HeartPulse,
  Hammer,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  Volume2,
  VolumeX,
  Coins,
  Users,
} from "lucide-react";
import Layout from "../components/Layout";
import OnboardingModal from "../components/OnboardingModal";
import ReceiptVerifierModal from "../components/ReceiptVerifierModal";
import { HeroProductMockup } from "../components/landing/HeroProductMockup";
import { BentoFeatureGrid } from "../components/landing/BentoFeatureGrid";
import { HowItWorksTimeline } from "../components/landing/HowItWorksTimeline";
import { ComparisonMatrix } from "../components/landing/ComparisonMatrix";
import { CivilianFaqAccordion } from "../components/landing/CivilianFaqAccordion";
import { BottomCtaBanner } from "../components/landing/BottomCtaBanner";
import { useTranslation } from "../services/i18n.service";
import { useVoiceAssistant } from "../services/voice.service";

// ---- Animated Counter Hook ----
function useCountUp(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, trigger]);

  return count;
}

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const { isSpeaking, speak, stop } = useVoiceAssistant();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showVerifier, setShowVerifier] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Active Evacuation Center Selection
  const [selectedCenter, setSelectedCenter] = useState<number>(0);

  // Interactive 30-Second Eligibility Checker State
  const [barangayInput, setBarangayInput] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<{
    checked: boolean;
    eligible: boolean;
    location: string;
    amount: number;
    tranche: string;
  } | null>(null);

  // Intersection Observer for animated counter
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Metric counters
  const fundsCounter = useCountUp(15000000, 2000, countersVisible);
  const beneficiariesCounter = useCountUp(3000, 1800, countersVisible);
  const fraudCounter = useCountUp(18, 1600, countersVisible);
  const provingTimeCounter = useCountUp(12, 1200, countersVisible);

  // Handle Quick Eligibility Check
  const handleCheckEligibility = (locationName?: string) => {
    const query = (locationName || barangayInput).trim();
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

    setEligibilityResult({
      checked: true,
      eligible: true,
      location: query.includes("Brgy") || query.includes("Barangay") ? query : `Barangay ${query}, Calamity Zone`,
      amount: 5000,
      tranche: "Typhoon Marce Quick Response Fund (Declared)",
    });
  };

  // ₱5,000 Calamity Relief Basket Breakdown
  const reliefBasketItems = useMemo(() => [
    {
      id: "rice",
      name: t("basketRiceName", "25kg NFA Well-Milled Rice"),
      tagalog: t("basketRiceTag", "Bigas para sa 3 linggo"),
      amount: 1250,
      icon: <Wheat className="w-5 h-5 text-amber-400" />,
      desc: t("basketRiceDesc", "Sapat na pangunahing pagkain para sa isang pamilyang may 5 miyembro sa buong emergency period."),
      color: "border-amber-500/40 bg-amber-500/10",
    },
    {
      id: "foodpack",
      name: t("basketFoodName", "DSWD Family Food Packs"),
      tagalog: t("basketFoodTag", "Canned Goods, Noodles, Kape"),
      amount: 1500,
      icon: <UtensilsCrossed className="w-5 h-5 text-emerald-400" />,
      desc: t("basketFoodDesc", "12 latang sardinas at corned beef, 10 packs instant noodles, cereal drink, at kape para sa almusal at hapunan."),
      color: "border-emerald-500/40 bg-emerald-500/10",
    },
    {
      id: "water",
      name: t("basketWaterName", "Clean Water & Hygiene Kit"),
      tagalog: t("basketWaterTag", "Malinis na Tubig & Sanitation"),
      amount: 1000,
      icon: <Droplets className="w-5 h-5 text-sky-400" />,
      desc: t("basketWaterDesc", "2x 5-gallon purified drinking water containers, sabon, shampoo, toothpaste, sanitary napkins, at bleach."),
      color: "border-sky-500/40 bg-sky-500/10",
    },
    {
      id: "medicine",
      name: t("basketMedName", "Emergency First Aid & Medicine"),
      tagalog: t("basketMedTag", "Paracetamol, Gamot, Antiseptic"),
      amount: 750,
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      desc: t("basketMedDesc", "Paracetamol para sa lagnat, oral rehydration salts para sa dehydration, band-aids, betadine, at alcohol."),
      color: "border-rose-500/40 bg-rose-500/10",
    },
    {
      id: "shelter",
      name: t("basketShelterName", "Emergency Shelter Repair Kit"),
      tagalog: t("basketShelterTag", "Trapal, Lubid, Pako"),
      amount: 500,
      icon: <Hammer className="w-5 h-5 text-indigo-400" />,
      desc: t("basketShelterDesc", "Mabigat na trapal (tarpaulin), nylon rope, at pako upang pansamantalang protektahan ang nawasak na bubong."),
      color: "border-indigo-500/40 bg-indigo-500/10",
    },
  ], [lang]);

  // Regional Evacuation Center Directory
  const evacuationCenters = [
    {
      name: "Tuguegarao City People's Coliseum",
      municipality: "Tuguegarao City, Cagayan",
      activeDisasters: "Tropical Cyclone Marce — Signal No. 3",
      capacity: 450,
      disbursed: 423,
      contractId: "02005a76e93a86c0b938f97b",
      status: t("evacActivelyDisbursing", "Actively Disbursing"),
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      name: "Gonzaga Municipal Gymnasium",
      municipality: "Gonzaga, Cagayan",
      activeDisasters: "Coastal Storm Surge Evacuation",
      capacity: 280,
      disbursed: 247,
      contractId: "02008f12cc3e819b02a77b10",
      status: t("evacActivelyDisbursing", "Actively Disbursing"),
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      name: "Santa Ana Fisherfolk Multi-Purpose Center",
      municipality: "Santa Ana, Cagayan",
      activeDisasters: "Flash Flood Quick Response",
      capacity: 190,
      disbursed: 190,
      contractId: "0200b39f71ac2e690f9119aa",
      status: t("evacFullyDisbursed", "100% Fully Disbursed"),
      statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    },
    {
      name: "Aparri Coastal Evacuation Staging Post",
      municipality: "Aparri, Cagayan",
      activeDisasters: "Cagayan River Basin Overflow Alert",
      capacity: 310,
      disbursed: 282,
      contractId: "02009d43ab881c300f88bb2c",
      status: t("evacActivelyDisbursing", "Actively Disbursing"),
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
  ];

  // Dynamic 4-Step Explanations
  const steps = useMemo(() => {
    if (lang === "ceb") {
      return [
        {
          id: 1,
          title: "1. Isulod ang ID & PIN",
          tag: "100% On-Device",
          desc: "Isulod ang imong PhilSys National ID number ug 4-digit secret PIN gikan sa relief slip.",
          staysPrivate: "Dili mogawas ang datos sa imong telepono.",
        },
        {
          id: 2,
          title: "2. Zero-Knowledge Proof",
          tag: "Pribadong Matematika",
          desc: "Mokalkula ang selpon og cryptographic proof aron pamatud-an nga anaa ka sa listahan.",
          staysPrivate: "Walay makakita sa imong tinuod nga ngalan.",
        },
        {
          id: 3,
          title: "3. Anti-Ghost Check",
          tag: "Walay Doble nga Claim",
          desc: "Susiha sa smart contract ang talagsaong nullifier lock code aron masiguro nga walay ghost.",
          staysPrivate: "Gipugngan ang doble nga pagkuha gamit ang crypto math.",
        },
        {
          id: 4,
          title: "4. Dawata ang ₱5,000",
          tag: "Direktang Payout",
          desc: "Madawat dayon ang pondo sa pitaka inubanan sa opisyal nga digital relief voucher.",
          staysPrivate: "Walay gas fees. Sagot sa DRRM ang tanan.",
        },
      ];
    }
    if (lang === "fil") {
      return [
        {
          id: 1,
          title: "1. Ilagay ang ID & PIN",
          tag: "100% On-Device",
          desc: "I-type ang iyong PhilSys National ID number at 4-digit secret PIN mula sa barangay relief voucher.",
          staysPrivate: "Hinding-hindi aalis ang datos sa iyong telepono.",
        },
        {
          id: 2,
          title: "2. Zero-Knowledge Proof",
          tag: "Pribadong Math",
          desc: "Bumubuo ang iyong telepono ng ZK proof na nagpapatunay na ikaw ay lehitimong benepisyaryo.",
          staysPrivate: "Protektado ang iyong pagkakakilanlan sa lahat.",
        },
        {
          id: 3,
          title: "3. Anti-Ghost Check",
          tag: "Walang Dobleng Claim",
          desc: "Sinisiguro ng smart contract sa Midnight Network na hindi pa nagagamit ang iyong natatanging nullifier lock code.",
          staysPrivate: "Pinipigilan ang ghost claimants nang walang data leakage.",
        },
        {
          id: 4,
          title: "4. Tanggapin ang ₱5,000",
          tag: "Agad na Payout",
          desc: "Direktang naililipat ang pondo sa iyong wallet kasama ang opisyal na digital relief voucher para sa evacuation checkpoint.",
          staysPrivate: "Walang kaltas. Sagot ng gobyerno ang lahat ng gas fees.",
        },
      ];
    }
    return [
      {
        id: 1,
        title: "1. Enter ID & PIN",
        tag: "100% On-Device",
        desc: "Enter your PhilSys National ID number and 4-digit confidential emergency PIN from your local disaster relief voucher.",
        staysPrivate: "Credentials never leave your phone's local memory.",
      },
      {
        id: 2,
        title: "2. Zero-Knowledge Proof",
        tag: "Private Math",
        desc: "Your device synthesizes a cryptographic proof that you are on the approved roster without disclosing who you are.",
        staysPrivate: "Your identity remains completely shielded from everyone.",
      },
      {
        id: 3,
        title: "3. Anti-Ghost Check",
        tag: "No Double Claims",
        desc: "The Midnight smart contract verifies your unique deterministic nullifier has never been spent across any evacuation site.",
        staysPrivate: "Double claiming is permanently impossible.",
      },
      {
        id: 4,
        title: "4. Receive ₱5,000 Aid",
        tag: "Instant Payout",
        desc: "Emergency funds are deposited directly to your address with zero gas fees and an official verifiable digital relief receipt.",
        staysPrivate: "Zero fees. 100% sponsored by municipal DRRM escrow.",
      },
    ];
  }, [lang]);

  // Comparison Matrix Data
  const comparisons = useMemo(() => {
    return [
      {
        feature: t("compareFeature1", "Bilis ng Pagtanggap ng Ayuda"),
        oldWay: t("compareOld1", "Oras o araw na pagpila sa ilalim ng ulan o matinding init"),
        ghostFree: t("compareNew1", "30 segundo sa iyong mobile phone na may agarang settlement"),
      },
      {
        feature: t("compareFeature2", "Proteksyon sa Personal na ID"),
        oldWay: t("compareOld2", "Buong pangalan at National ID nakapaskil sa pampublikong billboard"),
        ghostFree: t("compareNew2", "100% protektado gamit ang Zero-Knowledge cryptography"),
      },
      {
        feature: t("compareFeature3", "Pandaraya at Ghost Beneficiaries"),
        oldWay: t("compareOld3", "Mga tiwaling middleman at pekeng pangalan na nagnanakaw ng pondo"),
        ghostFree: t("compareNew3", "Imposible. Awtomatikong hinaharang ng anti-ghost nullifier"),
      },
      {
        feature: t("compareFeature4", "Pampublikong Audit (COA Compliance)"),
        oldWay: t("compareOld4", "Mga resibong papel at spreadsheet na buwan bago ma-audit"),
        ghostFree: t("compareNew4", "Real-time COA dashboard na sumusubaybay sa bawat piso"),
      },
      {
        feature: t("compareFeature5", "Gastos ng Biktima ng Kalamidad"),
        oldWay: t("compareOld5", "Nagbabayad ng pamasahe, photocopy, at transaction charges"),
        ghostFree: t("compareNew5", "₱0 gastos. Sagot ng DRRM ang lahat ng gas execution fees"),
      },
    ];
  }, [lang]);

  // Civilian FAQs
  const faqs = useMemo(() => {
    return [
      {
        q: t("faqQ1", "Kailangan ko ba ng cryptocurrency o kaalaman sa blockchain para makakuha ng ayuda?"),
        a: t("faqA1", "Hindi! Ginawa ang GhostFree para sa ordinaryong mamamayan. Ilagay lamang ang iyong PhilSys ID at 4-digit PIN mula sa evacuation center slip, at matatanggap mo na ang iyong pondo nang walang bayad."),
      },
      {
        q: t("faqQ2", "Paano nasisiguro ng GhostFree na walang makakakita sa aking National ID?"),
        a: t("faqA2", "Gumagamit ang GhostFree ng Zero-Knowledge cryptography sa Midnight Network. Ang iyong telepono mismo ang nagpapatunay na ikaw ay nasa listahan nang hindi ipinapadala ang iyong ID o pangalan sa internet."),
      },
      {
        q: t("faqQ3", "Paano kung mahina ang signal o walang internet sa evacuation center?"),
        a: t("faqA3", "May Disaster Resilience Mode ang GhostFree na nagse-save ng draft state sa iyong telepono at awtomatikong nagpapadala kapag nagkaroon muli ng koneksyon. Mayroon ding printable voucher para sa physical checkpoint gates."),
      },
      {
        q: t("faqQ4", "Ano ang ginagawa ng anti-ghost nullifier?"),
        a: t("faqA4", "Bawat pamilya ay may natatanging cryptographic code na tinatawag na 'nullifier'. Kapag nakuha mo na ang iyong ayuda, minamarkahan ito sa blockchain. Hindi maaaring kunin muli ng sinuman ang iyong ayuda."),
      },
      {
        q: t("faqQ5", "Maaari ba itong gamitin ng mga lolo, lola, o may kapansanan (PWD)?"),
        a: t("faqA5", "Oo! Mayroong built-in na Voice Assistant na nagbabasa ng panuto sa Tagalog, 3-level Text Scaling (hanggang 150%), at Sunlight Outdoor Mode para sa maliwanag na sikat ng araw."),
      },
    ];
  }, [lang]);

  return (
    <Layout>
      <div className="relative overflow-hidden text-slate-100 selection:bg-amber-500/30 selection:text-white pb-16">
        {/* ========================================================
            SECTION 1: HERO SECTION WITH DISPLAY TYPOGRAPHY
           ======================================================== */}
        <section className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 max-w-6xl mx-auto text-center">
          {/* Radiant Announcement Chip */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-slate-900/90 border border-amber-200 dark:border-amber-400/30 shadow-md dark:shadow-xl mb-6 sm:mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300">
              {t("heroBadge", "🚨 Quick Response Fund: ₱5,000 Payout Bawat Pamilya")}
            </span>
          </motion.div>

          {/* Main Headline: Bold, commanding display typography */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.06] tracking-tight max-w-5xl mx-auto mb-6"
          >
            {t("heroHeadline1", "Safe Calamity Aid.")}{" "}
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent">
              {t("heroHeadlineHighlight", "Zero Ghost Beneficiaries.")}
            </span>{" "}
            {t("heroHeadline2", "Zero Hassle.")}
          </motion.h1>

          {/* Reassuring Civic Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal"
          >
            {t(
              "heroSubtitleText",
              "Privacy-first emergency cash aid distribution sa Midnight Network. Direktang tulong sa nasalanta nang hindi inilalantad ang personal na National ID o nakakaltasan ng bayad."
            )}
          </motion.p>

          {/* Dual Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8"
          >
            <button
              type="button"
              onClick={() => navigate("/claim")}
              className="btn-civic-gold w-full sm:w-auto px-8 py-4 text-base font-black flex items-center justify-center gap-2.5 shadow-2xl tap-scale"
              id="hero-primary-claim-btn"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{t("claimAidButton", "Claim Aid (₱5,000)")}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/transparency")}
              className="btn-secondary w-full sm:w-auto px-7 py-4 text-base font-bold flex items-center justify-center gap-2.5 shadow-lg tap-scale"
              id="hero-treasury-btn"
            >
              <Landmark className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span>{t("treasuryExplorerButton", "Public Treasury (COA Explorer)")}</span>
            </button>
          </motion.div>

          {/* Micro Action Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium"
          >
            <button
              type="button"
              onClick={() => setShowVerifier(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t("verifyVoucherButton", "Verify Relief Voucher")}</span>
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => (isSpeaking ? stop() : speak("landingHero"))}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-600 dark:text-amber-400" /> : <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
              <span>{isSpeaking ? t("stopVoice", "Stop Voice") : t("listenGuide", "Listen to Audio Guide")}</span>
            </button>
          </motion.div>

          {/* Quick 30-Second Barangay Eligibility Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 mb-10 sm:mb-12 max-w-xl mx-auto"
          >
            <div className="p-2 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-xl backdrop-blur-xl flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t("searchBarangayPlaceholder", "Suriin ang iyong barangay (hal. San Roque, Gonzaga)...")}
                  value={barangayInput}
                  onChange={(e) => setBarangayInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCheckEligibility()}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-transparent border-0 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleCheckEligibility()}
                className="btn-civic-gold px-4 py-2.5 text-xs font-black shrink-0 tap-scale"
              >
                {t("checkButton", "Suriin")}
              </button>
            </div>

            {eligibilityResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-left flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Kwalipikado sa Ayuda: ₱{eligibilityResult.amount.toLocaleString()}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 block mt-0.5">{eligibilityResult.location}</span>
                  <span className="text-[0.68rem] text-slate-500 dark:text-slate-400 font-mono mt-0.5 block">{eligibilityResult.tranche}</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/claim")}
                  className="btn-civic-gold text-[0.7rem] px-3 py-1.5 shrink-0 font-bold"
                >
                  I-claim Na
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* ABSTRACT PRODUCT MOCKUP: Self-contained dual-theme Calamity Aid Terminal */}
          <HeroProductMockup />

          {/* Trust Metric Strip (4 Proof Tiles) */}
          <div ref={counterRef} className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-center glass-card"
            >
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <Coins className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Disbursed</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                ₱{(fundsCounter / 1000000).toFixed(0)}M+
              </span>
              <span className="text-[0.68rem] text-slate-400 block mt-0.5 font-medium">100% Settled</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-center glass-card"
            >
              <div className="flex items-center justify-center gap-1.5 text-sky-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Families Aided</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                {beneficiariesCounter.toLocaleString()}+
              </span>
              <span className="text-[0.68rem] text-slate-400 block mt-0.5 font-medium">Direct to Victims</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-center glass-card"
            >
              <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Ghost Claims</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-amber-300 tabular-nums">
                0 Duplicates
              </span>
              <span className="text-[0.68rem] text-slate-400 block mt-0.5 font-medium">18 Fraud Blocked</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-center glass-card"
            >
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">WASM Prover</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                {(provingTimeCounter / 10).toFixed(1)}s
              </span>
              <span className="text-[0.68rem] text-slate-400 block mt-0.5 font-medium">Local Browser Speed</span>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: MODULAR BENTO-BOX FEATURE GRID
           ======================================================== */}
        <BentoFeatureGrid t={t} />

        {/* ========================================================
            SECTION 3: ₱5,000 CALAMITY RELIEF BASKET BREAKDOWN
           ======================================================== */}
        <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Coins className="w-3.5 h-3.5" />
              <span>{t("basketBadge", "Piso-sa-Piso Transparensya")}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t("basketTitle", "Saan Napupunta ang ₱5,000 Ayuda?")}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {t("basketSubtitle", "Bawat sentimo ay nakalaan para sa totoong pangangailangan ng bawat pamilya sa panahon ng sakuna.")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-8">
            {reliefBasketItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl flex flex-col justify-between glass-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-white block mb-1">{item.name}</span>
                  <span className="text-[0.68rem] text-amber-400 font-bold block mb-2">{item.tagalog}</span>
                  <p className="text-[0.72rem] text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[0.65rem] text-slate-400 uppercase font-medium">Badyet</span>
                  <span className="text-sm font-black text-white">₱{item.amount.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl glass-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-bold block uppercase tracking-wider">
                  Kabuuan: ₱5,000.00 Ayuda Bawat Pamilya
                </span>
                <span className="text-xs text-slate-300">
                  Direktang napupunta sa biktima nang walang bawas o kaltas ng middleman.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/claim")}
              className="btn-civic-gold px-6 py-3 text-xs font-black shrink-0 tap-scale"
            >
              Simulan ang Pag-Claim
            </button>
          </div>
        </section>

        {/* ========================================================
            SECTION 4: 4-STEP HOW IT WORKS TIMELINE
           ======================================================== */}
        <HowItWorksTimeline steps={steps} t={t} />

        {/* ========================================================
            SECTION 5: REGIONAL EVACUATION CENTER DIRECTORY
           ======================================================== */}
        <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t("evacDirectoryTag", "Opisyal na Sentro ng Evacuation")}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t("evacDirectoryTitle", "Mga Aktibong Evacuation Center")}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {t("evacDirectorySubtitle", "Real-time monitoring ng pondo at bilang ng natulungang pamilya sa bawat sentro.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {evacuationCenters.map((ec, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedCenter(i)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer glass-card ${
                  selectedCenter === i
                    ? "bg-slate-900/95 border-amber-400/50 shadow-2xl ring-1 ring-amber-400/40"
                    : "bg-slate-900/70 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white">{ec.name}</h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {ec.municipality}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-bold border ${ec.statusColor}`}>
                    {ec.status}
                  </span>
                </div>

                <span className="text-xs font-semibold text-amber-400/90 block mb-4">
                  {ec.activeDisasters}
                </span>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Pamilyang Nabigyan ng Ayuda</span>
                    <span className="text-white font-bold">{ec.disbursed} / {ec.capacity}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full"
                      style={{ width: `${(ec.disbursed / ec.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[0.68rem] text-slate-400 font-mono">
                  <span>Contract: {ec.contractId.slice(0, 14)}...</span>
                  <span className="text-emerald-400 font-bold">100% ZK Private</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 6: OLD WAY VS GHOSTFREE COMPARISON MATRIX
           ======================================================== */}
        <ComparisonMatrix comparisons={comparisons} t={t} />

        {/* ========================================================
            SECTION 7: CIVILIAN FAQ ACCORDION
           ======================================================== */}
        <CivilianFaqAccordion faqs={faqs} t={t} />

        {/* ========================================================
            SECTION 8: HIGH-CONVERSION BOTTOM CTA BANNER
           ======================================================== */}
        <BottomCtaBanner t={t} />
      </div>

      {/* Onboarding and Verifier Modals */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <ReceiptVerifierModal isOpen={showVerifier} onClose={() => setShowVerifier(false)} />
    </Layout>
  );
};

export default LandingPage;
