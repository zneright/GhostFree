// ============================================
// GhostFree — Citizen Claim Portal
// Premium Mobile-first, public, 4-step ZK claim flow
// ============================================

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMidnightWallet } from "../../contexts/MidnightWalletContext";
import { useMidnightContract } from "../../hooks/useMidnightContract";
import { MIDNIGHT_CONFIG } from "../../configuration/midnight.config";
import { validateClaimInputs } from "../../services/proof.service";
import { computeLeafHash, computeNullifier } from "../../services/merkle.service";
import { generateReliefReceipt, submitFeedback } from "../../services/feedback.service";
import type { ClaimStep, ClaimResult, ReliefReceipt } from "../../types";
import ReliefReceiptModal from "../../components/ReliefReceiptModal";
import OnboardingModal from "../../components/OnboardingModal";
import LanguageSelector from "../../components/LanguageSelector";
import DisasterConnectivityBanner from "../../components/DisasterConnectivityBanner";
import GhostFreeLogo from "../../components/GhostFreeLogo";
import { networkResilience } from "../../services/networkResilience.service";
import {
  t,
  getStoredLanguage,
  subscribeLanguageChange,
  type SupportedLanguage,
} from "../../services/i18n.service";
import {
  Shield,
  Wallet,
  KeyRound,
  Fingerprint,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  ExternalLink,
  RefreshCw,
  Smartphone,
  FileCheck2,
  Sparkles,
  Star,
  Download,
} from "lucide-react";

// ---- Radial Progress Ring Component ----
const RadialProgress: React.FC<{ progress: number; size?: number }> = ({
  progress,
  size = 160,
}) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-2 rounded-full animate-pulse-ring"
        style={{
          background: `radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)`,
        }}
      />
      <svg
        width={size}
        height={size}
        className="radial-progress-ring"
      >
        <defs>
          <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(75, 85, 99, 0.2)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progress-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Fingerprint className="w-8 h-8 text-civic-sky mb-1" />
        <span className="text-2xl font-black text-white tabular-nums">{progress}%</span>
        <span className="text-[0.6rem] text-slate-400 mt-0.5">Proving</span>
      </div>
    </div>
  );
};

// ---- Confetti Celebration Component ----
const ConfettiCelebration: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: 50 + (Math.random() - 0.5) * 60,
      color: ["#3B82F6", "#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6"][i % 5],
      delay: Math.random() * 0.5,
      size: 4 + Math.random() * 6,
    }));
  }, [active]);

  if (!active) return null;

  return (
    <div className="confetti-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${0.8 + Math.random() * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
};

const CitizenClaimPortal: React.FC = () => {
  const navigate = useNavigate();
  const { address, connected, connecting, connect, disconnect, error: walletError } = useMidnightWallet();
  const { executeClaimAidCircuit, state: contractState } = useMidnightContract();

  const [step, setStep] = useState<ClaimStep>("connect");
  const [nationalId, setNationalId] = useState("");
  const [secretPin, setSecretPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [provingProgress, setProvingProgress] = useState(0);
  const [result, setResult] = useState<ClaimResult | null>(null);
  const [receipt, setReceipt] = useState<ReliefReceipt | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<SupportedLanguage>(getStoredLanguage());
  const [showConfetti, setShowConfetti] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [pinValid, setPinValid] = useState(false);

  useEffect(() => {
    setMounted(true);
    return subscribeLanguageChange((newLang) => {
      setLang(newLang);
    });
  }, []);

  // Auto-advance when wallet connects
  useEffect(() => {
    if (connected && step === "connect") {
      setStep("credentials");
    }
  }, [connected, step]);

  // Input validation indicators
  useEffect(() => {
    setIdValid(nationalId.length >= 6);
  }, [nationalId]);

  useEffect(() => {
    setPinValid(secretPin.length >= 4);
  }, [secretPin]);

  const steps: { key: ClaimStep; label: string; icon: React.ReactNode }[] = [
    { key: "connect", label: t("stepConnect", lang), icon: <Wallet className="w-4 h-4" /> },
    { key: "credentials", label: t("stepVerify", lang), icon: <KeyRound className="w-4 h-4" /> },
    { key: "proving", label: t("stepProve", lang), icon: <Fingerprint className="w-4 h-4" /> },
    { key: "result", label: t("stepResult", lang), icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch {
      // Error handled by context
    }
  };

  const handleSubmitCredentials = () => {
    setInputError(null);
    const validation = validateClaimInputs(nationalId, secretPin);
    if (!validation.valid) {
      setInputError(validation.error || "Invalid input.");
      return;
    }
    setStep("proving");
    runProofGeneration();
  };

  const runProofGeneration = async () => {
    setProvingProgress(0);

    // Dynamic ZK proof generation stages
    const stages = [
      { progress: 15, delay: 350, label: "Synthesizing private witness constraints..." },
      { progress: 35, delay: 450, label: "Generating Merkle tree inclusion path..." },
      { progress: 60, delay: 600, label: "Proving circuit assertions in local WASM..." },
      { progress: 85, delay: 500, label: "Deriving deterministic nullifier..." },
      { progress: 100, delay: 400, label: "Submitting state disclosure to Midnight Preprod..." },
    ];

    for (const stage of stages) {
      await new Promise((r) => setTimeout(r, stage.delay));
      setProvingProgress(stage.progress);
    }

    try {
      const claimResult = await executeClaimAidCircuit(
        nationalId,
        secretPin,
        MIDNIGHT_CONFIG.contractAddress
      );

      const claimAmount = contractState.perClaimAmount || 5000;
      setResult({
        success: true,
        transactionHash: claimResult.txHash,
        amount: claimAmount,
      });

      // Trigger celebration
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      // Automatically generate a zero-knowledge verifiable receipt
      const generatedReceipt = generateReliefReceipt(
        claimResult.txHash,
        claimAmount,
        "Typhoon Calamity Emergency Relief"
      );
      setReceipt(generatedReceipt);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Proof generation failed. Please try again.";
      setResult({
        success: false,
        error: msg,
        errorCode: "PROOF_INVALID",
      });
    }

    setStep("result");
  };

  const handleQuickFeedback = (selectedRating: number) => {
    setFeedbackRating(selectedRating);
    setFeedbackSubmitted(true);
    submitFeedback({
      rating: selectedRating,
      category: "usability",
      role: "citizen",
      comment: `Post-claim 1-click survey: ${selectedRating}/5 stars after successful aid distribution.`,
    });
  };

  const handleReset = () => {
    setStep(connected ? "credentials" : "connect");
    setNationalId("");
    setSecretPin("");
    setInputError(null);
    setProvingProgress(0);
    setResult(null);
    setReceipt(null);
    setShowReceiptModal(false);
    setFeedbackRating(null);
    setFeedbackSubmitted(false);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-dvh bg-civic-navy relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-success/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Disaster Zone Offline & Low-Bandwidth Status Banner */}
      <DisasterConnectivityBanner className="relative z-20" />

      {/* Compact Header */}
      <nav className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6 border-b border-white/[0.04]">
        <button
          onClick={() => navigate("/")}
          className="btn-civic btn-ghost text-sm py-1.5 px-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <div className="flex items-center gap-2">
          <GhostFreeLogo size={24} variant="icon" animated />
          <span className="text-white text-sm font-semibold">GhostFree</span>
          <button
            onClick={() => setShowOnboarding(true)}
            className="ml-1 px-2 py-0.5 rounded text-[0.65rem] font-medium bg-civic-sky/10 text-civic-sky border border-civic-sky/20 hover:bg-civic-sky/20 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Tour</span>
          </button>
          <LanguageSelector compact />
        </div>

        {connected && (
          <button
            onClick={disconnect}
            className="text-shield-muted text-xs hover:text-white transition-colors"
          >
            Disconnect
          </button>
        )}
        {!connected && <div className="w-20" />}
      </nav>

      {/* Step Progress Bar */}
      <div className="relative z-10 px-4 sm:px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-1">
          {steps.map((s, i) => (
            <React.Fragment key={s.key}>
              <div className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  {/* Pulse ring on active step */}
                  {i === currentStepIndex && (
                    <div className="absolute -inset-1.5 rounded-full border-2 border-civic-sky/30 animate-pulse-ring" />
                  )}
                  <div
                    className={`
                      step-indicator w-9 h-9 text-xs transition-all duration-500
                      ${
                        i < currentStepIndex
                          ? "step-complete"
                          : i === currentStepIndex
                          ? "step-active scale-110"
                          : "step-pending"
                      }
                    `}
                  >
                    {i < currentStepIndex ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      s.icon
                    )}
                  </div>
                </div>
                <span
                  className={`text-[0.6rem] font-medium transition-colors duration-300 ${
                    i <= currentStepIndex ? "text-white" : "text-shield-muted"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 rounded-full mb-5 overflow-hidden bg-shield-glass/30">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-civic-blue to-accent-success transition-all duration-700 ease-out"
                    style={{ width: i < currentStepIndex ? "100%" : "0%" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <main className="relative z-10 px-4 sm:px-6 pb-8">
        <div
          className={`
            max-w-md mx-auto glass-card-premium p-6 sm:p-8
            transition-all duration-500
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {/* === Step 1: Connect Wallet === */}
          {step === "connect" && (
            <div className="animate-fade-in">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-civic-blue/10 border border-civic-blue/20 flex items-center justify-center mb-4 animate-float">
                  <Wallet className="w-8 h-8 text-civic-sky" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {t("connectTitle", lang)}
                </h2>
                <p className="text-shield-muted text-sm leading-relaxed">
                  {t("connectDesc", lang)}
                </p>
              </div>

              <button
                onClick={handleConnectWallet}
                disabled={connecting}
                className="btn-civic btn-primary shimmer-btn w-full h-14 text-base tap-scale mb-4"
                id="connect-wallet-btn"
              >
                {connecting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("connecting", lang)}
                  </div>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    {t("connectButton", lang)}
                  </>
                )}
              </button>

              {walletError && (
                <div className="p-4 rounded-xl bg-accent-danger-soft border border-accent-danger/20 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent-danger shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300 leading-relaxed">{walletError}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-shield-glass/20">
                <div className="flex items-center gap-2 text-shield-muted text-xs">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>
                    Don't have Lace?{" "}
                    <a
                      href="https://www.lace.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-civic-sky underline hover:text-civic-trust transition-colors"
                    >
                      Download here
                    </a>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* === Step 2: Enter Credentials === */}
          {step === "credentials" && (
            <div className="animate-fade-in">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mb-4">
                  <KeyRound className="w-7 h-7 text-accent-purple" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {t("credentialsTitle", lang)}
                </h2>
                <p className="text-shield-muted text-sm leading-relaxed">
                  {t("credentialsDesc", lang)}
                </p>
              </div>

              {/* Privacy Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-accent-success/5 border border-accent-success/15 mb-6">
                <ShieldCheck className="w-4 h-4 text-accent-success shrink-0 animate-pulse" />
                <p className="text-xs text-green-300">
                  {t("privacyNotice", lang)}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="national-id" className="label-civic">
                    <KeyRound className="w-3.5 h-3.5 text-accent-purple" />
                    {t("residentIdLabel", lang)}
                  </label>
                  <div className="relative">
                    <input
                      id="national-id"
                      type="text"
                      className="input-civic pr-10"
                      placeholder={t("residentIdPlaceholder", lang)}
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      autoComplete="off"
                    />
                    {idValid && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-scale-in">
                        <CheckCircle2 className="w-4 h-4 text-accent-success" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="secret-pin" className="label-civic">
                    <Lock className="w-3.5 h-3.5 text-accent-purple" />
                    {t("pinLabel", lang)}
                  </label>
                  <div className="relative">
                    <input
                      id="secret-pin"
                      type={showPin ? "text" : "password"}
                      inputMode="numeric"
                      className="input-civic pr-20"
                      placeholder={t("pinPlaceholder", lang)}
                      value={secretPin}
                      onChange={(e) => setSecretPin(e.target.value)}
                      autoComplete="off"
                      maxLength={8}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      {pinValid && (
                        <div className="animate-scale-in">
                          <CheckCircle2 className="w-4 h-4 text-accent-success" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="text-shield-muted hover:text-white transition-colors"
                      >
                        {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {inputError && (
                  <div className="p-3 rounded-xl bg-accent-danger-soft border border-accent-danger/20 flex items-center gap-2 animate-fade-in">
                    <AlertTriangle className="w-4 h-4 text-accent-danger shrink-0" />
                    <p className="text-xs text-red-300">{inputError}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmitCredentials}
                  className="btn-civic btn-primary shimmer-btn w-full h-14 text-base tap-scale mt-2"
                  id="verify-btn"
                >
                  <Fingerprint className="w-5 h-5" />
                  {t("proceedToProof", lang)}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Wallet indicator */}
              <div className="mt-5 pt-4 border-t border-shield-glass/20 flex items-center justify-between">
                <span className="text-shield-muted text-xs">Connected wallet:</span>
                <span className="text-civic-sky text-xs font-mono">
                  {address?.slice(0, 10)}...{address?.slice(-6)}
                </span>
              </div>
            </div>
          )}

          {/* === Step 3: Proving — Radial Progress Ring === */}
          {step === "proving" && (
            <div className="animate-fade-in">
              <div className="flex flex-col items-center text-center">
                {/* Radial Progress Ring */}
                <div className="mb-6">
                  <RadialProgress progress={provingProgress} size={160} />
                </div>

                <h2 className="text-xl font-bold text-white mb-2">
                  {t("provingTitle", lang) || "Verifying your eligibility privately..."}
                </h2>
                <p className="text-shield-muted text-sm mb-8">
                  {t("provingDesc", lang) || "Computing your proof locally on this device..."}
                </p>

                {/* Status Messages */}
                <div className="space-y-2 w-full">
                  {[
                    { threshold: 10, label: t("provingStep1", lang) || "Hashing credentials locally..." },
                    { threshold: 30, label: t("provingStep2", lang) || "Fetching Merkle inclusion proof..." },
                    { threshold: 55, label: t("provingStep3", lang) || "Generating zero-knowledge proof..." },
                    { threshold: 80, label: t("provingStep4", lang) || "Computing nullifier..." },
                    { threshold: 95, label: t("provingStep5", lang) || "Submitting proof to smart contract..." },
                  ].map(
                    (msg, i) =>
                      provingProgress >= msg.threshold && (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs animate-fade-in"
                        >
                          {provingProgress > msg.threshold + 15 ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-success shrink-0" />
                          ) : (
                            <Loader2 className="w-3.5 h-3.5 text-civic-sky animate-spin shrink-0" />
                          )}
                          <span
                            className={
                              provingProgress > msg.threshold + 15
                                ? "text-shield-muted"
                                : "text-white"
                            }
                          >
                            {msg.label}
                          </span>
                        </div>
                      )
                  )}
                </div>

                {/* Privacy reminder */}
                <div className="mt-8 flex items-center gap-2 text-shield-muted text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-success" />
                  <span>{t("privacyReminder", lang) || "Your identity data never leaves this device"}</span>
                </div>
              </div>
            </div>
          )}

          {/* === Step 4: Result === */}
          {step === "result" && result && (
            <div className="animate-fade-in relative">
              {/* Confetti celebration */}
              <ConfettiCelebration active={showConfetti} />

              {result.success ? (
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-accent-success/10 border-2 border-accent-success flex items-center justify-center mb-6 animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-accent-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {t("claimSuccess", lang) || "Aid Claimed Successfully!"}
                  </h2>
                  <p className="text-accent-success text-lg font-semibold mb-1">
                    {result.amount?.toLocaleString()} tNIGHT
                  </p>
                  <p className="text-shield-muted text-sm mb-8">
                    {t("claimSuccessDesc", lang) || "has been sent to your Lace wallet"}
                  </p>

                  {result.transactionHash && (
                    <div className="w-full p-4 rounded-xl bg-shield-dark/80 border border-shield-glass/20 mb-4">
                      <p className="text-shield-muted text-xs mb-1">Transaction Hash</p>
                      <p className="text-civic-sky text-xs font-mono break-all">
                        {result.transactionHash}
                      </p>
                      <a
                        href="#"
                        className="text-civic-trust text-xs flex items-center gap-1 mt-2 hover:underline"
                      >
                        View on Midnight Explorer <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {/* Verifiable Relief Receipt Trigger */}
                  {receipt && (
                    <button
                      onClick={() => setShowReceiptModal(true)}
                      className="w-full mb-4 py-3 px-4 rounded-xl bg-accent-success/15 hover:bg-accent-success/25 border border-accent-success/30 text-accent-success font-semibold text-xs transition-all flex items-center justify-center gap-2 shimmer-btn"
                    >
                      <Download className="w-4 h-4" />
                      <span>View & Download Proof Receipt</span>
                    </button>
                  )}

                  {/* Post-Claim Satisfaction Micro-Survey */}
                  <div className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-6 text-center">
                    <p className="text-[0.7rem] text-white/70 mb-2">
                      {feedbackSubmitted
                        ? "Thank you! Your feedback helps protect more calamity victims."
                        : "How was your claim experience today?"}
                    </p>
                    {!feedbackSubmitted ? (
                      <div className="flex items-center justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleQuickFeedback(star)}
                            className={`p-1 transition-all hover:scale-125 ${
                              feedbackRating && star <= feedbackRating
                                ? "text-accent-gold"
                                : "text-white/30 hover:text-accent-gold"
                            }`}
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star className={`w-5 h-5 ${feedbackRating && star <= feedbackRating ? "fill-accent-gold" : "hover:fill-accent-gold"}`} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 text-accent-gold text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-success" />
                        <span>Rating recorded: {feedbackRating} / 5 stars</span>
                      </div>
                    )}
                  </div>

                  <div className="trust-badge">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Zero-Knowledge Verified · No Identity Exposed
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-accent-danger/10 border-2 border-accent-danger flex items-center justify-center mb-6 animate-scale-in">
                    {result.errorCode === "ALREADY_CLAIMED" ? (
                      <AlertTriangle className="w-10 h-10 text-accent-warning" />
                    ) : (
                      <XCircle className="w-10 h-10 text-accent-danger" />
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {result.errorCode === "ALREADY_CLAIMED"
                      ? t("alreadyClaimed", lang) || "Already Claimed"
                      : result.errorCode === "NOT_ELIGIBLE"
                      ? t("notEligible", lang) || "Not Eligible"
                      : t("claimFailed", lang) || "Claim Failed"}
                  </h2>
                  <p className="text-shield-muted text-sm mb-4 max-w-xs">
                    {result.errorCode === "ALREADY_CLAIMED"
                      ? t("alreadyClaimedDesc", lang) || "This identity has already received aid for this relief operation. Each person can only claim once."
                      : result.errorCode === "NOT_ELIGIBLE"
                      ? t("notEligibleDesc", lang) || "Your identity was not found in the eligibility list for this relief operation."
                      : result.error || "An error occurred. Please try again."}
                  </p>
                  {/* Reassuring guidance */}
                  <div className="w-full p-3 rounded-xl bg-civic-blue/5 border border-civic-blue/15 mb-4 text-left">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-civic-sky">Need help?</span> Visit your barangay hall or contact the LGU disaster response team. Your data remains private — nothing was transmitted.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleReset}
                className="btn-civic btn-secondary w-full h-12 tap-scale mt-4"
                id="reset-btn"
              >
                <RefreshCw className="w-4 h-4" />
                {result.success ? "Done" : "Try Again"}
              </button>
            </div>
          )}
        </div>

        {/* Bottom Privacy Notice (Mobile) */}
        <div className="max-w-md mx-auto mt-6 text-center">
          <p className="text-shield-muted/60 text-[0.65rem] leading-relaxed px-4">
            GhostFree uses zero-knowledge proofs on the Midnight Network.
            Your personal data never leaves your device.
            Only mathematical proofs are verified on-chain.
          </p>
        </div>
      </main>
      {/* Modals */}
      <ReliefReceiptModal
        receipt={receipt}
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
};

export default CitizenClaimPortal;
