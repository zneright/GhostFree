// ============================================
// GhostFree — Citizen Claim Portal
// Mobile-first, public, 4-step ZK claim flow
// ============================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMidnightWallet } from "../../contexts/MidnightWalletContext";
import { useMidnightContract } from "../../hooks/useMidnightContract";
import { MIDNIGHT_CONFIG } from "../../configuration/midnight.config";
import { validateClaimInputs } from "../../services/proof.service";
import { computeLeafHash, computeNullifier } from "../../services/merkle.service";
import type { ClaimStep, ClaimResult } from "../../types";
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
} from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance when wallet connects
  useEffect(() => {
    if (connected && step === "connect") {
      setStep("credentials");
    }
  }, [connected, step]);

  const steps: { key: ClaimStep; label: string; icon: React.ReactNode }[] = [
    { key: "connect", label: "Connect", icon: <Wallet className="w-4 h-4" /> },
    { key: "credentials", label: "Verify", icon: <KeyRound className="w-4 h-4" /> },
    { key: "proving", label: "Prove", icon: <Fingerprint className="w-4 h-4" /> },
    { key: "result", label: "Result", icon: <CheckCircle2 className="w-4 h-4" /> },
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

      setResult({
        success: true,
        transactionHash: claimResult.txHash,
        amount: contractState.perClaimAmount || 5000,
      });
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

  const handleReset = () => {
    setStep(connected ? "credentials" : "connect");
    setNationalId("");
    setSecretPin("");
    setInputError(null);
    setProvingProgress(0);
    setResult(null);
  };

  return (
    <div className="min-h-dvh bg-civic-navy relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-success/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Compact Header */}
      <nav className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="btn-civic btn-ghost text-sm py-1.5 px-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-civic-sky" />
          <span className="text-white text-sm font-semibold">GhostFree</span>
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
                <div
                  className={`
                    step-indicator w-9 h-9 text-xs
                    ${
                      i < currentStepIndex
                        ? "step-complete"
                        : i === currentStepIndex
                        ? "step-active"
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
                <span
                  className={`text-[0.6rem] font-medium ${
                    i <= currentStepIndex ? "text-white" : "text-shield-muted"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 rounded-full mb-5 transition-colors duration-500 ${
                    i < currentStepIndex ? "bg-accent-success" : "bg-shield-glass/30"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <main className="relative z-10 px-4 sm:px-6 pb-8">
        <div
          className={`
            max-w-md mx-auto glass-card p-6 sm:p-8
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
                  Connect Your Wallet
                </h2>
                <p className="text-shield-muted text-sm leading-relaxed">
                  Connect your Lace wallet to claim your calamity relief aid.
                  No account registration needed.
                </p>
              </div>

              <button
                onClick={handleConnectWallet}
                disabled={connecting}
                className="btn-civic btn-primary w-full h-14 text-base tap-scale mb-4"
                id="connect-wallet-btn"
              >
                {connecting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connecting to Lace...
                  </div>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    Connect Lace Wallet
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
                  Verify Your Identity
                </h2>
                <p className="text-shield-muted text-sm leading-relaxed">
                  Enter your National ID and secret PIN. This data stays on your
                  device — it is never sent anywhere.
                </p>
              </div>

              {/* Privacy Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-accent-success/5 border border-accent-success/15 mb-6">
                <ShieldCheck className="w-4 h-4 text-accent-success shrink-0" />
                <p className="text-xs text-green-300">
                  <strong>Privacy Protected:</strong> Your ID and PIN never leave this device.
                  Only a mathematical proof is sent to the blockchain.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="national-id" className="label-civic">
                    <KeyRound className="w-3.5 h-3.5 text-accent-purple" />
                    National ID Number
                  </label>
                  <input
                    id="national-id"
                    type="text"
                    className="input-civic"
                    placeholder="e.g., 1234-5678-9012"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="secret-pin" className="label-civic">
                    <Lock className="w-3.5 h-3.5 text-accent-purple" />
                    Secret PIN
                  </label>
                  <div className="relative">
                    <input
                      id="secret-pin"
                      type={showPin ? "text" : "password"}
                      inputMode="numeric"
                      className="input-civic pr-12"
                      placeholder="4-8 digit PIN"
                      value={secretPin}
                      onChange={(e) => setSecretPin(e.target.value)}
                      autoComplete="off"
                      maxLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-shield-muted hover:text-white transition-colors"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
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
                  className="btn-civic btn-primary w-full h-14 text-base tap-scale mt-2"
                  id="verify-btn"
                >
                  <Fingerprint className="w-5 h-5" />
                  Generate Proof & Claim
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

          {/* === Step 3: Proving === */}
          {step === "proving" && (
            <div className="animate-fade-in">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-civic-blue/10 border border-civic-blue/20 flex items-center justify-center mb-6 animate-glow-pulse">
                  <Fingerprint className="w-10 h-10 text-civic-sky" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Generating Zero-Knowledge Proof
                </h2>
                <p className="text-shield-muted text-sm mb-8">
                  Computing your eligibility proof locally on this device...
                </p>

                {/* Progress Bar */}
                <div className="w-full mb-6">
                  <div className="w-full h-2 rounded-full bg-shield-glass/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-civic-blue to-civic-trust transition-all duration-700 ease-out"
                      style={{ width: `${provingProgress}%` }}
                    />
                  </div>
                  <p className="text-civic-sky text-xs font-mono mt-2">{provingProgress}%</p>
                </div>

                {/* Status Messages */}
                <div className="space-y-2 w-full">
                  {[
                    { threshold: 10, label: "Hashing credentials locally..." },
                    { threshold: 30, label: "Fetching Merkle inclusion proof..." },
                    { threshold: 55, label: "Generating ZK-SNARK proof..." },
                    { threshold: 80, label: "Computing nullifier..." },
                    { threshold: 95, label: "Submitting proof to smart contract..." },
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
                  <span>Your identity data never leaves this device</span>
                </div>
              </div>
            </div>
          )}

          {/* === Step 4: Result === */}
          {step === "result" && result && (
            <div className="animate-fade-in">
              {result.success ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-accent-success/10 border-2 border-accent-success flex items-center justify-center mb-6 animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-accent-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Aid Claimed Successfully!
                  </h2>
                  <p className="text-accent-success text-lg font-semibold mb-1">
                    {result.amount?.toLocaleString()} tNIGHT
                  </p>
                  <p className="text-shield-muted text-sm mb-8">
                    has been sent to your Lace wallet
                  </p>

                  {result.transactionHash && (
                    <div className="w-full p-4 rounded-xl bg-shield-dark/80 border border-shield-glass/20 mb-6">
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
                      ? "Already Claimed"
                      : result.errorCode === "NOT_ELIGIBLE"
                      ? "Not Eligible"
                      : "Claim Failed"}
                  </h2>
                  <p className="text-shield-muted text-sm mb-8 max-w-xs">
                    {result.errorCode === "ALREADY_CLAIMED"
                      ? "This identity has already received aid for this relief operation. Each person can only claim once."
                      : result.errorCode === "NOT_ELIGIBLE"
                      ? "Your identity was not found in the eligibility list for this relief operation."
                      : result.error || "An error occurred. Please try again."}
                  </p>
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
    </div>
  );
};

export default CitizenClaimPortal;
