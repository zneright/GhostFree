// ============================================
// GhostFree — LGU Emergency Tranche Quorum Simulator Modal
// Dual-signatory multi-sig threshold simulator for municipal DRRM & Treasury
// Addresses feedback fb-user-011 for LGU officers and auditors
// ============================================

import React, { useState } from "react";
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Users,
  Key,
  AlertCircle,
  X,
  Sparkles,
  ArrowRight,
  Lock,
} from "lucide-react";
import { MIDNIGHT_CONFIG } from "../configuration/midnight.config";

interface TrancheQuorumModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance?: number;
}

export const TrancheQuorumModal: React.FC<TrancheQuorumModalProps> = ({
  isOpen,
  onClose,
  currentBalance = 48500,
}) => {
  const [trancheAmount, setTrancheAmount] = useState<number>(25000);
  const [signatory1Signed, setSignatory1Signed] = useState(false);
  const [signatory2Signed, setSignatory2Signed] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  if (!isOpen) return null;

  const signaturesCount = (signatory1Signed ? 1 : 0) + (signatory2Signed ? 1 : 0);
  const quorumMet = signaturesCount >= 2;

  const handleExecuteTranche = async () => {
    if (!quorumMet) return;
    setExecuting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setTxHash(`0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`);
    setExecuting(false);
    setExecuted(true);
  };

  const handleReset = () => {
    setSignatory1Signed(false);
    setSignatory2Signed(false);
    setExecuted(false);
    setTxHash(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0F223D] border border-white/15 p-6 shadow-2xl shadow-black/80 text-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Emergency Tranche Quorum Simulator
            </h3>
            <p className="text-xs text-white/60">
              Dual-officer threshold signature test before Midnight Preprod deposit
            </p>
          </div>
        </div>

        {!executed ? (
          <div className="space-y-6">
            {/* Tranche Amount Selector */}
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                Simulated Top-Up Tranche Amount (tNIGHT)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[10000, 25000, 50000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTrancheAmount(amt)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      trancheAmount === amt
                        ? "bg-accent-gold/20 border-accent-gold text-accent-gold shadow-md shadow-accent-gold/10"
                        : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    +{amt.toLocaleString()} tNIGHT
                  </button>
                ))}
              </div>
            </div>

            {/* Treasury Projection Card */}
            <div className="p-4 rounded-xl bg-[#0A1628] border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-white/50 block">Current Vault Balance:</span>
                <span className="font-mono text-sm text-white font-bold">{currentBalance.toLocaleString()} tNIGHT</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30" />
              <div>
                <span className="text-white/50 block">Projected Post-Tranche:</span>
                <span className="font-mono text-sm text-emerald-400 font-bold">
                  {(currentBalance + trancheAmount).toLocaleString()} tNIGHT
                </span>
              </div>
            </div>

            {/* Dual-Signatory Quorum Matrix */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white/80 uppercase tracking-wider">
                  Required Quorum Signatures ({signaturesCount}/2)
                </span>
                <span className={`font-mono text-xs font-bold ${quorumMet ? "text-emerald-400" : "text-amber-400"}`}>
                  {quorumMet ? "THRESHOLD REACHED" : "AWAITING SIGNATURE"}
                </span>
              </div>

              {/* Signatory 1: DRRM Officer */}
              <div
                onClick={() => setSignatory1Signed(!signatory1Signed)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  signatory1Signed
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-white/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${signatory1Signed ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"}`}>
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-xs text-white">Signatory 1: Municipal DRRM Officer</p>
                    <p className="text-[11px] text-white/50">Calamity damage assessment and beneficiary roster sign-off</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${signatory1Signed ? "bg-emerald-500 border-emerald-400 text-black" : "border-white/30"}`}>
                  {signatory1Signed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Signatory 2: Municipal Treasurer */}
              <div
                onClick={() => setSignatory2Signed(!signatory2Signed)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  signatory2Signed
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-white/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${signatory2Signed ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"}`}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-xs text-white">Signatory 2: Municipal Treasurer / LCE</p>
                    <p className="text-[11px] text-white/50">Fiscal appropriation and statutory COA escrow authority</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${signatory2Signed ? "bg-emerald-500 border-emerald-400 text-black" : "border-white/30"}`}>
                  {signatory2Signed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>

            {/* Execute Button */}
            <button
              onClick={handleExecuteTranche}
              disabled={!quorumMet || executing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-accent-gold to-amber-500 text-black font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              {executing ? (
                <span>Simulating Midnight Preprod Execution...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Simulated Tranche Deposit ({trancheAmount.toLocaleString()} tNIGHT)</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Emergency Tranche Simulated!</h4>
            <p className="text-xs text-white/70 max-w-sm mx-auto">
              Dual-officer quorum verification succeeded. Preprod treasury top-up circuit assertions satisfied.
            </p>

            <div className="p-3.5 rounded-xl bg-[#0A1628] border border-white/10 text-left text-xs font-mono space-y-1.5">
              <div className="text-white/50 text-[11px]">Simulated Transaction Hash:</div>
              <div className="text-civic-sky break-all text-[11px]">{txHash}</div>
            </div>

            <button
              onClick={handleReset}
              className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
            >
              Run Another Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrancheQuorumModal;
