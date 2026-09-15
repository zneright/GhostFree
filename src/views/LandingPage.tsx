// ============================================
// GhostFree — Premium Civic-Tech Landing Page
// Official Logo + Animated Gradient Mesh + Counter HUD
// Protocol Simulator + Statutory Framework + FAQ
// ============================================

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Lock,
  UserCheck,
  Landmark,
  Smartphone,
  ChevronRight,
  Fingerprint,
  Eye,
  EyeOff,
  Zap,
  CheckCircle2,
  FileText,
  Activity,
  ChevronDown,
  Scale,
  Sparkles,
  Server,
  Key,
  Github,
  Twitter,
  ExternalLink,
  Globe,
} from "lucide-react";
import TransparencyCard from "../components/TransparencyCard";
import OnboardingModal from "../components/OnboardingModal";
import GhostFreeLogo from "../components/GhostFreeLogo";

// ---- Animated Counter Hook ----
function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
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
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer for counter animation
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const escrowCount = useCountUp(100000, 2200, countersVisible);
  const ghostCount = useCountUp(1420, 1800, countersVisible);
  const beneficiaryCount = useCountUp(2850, 2000, countersVisible);
  const leakCount = useCountUp(0, 500, countersVisible);

  const protocolPhases = [
    {
      id: 1,
      name: "Phase 1: Local Credential Entry",
      tag: "Client-Side Only",
      icon: <Key className="w-5 h-5 text-civic-sky" />,
      desc: "Citizen inputs their PhilSys / Resident ID and physical voucher Secret PIN on their mobile phone. Values remain strictly inside browser memory.",
      tech: "0 bytes transmitted over HTTP or network",
    },
    {
      id: 2,
      name: "Phase 2: Local ZK Leaf Derivation",
      tag: "WASM Proving",
      icon: <Fingerprint className="w-5 h-5 text-accent-purple" />,
      desc: "Client-side WASM engine computes leafHash = Poseidon(residentID, secretPin). Generates zero-knowledge witness proof locally.",
      tech: "Poseidon Merkle Leaf Hashing",
    },
    {
      id: 3,
      name: "Phase 3: Merkle Inclusion Assertion",
      tag: "Smart Contract Circuit",
      icon: <Shield className="w-5 h-5 text-accent-success" />,
      desc: "Midnight circuit asserts current == merkleRoot. Proves citizen is an authorized calamity victim without identifying who they are.",
      tech: "Zero-Knowledge Membership Circuit",
    },
    {
      id: 4,
      name: "Phase 4: Nullifier Payout & Permanent Anti-Ghost Lock",
      tag: "On-Chain Settlement",
      icon: <Lock className="w-5 h-5 text-accent-gold" />,
      desc: "Unique nullifier = Hash(leafHash + contractAddress) is committed to public ledger. Smart contract releases fund tranche to Lace wallet.",
      tech: "Double-claim permanently rejected",
    },
  ];

  const statutoryLaws = [
    {
      code: "R.A. 10121",
      title: "Philippine Disaster Risk Reduction & Management Act",
      impact: "Mandates transparent, auditable releases of Local Calamity Funds & Quick Response Funds (QRF) without diversion or bureaucratic theft.",
    },
    {
      code: "R.A. 10173",
      title: "Data Privacy Act of 2012",
      impact: "Strictly enforces Zero-Knowledge witness sovereignty. Calamity victims never surrender unshielded IDs or biometric data to centralized servers.",
    },
    {
      code: "R.A. 8792",
      title: "Electronic Commerce Act of 2000",
      impact: "Recognizes cryptographic zero-knowledge nullifiers and on-chain Midnight transaction hashes as legally binding electronic disbursement vouchers.",
    },
  ];

  const faqs = [
    {
      q: "How does a citizen create an account on GhostFree?",
      a: "Citizens do NOT create accounts, usernames, or passwords. In emergency disaster zones, forced registration delays aid. Citizens simply open the claim portal, type their Resident ID and voucher PIN, and their phone generates a private cryptographic proof on the spot.",
    },
    {
      q: "How does GhostFree prevent ghost beneficiaries and double-claiming?",
      a: "Each citizen's secret identity produces exactly one deterministic nullifier: Hash(leafHash + contractAddress). When aid is claimed, the contract marks spentNullifiers[nullifier] = true. If a duplicate claim is attempted, the transaction immediately reverts, mathematically stopping ghosts.",
    },
    {
      q: "How do LGU officials manage and deploy calamity operations?",
      a: "Accredited municipal officials log into the LGU Admin Portal (/admin) using secure credentials. They upload an authorized beneficiary CSV roster, which compiles into an on-chain Merkle root, escrow relief funds, and monitor real-time disbursement telemetry.",
    },
    {
      q: "Who pays the transaction gas fee during a calamity?",
      a: "Disaster victims pay zero gas fees. The LGU official escrows funds and sponsors tDUST execution fees via gas delegation, allowing citizens in catastrophe zones to claim emergency aid with an empty wallet balance.",
    },
  ];

  return (
    <div className="min-h-dvh bg-civic-navy relative overflow-hidden text-slate-100 selection:bg-civic-blue selection:text-white">
      {/* === Animated Background === */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 gradient-mesh opacity-60" />

      {/* Floating hexagonal particle decorations */}
      <div className="absolute top-[15%] left-[10%] w-16 h-16 border border-civic-blue/10 rotate-45 rounded-lg animate-float-slow pointer-events-none" />
      <div className="absolute top-[30%] right-[8%] w-10 h-10 border border-civic-trust/10 rotate-12 rounded-lg animate-float pointer-events-none" />
      <div className="absolute top-[60%] left-[5%] w-12 h-12 border border-accent-purple/10 -rotate-12 rounded-lg animate-float-fast pointer-events-none" />
      <div className="absolute bottom-[20%] right-[12%] w-14 h-14 border border-accent-success/8 rotate-[30deg] rounded-lg animate-float-slow pointer-events-none" />
      <div className="absolute top-[45%] right-[25%] w-8 h-8 border border-civic-sky/8 rotate-[60deg] rounded-lg animate-float pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5 border-b border-white/[0.06] backdrop-blur-xl bg-civic-navy/60">
        <div className="flex items-center gap-3">
          <GhostFreeLogo size={36} variant="icon" animated />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tight leading-none">
                GhostFree
              </span>
              <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-civic-trust/20 text-civic-trust border border-civic-trust/30 uppercase tracking-wider">
                Midnight ZK
              </span>
            </div>
            <p className="text-[0.65rem] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
              Calamity Aid Governance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowOnboarding(true)}
            className="btn-civic btn-ghost text-xs sm:text-sm flex items-center gap-1.5 py-2 px-3 rounded-xl border border-civic-sky/30 text-civic-sky hover:bg-civic-sky/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tour
          </button>
          <button
            onClick={() => navigate("/transparency")}
            className="btn-civic btn-ghost text-xs sm:text-sm flex items-center gap-1.5 py-2 px-3 rounded-xl border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10"
          >
            <Landmark className="w-3.5 h-3.5" />
            Treasury
          </button>
          <button
            onClick={() => navigate("/demo")}
            className="btn-civic btn-ghost text-xs sm:text-sm hidden md:flex items-center gap-1.5 py-2 px-3 rounded-xl border border-civic-trust/40 text-civic-trust hover:bg-civic-trust/10"
            id="nav-level2-demo"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Demo
          </button>
          <button
            onClick={() => navigate("/claim")}
            className="btn-civic btn-primary shimmer-btn text-xs sm:text-sm flex items-center gap-1.5 py-2 px-4 rounded-xl"
          >
            <Smartphone className="w-4 h-4" />
            Citizen Claim
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="btn-civic btn-ghost text-xs sm:text-sm hidden sm:flex items-center gap-1.5 py-2 px-4 rounded-xl"
          >
            <Landmark className="w-4 h-4" />
            LGU Portal
          </button>
        </div>
      </header>

      {/* === Hero Section === */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-12 pb-16 lg:pt-20 lg:pb-24 max-w-7xl mx-auto">
        {/* Animated Logo Mark */}
        <div
          className={`
            mb-6 transition-all duration-700
            ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        >
          <GhostFreeLogo size={100} variant="full" animated className="mb-2" />
        </div>

        {/* Status Badge */}
        <div
          className={`
            trust-badge mb-6 transition-all duration-700 delay-100
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <Zap className="w-3.5 h-3.5 text-accent-success animate-pulse" />
          <span>Zero-Knowledge Proofs Verified on Midnight Network</span>
        </div>

        {/* Main Heading */}
        <h1
          className={`
            text-4xl sm:text-6xl lg:text-7xl font-black text-center text-white
            leading-[1.1] tracking-tight max-w-5xl mb-6
            transition-all duration-700 delay-200
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Stop the Ghosts.{" "}
          <span className="bg-gradient-to-r from-civic-sky via-civic-trust to-accent-success bg-clip-text text-transparent">
            Protect the People.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`
            text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-6
            leading-relaxed transition-all duration-700 delay-300
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Decentralized emergency calamity aid distribution powered by Zero-Knowledge
          cryptographic nullifiers. Zero identity leaks, zero duplicate payouts, and zero ghost
          beneficiaries.
        </p>

        {/* Tech Stack Badges */}
        <div
          className={`
            flex flex-wrap items-center justify-center gap-2 mb-12
            transition-all duration-700 delay-[350ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {[
            { label: "Midnight Network", icon: <Shield className="w-3 h-3" /> },
            { label: "Lace Wallet", icon: <Key className="w-3 h-3" /> },
            { label: "Compact ZK", icon: <Fingerprint className="w-3 h-3" /> },
            { label: "Zero Gas Fees", icon: <Zap className="w-3 h-3" /> },
          ].map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[0.7rem] text-slate-300 font-medium"
            >
              {badge.icon}
              {badge.label}
            </span>
          ))}
        </div>

        {/* Live Civic Telemetry HUD with Animated Counters */}
        <div
          ref={counterRef}
          className={`
            grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mb-12
            transition-all duration-700 delay-[400ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {[
            {
              label: "Emergency Escrow Locked",
              val: escrowCount.toLocaleString(),
              unit: "tNIGHT",
              sub: "Protected by Compact Circuit",
              icon: <Shield className="w-4 h-4 text-civic-sky" />,
              color: "civic-sky",
            },
            {
              label: "Ghost Claims Blocked",
              val: ghostCount.toLocaleString(),
              unit: "Attempted",
              sub: "Nullifier Collisions Prevented",
              icon: <Lock className="w-4 h-4 text-accent-purple" />,
              color: "accent-purple",
            },
            {
              label: "Verified Beneficiaries",
              val: beneficiaryCount.toLocaleString(),
              unit: "Citizens",
              sub: "Relief Disbursed Privately",
              icon: <UserCheck className="w-4 h-4 text-accent-success" />,
              color: "accent-success",
            },
            {
              label: "Victim Identity Leaks",
              val: leakCount.toString(),
              unit: "Expositions",
              sub: "Strict Witness Sovereignty",
              icon: <EyeOff className="w-4 h-4 text-accent-gold" />,
              color: "accent-gold",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="metric-card group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider leading-tight">
                  {stat.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className={`live-dot bg-${stat.color} text-${stat.color}`} />
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                  {stat.val}
                </span>
                <span className="text-xs text-slate-400 font-medium">{stat.unit}</span>
              </div>
              <div className="text-[0.65rem] text-slate-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Live Network Transparency Card */}
        <div className="w-full max-w-5xl mb-12">
          <TransparencyCard />
        </div>

        {/* Dual Primary CTA Cards */}
        <div
          className={`
            grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mb-16
            transition-all duration-700 delay-[450ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* Citizen CTA */}
          <button
            onClick={() => navigate("/claim")}
            className="glass-card-premium p-6 sm:p-8 rounded-3xl text-left group cursor-pointer relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-success/10 rounded-full blur-2xl group-hover:bg-accent-success/20 transition-all pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent-success/10 border border-accent-success/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-accent-success" />
              </div>
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-accent-success px-2 py-0.5 rounded bg-accent-success/10 mb-2 inline-block">
                For Disaster Victims
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-between">
                Claim Calamity Aid
                <ChevronRight className="w-5 h-5 text-accent-success group-hover:translate-x-1.5 transition-transform" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                No account, email, or password required. Connect your Lace wallet, enter your ID &
                secret voucher PIN, and receive aid directly with zero gas fees.
              </p>
            </div>
          </button>

          {/* LGU Admin CTA */}
          <button
            onClick={() => navigate("/admin/login")}
            className="glass-card-premium p-6 sm:p-8 rounded-3xl text-left group cursor-pointer relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-civic-blue/10 rounded-full blur-2xl group-hover:bg-civic-blue/20 transition-all pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-civic-blue/10 border border-civic-blue/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Landmark className="w-6 h-6 text-civic-sky" />
              </div>
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-civic-sky px-2 py-0.5 rounded bg-civic-blue/10 mb-2 inline-block">
                For Municipalities & LGUs
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-between">
                LGU Official Portal
                <ChevronRight className="w-5 h-5 text-civic-sky group-hover:translate-x-1.5 transition-transform" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Upload resident eligibility CSV rosters, initialize on-chain Merkle roots, escrow
                relief funds, and sponsor tDUST execution fees with Web2 admin security.
              </p>
            </div>
          </button>
        </div>

        {/* Public Treasury & Audit Explorer Banner */}
        <div
          onClick={() => navigate("/transparency")}
          className="w-full max-w-4xl p-5 sm:p-6 rounded-3xl border border-accent-gold/30 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-accent-gold/10 hover:border-accent-gold/60 text-left transition-all duration-300 shadow-xl shadow-accent-gold/5 cursor-pointer relative overflow-hidden mb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center shrink-0">
              <Landmark className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent-gold px-2 py-0.5 rounded bg-accent-gold/10">
                  Open Governance · R.A. 10121 & COA
                </span>
                <span className="text-xs text-white/40">Public Ledger Telemetry</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Public Calamity Treasury & Audit Explorer
              </h3>
              <p className="text-slate-300 text-xs mt-1 max-w-2xl leading-relaxed">
                Review real-time relief allocations, monitor anonymous nullifier commitments, and download official Commission on Audit (COA) compliance CSV statements.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-accent-gold group-hover:translate-x-1 transition-transform">
            <span>Explore Treasury</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Interactive Protocol Engine Simulator */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-civic-trust px-3 py-1 rounded-full bg-civic-trust/10 border border-civic-trust/20">
              Interactive Protocol Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 section-header">
              How Zero-Knowledge Calamity Aid Works
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-4">
              Explore the 4-phase cryptographic pipeline ensuring witness sovereignty and
              anti-ghost protection.
            </p>
          </div>

          {/* Step Cards with connection lines */}
          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-3 mb-6">
            {/* Connection lines (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0">
              <div className="w-full h-full bg-gradient-to-r from-civic-blue/20 via-civic-trust/20 to-accent-success/20" style={{ maskImage: 'linear-gradient(90deg, transparent 12%, white 18%, white 32%, transparent 37%, transparent 38%, white 43%, white 57%, transparent 62%, transparent 63%, white 68%, white 82%, transparent 88%)' }} />
            </div>

            {protocolPhases.map((phase, i) => (
              <button
                key={phase.id}
                onClick={() => setActiveStep(i)}
                className={`relative z-10 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  activeStep === i
                    ? "bg-slate-800/90 border-civic-trust shadow-lg shadow-civic-trust/10 scale-[1.02]"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
              >
                {/* Active indicator ring */}
                {activeStep === i && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-civic-trust animate-pulse-ring" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400">Step {phase.id}</span>
                  {phase.icon}
                </div>
                <h3 className="font-bold text-sm text-white">{phase.name}</h3>
                <span className="text-[0.7rem] text-civic-trust font-medium mt-1 inline-block">
                  {phase.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Active Phase Deep Dive Card */}
          <div className="glass-card-premium p-6 sm:p-8 rounded-3xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-civic-trust/10 border border-civic-trust/30 flex items-center justify-center">
                  {protocolPhases[activeStep].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {protocolPhases[activeStep].name}
                  </h3>
                  <span className="text-xs text-civic-trust font-medium">
                    {protocolPhases[activeStep].tag}
                  </span>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                {protocolPhases[activeStep].tech}
              </div>
            </div>

            <p className="text-slate-200 text-base leading-relaxed mb-6">
              {protocolPhases[activeStep].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80">
                <div className="text-slate-500 uppercase font-semibold mb-2 flex items-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  What Observer Sees (Public)
                </div>
                <div className="text-accent-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {activeStep === 3
                      ? "Nullifier recorded: 0x8a9b... + Calamity aid payout transferred"
                      : "Only aggregate Merkle root on blockchain ledger"}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80">
                <div className="text-slate-500 uppercase font-semibold mb-2 flex items-center gap-1.5">
                  <EyeOff className="w-3 h-3" />
                  What Remains Secret (Private)
                </div>
                <div className="text-civic-sky flex items-center gap-1.5">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>National ID, resident secret PIN, and personal identity never exposed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philippine Statutory & Governance Compliance Matrix */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-gold px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20">
              Philippine Civic-Tech Compliance
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 section-header">
              Grounded in Philippine Governance Law
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-4">
              GhostFree is engineered to satisfy national disaster audit requirements and data
              sovereignty mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statutoryLaws.map((law, idx) => (
              <div
                key={idx}
                className="glass-card-premium p-6 rounded-3xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-accent-gold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-accent-gold/10 border border-accent-gold/20">
                      {law.code}
                    </span>
                    <Scale className="w-4 h-4 text-slate-400 group-hover:text-accent-gold transition-colors" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{law.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{law.impact}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[0.7rem] text-slate-400 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-success" />
                  Statutory Audit Compliant
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions Accordion */}
        <section className="w-full max-w-4xl mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white section-header">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Everything you need to know about accounts, privacy, and fund distribution.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = expandedFaq === i;
              const borderColors = [
                "border-l-civic-sky",
                "border-l-accent-purple",
                "border-l-accent-success",
                "border-l-accent-gold",
              ];
              return (
                <div
                  key={i}
                  className={`glass-card rounded-2xl border border-shield-glass/20 bg-slate-900/60 overflow-hidden border-l-2 ${borderColors[i % 4]}`}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="font-bold text-white text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-civic-trust" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* === Premium Footer === */}
      <div className="footer-gradient-divider" />
      <footer className="relative z-10 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <GhostFreeLogo size={48} variant="icon" animated />
              <p className="text-slate-400 text-xs mt-3 leading-relaxed max-w-xs">
                Decentralized, privacy-first calamity aid distribution. Deployed on the Midnight Network with Zero-Knowledge cryptographic guarantees.
              </p>
              <p className="text-slate-500 text-[0.65rem] mt-3 italic">
                "Stop the ghosts. Protect the people."
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Portal</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Citizen Claim", href: "/claim" },
                  { label: "LGU Admin", href: "/admin/login" },
                  { label: "Treasury Explorer", href: "/transparency" },
                  { label: "Protocol Demo", href: "/demo" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 text-xs hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "GitHub Repository", href: "https://github.com/zneright/GhostFree", external: true },
                  { label: "Midnight Network", href: "https://midnight.network", external: true },
                  { label: "Lace Wallet", href: "https://www.lace.io", external: true },
                  { label: "Privacy Policy", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-slate-400 text-xs hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      {link.external ? <ExternalLink className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Builder Challenge Column */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Built For</h4>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-civic-blue/10 to-civic-trust/10 border border-civic-blue/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-civic-trust" />
                  <span className="text-xs font-bold text-white">Rise In</span>
                </div>
                <p className="text-[0.65rem] text-slate-400 leading-relaxed">
                  Midnight Builder Challenge — Privacy-first decentralized applications on the Midnight blockchain.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://github.com/zneright/GhostFree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/AidGhostfree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://ghost-free-eight.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.65rem] text-slate-500">
            <span>
              © {new Date().getFullYear()} GhostFree Civic-Tech Calamity Aid Protocol
            </span>
            <span className="flex items-center gap-1.5">
              Deployed on{" "}
              <span className="text-civic-trust font-medium">Midnight Network</span>
              {" "}· Empowered by{" "}
              <span className="text-civic-trust font-medium">Lace Wallet & Compact ZK</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Onboarding Tour Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
};

export default LandingPage;
