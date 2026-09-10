// ============================================
// GhostFree — Layout Component
// ============================================
//
// Shared page layout wrapper providing consistent structure
// across all GhostFree portal views. Renders a minimal
// navigation header and footer with dynamic content area.

import React from "react";

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
          <div className="text-xs text-white/40 hidden sm:block">
            Midnight Network · Privacy-First Civic Aid
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
            <span>
              Built on Midnight Network · Zero-Knowledge Privacy
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
