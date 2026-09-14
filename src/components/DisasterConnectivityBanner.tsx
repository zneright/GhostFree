// ============================================
// GhostFree — Disaster Connectivity Banner
// Visual indicator for offline state, low-bandwidth mode & draft recovery
// Addresses feedback fb-user-009 for field evacuees with unstable 2G/EDGE
// ============================================

import React, { useState, useEffect } from "react";
import {
  WifiOff,
  Wifi,
  RefreshCw,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import {
  networkResilience,
  type NetworkResilienceState,
} from "../services/networkResilience.service";

interface DisasterConnectivityBannerProps {
  className?: string;
  onRetry?: () => void;
}

export const DisasterConnectivityBanner: React.FC<DisasterConnectivityBannerProps> = ({
  className = "",
  onRetry,
}) => {
  const [state, setState] = useState<NetworkResilienceState>(networkResilience.getState());
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const unsubscribe = networkResilience.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  const handleManualCheck = async () => {
    setTesting(true);
    await networkResilience.testConnectivity();
    if (onRetry) onRetry();
    setTimeout(() => setTesting(false), 800);
  };

  const toggleLowBandwidth = () => {
    networkResilience.setLowBandwidthMode(!state.isLowBandwidth);
  };

  // If online and low bandwidth is disabled, keep banner hidden
  if (state.isOnline && !state.isLowBandwidth) {
    return null;
  }

  return (
    <div
      className={`w-full transition-all duration-300 ${className}`}
      role="status"
      aria-live="polite"
    >
      {!state.isOnline ? (
        <div className="bg-amber-950/80 border-b border-amber-500/30 text-amber-200 px-4 py-2.5 text-xs backdrop-blur-md flex flex-wrap items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-amber-500/20 text-amber-400 animate-pulse">
              <WifiOff className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-white">Disaster Zone Offline Mode:</span>{" "}
              <span>Cell signal lost. Your inputs are preserved locally. Zero data leaves your device.</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualCheck}
              disabled={testing}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-100 font-medium flex items-center gap-1.5 transition-colors text-[11px]"
            >
              <RefreshCw className={`w-3 h-3 ${testing ? "animate-spin" : ""}`} />
              <span>{testing ? "Checking..." : "Retry Signal"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-cyan-950/60 border-b border-cyan-500/20 text-cyan-200 px-4 py-1.5 text-xs backdrop-blur-md flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              <strong>Emergency Low-Bandwidth Mode Active:</strong> Visual effects disabled for fast 2G loading.
            </span>
          </div>
          <button
            onClick={toggleLowBandwidth}
            className="text-[11px] text-cyan-400 hover:underline font-medium"
          >
            Disable
          </button>
        </div>
      )}
    </div>
  );
};

export default DisasterConnectivityBanner;
