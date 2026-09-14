import { describe, it, expect, beforeEach } from "vitest";
import {
  t,
  setLanguage,
  getStoredLanguage,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
} from "../src/services/i18n.service";

describe("Disaster Regional Dialect i18n Service (fb-user-008)", () => {
  beforeEach(() => {
    setLanguage("en");
  });

  it("should have all supported languages configured", () => {
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    expect(codes).toContain("en");
    expect(codes).toContain("fil");
    expect(codes).toContain("ceb");
  });

  it("should return English translations by default", () => {
    expect(t("stepConnect")).toBe("Connect");
    expect(t("appName")).toBe("GhostFree");
    expect(t("connectButton")).toBe("Connect Lace Wallet");
  });

  it("should translate into Filipino (Tagalog) accurately", () => {
    setLanguage("fil");
    expect(t("stepConnect")).toBe("Ikonekta");
    expect(t("stepVerify")).toBe("Beripika");
    expect(t("stepProve")).toBe("Patunayan");
    expect(t("stepResult")).toBe("Resulta");
    expect(t("residentIdLabel")).toBe("PhilSys Resident ID");
  });

  it("should translate into Cebuano (Bisaya) accurately", () => {
    setLanguage("ceb");
    expect(t("stepConnect")).toBe("Ikonektar");
    expect(t("stepVerify")).toBe("Susiha");
    expect(t("stepProve")).toBe("Pamatud-i");
    expect(t("stepResult")).toBe("Resulta");
    expect(t("tagline")).toContain("Hunonga ang mga multo");
  });

  it("should gracefully fall back to English if key is missing in target dialect", () => {
    expect(t("non_existent_test_key", "ceb")).toBe("non_existent_test_key");
  });

  it("should ensure all languages share core claim step keys", () => {
    const keysToCheck = [
      "stepConnect",
      "stepVerify",
      "stepProve",
      "stepResult",
      "credentialsTitle",
      "privacyNotice",
      "resultSuccessTitle",
    ];

    for (const key of keysToCheck) {
      expect(TRANSLATIONS.en[key]).toBeDefined();
      expect(TRANSLATIONS.fil[key]).toBeDefined();
      expect(TRANSLATIONS.ceb[key]).toBeDefined();
    }
  });
});
