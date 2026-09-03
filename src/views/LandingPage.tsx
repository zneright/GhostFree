// ============================================
// GhostFree — Landing Page
// Hero + Dual CTA + Trust Badges
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
} from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-dvh bg-civic-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-civic-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-civic-trust/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-civic-blue to-civic-trust flex items-center justify-center shadow-civic">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">
              GhostFree
            </h1>
            <p className="text-[0.65rem] text-civic-trust font-medium tracking-widest uppercase">
              Midnight Network
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/login")}
          className="btn-civic btn-ghost text-sm hidden sm:flex items-center gap-1.5"
        >
          <Landmark className="w-4 h-4" />
          LGU Admin Portal
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-12 pb-8 lg:pt-24 lg:pb-16">
        {/* Status Badge */}
        <div
          className={`
            trust-badge mb-8 transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <Zap className="w-3.5 h-3.5 text-accent-success" />
          <span>Zero-Knowledge Verified on Midnight</span>
        </div>

        {/* Main Heading */}
        <h2
          className={`
            text-4xl sm:text-5xl lg:text-7xl font-black text-center text-white
            leading-[1.1] tracking-tight max-w-4xl mb-6
            transition-all duration-700 delay-100
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Stop the Ghosts.{" "}
          <span className="text-gradient">Protect the People.</span>
        </h2>

        {/* Subtitle */}
        <p
          className={`
            text-lg sm:text-xl text-shield-muted text-center max-w-2xl mb-12
            leading-relaxed transition-all duration-700 delay-200
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Decentralized calamity aid distribution powered by zero-knowledge proofs.
          No identity exposed. No double claims. Every peso reaches the right person.
        </p>

        {/* Dual CTA Cards */}
        <div
          className={`
            grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl mb-16
            transition-all duration-700 delay-300
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* LGU Admin CTA */}
          <button
            onClick={() => navigate("/admin/login")}
            className="glass-card glass-card-hover p-6 text-left group tap-scale cursor-pointer"
            id="cta-admin"
          >
            <div className="w-12 h-12 rounded-2xl bg-civic-blue/10 border border-civic-blue/20 flex items-center justify-center mb-4 group-hover:bg-civic-blue/20 transition-colors">
              <Landmark className="w-6 h-6 text-civic-sky" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1.5 flex items-center gap-2">
              I'm an LGU Official
              <ChevronRight className="w-4 h-4 text-civic-sky opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-shield-muted text-sm leading-relaxed">
              Upload eligibility lists, deploy relief funds, and monitor claims
              from your secure admin dashboard.
            </p>
          </button>

          {/* Citizen CTA */}
          <button
            onClick={() => navigate("/claim")}
            className="glass-card glass-card-hover p-6 text-left group tap-scale cursor-pointer"
            id="cta-citizen"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent-success/10 border border-accent-success/20 flex items-center justify-center mb-4 group-hover:bg-accent-success/20 transition-colors">
              <Smartphone className="w-6 h-6 text-accent-success" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1.5 flex items-center gap-2">
              I'm a Citizen
              <ChevronRight className="w-4 h-4 text-accent-success opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-shield-muted text-sm leading-relaxed">
              Connect your wallet and claim your calamity aid privately.
              No account needed. No personal data shared.
            </p>
          </button>
        </div>

        {/* How It Works */}
        <div
          className={`
            w-full max-w-3xl transition-all duration-700 delay-[400ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h3 className="text-center text-shield-muted text-sm font-semibold uppercase tracking-widest mb-8">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Fingerprint className="w-5 h-5" />,
                title: "Prove Eligibility",
                desc: "Your ID + PIN generate a ZK proof locally on your device. Nothing is shared.",
                color: "text-civic-sky",
                bg: "bg-civic-sky/10",
                border: "border-civic-sky/20",
              },
              {
                icon: <EyeOff className="w-5 h-5" />,
                title: "Stay Anonymous",
                desc: "The contract verifies your proof without ever knowing who you are.",
                color: "text-accent-purple",
                bg: "bg-accent-purple/10",
                border: "border-accent-purple/20",
              },
              {
                icon: <UserCheck className="w-5 h-5" />,
                title: "Receive Aid",
                desc: "Funds transfer directly to your wallet. One claim per person, guaranteed.",
                color: "text-accent-success",
                bg: "bg-accent-success/10",
                border: "border-accent-success/20",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="glass-card p-5 flex flex-col items-center text-center"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center mb-3 ${step.color}`}
                >
                  {step.icon}
                </div>
                <h4 className="text-white font-semibold text-sm mb-1.5">
                  {step.title}
                </h4>
                <p className="text-shield-muted text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`
            flex flex-wrap items-center justify-center gap-3 mt-16
            transition-all duration-700 delay-500
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {[
            { icon: <Shield className="w-3.5 h-3.5" />, label: "Powered by Midnight" },
            { icon: <Lock className="w-3.5 h-3.5" />, label: "Zero-Knowledge Verified" },
            { icon: <Eye className="w-3.5 h-3.5" />, label: "On-Chain Transparency" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-shield-dark/60 border border-shield-glass/30 text-shield-muted text-xs font-medium"
            >
              {badge.icon}
              {badge.label}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-6 border-t border-shield-glass/20">
        <p className="text-shield-muted text-xs">
          GhostFree © {new Date().getFullYear()} · Built on{" "}
          <span className="text-civic-trust font-medium">Midnight Network</span> ·
          Secured by{" "}
          <span className="text-civic-trust font-medium">Lace Wallet</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
