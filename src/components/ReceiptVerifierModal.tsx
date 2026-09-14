// ============================================
// GhostFree — Checkpoint Marshal Receipt Verifier Modal
// Instant on-field voucher validation for relief checkpoints
// Addresses feedback fb-user-010 for field marshals & barangay volunteers
// ============================================

import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
  Printer,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Landmark,
} from "lucide-react";
import {
  verifyReliefVoucher,
  type VoucherVerificationResult,
} from "../services/receiptVerifier.service";

interface ReceiptVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const ReceiptVerifierModal: React.FC<ReceiptVerifierModalProps> = ({
  isOpen,
  onClose,
  initialCode = "",
}) => {
  const [inputCode, setInputCode] = useState(initialCode);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VoucherVerificationResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setVerifying(true);
    try {
      const res = await verifyReliefVoucher(inputCode);
      setResult(res);
    } finally {
      setVerifying(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `GhostFree Voucher Verification: ${result.voucherCode} | Status: ${result.status} | Amount: ${result.amount || 100} tNIGHT | Contract: ${result.contractAddress} | Date: ${result.verifiedAt}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0F223D] border border-white/15 p-6 shadow-2xl shadow-black/80 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-civic-sky/10 border border-civic-sky/20 flex items-center justify-center text-civic-sky">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Checkpoint Marshal Verifier
            </h3>
            <p className="text-xs text-white/60">
              Verify relief voucher codes without inspecting private citizen data
            </p>
          </div>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleVerify} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
              Enter Voucher Code or Disbursement Hash
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. GF-CALAMITY-8A2F or 0x9f1a2b..."
                className="w-full px-4 py-3 rounded-xl bg-[#0A1628] border border-white/20 text-white placeholder-white/40 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-civic-sky"
              />
              <button
                type="submit"
                disabled={verifying || !inputCode.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-civic-sky text-[#0A1628] font-semibold text-xs hover:bg-civic-sky/90 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{verifying ? "Checking..." : "Verify"}</span>
              </button>
            </div>
          </div>
          <p className="text-[11px] text-white/40">
            Quick test examples: <code className="text-civic-sky cursor-pointer" onClick={() => setInputCode("GF-CALAMITY-77B1")}>GF-CALAMITY-77B1</code> (Valid) · <code className="text-amber-400 cursor-pointer" onClick={() => setInputCode("GF-SPENT-DOUBLE-001")}>GF-SPENT-DOUBLE-001</code> (Double Spent)
          </p>
        </form>

        {/* Verification Result Card */}
        {result && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-200">
            <div
              className={`p-4 rounded-xl border ${
                result.valid
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : result.status === "ALREADY_CLAIMED"
                  ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                  : "bg-red-950/40 border-red-500/40 text-red-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {result.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : result.status === "ALREADY_CLAIMED" ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-bold text-sm tracking-wide">
                  {result.valid
                    ? "STATUS: VERIFIED & DISBURSED"
                    : result.status === "ALREADY_CLAIMED"
                    ? "STATUS: ALREADY CLAIMED / DOUBLE-SPENT"
                    : "STATUS: UNVERIFIED / INVALID VOUCHER"}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">{result.message}</p>
            </div>

            {/* Details Table */}
            {result.valid && result.details && (
              <div className="p-4 rounded-xl bg-[#0A1628] border border-white/10 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Disbursement Amount:</span>
                  <span className="text-emerald-400 font-bold">{result.amount} tNIGHT</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Operation:</span>
                  <span className="text-white">{result.details.operationName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Checkpoint Station:</span>
                  <span className="text-white">{result.details.targetLGU}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Nullifier Lock:</span>
                  <span className="text-civic-sky">{result.nullifierPrefix}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Preprod Contract:</span>
                  <span className="text-white/70">{result.contractAddress.slice(0, 10)}...{result.contractAddress.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Verified Timestamp:</span>
                  <span className="text-white/70">{new Date(result.verifiedAt).toLocaleTimeString()}</span>
                </div>
              </div>
            )}

            {/* Marshal Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Log" : "Copy Verification Log"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Log</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptVerifierModal;
