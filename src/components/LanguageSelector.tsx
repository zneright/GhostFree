// ============================================
// GhostFree — Language Selector Component
// Regional dialect switcher (English, Filipino, Cebuano)
// Addresses feedback fb-user-008
// ============================================

import React, { useState, useEffect, useRef } from "react";
import { Globe, Check } from "lucide-react";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  getStoredLanguage,
  setLanguage,
  subscribeLanguageChange,
} from "../services/i18n.service";

interface LanguageSelectorProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = "",
  compact = false,
}) => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>("en");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getStoredLanguage());
    const unsubscribe = subscribeLanguageChange((newLang) => {
      setCurrentLang(newLang);
    });
    return unsubscribe;
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const handleSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-civic-sky"
      >
        <Globe className="w-3.5 h-3.5 text-civic-sky" />
        <span className="font-semibold text-civic-sky">{activeOption.badge}</span>
        {!compact && <span className="hidden sm:inline text-white/70">{activeOption.name}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-[#0F223D] border border-white/15 shadow-2xl shadow-black/50 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40 border-b border-white/10">
            Regional Dialect
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors text-white"
            >
              <div>
                <div className="font-medium flex items-center gap-1.5">
                  <span className="text-[10px] px-1 py-0.5 rounded bg-civic-sky/20 text-civic-sky font-mono font-bold">
                    {lang.badge}
                  </span>
                  <span>{lang.name}</span>
                </div>
                <div className="text-[11px] text-white/50">{lang.nativeName}</div>
              </div>
              {lang.code === currentLang && (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
