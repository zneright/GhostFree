// ==============================================================================
// GhostFree — WalletConnect Component (Level 2 Specification)
// Handles Lace wallet connection, disconnection, address display, and error handling.
// ==============================================================================

import React from "react";
import { Wallet, LogOut, CheckCircle2, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { useMidnightWallet } from "../contexts/MidnightWalletContext";

interface WalletConnectProps {
  className?: string;
  showDetails?: boolean;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  className = "",
  showDetails = true,
}) => {
  const { address, connected, connecting, error, connect, disconnect, networkId } =
    useMidnightWallet();

  const formattedAddress = address
    ? `${address.slice(0, 10)}...${address.slice(-8)}`
    : null;

  return (
    <div className={`glass-card p-5 sm:p-6 rounded-2xl border border-shield-glass/30 bg-slate-900/80 backdrop-blur-md ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
              connected
                ? "bg-accent-success/15 border-accent-success/40 text-accent-success"
                : connecting
                ? "bg-civic-trust/15 border-civic-trust/40 text-civic-trust"
                : "bg-slate-800/80 border-slate-700 text-slate-400"
            }`}
          >
            {connecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : connected ? (
              <ShieldCheck className="w-5 h-5" />
            ) : (
              <Wallet className="w-5 h-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">
                {connected ? "Lace Wallet Connected" : "Midnight Lace Wallet"}
              </span>
              <span
                className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                  connected
                    ? "bg-accent-success/20 text-accent-success border-accent-success/30"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                {connected ? networkId || "Preprod" : "Disconnected"}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-0.5">
              {connected && address
                ? formattedAddress
                : "Connect to Midnight Network Preprod to execute confidential circuits"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {connected ? (
            <button
              onClick={disconnect}
              className="btn-civic btn-danger text-xs sm:text-sm flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer hover:bg-rose-500/20 transition-all border border-rose-500/40 text-rose-300"
              id="btn-disconnect-lace"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => connect("preprod")}
              disabled={connecting}
              className="btn-civic btn-primary text-xs sm:text-sm flex items-center gap-2 py-2.5 px-5 rounded-xl cursor-pointer shadow-lg shadow-civic-blue/25 hover:shadow-civic-blue/40 transition-all font-semibold"
              id="btn-connect-lace"
            >
              {connecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Lace Wallet
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Connected Details Panel */}
      {connected && showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-success" />
            <span className="text-slate-400">Account:</span>
            <span className="text-white select-all">{address}</span>
          </div>
          <div className="text-slate-400">
            Network: <span className="text-civic-sky uppercase">{networkId || "preprod"}</span>
          </div>
        </div>
      )}

      {/* Error Messaging */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Connection Notice:</div>
            <div>{error}</div>
            <div className="mt-1 text-[0.7rem] text-rose-400">
              Ensure Midnight Lace extension is installed, active in your browser, and set to Preprod network.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
