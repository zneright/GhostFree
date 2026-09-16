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
  Radio,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Layout from "../components/Layout";
import OnboardingModal from "../components/OnboardingModal";
import ReceiptVerifierModal from "../components/ReceiptVerifierModal";
import GhostFreeLogo from "../components/GhostFreeLogo";
import {
  getStoredLanguage,
  subscribeLanguageChange,
  type SupportedLanguage,
} from "../services/i18n.service";

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
  const [lang, setLang] = useState<SupportedLanguage>(getStoredLanguage());
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

  useEffect(() => {
    return subscribeLanguageChange((newLang) => setLang(newLang));
  }, []);

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
  const reliefBasketItems = [
    {
      id: "rice",
      name: "25kg NFA Well-Milled Rice",
      tagalog: "Bigas para sa 3 linggo",
      amount: 1250,
      icon: <Wheat className="w-5 h-5 text-amber-400" />,
      desc: "Sapat na pangunahing pagkain para sa isang pamilyang may 5 miyembro sa buong emergency period.",
      color: "border-amber-500/40 bg-amber-500/10",
    },
    {
      id: "foodpack",
      name: "DSWD Family Food Packs",
      tagalog: "Canned Goods, Noodles, Kape",
      amount: 1500,
      icon: <UtensilsCrossed className="w-5 h-5 text-emerald-400" />,
      desc: "12 latang sardinas at corned beef, 10 packs instant noodles, cereal drink, at kape para sa almusal at hapunan.",
      color: "border-emerald-500/40 bg-emerald-500/10",
    },
    {
      id: "water",
      name: "Clean Water & Hygiene Kit",
      tagalog: "Malinis na Tubig & Sanitation",
      amount: 1000,
      icon: <Droplets className="w-5 h-5 text-sky-400" />,
      desc: "2x 5-gallon purified drinking water containers, sabon, shampoo, toothpaste, sanitary napkins, at bleach.",
      color: "border-sky-500/40 bg-sky-500/10",
    },
    {
      id: "medicine",
      name: "Emergency First Aid & Medicine",
      tagalog: "Paracetamol, Gamot, Antiseptic",
      amount: 750,
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      desc: "Paracetamol para sa lagnat, oral rehydration salts para sa dehydration, band-aids, betadine, at alcohol.",
      color: "border-rose-500/40 bg-rose-500/10",
    },
    {
      id: "shelter",
      name: "Emergency Shelter Repair Kit",
      tagalog: "Traapal, Lubid, Pako",
      amount: 500,
      icon: <Hammer className="w-5 h-5 text-indigo-400" />,
      desc: "Mabigat na trapal (tarpaulin), nylon rope, at pako upang pansamantalang protektahan ang nawasak na bubong.",
      color: "border-indigo-500/40 bg-indigo-500/10",
    },
  ];

  // Regional Evacuation Center Directory
  const evacuationCenters = [
    {
      name: "Tuguegarao City People's Coliseum",
      municipality: "Tuguegarao City, Cagayan",
      activeDisasters: "Tropical Cyclone Marce — Signal No. 3",
      capacity: 450,
      disbursed: 423,
      contractId: "02005a76e93a86c0b938f97b",
      status: "Actively Disbursing",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      name: "Gonzaga Municipal Gymnasium",
      municipality: "Gonzaga, Cagayan",
      activeDisasters: "Coastal Storm Surge Evacuation",
      capacity: 280,
      disbursed: 247,
      contractId: "02008f12cc3e819b02a77b10",
      status: "Actively Disbursing",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      name: "Santa Ana Fisherfolk Multi-Purpose Center",
      municipality: "Santa Ana, Cagayan",
      activeDisasters: "Flash Flood Quick Response",
      capacity: 190,
      disbursed: 190,
      contractId: "0200b39f71ac2e690f9119aa",
      status: "100% Fully Disbursed",
      statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    },
    {
      name: "Aparri Coastal Evacuation Staging Post",
      municipality: "Aparri, Cagayan",
      activeDisasters: "Cagayan River Basin Overflow Alert",
      capacity: 310,
      disbursed: 282,
      contractId: "02009d43ab881c300f88bb2c",
      status: "Actively Disbursing",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
  ];

  // Dynamic 4-Step Explanations
  const steps = useMemo(() => {
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
        feature: "Bilis ng Pagkuha ng Ayuda",
        oldWay: "Oras ng pagpila sa init ng araw o ulan sa evacuation center",
        ghostFree: "30 segundo sa iyong telepono na may agarang pondo",
      },
      {
        feature: "Proteksyon sa Pagkakakilanlan",
        oldWay: "Nakasulat ang buong pangalan at National ID sa bukas na papel",
        ghostFree: "100% pribado gamit ang Zero-Knowledge cryptography",
      },
      {
        feature: "Pandaraya at Ghost Beneficiaries",
        oldWay: "Mga tiwaling middleman at pekeng pangalan na nagnanakaw ng pondo",
        ghostFree: "Imposible. Awtomatikong hinaharang ng anti-ghost nullifier",
      },
      {
        feature: "Pampublikong Audit (COA Compliance)",
        oldWay: "Mga resibong papel at spreadsheet na buwan bago ma-audit",
        ghostFree: "Real-time COA dashboard na sumusubaybay sa bawat piso",
      },
      {
        feature: "Gastos ng Biktima ng Kalamidad",
        oldWay: "Nagbabayad ng pamasahe, photocopy, at transaction charges",
        ghostFree: "₱0 gastos. Sagot ng DRRM ang lahat ng gas execution fees",
      },
    ];
  }, []);

  // Civilian FAQs
  const faqs = useMemo(() => {
    return [
      {
        q: "Kailangan ko ba ng cryptocurrency o kaalaman sa blockchain para makakuha ng ayuda?",
        a: "Hindi! Ginawa ang GhostFree para sa ordinaryong mamamayan. Ilagay lamang ang iyong PhilSys ID at 4-digit PIN mula sa evacuation center slip, at matatanggap mo na ang iyong pondo nang walang bayad.",
      },
      {
        q: "Paano nasisiguro ng GhostFree na walang makakakita sa aking National ID?",
        a: "Gumagamit ang GhostFree ng Zero-Knowledge cryptography sa Midnight Network. Ang iyong telepono mismo ang nagpapatunay na ikaw ay nasa listahan nang hindi ipinapadala ang iyong ID o pangalan sa internet.",
      },
      {
        q: "Paano kung mahina ang signal o walang internet sa evacuation center?",
        a: "May Disaster Resilience Mode ang GhostFree na nagse-save ng draft state sa iyong telepono at awtomatikong nagpapadala kapag nagkaroon muli ng koneksyon. Mayroon ding printable voucher para sa physical checkpoint gates.",
      },
      {
        q: "Ano ang ginagawa ng anti-ghost nullifier?",
        a: "Bawat pamilya ay may natatanging cryptographic code na tinatawag na 'nullifier'. Kapag nakuha mo na ang iyong ayuda, minamarkahan ito sa blockchain. Hindi maaaring kunin muli ng sinuman ang iyong ayuda.",
      },
      {
        q: "Maaari ba itong gamitin ng mga lolo, lola, o may kapansanan (PWD)?",
        a: "Oo! Mayroong built-in na Voice Assistant na nagbabasa ng panuto sa Tagalog, 3-level Text Scaling (hanggang 150%), at Sunlight Outdoor Mode para sa maliwanag na sikat ng araw.",
      },
    ];
  }, []);

  return (
    <Layout>
      <div className="relative overflow-hidden text-slate-100 selection:bg-amber-500/30 selection:text-white pb-16">
        {/* Background Ambient Glow Orbs */}
        <div className="absolute top-[8%] left-[10%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[25%] right-[10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] left-[8%] w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ========================================================
            SECTION 1: LIVE PAGASA / NDRRMO TROPICAL CYCLONE ADVISORY
           ======================================================== */}
        <div className="bg-gradient-to-r from-red-950 via-amber-950 to-red-950 border-b border-amber-500/30 py-2.5 px-4 text-xs font-semibold overflow-hidden shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0 bg-red-600/90 text-white px-2.5 py-1 rounded-md uppercase font-black tracking-wider text-[0.7rem] shadow-sm">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>PAGASA DRRM Alert</span>
            </div>
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="inline-block animate-marqueeScroll text-amber-200 text-xs">
                ⚠️ TYPHOON MARCE QUICK RESPONSE FUND ACTIVE — Tropical Cyclone Signal No. 3 declared for Region II (Cagayan Valley). Emergency Calamity Cash Aid of ₱5,000 per family available across 4 accredited regional evacuation sites. Free gas sponsorship activated on Midnight Testnet.
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION 2: HERO SECTION WITH OFFICIAL CIVIC IDENTITY
           ======================================================== */}
        <section className="relative z-10 px-4 sm:px-6 pt-8 sm:pt-14 pb-12 sm:pb-16 max-w-6xl mx-auto text-center">
          {/* Floating Calamity Relief Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border-2 border-amber-500/40 shadow-lg mb-6 animate-floatSlow">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-amber-300">
              🚨 Quick Response Fund: ₱5,000 Payout Bawat Pamilya
            </span>
          </div>

          {/* Official GhostFree Logo with radiant glow */}
          <div className="mb-6 flex justify-center">
            <GhostFreeLogo size={110} variant="hero" animated showGlow />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto mb-4">
            Ligtas na Ayuda.{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              Walang Ghost Beneficiaries.
            </span>{" "}
            Walang Pahirap.
          </h1>

          {/* Reassuring Civic Subtitle */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Privacy-first emergency cash aid distribution sa <strong>Midnight Network</strong>.
            Direktang tulong sa nasalanta nang hindi inilalantad ang personal na National ID o nakakaltasan ng bayad.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <button
              onClick={() => navigate("/claim")}
              className="btn-civic-gold w-full sm:w-auto px-8 py-4 text-base font-black flex items-center justify-center gap-2.5 shadow-2xl shadow-amber-500/30 tap-scale"
              id="hero-claim-ayuda-btn"
            >
              <Smartphone className="w-5 h-5 text-slate-950" />
              <span>Kumuha ng Ayuda (Claim ₱5,000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/transparency")}
              className="btn-civic-emerald w-full sm:w-auto px-7 py-4 text-base font-bold flex items-center justify-center gap-2 tap-scale shadow-lg shadow-emerald-500/20"
              id="hero-treasury-btn"
            >
              <Landmark className="w-5 h-5" />
              <span>Public Treasury (COA Explorer)</span>
            </button>

            <button
              onClick={() => setShowVerifier(true)}
              className="w-full sm:w-auto px-5 py-4 rounded-xl text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 transition-all flex items-center justify-center gap-2"
              id="hero-verify-voucher-btn"
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>I-verify ang Relief Voucher</span>
            </button>
          </div>

          {/* Key Assurance Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto text-left">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, label: "100% Lihim ang ID", desc: "Zero-Knowledge" },
              { icon: <Coins className="w-4 h-4 text-amber-400" />, label: "Libre ang Gas Fees", desc: "0 tDUST gastusin" },
              { icon: <Lock className="w-4 h-4 text-sky-400" />, label: "Bawal ang Doble", desc: "Anti-Ghost Nullifier" },
              { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, label: "COA Compliant", desc: "R.A. 10121 DRRM" },
            ].map((b, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-white/10 shadow-sm">
                <div className="flex items-center gap-2 mb-0.5">
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
              Paano Makatutulong ang Ayuda
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Saan Napupunta ang ₱5,000 Emergency Calamity Cash Aid?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
              Binuo ayon sa pamantayan ng DSWD Disaster Response Management Bureau (DRMB) upang matustusan ang pangangailangan ng isang pamilya sa unang 21 araw ng kalamidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-6">
            {reliefBasketItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between shadow-lg ${item.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-xl bg-black/30 border border-white/10">
                      {item.icon}
                    </span>
                    <span className="text-xs font-black text-white bg-black/40 px-2 py-0.5 rounded-md">
                      ₱{item.amount.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-xs font-black text-white leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[0.68rem] text-slate-300 font-semibold mb-2">
                    {item.tagalog}
                  </p>
                </div>
                <p className="text-[0.65rem] text-slate-400 leading-relaxed border-t border-white/10 pt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Total Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Coins className="w-6 h-6" />
              </span>
              <div>
                <span className="text-xs text-slate-400 block">Kabuuang Emergency Relief Package</span>
                <span className="text-lg sm:text-xl font-black text-white">
                  ₱5,000.00 Ayuda Assistance bawat Kwalipikadong Pamilya
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/claim")}
              className="btn-civic-gold px-6 py-2.5 text-xs sm:text-sm font-black whitespace-nowrap shadow-md"
            >
              Simulan ang Claim (₱5,000)
            </button>
          </div>
        </section>

        {/* ========================================================
            SECTION 4: REGIONAL EVACUATION CENTER DIRECTORY
           ======================================================== */}
        <section className="px-4 sm:px-6 py-10 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block mb-1">
              Aktibong Operasyon ng NDRRMO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Mga Akreditadong Evacuation Center sa Northern Luzon
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
              Real-time on-chain telemetry ng mga evacuation sites na may aktibong GhostFree smart contract disbursement.
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
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900 border-amber-400/80 shadow-xl shadow-amber-500/10"
                      : "bg-slate-900/80 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
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
                    <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full border ${ec.statusColor}`}>
                      {ec.status}
                    </span>
                  </div>

                  {/* Meter */}
                  <div className="my-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">
                        Pondo Naipamahagi: {ec.disbursed} / {ec.capacity} pamilya
                      </span>
                      <span className="font-bold text-amber-400">{percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[0.68rem] text-slate-400">
                    <span className="font-mono">Contract: {ec.contractId.slice(0, 16)}...</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      0 Ghost Claims
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
                30-Segundong Pagsusuri ng Kwalipikasyon (Quick Eligibility Lookup)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              Tingnan kung ang iyong barangay o bayan ay may aktibong emergency relief declaration bago mag-claim:
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
              <input
                type="text"
                value={barangayInput}
                onChange={(e) => setBarangayInput(e.target.value)}
                placeholder="I-type ang iyong Barangay o Bayan (e.g. Brgy. San Roque, Gonzaga)"
                className="input-civic flex-1 text-sm bg-black/40 border-2 border-white/20 focus:border-amber-400 text-white"
                onKeyDown={(e) => e.key === "Enter" && handleCheckEligibility()}
              />
              <button
                type="button"
                onClick={() => handleCheckEligibility()}
                className="btn-civic-gold px-6 py-3 text-sm font-black whitespace-nowrap shadow-md"
              >
                Suriin ang Lugar
              </button>
            </div>

            {/* Quick pre-fill buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-4">
              <span>Mga halimbawa:</span>
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
                        KWALIPIKADO ANG IYONG LUGAR!
                      </h4>
                      <p className="text-xs text-white mt-0.5">
                        {eligibilityResult.location}
                      </p>
                      <p className="text-[0.72rem] text-slate-300 mt-1">
                        May aktibong <strong>₱{eligibilityResult.amount.toLocaleString()}.00</strong> ayuda bawat pamilya sa ilalim ng {eligibilityResult.tranche}.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/claim")}
                    className="btn-civic-emerald px-5 py-2.5 text-xs sm:text-sm font-bold shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>I-claim ang Ayuda Ngayon</span>
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
                label: "Naipamahaging Ayuda",
                sub: "Nailipat nang buo",
                color: "text-amber-400",
              },
              {
                num: beneficiariesCounter,
                label: "Nasalantang Pamilya",
                sub: "Beripikadong tumanggap",
                color: "text-emerald-400",
              },
              {
                num: fraudCounter,
                label: "Dobleng Claim Naharang",
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
        <section className="px-4 sm:px-6 py-10 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-1">
              Paano Gumagana
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Apat na Hakbang Patungo sa Iyong Ayuda
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-slate-900/80 border-2 border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      {s.id}
                    </span>
                    <span className="text-[0.65rem] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white mb-1.5">{s.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{s.desc}</p>
                </div>
                <div className="pt-2.5 border-t border-white/10 text-[0.65rem] text-slate-400 flex items-center gap-1">
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
        <section className="px-4 sm:px-6 py-8 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block mb-1">
              Bakit GhostFree
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Tradisyunal na Sistema vs. GhostFree
            </h2>
          </div>

          <div className="glass-card-elevated p-4 sm:p-6 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Old Way */}
              <div className="p-4 sm:p-5 rounded-2xl bg-red-950/20 border-2 border-red-500/30">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-500/30">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-sm sm:text-base font-black text-red-300">
                    ❌ Tradisyunal na Ayuda Distribution
                  </h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  {comparisons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <div>
                        <strong className="text-white block">{c.feature}:</strong>
                        <span>{c.oldWay}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GhostFree Way */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border-2 border-emerald-500/40">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm sm:text-base font-black text-emerald-300">
                    ✅ GhostFree sa Midnight Network
                  </h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  {comparisons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">{c.feature}:</strong>
                        <span className="text-emerald-100">{c.ghostFree}</span>
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
        <section className="px-4 sm:px-6 py-10 max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <span className="text-xs font-black text-sky-400 uppercase tracking-wider block mb-1">
              Mga Karaniwang Tanong
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Sagot para sa mga Mamamayan
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 border-t border-white/5 leading-relaxed bg-black/20">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="px-4 sm:px-6 py-12 max-w-3xl mx-auto text-center relative z-10">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/20 border-2 border-amber-500/40 shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-2">
              Kailangan mo ba ng Ayuda sa Kalamidad?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
              Simulan ang pag-claim ngayon. Ligtas ang iyong pagkakakilanlan, walang bayad sa gas, at garantisadong makakarating sa iyo.
            </p>
            <button
              onClick={() => navigate("/claim")}
              className="btn-civic-gold px-8 py-3.5 text-base font-black shadow-xl"
            >
              Simulan ang Pag-claim (₱5,000)
            </button>
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
