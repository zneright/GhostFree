// ============================================
// GhostFree — Layout Component
// ============================================
//
// Shared page layout wrapper providing consistent structure
// across all GhostFree portal views. Renders a minimal
// navigation header and footer with dynamic content area,
// quick onboarding tour access, and feedback actions.

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  MessageSquarePlus,
  Landmark,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Globe,
  Smartphone,
  Key,
} from "lucide-react";
import { GithubIcon, TwitterIcon } from "./SocialIcons";
import OnboardingModal from "./OnboardingModal";
import FeedbackWidget from "./FeedbackWidget";
import LanguageSelector from "./LanguageSelector";
import ReceiptVerifierModal from "./ReceiptVerifierModal";
import GhostFreeLogo from "./GhostFreeLogo";
import { useTranslation } from "../services/i18n.service";

interface LayoutProps {
  children: React.ReactNode;
  /** Optional title displayed in the header area */
  title?: string;
  /** Whether to show the footer (default: true) */
  showFooter?: boolean;
  /** Additional CSS classes for the main content area */
  className?: string;
}

/**
 * Layout wraps page content with a consistent visual frame.
 * Used across the LGU Admin Portal and Citizen Claim Portal
 * to maintain cohesive branding and navigation structure.
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showFooter = true,
  className = "",
}) => {
  const { t } = useTranslation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showVerifier, setShowVerifier] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col ambient-canvas text-white selection:bg-amber-500/30 selection:text-white">
      {/* Top Disaster Emergency Broadcast Bar */}
      <div className="calamity-alert-bar w-full bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-[0.7rem] sm:text-xs font-semibold py-1.5 px-4 shadow-md flex items-center justify-between overflow-hidden relative border-b border-red-500/30">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1 bg-white text-red-700 font-extrabold px-1.5 py-0.5 rounded text-[0.6rem] uppercase tracking-wider shrink-0 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block mr-0.5" />
            {t("advisoryBadge", "CALAMITY ADVISORY")}
          </span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <span className="inline-block animate-marquee sm:animate-none">
              {t("advisoryMarquee", "🚨 TYPHOON RELIEF ACTIVE: Region II & IV-A evacuation centers eligible for ₱5,000 emergency cash assistance. Zero gas fees sponsored by DRRM.")}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`
          w-full border-b sticky top-0 z-50 transition-all duration-300
          ${scrolled
            ? "border-amber-500/20 backdrop-blur-2xl bg-[#0A1628]/95 shadow-xl shadow-black/30"
            : "border-white/[0.08] backdrop-blur-xl bg-[#0A1628]/80"
          }
        `}
      >
        {/* Top subtle ambient highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <GhostFreeLogo size={34} variant="icon" animated showGlow />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  GhostFree
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Preprod
                </span>
              </div>
              <span className="text-[0.65rem] font-medium text-slate-400 tracking-wide hidden sm:block">
                {t("headerTagline", "Safe Disaster Aid. Zero Ghost Beneficiaries.")}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/claim"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 border border-amber-300 transition-all flex items-center gap-1.5 shadow-sm shadow-amber-500/20"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-950" />
              <span>{t("claimAyudaButton", "Claim Aid (₱5,000)")}</span>
            </a>
            <a
              href="/transparency"
              className="px-2.5 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/5 border border-white/10 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("treasury", "Treasury")}</span>
            </a>
            <a
              href="/admin/login"
              className="px-2.5 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/5 border border-white/10 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Key className="w-3.5 h-3.5 text-sky-400" />
              <span>{t("lguDrrmButton", "LGU DRRM")}</span>
            </a>
            <button
              onClick={() => setShowVerifier(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs text-emerald-400 hover:bg-emerald-400/10 border border-emerald-400/30 transition-colors flex items-center gap-1.5 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("verifyVoucherButton", "Verify Voucher")}</span>
            </button>
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs text-sky-300 hover:bg-sky-400/10 border border-sky-400/30 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("tourGuideButton", "Guide / Tour")}</span>
            </button>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <LanguageSelector />
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/claim"
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-sm"
            >
              {t("claimAyudaButton", "Claim Aid")}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-4 pb-4 pt-2 space-y-2 border-t border-white/[0.08] bg-slate-950/95">
            <a
              href="/claim"
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 transition-colors"
            >
              <Smartphone className="w-4.5 h-4.5 text-slate-950" />
              {t("claimAyudaButton", "Claim Aid (₱5,000)")}
            </a>
            <a
              href="/transparency"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white hover:bg-white/5 transition-colors border border-white/5"
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              {t("publicTreasury", "Public Treasury")}
            </a>
            <a
              href="/admin/login"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white hover:bg-white/5 transition-colors border border-white/5"
            >
              <Key className="w-4 h-4 text-sky-400" />
              {t("lguDrrmButton", "LGU DRRM Command Center")}
            </a>
            <button
              onClick={() => { setShowVerifier(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-emerald-400 hover:bg-emerald-400/10 transition-colors w-full text-left border border-emerald-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              {t("verifyVoucherButton", "Verify Voucher")}
            </button>
            <button
              onClick={() => { setShowOnboarding(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-sky-300 hover:bg-sky-400/10 transition-colors w-full text-left border border-sky-500/20"
            >
              <Sparkles className="w-4 h-4" />
              {t("tourGuideButton", "Guide / Tour")}
            </button>
            <div className="pt-2 px-1">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Safe Mobile Spacing */}
      <main className={`flex-1 pb-16 sm:pb-8 ${className}`}>
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <>
          <div className="footer-gradient-divider" />
          <footer className="w-full bg-slate-950/90 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {/* Brand */}
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <GhostFreeLogo size={28} variant="icon" />
                    <span className="text-sm font-bold text-white">GhostFree</span>
                  </div>
                  <p className="text-[0.65rem] text-slate-500 leading-relaxed max-w-xs">
                    {t("tagline", "Stop the ghosts. Protect the people.")}
                  </p>
                </div>

                {/* Links */}
                <div>
                  <h4 className="text-[0.65rem] font-bold text-white uppercase tracking-wider mb-3">{t("quickLinks", "Quick Links")}</h4>
                  <div className="space-y-1.5">
                    {[
                      { label: t("tabCitizen", "Citizen Claim"), href: "/claim" },
                      { label: t("tabAdmin", "LGU Admin"), href: "/admin/login" },
                      { label: t("treasury", "Treasury"), href: "/transparency" },
                    ].map((l) => (
                      <a key={l.label} href={l.href} className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h4 className="text-[0.65rem] font-bold text-white uppercase tracking-wider mb-3">Connect</h4>
                  <div className="flex items-center gap-2">
                    <a href="https://github.com/zneright/GhostFree" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://x.com/AidGhostfree" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://ghost-free-eight.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.6rem] text-slate-500">
                <span>© {new Date().getFullYear()} GhostFree — Stop the ghosts. Protect the people.</span>
                <span>Built on Midnight Network · Zero-Knowledge Privacy</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Onboarding Tour Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />

      {/* Checkpoint Marshal Verifier Modal */}
      <ReceiptVerifierModal
        isOpen={showVerifier}
        onClose={() => setShowVerifier(false)}
      />
    </div>
  );
};

export default Layout;
