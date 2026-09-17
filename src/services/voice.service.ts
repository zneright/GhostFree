// ============================================
// GhostFree — Multi-Dialect Voice Accessibility Engine
// Speaks in English (en), Filipino (fil), or Cebuano (ceb)
// Accessible voice guides for disaster victims, PWDs, and field evacuees
// ============================================

import type { SupportedLanguage } from "./i18n.service";

export type VoiceContextKey =
  | "landingHero"
  | "reliefBasket"
  | "claimStep1"
  | "claimStep2"
  | "claimStep3"
  | "claimStep4"
  | "treasury";

export const VOICE_SCRIPTS: Record<VoiceContextKey, Record<SupportedLanguage, string>> = {
  landingHero: {
    en: "Welcome to GhostFree. An official privacy-first calamity aid distribution system on the Midnight Network. Disbursing 5,000 Pesos emergency relief directly to calamity survivors with zero gas fees and zero personal data leaks.",
    fil: "Maligayang pagdating sa GhostFree. Isang opisyal at ligtas na sistema ng ayuda para sa mga nasalanta ng kalamidad sa Midnight Network. Nagbibigay ng limang libong pisong emergency cash aid nang walang gas fee at protektado ang iyong pagkakakilanlan.",
    ceb: "Maayong pag-abot sa GhostFree. Usa ka opisyal ug luwas nga plataporma sa hinabang sa kalamidad sa Midnight Network. Naghatag og lima ka libo ka pesos nga ayuda nga walay gas fee ug 100% pribado ang imong personal nga impormasyon.",
  },
  reliefBasket: {
    en: "Here is where the 5,000 Pesos emergency aid goes: 25 kilograms of NFA well-milled rice, DSWD family food packs, 10 gallons of purified water and hygiene supplies, first aid medicine, and emergency shelter roof repair kits.",
    fil: "Narito kung saan napupunta ang limang libong pisong ayuda: dalawampu't limang kilong bigas, DSWD food pack, sampung galong malinis na inuming tubig, gamot para sa lagnat at sugat, at tarpaulin para sa bubong ng tahanan.",
    ceb: "Mao kini ang padulngan sa lima ka libo ka pesos nga hinabang: baynte singko ka kilong bugas, DSWD family food pack, napulo ka galon nga limpyo nga tubig, tambal alang sa hilanat ug samad, ug tolda alang sa atop.",
  },
  claimStep1: {
    en: "Step one: Connect your Midnight Lace wallet or click Launch Evaluator Sandbox to start your 5,000 Pesos emergency aid claim. This is 100% free with zero gas fees.",
    fil: "Hakbang isa: Ikonekta ang inyong Midnight Lace wallet o gamitin ang Evaluator Sandbox upang masimulan ang pag-claim ng limang libong pisong ayuda. Libre po ito at walang bayad.",
    ceb: "Unang lakang: Ikonektar ang imong Midnight Lace wallet o pindota ang Evaluator Sandbox aron sugdan ang pag-claim sa lima ka libo ka pesos nga hinabang. Libre kini ug walay bayad sa gas.",
  },
  claimStep2: {
    en: "Step two: Enter your PhilSys National ID number and the 4-digit secret PIN from your barangay relief voucher using the touch keypad. Your identity remains strictly secret on your phone.",
    fil: "Hakbang dalawa: Ipasok ang inyong PhilSys National ID at ang apat na digit na PIN mula sa inyong barangay relief voucher gamit ang keypad. Hindi po ito makikita ng gobyerno o ninuman.",
    ceb: "Ikaduhang lakang: Isulod ang imong PhilSys National ID ug ang upat ka numero nga secret PIN gikan sa imong barangay voucher gamit ang keypad. Ang imong impormasyon magpabilin nga tinago sa imong selpon.",
  },
  claimStep3: {
    en: "Step three: Your phone is now generating a private zero-knowledge cryptographic proof. Checking calamity eligibility and preventing ghost duplicate claims.",
    fil: "Hakbang tatlo: Kasalukuyang sinusuri ng inyong telepono ang inyong eligibility nang palihim gamit ang zero-knowledge proof. Pinipigilan nito ang mga pekeng ghost claims.",
    ceb: "Ikatulong lakang: Ang imong selpon naghimo karon og pribadong zero-knowledge proof. Ginasusi ang imong eligibility ug ginapugngan ang mga ghost o peke nga claims.",
  },
  claimStep4: {
    en: "Congratulations! Your 5,000 Pesos emergency relief aid has been successfully disbursed to your wallet. You may now download or print your official relief voucher.",
    fil: "Binabati po kayo! Matagumpay na naipadala ang inyong limang libong pisong emergency ayuda. Maaari na ninyong i-download o i-print ang inyong opisyal na relief voucher.",
    ceb: "Pahalipay! Malamposong na-apod-apod ang imong lima ka libo ka pesos nga hinabang sa kalamidad. Mahimo na nimo i-download o i-print ang imong opisyal nga voucher.",
  },
  treasury: {
    en: "GhostFree Public Calamity Treasury and Audit Explorer. Real-time fund telemetry compliant with Philippine Disaster Risk Reduction Act and Data Privacy Act. Inspect total disbursed funds, municipal quorum approvals, and zero-knowledge nullifiers.",
    fil: "GhostFree Pampublikong Pondo at Audit Explorer. Real-time na telemetry ng pondo na sumusunod sa Republic Act 10121 at Data Privacy Act. Masusuri ang kabuuang naipamahagi, pag-apruba ng mga opisyal, at anti-ghost nullifiers nang walang nabubunyag na personal na impormasyon.",
    ceb: "GhostFree Pampublikong Panalapi ug Audit Explorer. Real-time nga telemetry sa pundo nga nahiuyon sa Republic Act 10121 ug Data Privacy Act. Masusi ang tanang na-apod-apod nga hinabang, pagtugot sa mga opisyal, ug anti-ghost nullifiers nga walay personal nga ngalan nga mabutyag.",
  },
};

type VoiceStatusListener = (active: boolean, currentContext?: VoiceContextKey | null) => void;

let activeSpeaking = false;
let currentContextKey: VoiceContextKey | null = null;
const listeners: Set<VoiceStatusListener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener(activeSpeaking, currentContextKey));
}

export function subscribeVoiceStatus(listener: VoiceStatusListener): () => void {
  listeners.add(listener);
  listener(activeSpeaking, currentContextKey);
  return () => {
    listeners.delete(listener);
  };
}

export function isVoiceActive(): boolean {
  return activeSpeaking;
}

export function getCurrentVoiceContext(): VoiceContextKey | null {
  return currentContextKey;
}

export function stopVoice(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  activeSpeaking = false;
  currentContextKey = null;
  notifyListeners();
}

function findBestVoice(lang: SupportedLanguage): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  if (lang === "fil" || lang === "ceb") {
    // Prefer Filipino or Tagalog speech synthesizers
    const filVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith("fil") ||
        v.lang.toLowerCase().startsWith("tl") ||
        v.name.toLowerCase().includes("filipino") ||
        v.name.toLowerCase().includes("tagalog")
    );
    if (filVoice) return filVoice;
    // Regional fallback: English (Philippines)
    const enPhVoice = voices.find((v) => v.lang.toLowerCase() === "en-ph");
    if (enPhVoice) return enPhVoice;
  }

  // English or general fallback
  const enVoice = voices.find(
    (v) =>
      v.lang.toLowerCase() === "en-ph" ||
      v.lang.toLowerCase().startsWith("en-us") ||
      v.lang.toLowerCase().startsWith("en")
  );
  return enVoice || voices[0] || null;
}

export function speakContext(contextKey: VoiceContextKey, lang: SupportedLanguage = "fil"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported in this browser environment.");
    return;
  }

  // If already speaking the same context, toggle off
  if (activeSpeaking && currentContextKey === contextKey) {
    stopVoice();
    return;
  }

  // Cancel existing
  stopVoice();

  const script = VOICE_SCRIPTS[contextKey]?.[lang] || VOICE_SCRIPTS[contextKey]?.fil;
  if (!script) return;

  const utterance = new SpeechSynthesisUtterance(script);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const voice = findBestVoice(lang);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    activeSpeaking = true;
    currentContextKey = contextKey;
    notifyListeners();
  };

  utterance.onend = () => {
    activeSpeaking = false;
    currentContextKey = null;
    notifyListeners();
  };

  utterance.onerror = () => {
    activeSpeaking = false;
    currentContextKey = null;
    notifyListeners();
  };

  window.speechSynthesis.speak(utterance);
}

export function speakCustom(text: string, lang: SupportedLanguage = "fil"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  stopVoice();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  const voice = findBestVoice(lang);
  if (voice) utterance.voice = voice;

  utterance.onstart = () => {
    activeSpeaking = true;
    currentContextKey = null;
    notifyListeners();
  };

  utterance.onend = () => {
    activeSpeaking = false;
    currentContextKey = null;
    notifyListeners();
  };

  utterance.onerror = () => {
    activeSpeaking = false;
    currentContextKey = null;
    notifyListeners();
  };

  window.speechSynthesis.speak(utterance);
}

import { useState, useEffect } from "react";
import { useTranslation } from "./i18n.service";

export function useVoiceAssistant() {
  const { lang } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState<boolean>(isVoiceActive());
  const [currentContext, setCurrentContext] = useState<VoiceContextKey | null>(getCurrentVoiceContext());

  useEffect(() => {
    const unsubscribe = subscribeVoiceStatus((active, ctx) => {
      setIsSpeaking(active);
      setCurrentContext(ctx || null);
    });
    return unsubscribe;
  }, []);

  const speak = (contextKey: VoiceContextKey) => {
    speakContext(contextKey, lang);
  };

  return {
    isSpeaking,
    currentContext,
    speak,
    stop: stopVoice,
    speakCustom: (text: string) => speakCustom(text, lang),
  };
}
