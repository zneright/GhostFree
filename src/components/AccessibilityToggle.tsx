// ============================================
// GhostFree — Accessibility Toggle Component
// Feedback-driven: fb-user-006 & PWD / Non-Tech-Literate Disaster Zone UX
// ============================================

import React, { useState, useEffect, useCallback } from "react";
import { Accessibility, Sun, Type, Volume2, VolumeX, X, Check } from "lucide-react";
import {
  getAccessibilityPreferences,
  setAccessibilityPreferences,
} from "../services/feedback.service";
import type { AccessibilityPreferences } from "../types";

/**
 * Floating accessibility assistant for disaster relief evacuation centers.
 * Provides:
 * 1. Sunlight Outdoor Mode (High-contrast daylight theme for harsh outdoor sun)
 * 2. 3-level Text Size Scaling (100% / 125% / 150% for elderly and low-vision citizens)
 * 3. Spoken Audio Guide (Web Speech API voice assistance for non-readers and PWDs)
 */
const AccessibilityToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccessibilityPreferences>({
    highContrast: false,
    largeText: false,
    textScale: "normal",
    sunlightMode: false,
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply visual preferences to document body
  const applyPreferences = useCallback((p: AccessibilityPreferences) => {
    const body = document.body;
    
    // High contrast / Sunlight mode
    if (p.highContrast || p.sunlightMode) {
      body.classList.add("high-contrast");
      body.classList.add("sunlight-mode");
    } else {
      body.classList.remove("high-contrast");
      body.classList.remove("sunlight-mode");
    }

    // Text scaling
    body.classList.remove("large-text", "xlarge-text");
    if (p.textScale === "xlarge") {
      body.classList.add("xlarge-text");
    } else if (p.largeText || p.textScale === "large") {
      body.classList.add("large-text");
    }
  }, []);

  // Load preferences on mount
  useEffect(() => {
    const saved = getAccessibilityPreferences();
    setPrefs(saved);
    applyPreferences(saved);
  }, [applyPreferences]);

  // Toggle sunlight outdoor high-contrast mode
  const toggleHighContrast = useCallback(() => {
    const updated: AccessibilityPreferences = {
      ...prefs,
      highContrast: !prefs.highContrast,
      sunlightMode: !prefs.highContrast,
    };
    setPrefs(updated);
    setAccessibilityPreferences(updated);
    applyPreferences(updated);
  }, [prefs, applyPreferences]);

  // Set font scaling
  const setScale = useCallback((scale: "normal" | "large" | "xlarge") => {
    const isLarge = scale === "large" || scale === "xlarge";
    const updated: AccessibilityPreferences = {
      ...prefs,
      largeText: isLarge,
      textScale: scale,
    };
    setPrefs(updated);
    setAccessibilityPreferences(updated);
    applyPreferences(updated);
  }, [prefs, applyPreferences]);

  // Built-in Web Speech API voice assistant
  const toggleVoiceGuide = useCallback(() => {
    if (!("speechSynthesis" in window)) {
      alert("Voice guide is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Determine instructional content to read based on current URL path
    const path = window.location.pathname;
    let spokenText = "";
    if (path.includes("/claim")) {
      spokenText =
        "Maligayang pagdating sa GhostFree Disaster Calamity Claim Portal. " +
        "Ihanda po ang inyong PhilSys National ID at 4-digit secret PIN mula sa inyong evacuation center relief voucher. " +
        "Pribado po at ligtas ang inyong pag-claim. Hindi po ilalabas sa internet ang inyong personal na impormasyon.";
    } else if (path.includes("/transparency")) {
      spokenText =
        "Ito po ang GhostFree Public Calamity Treasury Explorer. " +
        "Maaari ninyong makita ang kabuuang pondo ng ayuda na naipamahagi nang tapat, " +
        "walang ghost beneficiaries, at sumusunod sa pamantayan ng Commission on Audit.";
    } else if (path.includes("/admin")) {
      spokenText =
        "Ito po ang LGU Disaster Risk Reduction and Management Command Center. " +
        "Dito po nagpapatunay ang MDRRMO at Municipal Treasurer gamit ang dual-key quorum authorization.";
    } else {
      spokenText =
        "Maligayang pagdating sa GhostFree. " +
        "Ang ligtas at pribadong pamamahagi ng emergency calamity ayuda sa Midnight Network. " +
        "Walang ghost beneficiaries. Walang padrino. Protektado ang mamamayan.";
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 0.95; // Slightly slower for elderly / distress comprehension
    utterance.pitch = 1.0;

    // Try finding Filipino/Tagalog voice, else fallback to default
    const voices = window.speechSynthesis.getVoices();
    const tlVoice = voices.find((v) => v.lang.startsWith("fil") || v.lang.startsWith("tl"));
    if (tlVoice) {
      utterance.voice = tlVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [isSpeaking]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div
      className="fixed bottom-24 left-4 sm:bottom-6 sm:left-6 z-50 select-none"
      id="accessibility-toggle"
    >
      {/* Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 glass-card p-4.5 w-76 sm:w-80 shadow-2xl border-2 border-amber-500/30 animate-fade-in-up bg-slate-900/95 text-white">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Accessibility className="w-4.5 h-4.5" />
              Accessibility / Tulong sa PWD
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close accessibility panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Sunlight Outdoor Mode Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                prefs.highContrast || prefs.sunlightMode
                  ? "bg-amber-500/20 border-amber-500 text-amber-300 font-semibold"
                  : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
              }`}
              id="toggle-high-contrast"
            >
              <span className="flex items-center gap-2.5 text-xs font-medium">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>
                  <strong>Sunlight Outdoor Mode</strong>
                  <span className="block text-[0.65rem] text-slate-400 font-normal">
                    Liwanag ng araw sa evacuation center
                  </span>
                </span>
              </span>
              <span
                className={`w-9 h-5 rounded-full relative transition-colors ${
                  prefs.highContrast || prefs.sunlightMode ? "bg-amber-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    prefs.highContrast || prefs.sunlightMode ? "left-4.5" : "left-0.5"
                  }`}
                />
              </span>
            </button>

            {/* 3-Way Font Scale Controls */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-sky-400" />
                  Laki ng Teksto (Font Size)
                </span>
                <span className="text-[0.65rem] text-sky-400 font-bold">
                  {prefs.textScale === "xlarge" ? "150%" : prefs.textScale === "large" ? "125%" : "100%"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "normal", label: "Normal", scale: "100%" },
                  { id: "large", label: "Malaki", scale: "125%" },
                  { id: "xlarge", label: "Napakalaki", scale: "150%" },
                ].map((item) => {
                  const isSelected =
                    prefs.textScale === item.id ||
                    (!prefs.textScale && item.id === "normal" && !prefs.largeText) ||
                    (!prefs.textScale && item.id === "large" && prefs.largeText);
                  return (
                    <button
                      key={item.id}
                      onClick={() => setScale(item.id as "normal" | "large" | "xlarge")}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all text-center ${
                        isSelected
                          ? "bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-sm"
                          : "bg-black/30 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spoken Voice Assistant (Boses Gabay) */}
            <button
              onClick={toggleVoiceGuide}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                isSpeaking
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 animate-pulse font-semibold"
                  : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
              }`}
              id="toggle-voice-assistant"
            >
              <span className="flex items-center gap-2.5 text-xs text-left">
                {isSpeaking ? (
                  <VolumeX className="w-4 h-4 text-emerald-400 animate-spin" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                )}
                <span>
                  <strong>{isSpeaking ? "Ihinto ang Boses" : "Boses Gabay (Read Aloud)"}</strong>
                  <span className="block text-[0.65rem] text-slate-400 font-normal">
                    {isSpeaking ? "Pindutin para ihinto" : "Pakinggan ang panuto sa Tagalog"}
                  </span>
                </span>
              </span>
              {isSpeaking && <span className="text-[0.65rem] text-emerald-400 font-bold">LIVE</span>}
            </button>
          </div>

          <p className="text-[0.65rem] text-slate-400 mt-3 pt-2.5 border-t border-white/10 leading-relaxed text-center">
            Idinisenyo para sa mga evacuation center at mamamayang nangangailangan ng gabay.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isOpen || prefs.highContrast || prefs.sunlightMode || prefs.largeText
            ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(245,158,11,0.5)] border-2 border-amber-300 scale-105"
            : "bg-slate-900 text-amber-400 hover:text-white border-2 border-amber-500/40 hover:border-amber-400"
        }`}
        aria-label="Toggle accessibility options for PWD and elderly"
        id="accessibility-toggle-button"
      >
        <Accessibility className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AccessibilityToggle;
