// ============================================
// GhostFree — WalletButton Component
// Lace wallet connect/disconnect button
// ============================================

import React from "react";
import { Wallet, Loader2, Check, ChevronDown } from "lucide-react";
import { useMidnightWallet } from "../contexts/MidnightWalletContext";

interface WalletButtonProps {
  variant?: "primary" | "compact";
  className?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  variant = "primary",
  className = "",
}) => {
  const { address, connected, connecting, connect, disconnect } = useMidnightWallet();

  if (connected && address) {
    return (
      <button
        onClick={disconnect}
        className={`
          inline-flex items-center gap-2 rounded-xl transition-all
          bg-accent-success/10 border border-accent-success/20
          hover:bg-accent-success/15 hover:border-accent-success/30
          ${variant === "compact" ? "px-2.5 py-1.5 text-xs" : "px-4 py-2.5 text-sm"}
          ${className}
        `}
      >
        <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
        <span className="font-mono text-accent-success">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <ChevronDown className="w-3 h-3 text-accent-success/60" />
      </button>
    );
  }

  return (
    <button
      onClick={() => connect()}
      disabled={connecting}
      className={`
        btn-civic btn-primary tap-scale
        ${variant === "compact" ? "py-2 px-3 text-xs" : "py-2.5 px-5 text-sm"}
        ${className}
      `}
    >
      {connecting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </>
      )}
    </button>
  );
};

export default WalletButton;
