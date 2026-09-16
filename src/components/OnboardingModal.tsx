// ============================================
// GhostFree — Interactive Onboarding Tour Modal
// 3-step Civic-Tech walk-through for citizens & LGU officials
// ============================================

import React, { useState } from "react";
import {
  Shield,
  KeyRound,
  Lock,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  Sparkles,
  Smartphone,
  EyeOff,
} from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      badge: "Zero-Knowledge Sovereignty",
      title: "No Logins. No Passwords. Total Privacy.",
      description:
        "In emergency disaster zones, forced registration and passwords delay aid. GhostFree never asks for your email or password. Your Resident ID and physical voucher PIN never leave your mobile phone.",
      icon: <EyeOff className="w-8 h-8 text-civic-sky" />,
      highlight: "0 bytes of your personal data transmitted over the internet.",
      tags: ["Local WASM Proving", "Data Privacy Act (R.A. 10173)", "Self-Sovereign"],
    },
    {
      badge: "Mathematical Eligibility",
      title: "Cryptographic Merkle Proofs on Your Phone",
      description:
        "When your Local Government Unit (LGU) publishes a relief roster, they only publish a mathematical Merkle Root. Your smartphone computes a local zero-knowledge proof proving you are on the list without revealing who you are.",
      icon: <KeyRound className="w-8 h-8 text-accent-purple" />,
      highlight: "Proves you are an eligible calamity victim without exposing your name.",
      tags: ["Poseidon Merkle Trees", "Client-Side Circuits", "Midnight Network"],
    },
    {
      badge: "Anti-Ghost Guarantee",
      title: "Permanent Double-Claim Prevention",
      description:
        "GhostFree derives a unique cryptographic nullifier for your claim. Once aid is released to your Lace wallet, the smart contract records the nullifier as spent. Duplicate claims immediately fail, permanently locking out ghost beneficiaries.",
      icon: <Lock className="w-8 h-8 text-accent-success" />,
      highlight: "Stops fraudulent duplicate claims while preserving 100% claimant anonymity.",
      tags: ["Nullifier Circuit", "Instant tNIGHT Release", "Full Public Auditability"],
    },
  ];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem("ghostfree_onboarding_completed", "true");
    } catch {
      // Ignore
    }
    onClose();
  };

  const slide = slides[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-shield-glass/30 glass-card-elevated bg-slate-900/95 shadow-2xl p-6 sm:p-8">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-civic-sky/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-accent-success/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleComplete}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close onboarding tour"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-civic-blue/20 text-civic-sky border border-civic-sky/30">
            <Sparkles className="w-3.5 h-3.5" />
            {slide.badge}
          </span>
          <span className="text-xs text-white/40 font-mono">
            Step {currentStep + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Content */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            {slide.icon}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              {slide.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {slide.description}
            </p>
          </div>
        </div>

        {/* Highlight Callout */}
        <div className="p-3.5 rounded-xl bg-civic-blue/10 border border-civic-blue/20 mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-civic-sky">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-accent-success" />
            <span>{slide.highlight}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {slide.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[0.7rem] font-medium bg-white/5 text-white/60 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? "w-6 bg-civic-sky" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="btn-civic btn-primary px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-civic-blue/20"
            >
              {currentStep === slides.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle2 className="w-4 h-4 ml-0.5" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
