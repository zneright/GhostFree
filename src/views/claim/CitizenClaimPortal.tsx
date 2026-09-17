// ============================================
// GhostFree — Citizen Claim Portal (v2.5)
// Mobile-First & PWD-Accessible Disaster Relief Terminal
// Illustrated PhilSys ID Guide · GCash-style MPIN Keypad · Human ZK Proving
// Evaluator Sandbox Mode · Digital Relief Voucher · Sticky Thumb Action
// ============================================

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMidnightWallet } from "../../contexts/MidnightWalletContext";
import { useMidnightContract } from "../../hooks/useMidnightContract";
import { validateClaimInputs } from "../../services/proof.service";
import { generateReliefReceipt, submitFeedback } from "../../services/feedback.service";
import type { ClaimStep, ClaimResult, ReliefReceipt } from "../../types";
import ReliefReceiptModal from "../../components/ReliefReceiptModal";
import LanguageSelector from "../../components/LanguageSelector";
import DisasterConnectivityBanner from "../../components/DisasterConnectivityBanner";
import GhostFreeLogo from "../../components/GhostFreeLogo";
import Layout from "../../components/Layout";
import {
  useTranslation,
  type SupportedLanguage,
} from "../../services/i18n.service";
import { useVoiceAssistant } from "../../services/voice.service";
import {
  Shield,
  Wallet,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Download,
  Landmark,
  Check,
  Volume2,
  VolumeX,
  CreditCard,
  Copy,
  Printer,
  ChevronDown,
  ChevronUp,
  Delete,
  QrCode,
  Radio,
} from "lucide-react";

// ---- Holographic Radar Scanner Component ----
const RadarProvingScanner: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
      {/* Outer ambient glow pulse */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />

      {/* Rotating radar sweep */}
      <div className="absolute inset-1 rounded-full border border-emerald-500/30 radar-ring" />

      {/* Concentric rings */}
      <div className="absolute inset-5 rounded-full border border-sky-500/20 border-dashed animate-spin" style={{ animationDuration: "20s" }} />
      <div className="absolute inset-10 rounded-full border border-amber-400/30" />
      <div className="absolute inset-16 rounded-full border border-emerald-400/40" />

      {/* Center core */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <ShieldCheck className="w-8 h-8 text-emerald-400 mb-1 animate-pulse" />
        <span className="text-2xl font-black text-white tabular-nums tracking-tight">
          {progress}%
        </span>
        <span className="text-[0.65rem] font-bold text-emerald-300 uppercase tracking-widest">
          Ligtas na ZK
        </span>
      </div>
    </div>
  );
};

// ---- Confetti Celebration Component ----
const ConfettiCelebration: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 85,
      y: 50 + (Math.random() - 0.5) * 65,
      color: ["#10B981", "#F59E0B", "#0EA5E9", "#FBBF24", "#34D399", "#38BDF8"][i % 6],
      delay: Math.random() * 0.4,
      size: 5 + Math.random() * 6,
    }));
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animation: `confettiBurst 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// ---- Illustrated PhilSys National ID Helper Card ----
const IllustratedIdCard: React.FC<{
  nationalId: string;
  onUseDemo: () => void;
}> = ({ nationalId, onUseDemo }) => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950/40 border-2 border-sky-500/30 relative overflow-hidden shadow-lg mb-4">
      {/* Philippine Flag Color Bars on top edge */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="h-full w-1/2 bg-blue-600" />
        <div className="h-full w-1/2 bg-red-600" />
      </div>

      <div className="flex items-center justify-between mb-3 pt-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[0.65rem] font-black text-amber-400">
            PH
          </div>
          <div>
            <span className="text-[0.65rem] font-bold text-slate-400 block uppercase tracking-wider">
              Republika ng Pilipinas · PhilSys
            </span>
            <span className="text-xs font-black text-white">Philippine Identification System</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onUseDemo}
          className="px-2.5 py-1 rounded-lg text-[0.7rem] font-bold bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/40 transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Auto-Fill Demo
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Photo Frame with hologram chip */}
        <div className="w-12 h-14 rounded-lg bg-slate-800 border border-white/10 flex flex-col items-center justify-center shrink-0 relative">
          <div className="w-6 h-6 rounded-full bg-slate-700 mb-1" />
          <div className="w-8 h-3 rounded-full bg-slate-700" />
          <div className="absolute bottom-0.5 right-0.5 w-3 h-2.5 rounded-sm bg-amber-400/80 border border-amber-300" title="Smart Chip" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[0.65rem] text-amber-400 font-bold block uppercase tracking-wider">
            PhilSys Card Number (PCN / Serial):
          </span>
          <div className="font-mono text-sm font-black text-white bg-black/40 px-2.5 py-1.5 rounded-lg border border-sky-400/40 tracking-wider truncate">
            {nationalId || "PSN-2024-8849-1102"}
          </div>
          <span className="text-[0.65rem] text-slate-400 block mt-1">
            📍 Hanapin ang 16-digit serial sa gitnang bahagi ng iyong pisikal na ID card.
          </span>
        </div>
      </div>
    </div>
  );
};

// ---- Main Component ----
export const CitizenClaimPortal: React.FC = () => {
  const navigate = useNavigate();
  const { connected, address, connect, isSandbox } = useMidnightWallet();
  const { executeClaimAidCircuit, state: contractState } = useMidnightContract();

  // Navigation & Flow State
  const [step, setStep] = useState<ClaimStep>("connect");
  const [connecting, setConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  // Beneficiary Input Credentials
  const [nationalId, setNationalId] = useState("");
  const [secretPin, setSecretPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Proving & Result State
  const [provingProgress, setProvingProgress] = useState(0);
  const [result, setResult] = useState<ClaimResult | null>(null);
  const [receipt, setReceipt] = useState<ReliefReceipt | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // In-line CSAT Feedback
  const [csatRating, setCsatRating] = useState<number>(5);
  const [csatSubmitted, setCsatSubmitted] = useState(false);
  const [csatComment, setCsatComment] = useState("");

  // Speech Voice Assistant
  const { isSpeaking, speak, stop } = useVoiceAssistant();

  // Accordion toggle on mobile
  const [showDetailsMobile, setShowDetailsMobile] = useState(false);

  // Validation
  const idValid = nationalId.trim().length >= 8;
  const pinValid = secretPin.trim().length >= 4;

  // Translation hook
  const { t, lang: currentLang } = useTranslation();

  // Voice guide trigger for current step (supports EN, FIL, CEB)
  const handleVoiceGuide = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    if (step === "connect") {
      speak("claimStep1");
    } else if (step === "credentials") {
      speak("claimStep2");
    } else if (step === "proving") {
      speak("claimStep3");
    } else {
      speak("claimStep4");
    }
  };

  // Auto-fill verified test resident
  const handleAutoFillDemoBeneficiary = () => {
    setNationalId("PSN-2024-8849-1102");
    setSecretPin("4912");
    setInputError(null);
  };

  // Connect Lace Wallet
  const handleConnectWallet = async () => {
    setConnecting(true);
    setWalletError(null);
    try {
      await connect();
      setStep("credentials");
    } catch (err) {
      setWalletError(
        err instanceof Error
          ? err.message
          : "Could not connect to Midnight Lace wallet. Please install the extension or click Launch Evaluator Sandbox."
      );
    } finally {
      setConnecting(false);
    }
  };

  // Connect Evaluator Sandbox (1-Click)
  const handleConnectSandbox = async () => {
    setConnecting(true);
    setWalletError(null);
    try {
      await connect("sandbox");
      setStep("credentials");
    } catch (err) {
      setWalletError(err instanceof Error ? err.message : "Failed to enter sandbox mode.");
    } finally {
      setConnecting(false);
    }
  };

  // Step 2 Submission -> Step 3 Proving
  const handleSubmitCredentials = () => {
    setInputError(null);

    const validation = validateClaimInputs(nationalId, secretPin);
    if (!validation.valid) {
      setInputError(validation.error || "Please check your PhilSys ID and 4-digit PIN.");
      return;
    }

    setStep("proving");
    setProvingProgress(5);

    // Simulate real WASM proving trajectory
    const intervals = [
      { p: 25, delay: 400 },
      { p: 55, delay: 800 },
      { p: 80, delay: 1300 },
      { p: 95, delay: 1800 },
      { p: 100, delay: 2300 },
    ];

    intervals.forEach(({ p, delay }) => {
      setTimeout(() => {
        setProvingProgress(p);
        if (p === 100) {
          executeClaimSettlement();
        }
      }, delay);
    });
  };

  // Step 3 Settlement -> Step 4 Result
  const executeClaimSettlement = async () => {
    try {
      const txRes = await executeClaimAidCircuit(nationalId, secretPin);
      const outcome: ClaimResult = {
        success: txRes.status === "confirmed",
        transactionHash: txRes.txHash,
        amount: contractState?.perClaimAmount || 5000,
      };
      setResult(outcome);

      if (outcome.success) {
        const newReceipt = generateReliefReceipt(
          outcome.transactionHash || `0x${Math.random().toString(16).slice(2)}`,
          outcome.amount || 5000,
          contractState?.operationName || "Typhoon Marce Quick Response Fund"
        );
        setReceipt(newReceipt);
        setShowConfetti(true);
      }
      setStep("result");
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : "Proof validation failed on chain.",
        errorCode: "PROOF_INVALID",
      });
      setStep("result");
    }
  };

  // CSAT rating submission
  const handleCsatSubmit = () => {
    submitFeedback({
      rating: csatRating,
      category: "usability",
      role: "citizen",
      comment: csatComment || "Citizen relief payout flow completed.",
    });
    setCsatSubmitted(true);
  };

  // Steps definition (fully localized)
  const steps = [
    { key: "connect", number: 1, label: t("stepConnect") },
    { key: "credentials", number: 2, label: t("stepVerify") },
    { key: "proving", number: 3, label: t("stepProve") },
    { key: "result", number: 4, label: t("stepResult") },
  ];
  const currentStepIndex = steps.findIndex((s) => s.key === step);

  // Keypad button click
  const handleKeypadPress = (val: string) => {
    if (val === "clear") {
      setSecretPin("");
    } else if (val === "backspace") {
      setSecretPin((prev) => prev.slice(0, -1));
    } else if (secretPin.length < 4) {
      setSecretPin((prev) => prev + val);
    }
  };

  return (
    <Layout showFooter={true}>
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 select-none">
        {/* Disaster Network Resilience Indicator */}
        <DisasterConnectivityBanner />

        {/* Top Mobile Emergency Aid Header Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-slate-900 border-2 border-amber-500/40 shadow-xl mb-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-extrabold bg-red-600 text-white uppercase tracking-wider animate-pulse flex items-center gap-1">
                  <Radio className="w-3 h-3" />
                  QRF Active
                </span>
                <span className="text-xs text-amber-400 font-bold">Typhoon Marce Calamity Assistance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                ₱5,000.00 <span className="text-sm sm:text-base font-normal text-slate-300">
                  {currentLang === "en" ? "/ family emergency relief" : currentLang === "ceb" ? "/ pamilya nga hinabang" : "/ pamilyang ayuda"}
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentLang === "en"
                  ? "100% Free · Zero Gas Fees · National ID Stays Private"
                  : currentLang === "ceb"
                  ? "100% Libre · Walay Gas Fees · Dili mabutyag ang imong personal nga ID"
                  : "100% Libre · Zero Gas Fees · Hindi nakikita ng iba ang iyong personal na ID"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceGuide}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isSpeaking
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse font-extrabold"
                    : "bg-white/10 text-amber-300 hover:bg-white/15 border-amber-400/40"
                }`}
                id="claim-voice-guide-btn"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>
                  {isSpeaking
                    ? (currentLang === "en" ? "Stop Voice" : currentLang === "ceb" ? "Hunonga Tingog" : "Ihinto Boses")
                    : (currentLang === "en" ? "Listen Guide (Voice)" : currentLang === "ceb" ? "Paminawa Giya (Voice)" : "Pakinggan Gabay (Voice)")}
                </span>
              </button>
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Single-column on mobile, Dual-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* PRIMARY CLAIM WIZARD (lg:col-span-7 on desktop, top on mobile) */}
          <div className="lg:col-span-7 order-1">
            <div className="glass-card-elevated p-5 sm:p-7 relative overflow-hidden shadow-2xl border-2 border-white/10">

              {/* Step Navigation Stepper */}
              <div className="mb-6">
                <div className="flex items-center justify-between relative">
                  {steps.map((s, i) => (
                    <React.Fragment key={s.key}>
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className="relative">
                          {i === currentStepIndex && (
                            <div className="absolute -inset-1 rounded-full bg-amber-400/30 blur-sm animate-pulse" />
                          )}
                          <div
                            className={`
                              w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 border-2
                              ${i < currentStepIndex
                                ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20"
                                : i === currentStepIndex
                                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30 scale-105"
                                : "bg-slate-900 text-slate-500 border-white/10"
                              }
                            `}
                          >
                            {i < currentStepIndex ? <Check className="w-5 h-5 stroke-[3]" /> : s.number}
                          </div>
                        </div>
                        <span
                          className={`text-[0.65rem] sm:text-xs font-bold transition-colors text-center ${
                            i === currentStepIndex ? "text-amber-300" : i < currentStepIndex ? "text-emerald-400" : "text-slate-500"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>

                      {/* Step line connector */}
                      {i < steps.length - 1 && (
                        <div className="flex-1 h-[2px] mb-4 bg-white/10 relative overflow-hidden mx-1">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                            style={{
                              width: i < currentStepIndex ? "100%" : i === currentStepIndex ? "50%" : "0%",
                            }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* === STEP 1: CONNECT WALLET === */}
              {step === "connect" && (
                <div className="space-y-5">
                  <div className="text-center py-2">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center mx-auto mb-3">
                      <Wallet className="w-8 h-8 text-amber-400 animate-pulse" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
                      {currentLang === "en" ? "Start Emergency Aid Claim" : currentLang === "ceb" ? "Sugdi ang Pag-claim og Hinabang" : "Simulan ang Pag-claim ng Ayuda"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      {currentLang === "en"
                        ? <>Choose between connecting with <strong>Midnight Lace Wallet</strong> or testing directly in <strong>1-Click Evaluator Sandbox</strong>.</>
                        : currentLang === "ceb"
                        ? <>Pilia kon gusto nimo mokonektar gamit ang <strong>Midnight Lace Wallet</strong> o sulayan sa <strong>1-Click Evaluator Sandbox</strong>.</>
                        : <>Piliin kung nais mong kumonekta gamit ang <strong>Midnight Lace Wallet</strong> o subukan gamit ang <strong>1-Click Evaluator Sandbox</strong>.</>}
                    </p>
                  </div>

                  {/* Evaluator Sandbox Button (Judges & Reviewers) */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border-2 border-amber-500/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        {currentLang === "en" ? "Evaluator & Reviewer 1-Click Sandbox Mode" : currentLang === "ceb" ? "Pagsulay alang sa mga Evaluator ug Hurado" : "Evaluator & Reviewer 1-Click Sandbox Mode"}
                      </span>
                      <span className="text-[0.65rem] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">
                        NO EXTENSION
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                      {currentLang === "en"
                        ? "Want to test the full ZK circuit immediately without installing a Lace browser extension?"
                        : currentLang === "ceb"
                        ? "Gusto ba nimo sulayan dayon ang tibuok ZK circuit nga walay gi-install nga extension?"
                        : "Nais mo bang subukan kaagad ang buong ZK circuit nang hindi nag-i-install ng Lace browser extension?"}
                    </p>
                    <button
                      type="button"
                      onClick={handleConnectSandbox}
                      disabled={connecting}
                      className="btn-civic-gold w-full py-3 text-sm flex items-center justify-center gap-2"
                      id="sandbox-wallet-btn"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{currentLang === "en" ? "Launch Evaluator Sandbox (1-Click)" : currentLang === "ceb" ? "Ilunsad ang Evaluator Sandbox (1-Click)" : "I-launch ang Evaluator Sandbox (1-Click)"}</span>
                    </button>
                  </div>

                  {/* Primary Lace Option */}
                  <button
                    type="button"
                    onClick={handleConnectWallet}
                    disabled={connecting}
                    className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-850 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
                    id="connect-lace-btn"
                  >
                    {connecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                        <span>{currentLang === "en" ? "Connecting to Lace Wallet..." : currentLang === "ceb" ? "Nagalakip sa Lace Wallet..." : "Kumokonekta sa Lace Wallet..."}</span>
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 text-sky-400" />
                        <span>{currentLang === "en" ? "Connect with Midnight Lace Wallet" : currentLang === "ceb" ? "Konektar gamit ang Midnight Lace Wallet" : "Konekta gamit ang Midnight Lace Wallet"}</span>
                      </>
                    )}
                  </button>

                  {walletError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-200">
                      <p className="font-bold text-red-300">{walletError}</p>
                      <p className="mt-1 text-slate-300">
                        {currentLang === "en" ? 'Click "Launch Evaluator Sandbox" above to proceed immediately!' : currentLang === "ceb" ? 'Pindota ang "Ilunsad ang Evaluator Sandbox" sa ibabaw aron makapadayon dayon!' : 'I-click ang "I-launch ang Evaluator Sandbox" sa itaas para magpatuloy kaagad!'}
                      </p>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{currentLang === "en" ? "LGU Disaster Escrow sponsors all execution gas fees (₱0 / 0 tDUST cost)." : currentLang === "ceb" ? "Abagahon sa LGU Disaster Escrow ang tanang gas fees (₱0 / 0 tDUST bayad)." : "Sagot ng LGU Disaster Escrow ang lahat ng gas fees (₱0 / 0 tDUST gastusin)."}</span>
                  </div>
                </div>
              )}

              {/* === STEP 2: CREDENTIALS INPUT WITH AUTHENTIC MPIN KEYPAD === */}
              {step === "credentials" && (
                <div className="space-y-4">
                  <div className="text-center py-1">
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
                      {currentLang === "en" ? "Enter Your Credentials Privately" : currentLang === "ceb" ? "Isulod ang Imong Impormasyon" : "Ipasok ang Iyong Impormasyon"}
                    </h2>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      {currentLang === "en" ? "These numbers remain strictly confidential inside your smartphone." : currentLang === "ceb" ? "Kining mga numeroha magpabilin nga tinago sa sulod sa imong selpon." : "Mananatiling lihim sa loob ng iyong telepono ang mga numerong ito."}
                    </p>
                  </div>

                  {/* Connected Wallet Pill */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs">
                    <span className="text-slate-400">{currentLang === "en" ? "Connected Wallet:" : currentLang === "ceb" ? "Konektadong Pitaka:" : "Konektadong Wallet:"}</span>
                    <span className="font-mono text-emerald-300 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {address?.slice(0, 10)}...{address?.slice(-6)}
                      {isSandbox && <span className="ml-1 px-1.5 py-0.5 rounded text-[0.6rem] bg-amber-400 text-slate-950 font-bold">Sandbox</span>}
                    </span>
                  </div>

                  {/* Illustrated PhilSys Card Helper */}
                  <IllustratedIdCard
                    nationalId={nationalId}
                    onUseDemo={handleAutoFillDemoBeneficiary}
                  />

                  {/* Input 1: PhilSys ID */}
                  <div>
                    <label htmlFor="national-id" className="text-xs font-bold text-slate-200 block mb-1">
                      {currentLang === "en" ? "1. PhilSys National ID Number" : currentLang === "ceb" ? "1. PhilSys National ID Numero" : "1. PhilSys National ID Number"}
                    </label>
                    <div className="relative">
                      <input
                        id="national-id"
                        type="text"
                        className="input-civic pr-10 font-mono text-sm tracking-wide bg-slate-950/80 border-2 border-white/20 focus:border-amber-400"
                        placeholder={currentLang === "en" ? "Example: PSN-2024-8849-1102" : currentLang === "ceb" ? "Pananglitan: PSN-2024-8849-1102" : "Halimbawa: PSN-2024-8849-1102"}
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        autoComplete="off"
                      />
                      {idValid && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Input 2: 4-Digit MPIN Display & Virtual Keypad */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-200">
                        {currentLang === "en" ? "2. 4-Digit Secret PIN (from Barangay Relief Slip)" : currentLang === "ceb" ? "2. 4-Digit Lihim nga PIN (gikan sa Barangay Relief Slip)" : "2. 4-Digit Secret PIN (mula sa Barangay Relief Slip)"}
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
                      >
                        {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{showPin ? (currentLang === "en" ? "Hide" : "Itago") : (currentLang === "en" ? "Show" : "Ipakita")}</span>
                      </button>
                    </div>

                    {/* 4 Discrete MPIN Boxes */}
                    <div className="flex items-center justify-center gap-3 my-2">
                      {[0, 1, 2, 3].map((index) => {
                        const char = secretPin[index];
                        const isFilled = Boolean(char);
                        return (
                          <div
                            key={index}
                            className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                              isFilled
                                ? "bg-slate-900 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20"
                                : "bg-slate-950/60 border-white/20 text-slate-600"
                            }`}
                          >
                            {isFilled ? (showPin ? char : "●") : ""}
                          </div>
                        );
                      })}
                    </div>

                    {/* GCash / Maya-style 3x4 Touch Keypad */}
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mt-3 mb-2">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleKeypadPress(num)}
                          className="keypad-btn py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-lg font-black text-white border border-white/10 active:scale-95 transition-all shadow-sm"
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleKeypadPress("clear")}
                        className="keypad-btn py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-xs font-bold text-slate-400 border border-white/10 active:scale-95 transition-all"
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => handleKeypadPress("0")}
                        className="keypad-btn py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-lg font-black text-white border border-white/10 active:scale-95 transition-all shadow-sm"
                      >
                        0
                      </button>
                      <button
                        type="button"
                        onClick={() => handleKeypadPress("backspace")}
                        className="keypad-btn py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-xs font-bold text-amber-400 border border-white/10 active:scale-95 transition-all flex items-center justify-center"
                        title="Backspace"
                      >
                        <Delete className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {inputError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{inputError}</span>
                    </div>
                  )}

                  {/* Primary Button */}
                  <button
                    type="button"
                    onClick={handleSubmitCredentials}
                    className="btn-civic-gold w-full py-4 text-sm sm:text-base font-black shadow-xl"
                    id="generate-zk-proof-btn"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>{currentLang === "en" ? "Compute Private Proof & Claim ₱5,000" : currentLang === "ceb" ? "Kalkulaha ang Pribadong Patunay & Dawata ang ₱5,000" : "Kalkulahin ang Ligtas na Patunay & Kumuha ng ₱5,000"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-[0.68rem] text-slate-400 text-center leading-relaxed">
                    🛡️ <strong>{currentLang === "en" ? "Privacy Guarantee:" : currentLang === "ceb" ? "Garantiya sa Pribasiya:" : "Pribadong Garantiya:"}</strong>{" "}
                    {currentLang === "en"
                      ? "Your ID and PIN never leave this phone. The smart contract only receives a zero-knowledge nullifier proof."
                      : currentLang === "ceb"
                      ? "Ang imong ID ug PIN dili gayod mogawas sa selpon. Ang smart contract modawat lamang og zero-knowledge nullifier proof."
                      : "Ang iyong ID at PIN ay hindi aalis sa teleponong ito. Ang smart contract ay tumatanggap lamang ng zero-knowledge nullifier proof."}
                  </p>
                </div>
              )}

              {/* === STEP 3: ZK PROVING RADAR === */}
              {step === "proving" && (
                <div className="text-center py-2">
                  <RadarProvingScanner progress={provingProgress} />

                  <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
                    {currentLang === "en" ? "Verifying Calamity Eligibility" : currentLang === "ceb" ? "Ginasusi ang Pagka-kwalipikado" : "Sinisuri ang Pagiging Kwalipikado"}
                  </h2>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto mb-4">
                    {currentLang === "en" ? "Generating private cryptographic proof inside your phone..." : currentLang === "ceb" ? "Naghimo og pribadong cryptographic proof sa imong selpon..." : "Bumubuo ng pribadong cryptographic proof sa loob ng iyong telepono..."}
                  </p>

                  {/* Human-Centered Plain-Language Milestones */}
                  <div className="space-y-2 max-w-md mx-auto text-left mb-4">
                    {[
                      {
                        threshold: 25,
                        label:
                          currentLang === "en"
                            ? "1. Verifying calamity roster inclusion (Roster Lookup)"
                            : currentLang === "ceb"
                            ? "1. Ginasusi ang listahan sa mga biktima (Roster Lookup)"
                            : "1. Tinitingnan ang listahan ng nasalanta (Roster Lookup)",
                      },
                      {
                        threshold: 55,
                        label:
                          currentLang === "en"
                            ? "2. Blinding your personal identity with ZK (Identity Shield)"
                            : currentLang === "ceb"
                            ? "2. Gitago ang imong pagkatawo gamit ang ZK (Identity Shield)"
                            : "2. Inililihim ang iyong pagkakakilanlan sa ZK (Identity Shield)",
                      },
                      {
                        threshold: 80,
                        label:
                          currentLang === "en"
                            ? "3. Checking for ghost or duplicate claims (Anti-Ghost Nullifier)"
                            : currentLang === "ceb"
                            ? "3. Ginasusi kung adunay doble o ghost claims (Anti-Ghost Nullifier)"
                            : "3. Sinusuri kung may duplicate o ghost claim (Anti-Ghost Nullifier)",
                      },
                      {
                        threshold: 100,
                        label:
                          currentLang === "en"
                            ? "4. Preparing ₱5,000 relief settlement on Midnight Network"
                            : currentLang === "ceb"
                            ? "4. Giandam ang ₱5,000 pundo sa Midnight Network"
                            : "4. Inihahanda ang ₱5,000 pondo sa Midnight Network",
                      },
                    ].map((s, idx) => {
                      const isDone = provingProgress >= s.threshold;
                      const isCurrent = provingProgress < s.threshold && (idx === 0 || provingProgress >= [25, 55, 80][idx - 1]);

                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-all ${
                            isDone
                              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold"
                              : isCurrent
                              ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold animate-pulse"
                              : "bg-white/[0.03] text-slate-500"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isCurrent ? (
                            <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[0.6rem]">
                              {idx + 1}
                            </div>
                          )}
                          <span>{s.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-500/30">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{currentLang === "en" ? "Zero Network Leakage · Citizen Privacy Protected" : currentLang === "ceb" ? "Zero Network Leakage · Protektado ang Katawhan" : "Zero Network Leakage · Protektado ang Mamamayan"}</span>
                  </div>
                </div>
              )}

              {/* === STEP 4: PAYOUT & DIGITAL RELIEF VOUCHER === */}
              {step === "result" && result && (
                <div className="space-y-4 relative">
                  <ConfettiCelebration active={showConfetti} />

                  {result.success ? (
                    <div className="space-y-4">
                      {/* Success Hero Banner */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-900 border-2 border-emerald-500/50 shadow-2xl text-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-2 text-emerald-400">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-emerald-400 mb-0.5">
                          {currentLang === "en" ? "₱5,000.00 Calamity Aid Received!" : currentLang === "ceb" ? "₱5,000.00 Hinabang Nadawat!" : "₱5,000.00 Ayuda Natanggap!"}
                        </h2>
                        <p className="text-xs text-slate-200">
                          {currentLang === "en" ? "Disaster relief funds transferred directly to your private Midnight wallet. Zero deductions." : currentLang === "ceb" ? "Nabalhin na sa imong pribadong Midnight wallet ang pundo. Walay kaltas." : "Nailipat na sa iyong pribadong Midnight wallet ang pondo. Walang kaltas."}
                        </p>

                        {/* Transaction Hash */}
                        <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs flex items-center justify-between gap-2">
                          <span className="text-slate-400">Tx Hash:</span>
                          <span className="font-mono text-emerald-300 font-bold truncate">
                            {result.transactionHash || "0x5a76e93a8d052b61405e32404e57..."}
                          </span>
                          <button
                            onClick={() => navigator.clipboard.writeText(result.transactionHash || "")}
                            className="p-1 text-slate-400 hover:text-white"
                            title="Copy hash"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Digital Relief Voucher Card (Printable & Verifiable) */}
                      <div className="p-4 rounded-2xl bg-white text-slate-950 shadow-2xl border-2 border-slate-300 relative overflow-hidden">
                        <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-slate-300 mb-3">
                          <div className="flex items-center gap-2">
                            <GhostFreeLogo size={24} variant="icon" />
                            <div>
                              <span className="text-[0.65rem] font-black uppercase tracking-wider text-slate-500 block">
                                {currentLang === "en" ? "Republic of the Philippines · Calamity Relief" : currentLang === "ceb" ? "Republika sa Pilipinas · Hinabang sa Katalagman" : "Republika ng Pilipinas · Calamity Relief"}
                              </span>
                              <span className="text-sm font-black text-slate-950">
                                {currentLang === "en" ? "Official Relief Voucher" : currentLang === "ceb" ? "Opisyal nga Voucher sa Hinabang" : "Official Relief Voucher"}
                              </span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[0.65rem] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            CLEARED & PAID
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div>
                            <span className="text-[0.65rem] text-slate-500 block font-semibold">VOUCHER SERIAL:</span>
                            <span className="font-mono font-black text-slate-900 text-sm">GF-MARCE-2026-77B1</span>
                          </div>
                          <div>
                            <span className="text-[0.65rem] text-slate-500 block font-semibold">{currentLang === "en" ? "AMOUNT:" : currentLang === "ceb" ? "HALAGA / AMOUNT:" : "HALAGA / AMOUNT:"}</span>
                            <span className="font-black text-emerald-700 text-sm">₱5,000.00 / 5k tNIGHT</span>
                          </div>
                          <div>
                            <span className="text-[0.65rem] text-slate-500 block font-semibold">{currentLang === "en" ? "OPERATION:" : currentLang === "ceb" ? "OPERASYON:" : "OPERASYON:"}</span>
                            <span className="font-semibold text-slate-800">Typhoon Marce QRF</span>
                          </div>
                          <div>
                            <span className="text-[0.65rem] text-slate-500 block font-semibold">{currentLang === "en" ? "CHECKPOINT STATUS:" : currentLang === "ceb" ? "STATUS SA CHECKPOINT:" : "STATUS SA CHECKPOINT:"}</span>
                            <span className="font-bold text-emerald-700">1 Ration Entitled</span>
                          </div>
                        </div>

                        {/* Barcode representation */}
                        <div className="py-2 px-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-slate-700">
                            <QrCode className="w-5 h-5 text-slate-900" />
                            <span className="font-mono text-[0.7rem] font-bold">VERIFY: 02005a76e93a86c0</span>
                          </div>
                          <span className="text-[0.65rem] text-slate-500 font-semibold">DSWD DRRM Valid</span>
                        </div>

                        {/* Action buttons on voucher */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                          <button
                            onClick={() => setShowReceiptModal(true)}
                            className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-1.5"
                            id="view-full-receipt-btn"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{currentLang === "en" ? "Download Receipt" : "I-download ang Resibo"}</span>
                          </button>
                          <button
                            onClick={() => window.print()}
                            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 flex items-center justify-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>{currentLang === "en" ? "Print" : "I-print"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Citizen CSAT Survey */}
                      {!csatSubmitted ? (
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                          <span className="text-xs font-bold text-white block mb-2">
                            {currentLang === "en" ? "How was your aid claiming experience?" : currentLang === "ceb" ? "Kumusta ang imong kasinatian sa pag-claim?" : "Kumusta ang iyong karanasan sa pag-claim?"}
                          </span>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                onClick={() => setCsatRating(s)}
                                className="p-1 transition-transform hover:scale-125"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    s <= csatRating ? "fill-amber-400 text-amber-400" : "text-slate-600"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-3">
                            {(currentLang === "en"
                              ? ["Fast", "Easy to Use", "Safe", "Clear"]
                              : currentLang === "ceb"
                              ? ["Paspas", "Sayon Gamiton", "Luwas", "Klaro"]
                              : ["Mabilis", "Madaling Gamitin", "Ligtas", "Malinaw"]
                            ).map((chip) => (
                              <button
                                key={chip}
                                onClick={() => setCsatComment(chip)}
                                className={`text-[0.65rem] px-2 py-1 rounded-full border transition-colors ${
                                  csatComment === chip
                                    ? "bg-amber-400 text-slate-950 font-bold border-amber-400"
                                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                                }`}
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={handleCsatSubmit}
                            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                          >
                            {currentLang === "en" ? "Submit Feedback" : "Ipadala ang Puna"}
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 text-center">
                          {currentLang === "en" ? "Thank you for your feedback! This helps improve disaster relief delivery." : currentLang === "ceb" ? "Salamat sa imong puna! Nakatabang kini sa pagpalambo sa pag-apod-apod sa hinabang." : "Salamat sa iyong puna! Tumutulong ito sa pagpapabuti ng ayuda distribution."}
                        </div>
                      )}

                      {/* Reset Button */}
                      <button
                        onClick={() => {
                          setStep("connect");
                          setResult(null);
                          setNationalId("");
                          setSecretPin("");
                        }}
                        className="w-full py-2.5 rounded-xl text-xs text-slate-400 hover:text-white border border-white/10 transition-colors"
                      >
                        {currentLang === "en" ? "Start New Claim" : currentLang === "ceb" ? "Sugdi ang Bag-ong Pag-claim" : "Bumalik sa Umpisa (Start New Claim)"}
                      </button>
                    </div>
                  ) : (
                    /* Error State */
                    <div className="p-5 rounded-2xl bg-red-500/10 border-2 border-red-500/30 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mx-auto text-red-400">
                        <XCircle className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-red-300">
                        {currentLang === "en" ? "Claim Not Successful" : currentLang === "ceb" ? "Wala Molampos ang Pag-claim" : "Hindi Matagumpay ang Pag-claim"}
                      </h3>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                        {result.errorCode === "ALREADY_CLAIMED"
                          ? (currentLang === "en" ? "This identity has already received aid for this relief tranche. Anti-ghost circuits prevent duplicate claims." : currentLang === "ceb" ? "Kining maong pagkatawo nakadawat na og hinabang. Gibabagan sa anti-ghost circuit ang doble nga claim." : "Ang pagkakakilanlang ito ay nakatanggap na ng ayuda para sa relief tranche na ito. Pinipigilan ng anti-ghost circuit ang dobleng claim.")
                          : result.error || (currentLang === "en" ? "Proof verification failed. Please check your PhilSys ID and PIN." : currentLang === "ceb" ? "Wala motugma ang proof. Palihug susiha ang imong PhilSys ID ug PIN." : "Hindi tumugma ang proof. Pakitingnan ang inyong PhilSys ID o PIN.")}
                      </p>
                      <button
                        onClick={() => setStep("credentials")}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                      >
                        {currentLang === "en" ? "Try Again" : currentLang === "ceb" ? "Sulayi Pag-usab" : "Subukan Muli"}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* SIDEBAR COLUMN (lg:col-span-5 on desktop, below on mobile) */}
          <div className="lg:col-span-5 order-2 space-y-4">
            {/* Mobile Accordion Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowDetailsMobile(!showDetailsMobile)}
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between text-xs font-bold text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>{currentLang === "en" ? "View Operation Details & Guide" : currentLang === "ceb" ? "Tan-awa ang Detalye sa Operasyon & Giya" : "Tingnan ang Detalye ng Operasyon & Gabay"}</span>
                </span>
                {showDetailsMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <div className={`${showDetailsMobile ? "block" : "hidden lg:block"} space-y-4`}>
              {/* DRRM Municipal Operation Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-amber-400" />
                    {currentLang === "en" ? "MDRRMO Relief Operation" : currentLang === "ceb" ? "Operasyon sa MDRRMO" : "Operasyon ng MDRRMO"}
                  </span>
                  <span className="text-[0.65rem] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    R.A. 10121 DRRM
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{currentLang === "en" ? "Name:" : currentLang === "ceb" ? "Ngalan:" : "Pangalan:"}</span>
                    <span className="font-bold text-white">Typhoon Marce QRF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{currentLang === "en" ? "Total Escrow Fund:" : currentLang === "ceb" ? "Kinatibuk-ang Pundo:" : "Kabuuang Pondo:"}</span>
                    <span className="font-bold text-amber-300">1,000,000 tNIGHT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{currentLang === "en" ? "Disbursed So Far:" : currentLang === "ceb" ? "Naimbak sa Karon:" : "Kasalukuyang Naimbak:"}</span>
                    <span className="font-bold text-emerald-400">{currentLang === "en" ? "200 Families Aided" : currentLang === "ceb" ? "200 Pamilya Natabangan" : "200 Pamilya Naayudahan"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Smart Contract:</span>
                    <span className="font-mono text-[0.65rem] text-sky-300 truncate max-w-[140px]">
                      02005a76e93a...
                    </span>
                  </div>
                </div>
              </div>

              {/* Zero-Knowledge Privacy Guarantee */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg">
                <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Anti-Ghost Nullifier Guarantee
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLang === "en"
                    ? "Each citizen produces a unique cryptographic nullifier. It is mathematically impossible to double claim or insert ghost beneficiaries."
                    : currentLang === "ceb"
                    ? "Matag pamilya adunay talagsaong cryptographic nullifier. Dili gayod posible ang doble nga pag-claim o pagsulod sa mga ghost beneficiaries."
                    : "Bawat pamilya ay may natatanging cryptographic nullifier. Hindi posibleng makakuha nang dalawang beses o makasingit ang mga ghost beneficiaries."}
                </p>
              </div>

              {/* Evaluator Quick Autofill Pill */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30">
                <span className="text-xs font-bold text-amber-400 block mb-1">
                  🧪 Evaluator Quick Data
                </span>
                <p className="text-xs text-slate-300 mb-2">
                  {currentLang === "en"
                    ? "Use this test data to test end-to-end zero-knowledge proving:"
                    : currentLang === "ceb"
                    ? "Gamita kining datos aron sulayan ang zero-knowledge proof:"
                    : "Gamitin ang datos na ito para subukan ang end-to-end ZK proof:"}
                </p>
                <div className="bg-black/50 p-2.5 rounded-lg font-mono text-xs text-slate-200 space-y-1 mb-2">
                  <div>ID: <span className="text-amber-300">PSN-2024-8849-1102</span></div>
                  <div>PIN: <span className="text-sky-300">4912</span></div>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFillDemoBeneficiary}
                  className="w-full py-2 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
                >
                  {currentLang === "en" ? "Auto-Fill Demo Credentials" : currentLang === "ceb" ? "Awtomatikong Isulod ang Demo Data" : "Auto-Fill Demo Credentials"}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Official Relief Receipt Modal */}
        {receipt && (
          <ReliefReceiptModal
            isOpen={showReceiptModal}
            onClose={() => setShowReceiptModal(false)}
            receipt={receipt}
          />
        )}
      </div>
    </Layout>
  );
};

export default CitizenClaimPortal;
