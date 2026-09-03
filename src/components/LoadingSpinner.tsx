// ============================================
// GhostFree — LoadingSpinner
// Civic-tech loading spinner
// ============================================


import React from "react";
import { Shield } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  sublabel?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  label,
  sublabel,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-civic-sky/20 border-t-civic-sky rounded-full animate-spin`}
        />
        {size === "lg" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-5 h-5 text-civic-sky/40" />
          </div>
        )}
      </div>
      {label && (
        <p className="text-white text-sm font-medium text-center">{label}</p>
      )}
      {sublabel && (
        <p className="text-shield-muted text-xs text-center">{sublabel}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
