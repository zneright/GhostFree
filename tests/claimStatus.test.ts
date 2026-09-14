// ============================================
// GhostFree — Claim Status Tracker Unit Tests
// Feedback-driven: fb-user-007
// Tests for claim lifecycle tracking and privacy preservation
// ============================================

import { describe, it, expect, beforeEach } from "vitest";
import {
  getClaimEvents,
  recordClaimEvent,
  getEventsByStage,
  getLifecycleStats,
  clearClaimEvents,
  resetToDefaultEvents,
} from "../src/services/claimStatus.service";

describe("Claim Status Tracker Service (Feedback-Driven: fb-user-007)", () => {
  beforeEach(() => {
    clearClaimEvents();
  });

  it("should initialize with default seed events when storage is empty", () => {
    const events = getClaimEvents();
    expect(events.length).toBeGreaterThanOrEqual(6);
    expect(events[0].id).toBeDefined();
    expect(events[0].nullifierSnippet).toMatch(/^0x[0-9a-fA-F]{4}\.\.\.[0-9a-fA-F]{4}$/);
  });

  it("should record a new claim lifecycle event", () => {
    const newEntry = recordClaimEvent({
      nullifierSnippet: "0xaa11...bb22",
      stage: "proving",
      operationName: "Typhoon Carina Calamity Grant",
      amount: 4500,
    });

    expect(newEntry.id).toMatch(/^evt-/);
    expect(newEntry.stage).toBe("proving");
    expect(newEntry.nullifierSnippet).toBe("0xaa11...bb22");
    expect(newEntry.timestamp).toBeDefined();

    const allEvents = getClaimEvents();
    expect(allEvents[0].id).toBe(newEntry.id);
  });

  it("should filter claim events by lifecycle stage", () => {
    resetToDefaultEvents();
    const disbursed = getEventsByStage("disbursed");
    expect(disbursed.length).toBeGreaterThanOrEqual(2);
    for (const evt of disbursed) {
      expect(evt.stage).toBe("disbursed");
    }

    const submitted = getEventsByStage("submitted");
    expect(submitted.length).toBeGreaterThanOrEqual(1);
    for (const evt of submitted) {
      expect(evt.stage).toBe("submitted");
    }
  });

  it("should compute accurate lifecycle stage statistics for LGU audit", () => {
    resetToDefaultEvents();
    const stats = getLifecycleStats();
    expect(stats.disbursed).toBeGreaterThanOrEqual(2);
    expect(stats.verified).toBeGreaterThanOrEqual(1);
    expect(stats.proving).toBeGreaterThanOrEqual(1);
    expect(stats.submitted).toBeGreaterThanOrEqual(1);
    expect(stats.receipt_downloaded).toBeGreaterThanOrEqual(1);

    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    const events = getClaimEvents();
    expect(total).toBe(events.length);
  });

  it("should preserve citizen privacy by storing only nullifier snippets and no PII", () => {
    const events = getClaimEvents();
    for (const evt of events) {
      // Must NOT contain full residentID or nationalId or secretPin
      expect(evt).not.toHaveProperty("residentID");
      expect(evt).not.toHaveProperty("nationalId");
      expect(evt).not.toHaveProperty("secretPin");
      expect(evt).not.toHaveProperty("residentSecret");
      expect(evt).not.toHaveProperty("privateWitness");
      // Snippet must be masked
      expect(evt.nullifierSnippet).toContain("...");
    }
  });

  it("should clear and reset events properly", () => {
    resetToDefaultEvents();
    expect(getClaimEvents().length).toBeGreaterThan(0);

    clearClaimEvents();
    // After clear, getClaimEvents will reseed
    const reseeded = getClaimEvents();
    expect(reseeded.length).toBeGreaterThanOrEqual(6);
  });
});
