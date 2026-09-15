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
    <div className="min-h-screen flex flex-col bg-[#0A1628] text-white">
      {/* Header */}
      <header
        className={`
          w-full border-b sticky top-0 z-50 transition-all duration-300
          ${scrolled
            ? "border-white/[0.08] backdrop-blur-2xl bg-[#0A1628]/90 shadow-lg shadow-black/10"
            : "border-white/[0.04] backdrop-blur-md bg-[#0A1628]/60"
          }
        `}
      >
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-civic-blue/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GhostFreeLogo size={32} variant="icon" animated />
            <span className="text-lg font-bold tracking-tight">
              GhostFree
            </span>
            {title && (
              <span className="hidden sm:inline text-sm text-white/50 ml-1">
                — {title}
              </span>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="/transparency"
              className="px-2.5 py-1 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Landmark className="w-3.5 h-3.5 text-accent-gold" />
              <span>Treasury</span>
            </a>
            <button
              onClick={() => setShowVerifier(true)}
              className="px-2.5 py-1 rounded-lg text-xs text-emerald-400 hover:bg-emerald-400/10 border border-emerald-400/20 transition-colors flex items-center gap-1.5 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Voucher</span>
            </button>
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-2.5 py-1 rounded-lg text-xs text-civic-sky hover:bg-civic-sky/10 border border-civic-sky/20 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tour</span>
            </button>
            <LanguageSelector />
            <div className="text-xs text-white/40 hidden lg:block">
              Midnight Network · Privacy-First Civic Aid
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white/70 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Slide-in Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/[0.06]">
            <a
              href="/claim"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white hover:bg-white/5 transition-colors"
            >
              <Smartphone className="w-4 h-4 text-accent-success" />
              Citizen Claim Portal
            </a>
            <a
              href="/admin/login"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white hover:bg-white/5 transition-colors"
            >
              <Landmark className="w-4 h-4 text-civic-sky" />
              LGU Admin Portal
            </a>
            <a
              href="/transparency"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-colors"
            >
              <Landmark className="w-4 h-4 text-accent-gold" />
              Treasury Explorer
            </a>
            <button
              onClick={() => { setShowVerifier(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-emerald-400 hover:bg-emerald-400/5 transition-colors w-full text-left"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify Voucher
            </button>
            <button
              onClick={() => { setShowOnboarding(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-civic-sky hover:bg-civic-sky/5 transition-colors w-full text-left"
            >
              <Sparkles className="w-4 h-4" />
              Product Tour
            </button>
            <div className="pt-2 px-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 ${className}`}>
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
                    Stop the ghosts. Protect the people. Privacy-first calamity aid on the Midnight Network.
                  </p>
                </div>

                {/* Links */}
                <div>
                  <h4 className="text-[0.65rem] font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
                  <div className="space-y-1.5">
                    {[
                      { label: "Citizen Claim", href: "/claim" },
                      { label: "LGU Admin", href: "/admin/login" },
                      { label: "Treasury", href: "/transparency" },
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
