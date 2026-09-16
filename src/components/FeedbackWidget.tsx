// ============================================
// GhostFree — In-App Structured Feedback Widget
// Living feedback collection across all dApp pages
// ============================================

import React, { useState } from "react";
import {
  MessageSquarePlus,
  Star,
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Smile,
  HeartHandshake,
} from "lucide-react";
import { submitFeedback } from "../services/feedback.service";
import type { UserFeedback } from "../types";

interface FeedbackWidgetProps {
  /** Optional custom trigger button override */
  customTrigger?: React.ReactNode;
  /** Initial role pre-selection (e.g. 'citizen' when on /claim) */
  defaultRole?: UserFeedback["role"];
  /** Auto-open the modal on mount */
  initialOpen?: boolean;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  customTrigger,
  defaultRole = "citizen",
  initialOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [role, setRole] = useState<UserFeedback["role"]>(defaultRole);
  const [category, setCategory] = useState<UserFeedback["category"]>("usability");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories: { id: UserFeedback["category"]; label: string }[] = [
    { id: "usability", label: "Usability & Design" },
    { id: "wallet", label: "Wallet & Connectivity" },
    { id: "speed", label: "Proving Speed" },
    { id: "privacy", label: "Privacy Concerns" },
    { id: "feature_request", label: "Feature Request" },
    { id: "general", label: "General Feedback" },
  ];

  const roles: { id: UserFeedback["role"]; label: string }[] = [
    { id: "citizen", label: "Citizen / Relief Claimant" },
    { id: "lgu_officer", label: "LGU Official / DRRM" },
    { id: "volunteer", label: "Field Volunteer / Responder" },
    { id: "security_researcher", label: "Web3 / Security Auditor" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please provide a short description or suggestion.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      submitFeedback({
        rating,
        category,
        role,
        comment: comment.trim(),
      });

      setSubmitted(true);
      setTimeout(() => {
        // Reset form after short delay
        setComment("");
        setSubmitting(false);
      }, 500);
    } catch {
      setError("Failed to record feedback. Please try again.");
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (submitted) {
      setTimeout(() => setSubmitted(false), 300);
    }
  };

  return (
    <>
      {/* Floating or custom trigger */}
      {customTrigger ? (
        <div onClick={() => setIsOpen(true)}>{customTrigger}</div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-300 shadow-xl shadow-black/40 backdrop-blur-md border-2 border-amber-500/40 hover:border-amber-400 transition-all hover:scale-105 active:scale-95 text-xs font-bold"
          aria-label="Give Feedback"
          id="global-feedback-trigger"
        >
          <MessageSquarePlus className="w-4 h-4 text-amber-400" />
          <span className="hidden xs:inline">Puna / Feedback</span>
        </button>
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-shield-glass/30 glass-card-elevated bg-slate-900/95 shadow-2xl p-6">
            {/* Header Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-civic-sky/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close feedback modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-accent-success/15 border border-accent-success/30 flex items-center justify-center mb-4">
                  <HeartHandshake className="w-8 h-8 text-accent-success" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-sm text-white/70 max-w-xs mb-6">
                  Your insights are directly routed to the development team to improve
                  anti-fraud emergency relief on Midnight.
                </p>
                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                {/* Modal Title */}
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquarePlus className="w-5 h-5 text-civic-sky" />
                  <h3 className="text-lg font-bold text-white">
                    GhostFree Feedback
                  </h3>
                </div>
                <p className="text-xs text-white/60 mb-5">
                  Help us refine privacy-first calamity aid. Zero personal data is tracked.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      How would you rate your experience?
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 text-white transition-transform hover:scale-110 active:scale-95"
                          aria-label={`${star} star rating`}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              (hoverRating !== null ? hoverRating >= star : rating >= star)
                                ? "text-accent-gold fill-accent-gold"
                                : "text-white/20"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-white/50 ml-2 font-mono">
                        {rating} of 5
                      </span>
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      I am a:
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserFeedback["role"])}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:border-civic-sky focus:outline-none transition-colors"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Feedback Topic:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(c.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-[0.7rem] font-medium border text-left transition-all ${
                            category === c.id
                              ? "bg-civic-blue/20 border-civic-sky text-civic-sky"
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comments Box */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Comments & Suggestions:
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder="What worked smoothly? What could be improved?"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-civic-sky focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-1.5 text-xs text-accent-danger">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Privacy Badge & Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[0.65rem] text-white/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent-success" />
                      <span>100% Anonymous Witness</span>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-civic btn-primary px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-civic-blue/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;
