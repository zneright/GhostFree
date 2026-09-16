// ============================================
// GhostFree — Official Logo Component
// ============================================
//
// Renders the official 3D hexagonal shield and Merkle
// tree brand mark. Supports:
//   - "icon": Shield only (navbar, favicon, buttons)
//   - "full": Shield + "GhostFree" wordmark
//   - "hero": Enhanced large display with radial glow aura
//
// Uses high-DPI transparent PNG assets with inline SVG fallback.

import React, { useState } from "react";

interface GhostFreeLogoProps {
  /** Render size in pixels */
  size?: number;
  /** Variant: icon only, full logo with text, or hero badge */
  variant?: "icon" | "full" | "hero";
  /** Enable ambient glow-pulse animation */
  animated?: boolean;
  /** Show subtle ambient glow aura behind mark */
  showGlow?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const GhostFreeLogo: React.FC<GhostFreeLogoProps> = ({
  size = 40,
  variant = "icon",
  animated = false,
  showGlow = false,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc = variant === "full" ? "/logo-full.png" : "/logo-icon.png";

  const glowStyle = showGlow || animated
    ? {
        filter: "drop-shadow(0 0 16px rgba(59, 130, 246, 0.45)) drop-shadow(0 0 32px rgba(14, 165, 233, 0.25))",
      }
    : undefined;

  // Inline SVG fallback if PNG ever fails
  const renderFallbackSvg = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? "logo-glow" : ""}
      aria-label="GhostFree logo fallback"
    >
      <defs>
        <linearGradient id="gf-fallback-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <path
        d="M60 8L108 32V80L60 112L12 80V32L60 8Z"
        stroke="url(#gf-fallback-grad)"
        strokeWidth="6"
        strokeLinejoin="round"
        fill="rgba(30, 64, 175, 0.1)"
      />
      <circle cx="60" cy="38" r="7" fill="url(#gf-fallback-grad)" />
      <line x1="60" y1="45" x2="60" y2="58" stroke="url(#gf-fallback-grad)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="58" r="4" fill="url(#gf-fallback-grad)" />
      <line x1="60" y1="58" x2="38" y2="76" stroke="url(#gf-fallback-grad)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="58" x2="82" y2="76" stroke="url(#gf-fallback-grad)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="38" cy="76" r="6" fill="url(#gf-fallback-grad)" />
      <circle cx="82" cy="76" r="6" fill="url(#gf-fallback-grad)" />
    </svg>
  );

  if (variant === "hero") {
    return (
      <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
        {/* Ambient background bloom */}
        <div
          className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-600/30 via-sky-500/25 to-cyan-400/20 blur-2xl pointer-events-none animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        {!imgError ? (
          <img
            src="/logo-full.png"
            alt="GhostFree Logo"
            width={size}
            height={Math.round(size * 1.01)}
            style={{
              width: `${size}px`,
              height: "auto",
              ...glowStyle,
            }}
            className={`relative z-10 transition-transform duration-300 hover:scale-105 ${animated ? "logo-glow" : ""}`}
            onError={() => setImgError(true)}
          />
        ) : (
          renderFallbackSvg()
        )}
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {!imgError ? (
          <img
            src="/logo-full.png"
            alt="GhostFree Logo"
            width={size}
            style={{
              width: `${size}px`,
              height: "auto",
              ...glowStyle,
            }}
            className={`transition-transform duration-200 hover:scale-102 ${animated ? "logo-glow" : ""}`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center gap-2.5">
            {renderFallbackSvg()}
            <span className="font-extrabold tracking-tight bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent text-xl">
              GhostFree
            </span>
          </div>
        )}
      </div>
    );
  }

  // "icon" variant (default)
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-md pointer-events-none" />
      )}
      {!imgError ? (
        <img
          src="/logo-icon.png"
          alt="GhostFree Shield Mark"
          width={size}
          height={size}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            ...glowStyle,
          }}
          className={`relative z-10 object-contain transition-transform duration-200 hover:scale-105 ${animated ? "logo-glow" : ""}`}
          onError={() => setImgError(true)}
        />
      ) : (
        renderFallbackSvg()
      )}
    </div>
  );
};

export default GhostFreeLogo;
