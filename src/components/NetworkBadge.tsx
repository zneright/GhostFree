// ============================================
// GhostFree — NetworkBadge
// Shows Midnight network connection status
// ============================================


import React from "react";
import { Wifi, WifiOff } from "lucide-react";
import { getNetworkLabel } from "../configuration/midnight.config";

interface NetworkBadgeProps {
  networkId: string | null;
  connected: boolean;
  className?: string;
}

export const NetworkBadge: React.FC<NetworkBadgeProps> = ({
  networkId,
  connected,
  className = "",
}) => {
  if (!networkId) return null;

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
        ${
          connected
            ? "bg-accent-success/10 border border-accent-success/20 text-accent-success"
            : "bg-accent-warning/10 border border-accent-warning/20 text-accent-warning"
        }
        ${className}
      `}
    >
      {connected ? (
        <Wifi className="w-3 h-3" />
      ) : (
        <WifiOff className="w-3 h-3" />
      )}
      <span>{getNetworkLabel(networkId)}</span>
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          connected ? "bg-accent-success animate-pulse" : "bg-accent-warning"
        }`}
      />
    </div>
  );
};

export default NetworkBadge;
