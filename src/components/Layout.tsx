// ============================================
// GhostFree — Layout Component
// ============================================
//
// Shared page layout wrapper providing consistent structure
// across all GhostFree portal views. Renders a minimal
// navigation header and footer with dynamic content area,
// quick onboarding tour access, and feedback actions.

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  MessageSquarePlus,
  Landmark,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Globe,
  Smartphone,
  Key,
  Sun,
  Moon,
} from "lucide-react";
import { GithubIcon, TwitterIcon } from "./SocialIcons";
import OnboardingModal from "./OnboardingModal";
import LanguageSelector from "./LanguageSelector";
import ReceiptVerifierModal from "./ReceiptVerifierModal";
import GhostFreeLogo from "./GhostFreeLogo";
import { useTranslation } from "../services/i18n.service";
import {
  getAccessibilityPreferences,
  setAccessibilityPreferences,
} from "../services/feedback.service";

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

  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll-aware header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Synchronized Light/Dark Theme Engine
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return (
      document.documentElement.classList.contains("light-mode") ||
      document.documentElement.classList.contains("sunlight-mode") ||
      document.body.classList.contains("light-mode") ||
      document.body.classList.contains("sunlight-mode")
    );
  });

  useEffect(() => {
    const syncTheme = () => {
      setIsLightMode(
        document.documentElement.classList.contains("light-mode") ||
        document.documentElement.classList.contains("sunlight-mode") ||
        document.body.classList.contains("light-mode") ||
        document.body.classList.contains("sunlight-mode")
      );
    };
    window.addEventListener("ghostfree_theme_change", syncTheme);
    return () => window.removeEventListener("ghostfree_theme_change", syncTheme);
  }, []);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    if (next) {
      document.documentElement.classList.add("light-mode", "sunlight-mode");
      document.documentElement.classList.remove("dark", "high-contrast");
      document.body.classList.add("light-mode", "sunlight-mode");
      document.body.classList.remove("dark", "high-contrast");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light-mode", "sunlight-mode", "high-contrast");
      document.body.classList.add("dark");
      document.body.classList.remove("light-mode", "sunlight-mode", "high-contrast");
    }
    const current = getAccessibilityPreferences();
    const updated = {
      ...current,
      sunlightMode: next,
      highContrast: false,
    };
    setAccessibilityPreferences(updated);
    window.dispatchEvent(new Event("ghostfree_theme_change"));
  };

  return (
    <div className="min-h-screen flex flex-col ambient-canvas text-white selection:bg-amber-500/30 selection:text-white">
      {/* Top Disaster Emergency Broadcast Bar - Refined Modern Civic Aesthetic */}
      <div className="calamity-alert-bar w-full bg-gradient-to-r from-red-950/80 via-slate-900/90 to-red-950/80 text-slate-200 text-[0.7rem] sm:text-xs font-medium py-1 px-4 shadow-sm flex items-center justify-between overflow-hidden relative border-b border-red-500/20 backdrop-blur-md">
        <div className="flex items-center gap-2.5 max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1.5 bg-red-500/15 text-red-400 border border-red-500/30 font-bold px-2 py-0.5 rounded-full text-[0.62rem] uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {t("advisoryBadge", "CALAMITY ADVISORY")}
          </span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <span className="inline-block animate-marquee sm:animate-none text-slate-300">
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
            ? "border-white/[0.08] backdrop-blur-2xl bg-[#0A1628]/95 shadow-xl shadow-black/30"
            : "border-white/[0.06] backdrop-blur-xl bg-[#0A1628]/80"
          }
        `}
      >
        {/* Top subtle ambient highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />

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

          {/* Desktop Nav: Streamlined to 2 text links + Tools dropdown + 1 Primary CTA */}
          <div className="hidden md:flex items-center gap-1.5">
            <a
              href="/transparency"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all flex items-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400/90" />
              <span>{t("treasury", "Treasury")}</span>
            </a>

            <a
              href="/admin/login"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-sky-400/90" />
              <span>{t("lguDrrmButton", "LGU DRRM")}</span>
            </a>

            {/* Tools Dropdown (Verify Voucher + Tour) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all flex items-center gap-1"
                aria-expanded={toolsDropdownOpen}
              >
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180 text-amber-400" : ""}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setShowVerifier(true);
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full px-2.5 py-2 rounded-lg text-xs text-left text-slate-200 hover:text-emerald-300 hover:bg-white/[0.06] transition-all flex items-center gap-2 font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t("verifyVoucherButton", "Verify Voucher")}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowOnboarding(true);
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full px-2.5 py-2 rounded-lg text-xs text-left text-slate-200 hover:text-sky-300 hover:bg-white/[0.06] transition-all flex items-center gap-2 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>{t("tourGuideButton", "Guide / Tour")}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-4 w-[1px] bg-white/10 mx-1.5" />

            {/* Desktop Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-white/[0.06] transition-all flex items-center justify-center border border-transparent hover:border-white/10"
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle Theme"
              id="header-theme-toggle"
            >
              {isLightMode ? (
                <Moon className="w-4 h-4 text-slate-700 hover:text-amber-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              )}
            </button>

            <LanguageSelector />

            {/* Single Prominent Primary CTA */}
            <a
              href="/claim"
              className="ml-2 px-4 py-2 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 border border-amber-300/60 transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-950" />
              <span>{t("claimAyudaButton", "Claim Aid (₱5,000)")}</span>
            </a>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-slate-300 hover:text-amber-400 transition-colors"
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <a
              href="/claim"
              className="px-3 py-1.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md"
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
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-black text-slate-950 bg-amber-400 transition-colors"
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

            {/* Mobile Theme Toggle Row */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.04]">
              <span className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                {isLightMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-amber-400" />}
                <span>{isLightMode ? "Light Mode" : "Dark Mode"}</span>
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {isLightMode ? "Switch to Dark" : "Switch to Light"}
              </button>
            </div>

            <div className="pt-1 px-1">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Safe Mobile Spacing */}
      <main className={`flex-1 pb-16 sm:pb-8 ${className}`}>
        {children}
      </main>

      {/* Footer - Elevated 4-Column Design with Trust & Compliance Badges */}
      {showFooter && (
        <>
          <div className="footer-gradient-divider" />
          <footer className="w-full bg-slate-950/95 backdrop-blur-2xl border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {/* Col 1: Brand & Mission */}
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <GhostFreeLogo size={32} variant="icon" />
                    <span className="text-base font-black text-white tracking-tight">GhostFree</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mb-3">
                    {t("tagline", "Stop the ghosts. Protect the people.")}
                  </p>
                  <p className="text-[0.7rem] text-slate-500 leading-relaxed max-w-xs">
                    Decentralized, privacy-first calamity cash aid on Midnight Network. Protecting typhoon victims and eliminating phantom claims via Zero-Knowledge Merkle nullifiers.
                  </p>
                </div>

                {/* Col 2: Solutions & Portals */}
                <div>
                  <h4 className="text-[0.7rem] font-bold text-white uppercase tracking-wider mb-3">Portals & Tools</h4>
                  <div className="space-y-2">
                    <a href="/claim" className="text-xs text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t("tabCitizen", "Citizen Claim (₱5,000)")}</span>
                    </a>
                    <a href="/transparency" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t("treasury", "Public Treasury Explorer")}</span>
                    </a>
                    <a href="/admin/login" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t("tabAdmin", "LGU DRRM Command")}</span>
                    </a>
                    <button
                      onClick={() => setShowVerifier(true)}
                      className="text-xs text-slate-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t("verifyVoucherButton", "Verify Relief Voucher")}</span>
                    </button>
                  </div>
                </div>

                {/* Col 3: Statutory Governance & Compliance */}
                <div>
                  <h4 className="text-[0.7rem] font-bold text-white uppercase tracking-wider mb-3">Compliance & Laws</h4>
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>R.A. 10121 (DRRM Act)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>R.A. 10173 (Data Privacy Act)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>COA Calamity Fund Audit</span>
                    </div>
                    <button
                      onClick={() => setShowOnboarding(true)}
                      className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 pt-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Interactive System Tour</span>
                    </button>
                  </div>
                </div>

                {/* Col 4: Network & Connect */}
                <div>
                  <h4 className="text-[0.7rem] font-bold text-white uppercase tracking-wider mb-3">Network & Links</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <a
                      href="https://x.com/GhostFreepwhq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                      title="Follow GhostFree on X"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/zneright/GhostFree"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                      title="GhostFree GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://ghost-free-eight.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                      title="Live Web Portal"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-[0.68rem] text-slate-400">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Midnight Preprod</span>
                    </div>
                    <span className="text-[0.62rem] text-slate-500 font-mono">Compact v0.2.0 Circuit</span>
                  </div>
                </div>
              </div>

              {/* Statutory Compliance Badges Strip */}
              <div className="py-4 border-t border-b border-white/[0.06] mb-6 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-[0.65rem] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Republic Act 10121 NDRRMC Ready</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NPC National Privacy Commission Aligned</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>COA Circular 2014-002 Real-Time Audit</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Zero-Knowledge Proof Sovereign Privacy</span>
                </span>
              </div>

              {/* Bottom bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.65rem] text-slate-500">
                <span>© {new Date().getFullYear()} GhostFree — Stop the ghosts. Protect the people.</span>
                <span>Built on Midnight Network · Compact Smart Contracts</span>
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
