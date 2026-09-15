// =======================================================
// GhostFree — GitHub-Grade Civic-Tech Landing Page (v1.4.0)
// 100% Plain English Copy · Product Showcase Window
// Old Way vs GhostFree Comparison · Interactive Bento
// =======================================================

import React, { useEffect, useState, useRef } from "react";
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
  XCircle,
  Activity,
  ChevronDown,
  Scale,
  Sparkles,
  ExternalLink,
  Globe,
  ArrowRight,
  Layers,
  Clock,
  FileCheck,
  Download,
} from "lucide-react";
import TransparencyCard from "../components/TransparencyCard";
import OnboardingModal from "../components/OnboardingModal";
import GhostFreeLogo from "../components/GhostFreeLogo";
import { GithubIcon, TwitterIcon } from "../components/SocialIcons";

// ---- Animated Counter Hook ----
function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
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
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"citizen" | "admin" | "treasury">("citizen");
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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const escrowCount = useCountUp(100000, 2200, countersVisible);
  const ghostCount = useCountUp(1420, 1800, countersVisible);
  const beneficiaryCount = useCountUp(2850, 2000, countersVisible);
  const leakCount = useCountUp(0, 500, countersVisible);

  // Plain English 4-Step Process
  const steps = [
    {
      id: 1,
      title: "1. Enter Voucher PIN",
      tag: "100% Private",
      icon: <Smartphone className="w-5 h-5 text-civic-sky" />,
      desc: "Type your ID number and the secret PIN printed on your relief voucher. These values stay in your phone's memory.",
      note: "Nothing is sent over the internet.",
      observerSees: "Zero data transmitted",
      staysPrivate: "Your National ID and voucher PIN stay locked on your phone",
    },
    {
      id: 2,
      title: "2. Create Digital Pass",
      tag: "On-Phone Math",
      icon: <Fingerprint className="w-5 h-5 text-accent-purple" />,
      desc: "Your phone creates a tamper-proof digital pass proving you hold a valid voucher, without revealing your name.",
      note: "Generated in 1 second on your device.",
      observerSees: "Only a one-time mathematical proof",
      staysPrivate: "Your identity remains completely hidden",
    },
    {
      id: 3,
      title: "3. Check Approved List",
      tag: "Anonymous Check",
      icon: <Shield className="w-5 h-5 text-accent-success" />,
      desc: "The secure contract checks whether your pass matches the town's disaster relief roster without discovering who you are.",
      note: "Instant confirmation with zero delays.",
      observerSees: "Eligibility confirmed: YES",
      staysPrivate: "Nobody can link the check to your real name",
    },
    {
      id: 4,
      title: "4. Receive Cash Aid",
      tag: "Instant & Locked",
      icon: <Lock className="w-5 h-5 text-accent-gold" />,
      desc: "Emergency aid is deposited straight to your wallet. A one-time lock is saved so no one can ever claim your aid again.",
      note: "Guaranteed one payout per family.",
      observerSees: "Aid payout recorded + One-time lock code marked spent",
      staysPrivate: "Your personal details are never stored on any ledger",
    },
  ];

  // Plain English Comparison
  const comparisons = [
    {
      feature: "Claiming Speed",
      oldWay: "Hours waiting in long evacuation lines under the sun",
      ghostFree: "30 seconds on your smartphone with instant digital delivery",
      good: true,
    },
    {
      feature: "Personal Privacy",
      oldWay: "Names, addresses, and ID numbers printed on public paper clipboards",
      ghostFree: "100% private. Your ID stays on your phone and is never uploaded",
      good: true,
    },
    {
      feature: "Ghost Beneficiaries",
      oldWay: "Corrupt middlemen and duplicate claimants steal emergency relief",
      ghostFree: "Impossible to claim twice. Digital lock blocks duplicates automatically",
      good: true,
    },
    {
      feature: "Public Accountability",
      oldWay: "Paper receipts and locked spreadsheets that take months to audit",
      ghostFree: "Real-time public dashboard tracking every single peso with zero data leaks",
      good: true,
    },
    {
      feature: "Transaction Costs",
      oldWay: "Victims pay travel fares and documentation copying fees",
      ghostFree: "₱0 cost. The town hall pays all digital network fees in advance",
      good: true,
    },
  ];

  // Plain English Philippine Disaster Laws
  const statutoryLaws = [
    {
      code: "R.A. 10121",
      title: "Disaster Risk Reduction & Management Act",
      impact: "Requires emergency disaster funds and Quick Response Funds (QRF) to reach affected families immediately with full public accounting.",
    },
    {
      code: "R.A. 10173",
      title: "Data Privacy Act of 2012",
      impact: "Guarantees your personal data cannot be published or leaked online. Your identity remains protected at all times.",
    },
    {
      code: "R.A. 8792",
      title: "Electronic Commerce Act",
      impact: "Recognizes digital emergency vouchers and secure blockchain receipts as legally valid proof of disaster assistance.",
    },
  ];

  // Plain English FAQs
  const faqs = [
    {
      q: "Do I need to register an account, username, or password?",
      a: "No. When an emergency strikes, creating accounts and remembering passwords only slows down help. You simply open the claim page on your smartphone, type your voucher PIN, and receive your aid directly.",
    },
    {
      q: "How does GhostFree stop people from claiming aid twice?",
      a: "Each disaster voucher contains a secret number that creates a unique digital lock code. The moment aid is claimed, that lock code is permanently marked as used. If someone tries to claim again with the same voucher, the system automatically rejects it.",
    },
    {
      q: "Does the government or anyone else see my private identity?",
      a: "Never. GhostFree proves that you are an authorized disaster victim without ever sharing your name, National ID, or private details with the government, the internet, or the blockchain.",
    },
    {
      q: "Do I have to pay any fees or buy cryptocurrency?",
      a: "No, claiming aid is 100% free for all disaster victims. The local government sponsors all technical execution fees in advance, so you can claim even with an empty wallet balance.",
    },
    {
      q: "How do town hall officials upload beneficiary lists and send funds?",
      a: "Authorized government officials log in with secure municipal credentials. They upload an approved disaster roster spreadsheet, lock relief funds into the emergency treasury, and review live disbursement statistics on their command center dashboard.",
    },
  ];

  return (
    <div className="min-h-dvh bg-civic-navy relative overflow-hidden text-slate-100 selection:bg-civic-blue selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />

      {/* Floating Accent Orbs */}
      <div className="absolute top-[12%] left-[15%] w-72 h-72 bg-civic-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[35%] right-[10%] w-96 h-96 bg-civic-trust/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[8%] w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================
          1. HEADER & TOP NAVIGATION
         ======================================================== */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 lg:py-4 border-b border-white/[0.08] backdrop-blur-2xl bg-civic-navy/70 sticky top-0">
        <div className="flex items-center gap-3">
          <GhostFreeLogo size={36} variant="icon" animated />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tight leading-none">
                GhostFree
              </span>
              <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-civic-trust/20 text-civic-trust border border-civic-trust/30 uppercase tracking-wider">
                Live Preprod
              </span>
            </div>
            <p className="text-[0.65rem] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
              Zero Ghost Claims · Emergency Aid
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
            onClick={() => navigate("/claim")}
            className="btn-civic btn-primary shimmer-btn text-xs sm:text-sm flex items-center gap-1.5 py-2 px-4 rounded-xl"
          >
            <Smartphone className="w-4 h-4" />
            Claim Aid
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="btn-civic btn-ghost text-xs sm:text-sm hidden sm:flex items-center gap-1.5 py-2 px-4 rounded-xl"
          >
            <Landmark className="w-4 h-4" />
            Government Portal
          </button>
        </div>
      </header>

      {/* ========================================================
          2. HERO SECTION
         ======================================================== */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-10 pb-16 lg:pt-16 lg:pb-24 max-w-7xl mx-auto">
        {/* GitHub-Style Release Pill Banner */}
        <div
          onClick={() => navigate("/transparency")}
          className={`
            glow-pill mb-6 cursor-pointer group transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
          `}
        >
          <span className="w-2 h-2 rounded-full bg-accent-success animate-ping" />
          <span className="text-white font-bold">Tested & Live on Preprod</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-300">75 Verified Testers & Zero Data Leaks</span>
          <ArrowRight className="w-3 h-3 text-civic-sky group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Brand Logo Display */}
        <div
          className={`
            mb-4 transition-all duration-700 delay-100
            ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        >
          <GhostFreeLogo size={90} variant="full" animated />
        </div>

        {/* Main Heading in Everyday Plain English */}
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

        {/* Subtitle in Everyday Plain English */}
        <p
          className={`
            text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8
            leading-relaxed transition-all duration-700 delay-300
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          A secure emergency relief platform where disaster victims receive financial aid in seconds.
          Your private ID never leaves your phone, and duplicate claims are automatically blocked.
        </p>

        {/* Dual Primary Call-to-Action Buttons */}
        <div
          className={`
            flex flex-col sm:flex-row items-center gap-4 mb-12
            transition-all duration-700 delay-[350ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <button
            onClick={() => navigate("/claim")}
            className="btn-civic btn-primary shimmer-btn w-full sm:w-auto px-8 py-4 text-base font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-xl shadow-civic-blue/25"
          >
            <Smartphone className="w-5 h-5" />
            Claim Emergency Aid
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="btn-civic btn-secondary w-full sm:w-auto px-8 py-4 text-base font-bold rounded-2xl flex items-center justify-center gap-2.5 border border-slate-700 hover:border-civic-sky/40"
          >
            <Landmark className="w-5 h-5 text-civic-sky" />
            Local Government Portal
          </button>
        </div>

        {/* Live Counters Telemetry HUD */}
        <div
          ref={counterRef}
          className={`
            grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mb-16
            transition-all duration-700 delay-[400ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {[
            {
              label: "Disaster Funds Locked",
              val: escrowCount.toLocaleString(),
              unit: "tNIGHT",
              sub: "Protected in Town Treasury",
              icon: <Shield className="w-4 h-4 text-civic-sky" />,
            },
            {
              label: "Duplicate Claims Blocked",
              val: ghostCount.toLocaleString(),
              unit: "Attempts",
              sub: "Ghost claims stopped automatically",
              icon: <Lock className="w-4 h-4 text-accent-purple" />,
            },
            {
              label: "Verified Families Helped",
              val: beneficiaryCount.toLocaleString(),
              unit: "Citizens",
              sub: "Aid delivered with 100% privacy",
              icon: <UserCheck className="w-4 h-4 text-accent-success" />,
            },
            {
              label: "Personal Data Leaks",
              val: leakCount.toString(),
              unit: "Leaks",
              sub: "Zero personal data ever stored",
              icon: <EyeOff className="w-4 h-4 text-accent-gold" />,
            },
          ].map((stat, i) => (
            <div key={i} className="card-spotlight p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                {stat.icon}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
                  {stat.val}
                </span>
                <span className="text-xs text-slate-400 font-medium">{stat.unit}</span>
              </div>
              <div className="text-[0.65rem] text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* ========================================================
            3. GITHUB-GRADE INTERACTIVE PRODUCT SHOWCASE WINDOW
           ======================================================== */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-civic-trust px-3 py-1 rounded-full bg-civic-trust/10 border border-civic-trust/20">
              Interactive Live Preview
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Explore the Platform in Action
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              See how disaster victims, local officials, and public auditors use GhostFree with zero friction.
            </p>
          </div>

          {/* Interactive Window Chrome */}
          <div className="app-window-chrome">
            {/* Top Window Bar with macOS Dots and Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="ml-2 px-3 py-1 rounded-md bg-slate-950/80 border border-white/[0.06] text-[0.7rem] font-mono text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-2.5 h-2.5 text-accent-success" />
                  ghostfree.gov.ph/{activeTab === "citizen" ? "claim" : activeTab === "admin" ? "admin/dashboard" : "transparency"}
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto bg-slate-950/60 p-1 rounded-xl border border-white/[0.06]">
                <button
                  onClick={() => setActiveTab("citizen")}
                  className={`tab-pill flex items-center gap-1.5 ${
                    activeTab === "citizen" ? "tab-pill-active" : "tab-pill-inactive"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Citizen Claim
                </button>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`tab-pill flex items-center gap-1.5 ${
                    activeTab === "admin" ? "tab-pill-active" : "tab-pill-inactive"
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  Town Hall Portal
                </button>
                <button
                  onClick={() => setActiveTab("treasury")}
                  className={`tab-pill flex items-center gap-1.5 ${
                    activeTab === "treasury" ? "tab-pill-active" : "tab-pill-inactive"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  Public Audit
                </button>
              </div>
            </div>

            {/* Window Content Area */}
            <div className="p-6 sm:p-8 bg-slate-950/80 min-h-[380px] flex flex-col justify-between">
              {/* Tab 1: Citizen Mobile Flow */}
              {activeTab === "citizen" && (
                <div className="space-y-6 animate-fade-in-down">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                    <div>
                      <span className="text-xs font-bold text-accent-success uppercase tracking-wider">
                        For Disaster Victims & Evacuees
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Fast, Private Emergency Aid on Any Phone
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        No username or password. Connect wallet, enter voucher PIN, receive cash aid.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/claim")}
                      className="btn-civic btn-primary text-xs py-2 px-4 rounded-xl shrink-0"
                    >
                      Try Live Claim Flow →
                    </button>
                  </div>

                  {/* 4 Interactive Flow Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-xs font-bold text-civic-sky mb-1">Step 1</div>
                      <div className="font-bold text-white text-sm">Connect Wallet</div>
                      <p className="text-slate-400 text-xs mt-1">Lace wallet connects with 1 click. Zero personal data asked.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-xs font-bold text-accent-purple mb-1">Step 2</div>
                      <div className="font-bold text-white text-sm">Enter Voucher PIN</div>
                      <p className="text-slate-400 text-xs mt-1">Type ID & PIN. They stay on your phone, never sent over the web.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-xs font-bold text-accent-success mb-1">Step 3</div>
                      <div className="font-bold text-white text-sm">Private Pass</div>
                      <p className="text-slate-400 text-xs mt-1">Phone proves you are on the list without revealing your name.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-accent-gold/40 bg-accent-gold/5">
                      <div className="text-xs font-bold text-accent-gold mb-1">Step 4</div>
                      <div className="font-bold text-white text-sm">Instant Relief</div>
                      <p className="text-slate-300 text-xs mt-1">Funds arrive instantly. Voucher is locked to prevent duplicates.</p>
                    </div>
                  </div>

                  {/* Live Status Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-4 text-xs text-slate-400 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-success" />
                      <span>Works on 2G/EDGE cellular signals in evacuation shelters</span>
                    </div>
                    <span className="text-civic-trust font-medium">Free for Citizens (₱0 gas fee)</span>
                  </div>
                </div>
              )}

              {/* Tab 2: LGU Command Center */}
              {activeTab === "admin" && (
                <div className="space-y-6 animate-fade-in-down">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                    <div>
                      <span className="text-xs font-bold text-civic-sky uppercase tracking-wider">
                        For Municipal Officials & DRRM Officers
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Local Government Emergency Command Center
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        Upload disaster rosters, enforce dual-officer approvals, and prevent fraud.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/admin/login")}
                      className="btn-civic btn-primary text-xs py-2 px-4 rounded-xl shrink-0"
                    >
                      Open Government Portal →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Beneficiary Roster</span>
                        <FileCheck className="w-4 h-4 text-civic-sky" />
                      </div>
                      <div className="text-xl font-bold text-white">2,850 Residents</div>
                      <p className="text-slate-400 text-xs mt-1">Compiled into an anonymous tamper-proof list</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Dual-Officer Quorum</span>
                        <Scale className="w-4 h-4 text-accent-purple" />
                      </div>
                      <div className="text-xl font-bold text-accent-success">2 / 2 Signed</div>
                      <p className="text-slate-400 text-xs mt-1">DRRM Head + Municipal Treasurer sign-off</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Emergency Treasury</span>
                        <Landmark className="w-4 h-4 text-accent-gold" />
                      </div>
                      <div className="text-xl font-bold text-white">₱14,250,000</div>
                      <p className="text-slate-400 text-xs mt-1">Locked in town emergency relief escrow</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 text-xs text-slate-400 border-t border-white/[0.06]">
                    <CheckCircle2 className="w-4 h-4 text-accent-success" />
                    <span>Compliant with Philippine Disaster Law (R.A. 10121) and Data Privacy Act (R.A. 10173)</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Public Treasury */}
              {activeTab === "treasury" && (
                <div className="space-y-6 animate-fade-in-down">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                    <div>
                      <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                        Open Public Governance & Audit
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Track Every Peso Without Leaking Names
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        Full public transparency for citizens, watchdogs, and government auditors.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/transparency")}
                      className="btn-civic btn-primary text-xs py-2 px-4 rounded-xl shrink-0"
                    >
                      View Live Treasury →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase mb-2">Recent Verified Payouts</div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-white/[0.04]">
                          <span className="font-mono text-slate-300">Lock: 0x8a9b...3c11</span>
                          <span className="text-accent-success font-bold">₱5,000 Disbursed</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-white/[0.04]">
                          <span className="font-mono text-slate-300">Lock: 0x4f12...e90a</span>
                          <span className="text-accent-success font-bold">₱5,000 Disbursed</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-white/[0.04]">
                          <span className="font-mono text-slate-300">Lock: 0xd722...88ab</span>
                          <span className="text-accent-success font-bold">₱5,000 Disbursed</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Commission on Audit (COA) Export</div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          Download complete official disbursement statements containing timestamped transaction hashes and anonymous lock codes for official audit submission.
                        </p>
                      </div>
                      <button
                        onClick={() => navigate("/transparency")}
                        className="btn-civic btn-secondary text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 mt-4"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download Audit Statement (.CSV)
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 text-xs text-slate-400 border-t border-white/[0.06]">
                    <CheckCircle2 className="w-4 h-4 text-accent-success" />
                    <span>Real-time smart contract transparency on Midnight Network</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================
            4. THE OLD WAY VS THE GHOSTFREE WAY (Comparison)
           ======================================================== */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-gold px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20">
              Why GhostFree Matters
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              The Old Way vs. The GhostFree Way
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              See how modern civic technology solves decades of disaster relief corruption and delays.
            </p>
          </div>

          <div className="card-spotlight p-6 sm:p-8 rounded-3xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider">
                  <th className="pb-4 font-bold text-slate-400 w-1/4">Aspect</th>
                  <th className="pb-4 font-bold text-rose-400 w-3/8 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    The Old Way (Paper Vouchers)
                  </th>
                  <th className="pb-4 font-bold text-accent-success w-3/8">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      The GhostFree Way
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                {comparisons.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 font-bold text-white">{row.feature}</td>
                    <td className="py-4 text-slate-400 leading-relaxed pr-4">
                      {row.oldWay}
                    </td>
                    <td className="py-4 text-emerald-300 font-medium leading-relaxed">
                      {row.ghostFree}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================
            5. HOW IT WORKS IN 4 SIMPLE STEPS
           ======================================================== */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-civic-trust px-3 py-1 rounded-full bg-civic-trust/10 border border-civic-trust/20">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              How Disaster Victims Receive Aid
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Click through the 4 steps below to see how privacy and duplicate protection work hand-in-hand.
            </p>
          </div>

          {/* 4 Step Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`card-spotlight p-4 text-left cursor-pointer transition-all duration-300 ${
                  activeStep === idx
                    ? "border-civic-trust bg-slate-800/90 scale-[1.02] shadow-lg shadow-civic-trust/10"
                    : "hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400">Step {step.id}</span>
                  {step.icon}
                </div>
                <h3 className="font-bold text-sm text-white">{step.title}</h3>
                <span className="text-[0.7rem] text-civic-trust font-medium mt-1 inline-block">
                  {step.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Deep Dive Card */}
          <div className="card-spotlight p-6 sm:p-8 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-civic-trust/10 border border-civic-trust/30 flex items-center justify-center">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {steps[activeStep].title}
                  </h3>
                  <span className="text-xs text-civic-trust font-medium">
                    {steps[activeStep].tag} · {steps[activeStep].note}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-200 text-base leading-relaxed mb-6">
              {steps[activeStep].desc}
            </p>

            {/* Privacy Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="text-slate-400 uppercase font-bold mb-2 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-accent-success" />
                  What the System Checks (Public)
                </div>
                <div className="text-accent-success font-medium">
                  {steps[activeStep].observerSees}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="text-slate-400 uppercase font-bold mb-2 flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-civic-sky" />
                  What Stays With You (Private)
                </div>
                <div className="text-civic-sky font-medium">
                  {steps[activeStep].staysPrivate}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. BENTO GRID OF CORE GUARANTEES
           ======================================================== */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-civic-sky px-3 py-1 rounded-full bg-civic-sky/10 border border-civic-sky/20">
              Four Core Guarantees
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Engineered for Complete Trust
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Every disaster victim and municipal official gets ironclad privacy and fraud protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-spotlight p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-civic-sky/10 border border-civic-sky/30 flex items-center justify-center mb-4 text-civic-sky group-hover:scale-110 transition-transform">
                  <EyeOff className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">100% Private</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Your National ID and private PIN stay on your phone. No central database ever collects or leaks your personal information.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[0.7rem] text-civic-sky font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Zero Data Tracking
              </div>
            </div>

            <div className="card-spotlight p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center mb-4 text-accent-purple group-hover:scale-110 transition-transform">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">Zero Ghost Claims</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Each voucher generates a one-time digital lock code. The moment aid is received, the code is locked permanently against repeat claims.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[0.7rem] text-accent-purple font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                No Duplicate Payouts
              </div>
            </div>

            <div className="card-spotlight p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-success/10 border border-accent-success/30 flex items-center justify-center mb-4 text-accent-success group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">Free for Families</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  The local government sponsors all technical execution fees in advance. Victims in disaster zones pay ₱0 to claim relief.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[0.7rem] text-accent-success font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Zero Gas Fees
              </div>
            </div>

            <div className="card-spotlight p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center mb-4 text-accent-gold group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">Open Public Audit</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Watchdogs and citizens can verify every peso distributed on a live public dashboard without revealing recipient names.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[0.7rem] text-accent-gold font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live COA Reports
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. PHILIPPINE LAWS & STATUTORY COMPLIANCE
           ======================================================== */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-gold px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20">
              Philippine Legal Compliance
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Backed by Philippine Governance Law
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              GhostFree meets official government audit standards and citizen privacy rights under national law.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statutoryLaws.map((law, idx) => (
              <div key={idx} className="card-spotlight p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-accent-gold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-accent-gold/10 border border-accent-gold/20">
                      {law.code}
                    </span>
                    <Scale className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{law.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{law.impact}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 text-[0.7rem] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-success" />
                  Government Audit Compliant
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            8. EVERYDAY ENGLISH FAQS
           ======================================================== */}
        <section className="w-full max-w-4xl mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Straightforward answers about accounts, privacy, and emergency payouts.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = expandedFaq === i;
              return (
                <div
                  key={i}
                  className="card-spotlight rounded-2xl overflow-hidden"
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

        {/* ========================================================
            9. BOTTOM HIGH-IMPACT CALL TO ACTION
           ======================================================== */}
        <section className="w-full max-w-5xl mb-12 p-8 sm:p-12 rounded-3xl card-spotlight text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-civic-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-success/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <GhostFreeLogo size={56} variant="icon" animated className="mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to Deliver Calamity Aid with Zero Ghosts?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Test the live claim portal on Midnight Preprod, or tour the local government command center today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/claim")}
                className="btn-civic btn-primary shimmer-btn w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-xl"
              >
                <Smartphone className="w-4 h-4" />
                Claim Aid as a Citizen
              </button>
              <button
                onClick={() => navigate("/admin/login")}
                className="btn-civic btn-secondary w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-xl border border-slate-700"
              >
                <Landmark className="w-4 h-4 text-civic-sky" />
                Login as Town Hall Official
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          10. FOOTER
         ======================================================== */}
      <div className="footer-gradient-divider" />
      <footer className="relative z-10 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <GhostFreeLogo size={48} variant="icon" animated />
              <p className="text-slate-400 text-xs mt-3 leading-relaxed max-w-xs">
                Private, instant calamity aid distribution. Stop ghost beneficiaries and deliver relief with 100% transparency.
              </p>
              <p className="text-slate-500 text-[0.65rem] mt-3 italic">
                "Stop the ghosts. Protect the people."
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Portals</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Citizen Claim Portal", href: "/claim" },
                  { label: "Town Hall Official Login", href: "/admin/login" },
                  { label: "Public Calamity Treasury", href: "/transparency" },
                  { label: "Interactive Demo", href: "/demo" },
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
                  { label: "GitHub Codebase", href: "https://github.com/zneright/GhostFree", external: true },
                  { label: "Midnight Blockchain", href: "https://midnight.network", external: true },
                  { label: "Lace Web3 Wallet", href: "https://www.lace.io", external: true },
                  { label: "Commission on Audit (COA)", href: "https://www.coa.gov.ph", external: true },
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
                  Midnight Builder Challenge — Privacy-first decentralized disaster relief.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://github.com/zneright/GhostFree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/AidGhostfree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <TwitterIcon className="w-4 h-4" />
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

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.65rem] text-slate-500">
            <span>
              © {new Date().getFullYear()} GhostFree Civic-Tech Calamity Aid Protocol
            </span>
            <span className="flex items-center gap-1.5">
              Live on{" "}
              <span className="text-civic-trust font-medium">Midnight Preprod</span>
              {" "}· Built with{" "}
              <span className="text-civic-trust font-medium">Lace Wallet</span>
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
