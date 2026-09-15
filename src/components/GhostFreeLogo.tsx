// ============================================
// GhostFree — Official Logo Component
// ============================================
//
// Inline SVG recreation of the GhostFree hexagonal shield
// with Merkle tree node motif. Supports two variants:
//   - "icon"  → Shield + tree only (navbar, favicon, mobile)
//   - "full"  → Shield + tree + "GhostFree" wordmark
//
// Uses the brand gradient: navy #1E40AF → sky #3B82F6 → cyan #0EA5E9

import React from "react";

interface GhostFreeLogoProps {
  /** Render size in pixels (controls the icon portion) */
  size?: number;
  /** "icon" = shield only, "full" = shield + wordmark below */
  variant?: "icon" | "full";
  /** Enable ambient glow-pulse animation */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const GhostFreeLogo: React.FC<GhostFreeLogoProps> = ({
  size = 40,
  variant = "icon",
  animated = false,
  className = "",
}) => {
  const gradientId = `gf-grad-${Math.random().toString(36).slice(2, 8)}`;

  const iconSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "logo-glow" : ""} ${variant === "icon" ? className : ""}`}
      aria-label="GhostFree logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>

      {/* Outer hexagonal shield */}
      <path
        d="M60 8L108 32V80L60 112L12 80V32L60 8Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Inner hexagonal shield */}
      <path
        d="M60 22L98 41V75L60 100L22 75V41L60 22Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Merkle Tree — Root node (top center) */}
      <circle cx="60" cy="38" r="6" fill={`url(#${gradientId})`} />

      {/* Merkle Tree — Root stem down */}
      <line
        x1="60" y1="44" x2="60" y2="55"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Merkle Tree — Branch split point */}
      <circle cx="60" cy="55" r="3" fill={`url(#${gradientId})`} />

      {/* Merkle Tree — Left branch */}
      <line
        x1="60" y1="55" x2="38" y2="75"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Merkle Tree — Right branch */}
      <line
        x1="60" y1="55" x2="82" y2="75"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Merkle Tree — Left child node */}
      <circle cx="38" cy="75" r="5" fill={`url(#${gradientId})`} />

      {/* Merkle Tree — Right child node */}
      <circle cx="82" cy="75" r="5" fill={`url(#${gradientId})`} />

      {/* Merkle Tree — Left-left leaf branch */}
      <line
        x1="38" y1="75" x2="28" y2="88"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Merkle Tree — Left-right leaf branch */}
      <line
        x1="38" y1="75" x2="48" y2="88"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Merkle Tree — Right-left leaf branch */}
      <line
        x1="82" y1="75" x2="72" y2="88"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Merkle Tree — Right-right leaf branch */}
      <line
        x1="82" y1="75" x2="92" y2="88"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Merkle Tree — Leaf nodes */}
      <circle cx="28" cy="88" r="4" fill={`url(#${gradientId})`} />
      <circle cx="48" cy="88" r="4" fill={`url(#${gradientId})`} />
      <circle cx="72" cy="88" r="4" fill={`url(#${gradientId})`} />
      <circle cx="92" cy="88" r="4" fill={`url(#${gradientId})`} />
    </svg>
  );

  if (variant === "icon") {
    return iconSvg;
  }

  // "full" variant — icon + wordmark
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {iconSvg}
      <div
        className="font-sans font-extrabold tracking-tight leading-none"
        style={{ fontSize: size * 0.35 }}
      >
        <span className="bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent">
          GhostFree
        </span>
      </div>
    </div>
  );
};

export default GhostFreeLogo;
