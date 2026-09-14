// ============================================
// GhostFree — Accessibility Toggle Component
// Feedback-driven: fb-user-006
// "Text is too small on my budget Android phone in bright sunlight"
// ============================================

import React, { useState, useEffect, useCallback } from "react";
import { Accessibility, Eye, Type, X } from "lucide-react";
import {
  getAccessibilityPreferences,
  setAccessibilityPreferences,
} from "../services/feedback.service";
import type { AccessibilityPreferences } from "../types";

/**
 * Floating accessibility toggle for disaster zone mobile optimization.
 * Provides high-contrast mode and large text mode for citizens
 * using budget smartphones in bright outdoor conditions.
 *
 * Positioned bottom-left to complement the FeedbackWidget (bottom-right).
 */
const AccessibilityToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccessibilityPreferences>({
    highContrast: false,
    largeText: false,
  });

  // Load saved preferences on mount
  useEffect(() => {
    const saved = getAccessibilityPreferences();
    setPrefs(saved);
    applyPreferences(saved);
  }, []);

  const applyPreferences = useCallback((p: AccessibilityPreferences) => {
    const body = document.body;
    if (p.highContrast) {
      body.classList.add("high-contrast");
    } else {
      body.classList.remove("high-contrast");
    }
    if (p.largeText) {
      body.classList.add("large-text");
    } else {
      body.classList.remove("large-text");
    }
  }, []);

  const toggleHighContrast = useCallback(() => {
    const updated = { ...prefs, highContrast: !prefs.highContrast };
    setPrefs(updated);
    setAccessibilityPreferences(updated);
    applyPreferences(updated);
  }, [prefs, applyPreferences]);

  const toggleLargeText = useCallback(() => {
    const updated = { ...prefs, largeText: !prefs.largeText };
    setPrefs(updated);
    setAccessibilityPreferences(updated);
    applyPreferences(updated);
  }, [prefs, applyPreferences]);

  return (
    <div className="fixed bottom-6 left-6 z-50" id="accessibility-toggle">
      {/* Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 glass-card p-4 w-64 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-civic-trust" />
              Accessibility
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-shield-muted hover:text-white transition-colors"
              aria-label="Close accessibility panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`w-full flex items-center justify-between p-3 rounded-xl mb-2 transition-all ${
              prefs.highContrast
                ? "bg-civic-trust/20 border border-civic-trust/40 text-civic-trust"
                : "bg-shield-surface/50 border border-shield-border/30 text-shield-muted hover:text-slate-200"
            }`}
            id="toggle-high-contrast"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <Eye className="w-4 h-4" />
              High Contrast
            </span>
            <span
              className={`w-8 h-5 rounded-full relative transition-colors ${
                prefs.highContrast ? "bg-civic-trust" : "bg-shield-glass"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  prefs.highContrast ? "left-3.5" : "left-0.5"
                }`}
              />
            </span>
          </button>

          {/* Large Text Toggle */}
          <button
            onClick={toggleLargeText}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              prefs.largeText
                ? "bg-civic-trust/20 border border-civic-trust/40 text-civic-trust"
                : "bg-shield-surface/50 border border-shield-border/30 text-shield-muted hover:text-slate-200"
            }`}
            id="toggle-large-text"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <Type className="w-4 h-4" />
              Large Text
            </span>
            <span
              className={`w-8 h-5 rounded-full relative transition-colors ${
                prefs.largeText ? "bg-civic-trust" : "bg-shield-glass"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  prefs.largeText ? "left-3.5" : "left-0.5"
                }`}
              />
            </span>
          </button>

          <p className="text-[0.65rem] text-shield-muted mt-3 leading-relaxed">
            Optimized for disaster zone conditions — bright sunlight, budget
            devices, and low-bandwidth areas.
          </p>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-civic-lg transition-all tap-scale ${
          isOpen || prefs.highContrast || prefs.largeText
            ? "bg-civic-trust text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            : "bg-shield-surface text-shield-muted hover:text-white border border-shield-border/50 hover:border-civic-trust/40"
        }`}
        aria-label="Toggle accessibility options"
        id="accessibility-toggle-button"
      >
        <Accessibility className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AccessibilityToggle;
