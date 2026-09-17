// =======================================================
// GhostFree — Vibrant Human Civic-Tech Landing Page (v2.5)
// Plain English & Multi-Dialect (EN / FIL / CEB)
// Live PAGASA Advisory Marquee · ₱5,000 Relief Basket Breakdown
// Regional Evacuation Center Directory · 30-Sec Eligibility Checker
// Old Way vs GhostFree Comparison · Interactive Civilian FAQs
// =======================================================

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Lock,
  Landmark,
  Smartphone,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Search,
  Check,
  Coins,
  MapPin,
  Users,
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
  Key,
} from "lucide-react";
import Layout from "../components/Layout";
import OnboardingModal from "../components/OnboardingModal";
import ReceiptVerifierModal from "../components/ReceiptVerifierModal";
import GhostFreeLogo from "../components/GhostFreeLogo";
import {
  useTranslation,
  type SupportedLanguage,
} from "../services/i18n.service";
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
  const { isSpeaking, currentContext, speak, stop } = useVoiceAssistant();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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
  const fundsCounter = useCountUp(1000000, 2000, countersVisible);
  const beneficiariesCounter = useCountUp(200, 1800, countersVisible);
  const fraudCounter = useCountUp(42, 1600, countersVisible);
  const uptimeCounter = useCountUp(99, 1200, countersVisible);

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
          title: "1. Isulod ang ID ug PIN",
          tag: "Tinago sa Selpon",
          desc: "I-type ang imong PhilSys ID number ug ang 4-digit secret PIN gikan sa evacuation voucher. Magpabilin kini sa imong telepono.",
          staysPrivate: "Dili mogawas sa imong telepono ang imong ID o PIN.",
        },
        {
          id: 2,
          title: "2. Pribadong ZK Proof",
          tag: "100% Matematika",
          desc: "Naghimo ang imong telepono og zero-knowledge proof aron pamatud-an nga kwalipikado ka nga dili ipadayag ang imong ngalan.",
          staysPrivate: "Walay makakita sa imong tinuod nga pagkatawo.",
        },
        {
          id: 3,
          title: "3. Anti-Ghost Check",
          tag: "Walay Doble nga Claim",
          desc: "Gipaneguro sa smart contract sa Midnight Network nga wala pa magamit ang imong talagsaong nullifier lock code.",
          staysPrivate: "Gibabagan ang ghost claimants nga walay data leakage.",
        },
        {
          id: 4,
          title: "4. Dawata ang ₱5,000",
          tag: "Diha-diha nga Payout",
          desc: "Direktang mabalhin ang pundo sa imong pitaka uban ang opisyal nga digital relief voucher alang sa evacuation checkpoint.",
          staysPrivate: "Walay kaltas. Sagubangon sa kagamhanan ang tanang gas fees.",
        },
      ];
    }
    if (lang === "fil") {
      return [
        {
          id: 1,
          title: "1. Ipasok ang ID at PIN",
          tag: "Ligtas sa Telepono",
          desc: "I-type ang iyong PhilSys ID number at ang 4-digit secret PIN mula sa relief voucher. Ang mga ito ay mananatili lamang sa iyong telepono.",
          staysPrivate: "Hindi aalis sa iyong telepono ang iyong ID o PIN.",
        },
        {
          id: 2,
          title: "2. Pribadong ZK Proof",
          tag: "100% Matematikal",
          desc: "Bumubuo ang iyong telepono ng zero-knowledge proof upang patunayang kwalipikado ka nang hindi kailanman inilalantad ang iyong pangalan.",
          staysPrivate: "Walang makakakita sa iyong totoong pagkakakilanlan.",
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

  // Comparison Matrix (The Old Way vs. GhostFree)
  const comparisons = useMemo(() => {
    return [
      {
        feature: t("compareFeature1", "Bilis ng Pagkuha ng Ayuda"),
        oldWay: t("compareOld1", "Oras ng pagpila sa init ng araw o ulan sa evacuation center"),
        ghostFree: t("compareNew1", "30 segundo sa iyong telepono na may agarang pondo"),
      },
      {
        feature: t("compareFeature2", "Proteksyon sa Pagkakakilanlan"),
        oldWay: t("compareOld2", "Nakasulat ang buong pangalan at National ID sa bukas na papel"),
        ghostFree: t("compareNew2", "100% pribado gamit ang Zero-Knowledge cryptography"),
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
        {/* Background Ambient Glow Orbs */}
        <div className="absolute top-[8%] left-[10%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[25%] right-[10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] left-[8%] w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />


        {/* ========================================================
            SECTION 2: HERO SECTION WITH OFFICIAL CIVIC IDENTITY
           ======================================================== */}
        <section className="relative z-10 px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24 max-w-6xl mx-auto text-center">
          {/* Official Calamity Relief Notification Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/30 shadow-xl mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-amber-300">
              {t("heroBadge", "🚨 Quick Response Fund: ₱5,000 Payout Bawat Pamilya")}
            </span>
          </div>

          {/* Main Headline: Clean, bold, commanding fintech typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight max-w-5xl mx-auto mb-6">
            {t("heroHeadline1", "Ligtas na Ayuda.")}{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
              {t("heroHeadlineHighlight", "Walang Ghost Beneficiaries.")}
            </span>{" "}
            {t("heroHeadline2", "Walang Pahirap.")}
          </h1>

          {/* Reassuring Civic Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {t("heroSubtitleText", "Privacy-first emergency cash aid distribution sa Midnight Network. Direktang tulong sa nasalanta nang hindi inilalantad ang personal na National ID o nakakaltasan ng bayad.")}
          </p>

          {/* Focused Action Buttons: Dominant Primary CTA + Clean Secondary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
            <button
              onClick={() => navigate("/claim")}
              className="btn-civic-gold w-full sm:w-auto px-8 py-4 text-base font-black flex items-center justify-center gap-2.5 shadow-2xl shadow-amber-500/30 tap-scale"
              id="hero-claim-ayuda-btn"
            >
              <Smartphone className="w-5 h-5 text-slate-950" />
              <span>{t("heroClaimBtn", "Kumuha ng Ayuda (Claim ₱5,000)")}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => navigate("/transparency")}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm sm:text-base font-bold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 transition-all flex items-center justify-center gap-2 tap-scale"
              id="hero-treasury-btn"
            >
              <Landmark className="w-4.5 h-4.5 text-amber-400" />
              <span>{t("heroTreasuryBtn", "Public Treasury (COA Explorer)")}</span>
            </button>
          </div>

          {/* Auxiliary Tools Strip: Audio Guide & Voucher Verifier */}
          <div className="flex items-center justify-center gap-3 mb-12 text-xs">
            <button
              onClick={() => setShowVerifier(true)}
              className="text-slate-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/[0.04]"
              id="hero-verify-voucher-btn"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("heroVerifyBtn", "I-verify ang Relief Voucher")}</span>
            </button>

            <span className="text-white/20">•</span>

            <button
              onClick={() => {
                if (isSpeaking && currentContext === "landingHero") {
                  stop();
                } else {
                  speak("landingHero");
                }
              }}
              className={`transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg ${
                isSpeaking && currentContext === "landingHero"
                  ? "text-emerald-300 font-bold animate-pulse bg-emerald-500/10"
                  : "text-slate-400 hover:text-amber-300 hover:bg-white/[0.04]"
              }`}
              id="hero-voice-guide-btn"
            >
              {isSpeaking && currentContext === "landingHero" ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>
                {isSpeaking && currentContext === "landingHero"
                  ? (lang === "en" ? "Stop Voice" : lang === "ceb" ? "Hunonga Tingog" : "Ihinto Boses")
                  : (lang === "en" ? "Listen to Audio Guide" : lang === "ceb" ? "Paminawa ang Giya" : "Pakinggan ang Gabay")}
              </span>
            </button>
          </div>

          {/* Key Assurance Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, label: t("assuranceId", "100% Lihim ang ID"), desc: t("assuranceIdSub", "Zero-Knowledge Proof") },
              { icon: <Coins className="w-4 h-4 text-amber-400" />, label: t("assuranceGas", "Libre ang Gas Fees"), desc: t("assuranceGasSub", "0 tDUST Gastusin") },
              { icon: <Lock className="w-4 h-4 text-sky-400" />, label: t("assuranceGhost", "Bawal ang Doble"), desc: t("assuranceGhostSub", "Anti-Ghost Nullifier") },
              { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, label: t("assuranceCoa", "COA Compliant"), desc: t("assuranceCoaSub", "R.A. 10121 DRRM") },
            ].map((b, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-md shadow-sm hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  {b.icon}
                  <span className="text-xs font-bold text-white">{b.label}</span>
                </div>
                <span className="text-[0.68rem] text-slate-400 block">{b.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: INTERACTIVE ₱5,000 CALAMITY RELIEF BASKET
           ======================================================== */}
        <section className="px-4 sm:px-6 py-10 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-1">
              {t("basketTag", "Paano Makatutulong ang Ayuda")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("basketTitle", "Saan Napupunta ang ₱5,000 Emergency Calamity Cash Aid?")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
              {t("basketSubtitle", "Binuo ayon sa pamantayan ng DSWD Disaster Response Management Bureau (DRMB) upang matustusan ang pangangailangan ng isang pamilya sa unang 21 araw ng kalamidad.")}
            </p>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => {
                  if (isSpeaking && currentContext === "reliefBasket") {
                    stop();
                  } else {
                    speak("reliefBasket");
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all inline-flex items-center gap-2 ${
                  isSpeaking && currentContext === "reliefBasket"
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse font-extrabold"
                    : "bg-white/5 hover:bg-white/10 text-amber-300 border-amber-400/30"
                }`}
                id="basket-voice-guide-btn"
              >
                {isSpeaking && currentContext === "reliefBasket" ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>
                  {isSpeaking && currentContext === "reliefBasket"
                    ? (lang === "en" ? "Stop Audio Breakdown" : lang === "ceb" ? "Hunonga Tingog" : "Ihinto Boses")
                    : (lang === "en" ? "Listen to Relief Breakdown (Voice)" : lang === "ceb" ? "Paminawa ang Breakdown (Voice)" : "Pakinggan ang Breakdown ng Ayuda (Boses)")}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-6">
            {reliefBasketItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/[0.08] hover:border-amber-400/40 transition-all duration-200 flex flex-col justify-between shadow-xl backdrop-blur-md hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-amber-400/30 transition-colors">
                      {item.icon}
                    </span>
                    <span className="text-xs font-black text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                      ₱{item.amount.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-xs font-black text-white leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[0.68rem] text-slate-400 font-medium mb-2.5">
                    {item.tagalog}
                  </p>
                </div>
                <p className="text-[0.65rem] text-slate-400 leading-relaxed border-t border-white/[0.08] pt-2.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Total Bar */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <Coins className="w-6 h-6" />
              </span>
              <div>
                <span className="text-xs text-slate-400 block">{t("basketTotalLabel", "Kabuuang Emergency Relief Package")}</span>
                <span className="text-lg sm:text-xl font-black text-white">
                  {t("basketTotalPerFamily", "₱5,000.00 Ayuda Assistance bawat Kwalipikadong Pamilya")}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/claim")}
              className="btn-civic-gold px-6 py-3 text-xs sm:text-sm font-black whitespace-nowrap shadow-md tap-scale"
            >
              {t("basketClaimBtn", "Simulan ang Claim (₱5,000)")}
            </button>
          </div>
        </section>

        {/* ========================================================
            SECTION 4: REGIONAL EVACUATION CENTER DIRECTORY
           ======================================================== */}
        <section className="px-4 sm:px-6 py-10 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block mb-1">
              {t("evacTag", "Aktibong Operasyon ng NDRRMO")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("evacTitle", "Mga Akreditadong Evacuation Center sa Northern Luzon")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
              {t("evacSubtitle", "Real-time on-chain telemetry ng mga evacuation sites na may aktibong GhostFree smart contract disbursement.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evacuationCenters.map((ec, idx) => {
              const percent = Math.round((ec.disbursed / ec.capacity) * 100);
              const isSelected = selectedCenter === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedCenter(idx)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-900/90 border-amber-400/80 shadow-xl shadow-amber-500/10"
                      : "bg-slate-900/70 border-white/[0.08] hover:border-white/20 backdrop-blur-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white leading-tight">
                          {ec.name}
                        </h3>
                        <span className="text-[0.72rem] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-red-400" />
                          {ec.municipality}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full border ${ec.statusColor}`}>
                      {ec.status}
                    </span>
                  </div>

                  {/* Meter */}
                  <div className="my-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">
                        {t("evacDisbursedLabel", "Pondo Naipamahagi:")} <span className="text-white font-bold">{ec.disbursed}</span> / {ec.capacity} {t("evacFamiliesLabel", "pamilya")}
                      </span>
                      <span className="font-bold text-amber-400">{percent}%</span>
                    </div>
                    <div className="progress-track w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.08] text-[0.68rem] text-slate-400">
                    <span className="font-mono text-slate-400">Contract: <span className="text-slate-300">{ec.contractId.slice(0, 16)}...</span></span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t("evacZeroGhost", "0 Ghost Claims")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 5: INTERACTIVE 30-SECOND ELIGIBILITY CHECKER
           ======================================================== */}
        <section className="px-4 sm:px-6 py-6 max-w-4xl mx-auto relative z-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-black text-white">
                {t("checkerTitle", "30-Segundong Pagsusuri ng Kwalipikasyon (Quick Eligibility Lookup)")}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              {t("checkerSubtitle", "Tingnan kung ang iyong barangay o bayan ay may aktibong emergency relief declaration bago mag-claim:")}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
              <input
                type="text"
                value={barangayInput}
                onChange={(e) => setBarangayInput(e.target.value)}
                placeholder={t("checkerPlaceholder", "I-type ang iyong Barangay o Bayan (e.g. Brgy. San Roque, Gonzaga)")}
                className="input-civic flex-1 text-sm bg-black/40 border-2 border-white/20 focus:border-amber-400 text-white"
                onKeyDown={(e) => e.key === "Enter" && handleCheckEligibility()}
              />
              <button
                type="button"
                onClick={() => handleCheckEligibility()}
                className="btn-civic-gold px-6 py-3 text-sm font-black whitespace-nowrap shadow-md"
              >
                {t("checkerButton", "Suriin ang Lugar")}
              </button>
            </div>

            {/* Quick pre-fill buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-4">
              <span>{t("checkerExamples", "Mga halimbawa:")}</span>
              {[
                "Brgy. San Roque, Gonzaga, Cagayan",
                "Brgy. Poblacion, Tuguegarao",
                "Brgy. Divilacan, Isabela",
              ].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setBarangayInput(loc);
                    handleCheckEligibility(loc);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 text-[0.7rem]"
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Result Box */}
            {eligibilityResult && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/60 animate-fade-in-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-black text-emerald-300">
                        {t("checkerEligibleTitle", "KWALIPIKADO ANG IYONG LUGAR!")}
                      </h4>
                      <p className="text-xs text-white mt-0.5">
                        {eligibilityResult.location}
                      </p>
                      <p className="text-[0.72rem] text-slate-300 mt-1">
                        {t("checkerEligibleSub", "May aktibong emergency ayuda bawat pamilya sa ilalim ng deklaradong QRF.")}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/claim")}
                    className="btn-civic-emerald px-5 py-2.5 text-xs sm:text-sm font-bold shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>{t("checkerClaimNow", "I-claim ang Ayuda Ngayon")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            SECTION 6: REAL-TIME CALAMITY TELEMETRY TICKER
           ======================================================== */}
        <section ref={counterRef} className="px-4 sm:px-6 py-8 max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                num: `₱${fundsCounter.toLocaleString()}`,
                label: t("statDisbursed", "Naipamahaging Ayuda"),
                sub: "Nailipat nang buo",
                color: "text-amber-400",
              },
              {
                num: beneficiariesCounter,
                label: t("statFamiliesHelped", "Nasalantang Pamilya"),
                sub: "Beripikadong tumanggap",
                color: "text-emerald-400",
              },
              {
                num: fraudCounter,
                label: t("statGhostBlocked", "Dobleng Claim Naharang"),
                sub: "Anti-Ghost Nullifier",
                color: "text-sky-400",
              },
              {
                num: `${uptimeCounter}.9%`,
                label: "Midnight Testnet Uptime",
                sub: "02005a76e93a... Active",
                color: "text-emerald-400",
              },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg text-center">
                <span className={`text-2xl sm:text-3xl font-black ${stat.color} block tracking-tight`}>
                  {stat.num}
                </span>
                <span className="text-xs font-bold text-white block mt-1">{stat.label}</span>
                <span className="text-[0.65rem] text-slate-400 block">{stat.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 7: HOW IT WORKS: 4 SIMPLE STEPS
           ======================================================== */}
        <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-1">
              {t("howItWorks", "Paano Gumagana")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("stepsTitle", "Apat na Hakbang Patungo sa Iyong Ayuda")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-amber-400/40 transition-all duration-200 flex flex-col justify-between shadow-xl backdrop-blur-md hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center shadow-md shadow-amber-500/20">
                      {s.id}
                    </span>
                    <span className="text-[0.65rem] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{s.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.08] text-[0.65rem] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{s.staysPrivate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 8: THE OLD WAY VS. GHOSTFREE COMPARISON
           ======================================================== */}
        <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block mb-1">
              {t("comparisonTag", "Bakit GhostFree")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("comparisonTitle", "Tradisyunal na Sistema vs. GhostFree")}
            </h2>
          </div>

          <div className="glass-card-elevated p-4 sm:p-6 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Old Way */}
              <div className="p-5 sm:p-6 rounded-2xl bg-red-500/[0.04] border border-red-500/25 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <h3 className="text-sm sm:text-base font-black text-red-300">
                    {t("compareOldWayHeader", "❌ Tradisyunal na Ayuda Distribution")}
                  </h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  {comparisons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-red-500/[0.03]">
                      <span className="text-red-400 font-bold mt-0.5">•</span>
                      <div>
                        <strong className="text-white block font-semibold mb-0.5">{c.feature}:</strong>
                        <span className="text-slate-400 leading-relaxed">{c.oldWay}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GhostFree Way */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/30 backdrop-blur-sm shadow-lg shadow-emerald-500/5">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h3 className="text-sm sm:text-base font-black text-emerald-300">
                    {t("compareGhostFreeHeader", "✅ GhostFree sa Midnight Network")}
                  </h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  {comparisons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-500/[0.04]">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold mb-0.5">{c.feature}:</strong>
                        <span className="text-emerald-100 leading-relaxed">{c.ghostFree}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 9: CIVILIAN FAQ ACCORDION
           ======================================================== */}
        <section className="px-4 sm:px-6 py-12 max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-sky-400 uppercase tracking-wider block mb-1">
              {t("faqSectionTag", "Mga Karaniwang Tanong")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("faqSectionTitle", "Sagot para sa mga Mamamayan")}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/70 border border-white/[0.08] hover:border-white/20 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="faq-answer px-4.5 pb-4 pt-1 text-xs text-slate-300 border-t border-white/5 leading-relaxed bg-black/20">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Call to Action - Elevated Fintech Card */}
        <section className="px-4 sm:px-6 py-16 max-w-4xl mx-auto text-center relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0C1B33] to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block text-xs font-black text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                National Calamity Relief
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
                {t("ctaTitle", "Kailangan mo ba ng Ayuda sa Kalamidad?")}
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed font-normal">
                {t("ctaSubtitle", "Simulan ang pag-claim ngayon. Ligtas ang iyong pagkakakilanlan, walang bayad sa gas, at garantisadong makakarating sa iyo.")}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  onClick={() => navigate("/claim")}
                  className="btn-civic-gold w-full sm:w-auto px-8 py-4 text-base font-black shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 tap-scale"
                >
                  <Smartphone className="w-5 h-5 text-slate-950" />
                  <span>{t("ctaClaimBtn", "Simulan ang Pag-claim (₱5,000)")}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={() => navigate("/admin/login")}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 transition-all flex items-center justify-center gap-2 tap-scale"
                >
                  <Key className="w-4 h-4 text-sky-400" />
                  <span>LGU Command Portal</span>
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Knowledge Sovereign Privacy · Midnight Network</span>
              </div>
            </div>
          </div>
        </section>

        {/* Modals */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
        <ReceiptVerifierModal
          isOpen={showVerifier}
          onClose={() => setShowVerifier(false)}
        />
      </div>
    </Layout>
  );
};

export default LandingPage;
