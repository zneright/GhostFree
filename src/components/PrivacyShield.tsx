// ============================================
// GhostFree — PrivacyShield Component
// Visual ZK privacy indicator
// ============================================

import React from "react";
import { ShieldCheck, EyeOff, Lock } from "lucide-react";

interface PrivacyShieldProps {
  variant?: "inline" | "card";
  message?: string;
}

export const PrivacyShield: React.FC<PrivacyShieldProps> = ({
  variant = "inline",
  message = "Your data never leaves this device",
}) => {
  if (variant === "card") {
    return (
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent-success/10 border border-accent-success/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-accent-success" />
        </div>
        <div>
          <p className="text-white text-sm font-medium flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-accent-success" />
            Privacy Protected
          </p>
          <p className="text-shield-muted text-xs mt-0.5">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-shield-muted">
      <EyeOff className="w-3 h-3 text-accent-success" />
      <span>{message}</span>
    </div>
  );
};

export default PrivacyShield;
