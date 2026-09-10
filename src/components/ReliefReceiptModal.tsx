// ============================================
// GhostFree — Confidential Calamity Relief Receipt
// Verifiable proof-of-relief without identity disclosure
// ============================================

import React, { useState } from "react";
import {
  FileCheck2,
  Copy,
  Check,
  Download,
  X,
  ShieldCheck,
  ExternalLink,
  Hash,
  Calendar,
  Layers,
  Banknote,
} from "lucide-react";
import type { ReliefReceipt } from "../types";

interface ReliefReceiptModalProps {
  receipt: ReliefReceipt | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReliefReceiptModal: React.FC<ReliefReceiptModalProps> = ({
  receipt,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !receipt) return null;

  const handleCopy = () => {
    const text = [
      `--- GHOSTFREE DISASTER RELIEF VOUCHER RECEIPT ---`,
      `Receipt ID: ${receipt.receiptId}`,
      `Status: ${receipt.status.toUpperCase()} (Midnight Network Preprod)`,
      `Disbursed Amount: ${receipt.amount.toLocaleString()} tNIGHT`,
      `Relief Operation: ${receipt.operationName}`,
      `Timestamp: ${receipt.timestamp}`,
      `Transaction Hash: ${receipt.transactionHash}`,
      `Anonymous Nullifier: ${receipt.nullifierSnippet}`,
      `Privacy Guarantee: Zero-Knowledge Verified (R.A. 10173 & R.A. 10121 compliant)`,
      `------------------------------------------------`,
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(receipt, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `GhostFree-Receipt-${receipt.receiptId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-accent-success/30 bg-[#0A1628] shadow-2xl p-6 sm:p-7">
        {/* Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-20 bg-accent-success/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close receipt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent-success/10 border border-accent-success/20 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5 text-accent-success" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">
              Proof of Relief Receipt
            </h3>
            <span className="text-[0.65rem] text-accent-success font-mono uppercase tracking-wider">
              {receipt.receiptId} · Verified Disbursal
            </span>
          </div>
        </div>

        {/* Receipt Box */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 font-mono text-xs mb-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-white/40 flex items-center gap-1.5 font-sans">
              <Banknote className="w-3.5 h-3.5 text-accent-success" />
              Disbursed Aid
            </span>
            <span className="text-white font-bold text-sm text-accent-success">
              {receipt.amount.toLocaleString()} tNIGHT
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-white/40 flex items-center gap-1.5 font-sans">
              <Layers className="w-3.5 h-3.5 text-civic-sky" />
              Operation
            </span>
            <span className="text-white/80 font-sans text-right truncate max-w-[200px]">
              {receipt.operationName}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-white/40 flex items-center gap-1.5 font-sans">
              <Calendar className="w-3.5 h-3.5 text-white/40" />
              Timestamp
            </span>
            <span className="text-white/60 text-[0.7rem]">
              {new Date(receipt.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="border-b border-white/5 pb-2">
            <span className="text-white/40 flex items-center gap-1.5 font-sans mb-1">
              <Hash className="w-3.5 h-3.5 text-civic-trust" />
              On-Chain Transaction
            </span>
            <p className="text-civic-sky text-[0.65rem] break-all bg-black/40 p-2 rounded border border-white/5">
              {receipt.transactionHash}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 font-sans">Nullifier Reference</span>
            <span className="text-white/70 text-[0.7rem]">
              {receipt.nullifierSnippet}
            </span>
          </div>
        </div>

        {/* Legal & Privacy Guarantee Note */}
        <div className="p-3 rounded-lg bg-civic-blue/10 border border-civic-blue/20 mb-5 text-[0.65rem] text-white/70 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-accent-success shrink-0 mt-0.5" />
          <span>
            This receipt proves authentic disbursement without revealing your identity.
            Recognized under R.A. 8792 (E-Commerce Act) and compliant with R.A. 10173 (Data Privacy).
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent-success" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Proof
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-civic-trust hover:bg-civic-trust/80 text-white transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-civic-trust/20"
          >
            <Download className="w-3.5 h-3.5" />
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReliefReceiptModal;
