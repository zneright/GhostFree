// ============================================
// GhostFree — Accessibility Unit Tests
// Feedback-driven: fb-user-006
// Tests for accessibility preferences persistence & disaster zone UX
// ============================================

import { describe, it, expect, beforeEach } from "vitest";
import {
  getAccessibilityPreferences,
  setAccessibilityPreferences,
  clearFeedbackStorage,
} from "../src/services/feedback.service";

describe("Accessibility Service (Feedback-Driven: fb-user-006)", () => {
  beforeEach(() => {
    clearFeedbackStorage();
  });

  it("should return default accessibility preferences when none are saved", () => {
    const prefs = getAccessibilityPreferences();
    expect(prefs).toEqual({
      highContrast: false,
      largeText: false,
    });
  });

  it("should persist high contrast mode preference", () => {
    setAccessibilityPreferences({
      highContrast: true,
      largeText: false,
    });

    const prefs = getAccessibilityPreferences();
    expect(prefs.highContrast).toBe(true);
    expect(prefs.largeText).toBe(false);
  });

  it("should persist large text mode preference for budget phone outdoor readability", () => {
    setAccessibilityPreferences({
      highContrast: false,
      largeText: true,
    });

    const prefs = getAccessibilityPreferences();
    expect(prefs.highContrast).toBe(false);
    expect(prefs.largeText).toBe(true);
  });

  it("should persist combined accessibility preferences", () => {
    setAccessibilityPreferences({
      highContrast: true,
      largeText: true,
    });

    const prefs = getAccessibilityPreferences();
    expect(prefs.highContrast).toBe(true);
    expect(prefs.largeText).toBe(true);
  });

  it("should reset accessibility preferences independently without affecting other states", () => {
    setAccessibilityPreferences({
      highContrast: true,
      largeText: true,
    });

    setAccessibilityPreferences({
      highContrast: false,
      largeText: false,
    });

    const prefs = getAccessibilityPreferences();
    expect(prefs.highContrast).toBe(false);
    expect(prefs.largeText).toBe(false);
  });
});
