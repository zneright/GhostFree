// ============================================
// GhostFree — Elevated Civic-Tech Landing Page
// Parallax HUD + Interactive ZK Protocol Simulator + Statutory Framework
// ============================================

import React, { useEffect, useState } from "react";
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
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-civic-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-civic-trust/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5 border-b border-shield-glass/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-civic-blue via-civic-trust to-accent-success flex items-center justify-center shadow-lg shadow-civic-blue/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
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

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/demo")}
            className="btn-civic btn-ghost text-xs sm:text-sm flex items-center gap-1.5 py-2 px-3 rounded-xl border border-civic-trust/40 text-civic-trust hover:bg-civic-trust/10"
            id="nav-level2-demo"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Level 2 Demo
          </button>
          <button
            onClick={() => navigate("/claim")}
            className="btn-civic btn-primary text-xs sm:text-sm flex items-center gap-1.5 py-2 px-4 rounded-xl"
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

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-12 pb-16 lg:pt-20 lg:pb-24 max-w-7xl mx-auto">
        {/* Status Badge */}
        <div
          className={`
            trust-badge mb-6 transition-all duration-700
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
            transition-all duration-700 delay-100
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
            text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-10
            leading-relaxed transition-all duration-700 delay-200
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Decentralized emergency calamity aid distribution powered by Zero-Knowledge
          cryptographic nullifiers. Zero identity leaks, zero duplicate payouts, and zero ghost
          beneficiaries.
        </p>

        {/* Live Civic Telemetry HUD (Barangay Bond Style) */}
        <div
          className={`
            grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mb-12
            transition-all duration-700 delay-300
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {[
            {
              label: "Emergency Escrow Locked",
              val: "100,000 tNIGHT",
              sub: "Protected by Compact Circuit",
              icon: <Shield className="w-4 h-4 text-civic-sky" />,
            },
            {
              label: "Ghost Claims Blocked",
              val: "1,420 Attempted",
              sub: "Nullifier Collisions Prevented",
              icon: <Lock className="w-4 h-4 text-accent-purple" />,
            },
            {
              label: "Verified Beneficiaries",
              val: "2,850 Citizens",
              sub: "Relief Disbursed Privately",
              icon: <UserCheck className="w-4 h-4 text-accent-success" />,
            },
            {
              label: "Victim Identity Leaks",
              val: "0 Expositions",
              sub: "Strict Witness Sovereignty",
              icon: <EyeOff className="w-4 h-4 text-accent-gold" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card p-4 rounded-2xl border border-shield-glass/20 bg-slate-900/60 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {stat.val}
              </div>
              <div className="text-[0.7rem] text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Dual Primary CTA Cards */}
        <div
          className={`
            grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mb-16
            transition-all duration-700 delay-[350ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* Citizen CTA */}
          <button
            onClick={() => navigate("/claim")}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-accent-success/30 bg-gradient-to-b from-slate-900/80 to-slate-950/90 hover:border-accent-success/60 text-left group transition-all duration-300 shadow-xl shadow-accent-success/5 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-success/10 rounded-full blur-2xl group-hover:bg-accent-success/20 transition-all pointer-events-none" />
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
          </button>

          {/* LGU Admin CTA */}
          <button
            onClick={() => navigate("/admin/login")}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-civic-blue/30 bg-gradient-to-b from-slate-900/80 to-slate-950/90 hover:border-civic-blue/60 text-left group transition-all duration-300 shadow-xl shadow-civic-blue/5 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-civic-blue/10 rounded-full blur-2xl group-hover:bg-civic-blue/20 transition-all pointer-events-none" />
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
          </button>
        </div>

        {/* Interactive Protocol Engine Simulator */}
        <section className="w-full max-w-5xl mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-civic-trust px-3 py-1 rounded-full bg-civic-trust/10 border border-civic-trust/20">
              Interactive Protocol Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              How Zero-Knowledge Calamity Aid Works
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Explore the 4-phase cryptographic pipeline ensuring witness sovereignty and
              anti-ghost protection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-6">
            {protocolPhases.map((phase, i) => (
              <button
                key={phase.id}
                onClick={() => setActiveStep(i)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeStep === i
                    ? "bg-slate-800/90 border-civic-trust shadow-lg shadow-civic-trust/10"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                }`}
              >
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
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-shield-glass/30 bg-slate-900/80 backdrop-blur-xl">
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
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 uppercase font-semibold mb-2">
                  What Observer Sees (Public)
                </div>
                <div className="text-accent-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {activeStep === 3
                    ? "Nullifier recorded: 0x8a9b... + Calamity aid payout transferred"
                    : "Only aggregate Merkle root on blockchain ledger"}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 uppercase font-semibold mb-2">
                  What Remains Secret (Private)
                </div>
                <div className="text-civic-sky flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  National ID, resident secret PIN, and personal identity never exposed
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
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Grounded in Philippine Governance Law
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              GhostFree is engineered to satisfy national disaster audit requirements and data
              sovereignty mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statutoryLaws.map((law, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-shield-glass/20 bg-slate-900/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-accent-gold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-accent-gold/10 border border-accent-gold/20">
                      {law.code}
                    </span>
                    <Scale className="w-4 h-4 text-slate-400" />
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
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Everything you need to know about accounts, privacy, and fund distribution.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-shield-glass/20 bg-slate-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                >
                  <span className="font-bold text-white text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      expandedFaq === i ? "rotate-180 text-civic-trust" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-6 border-t border-shield-glass/10 bg-slate-950/80">
        <p className="text-slate-400 text-xs">
          GhostFree Civic-Tech Calamity Aid Protocol © {new Date().getFullYear()} · Deployed on{" "}
          <span className="text-civic-trust font-medium">Midnight Network</span> · Empowered by{" "}
          <span className="text-civic-trust font-medium">Lace Wallet & Compact ZK</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
