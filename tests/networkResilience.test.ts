import { describe, it, expect, beforeEach } from "vitest";
import { networkResilience } from "../src/services/networkResilience.service";

describe("Disaster Network Resilience Service (fb-user-009)", () => {
  beforeEach(() => {
    networkResilience.clearEphemeralDraft();
    networkResilience.setLowBandwidthMode(false);
    networkResilience._simulateStatus(true);
  });

  it("should initialize with default state", () => {
    const state = networkResilience.getState();
    expect(state.isOnline).toBe(true);
    expect(state.isLowBandwidth).toBe(false);
    expect(state.offlineSince).toBeNull();
  });

  it("should respond to offline transitions", () => {
    networkResilience._simulateStatus(false);
    const state = networkResilience.getState();
    expect(state.isOnline).toBe(false);
    expect(state.offlineSince).toBeGreaterThan(0);
  });

  it("should respond to reconnection transitions", () => {
    networkResilience._simulateStatus(false);
    networkResilience._simulateStatus(true);
    const state = networkResilience.getState();
    expect(state.isOnline).toBe(true);
    expect(state.offlineSince).toBeNull();
  });

  it("should toggle low-bandwidth mode", () => {
    networkResilience.setLowBandwidthMode(true);
    expect(networkResilience.getState().isLowBandwidth).toBe(true);

    networkResilience.setLowBandwidthMode(false);
    expect(networkResilience.getState().isLowBandwidth).toBe(false);
  });

  it("should maintain ephemeral draft in memory without persisting PIN", () => {
    networkResilience.stageEphemeralDraft("PH-EVAC-2026-0042", true);
    const draft = networkResilience.getEphemeralDraft();
    expect(draft).not.toBeNull();
    expect(draft?.nationalId).toBe("PH-EVAC-2026-0042");
    expect(draft?.hasPin).toBe(true);
    // Explicit assertion: PIN value itself is NOT stored in the draft object
    expect((draft as Record<string, unknown>).pin).toBeUndefined();

    networkResilience.clearEphemeralDraft();
    expect(networkResilience.getEphemeralDraft()).toBeNull();
  });

  it("should notify subscribers on state change", () => {
    let notified = false;
    const unsubscribe = networkResilience.subscribe((state) => {
      if (!state.isOnline) {
        notified = true;
      }
    });

    networkResilience._simulateStatus(false);
    expect(notified).toBe(true);
    unsubscribe();
  });
});
