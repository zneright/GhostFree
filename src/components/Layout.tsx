// ============================================
// GhostFree — Layout Component
// ============================================
//
// Shared page layout wrapper providing consistent structure
// across all GhostFree portal views. Renders a minimal
// navigation header and footer with dynamic content area,
// quick onboarding tour access, and feedback actions.

import React, { useState } from "react";
import { Sparkles, MessageSquarePlus, Landmark, ShieldCheck } from "lucide-react";
import OnboardingModal from "./OnboardingModal";
import FeedbackWidget from "./FeedbackWidget";
import LanguageSelector from "./LanguageSelector";
import ReceiptVerifierModal from "./ReceiptVerifierModal";

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

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1628] text-white">
      {/* Header */}
      <header className="w-full border-b border-white/10 backdrop-blur-md bg-[#0A1628]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-[#0A1628]">
              GF
            </div>
            <span className="text-lg font-semibold tracking-tight">
              GhostFree
            </span>
            {title && (
              <span className="hidden sm:inline text-sm text-white/50 ml-2">
                — {title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
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
            <div className="text-xs text-white/40 hidden md:block">
              Midnight Network · Privacy-First Civic Aid
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
        <footer className="w-full border-t border-white/10 bg-[#0A1628]/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <span>
              © {new Date().getFullYear()} GhostFree — Stop the ghosts. Protect the people.
            </span>
            <div className="flex items-center gap-4">
              <a href="/transparency" className="hover:text-white transition-colors">
                Public Treasury
              </a>
              <span>·</span>
              <button
                onClick={() => setShowVerifier(true)}
                className="hover:text-emerald-400 transition-colors"
              >
                Marshal Verifier
              </button>
              <span>·</span>
              <button
                onClick={() => setShowOnboarding(true)}
                className="hover:text-white transition-colors"
              >
                How It Works
              </button>
              <span>·</span>
              <span>Built on Midnight Network · Zero-Knowledge Privacy</span>
            </div>
          </div>
        </footer>
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
