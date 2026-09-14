// ============================================
// GhostFree — Claim Status Tracker Service
// Feedback-driven: fb-user-007
// "Track claim lifecycle without disclosing citizen PII"
// ============================================

import type { ClaimLifecycleStage, ClaimStatusEvent } from "../types";

const CLAIM_EVENTS_STORAGE_KEY = "ghostfree_claim_status_events";

/**
 * Anonymized seed events reflecting real disaster relief operations.
 * ZERO PII: Only truncated nullifier snippets, operation names, and timestamps.
 */
const SEED_CLAIM_EVENTS: ClaimStatusEvent[] = [
  {
    id: "evt-001",
    nullifierSnippet: "0x4a7f...e31b",
    stage: "disbursed",
    timestamp: "2026-09-02T08:14:22.000Z",
    operationName: "Typhoon Enteng Emergency Relief",
    amount: 5000,
  },
  {
    id: "evt-002",
    nullifierSnippet: "0x8b2c...91fa",
    stage: "disbursed",
    timestamp: "2026-09-02T08:35:10.000Z",
    operationName: "Typhoon Enteng Emergency Relief",
    amount: 5000,
  },
  {
    id: "evt-003",
    nullifierSnippet: "0x1d4e...a703",
    stage: "verified",
    timestamp: "2026-09-05T09:12:44.000Z",
    operationName: "Habagat Flash Flood Assistance",
    amount: 3500,
  },
  {
    id: "evt-004",
    nullifierSnippet: "0x6f90...b21c",
    stage: "proving",
    timestamp: "2026-09-05T09:20:00.000Z",
    operationName: "Habagat Flash Flood Assistance",
    amount: 3500,
  },
  {
    id: "evt-005",
    nullifierSnippet: "0x3e18...c48d",
    stage: "submitted",
    timestamp: "2026-09-10T14:02:18.000Z",
    operationName: "Bulkang Taal Ashfall Subsidy",
    amount: 4000,
  },
  {
    id: "evt-006",
    nullifierSnippet: "0x9c3d...f501",
    stage: "receipt_downloaded",
    timestamp: "2026-09-12T16:45:00.000Z",
    operationName: "Mindanao Earthquake Response",
    amount: 6000,
  },
];

/**
 * Retrieves all tracked claim events from localStorage, initializing with seeds if empty.
 */
export function getClaimEvents(): ClaimStatusEvent[] {
  try {
    const raw = localStorage.getItem(CLAIM_EVENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        CLAIM_EVENTS_STORAGE_KEY,
        JSON.stringify(SEED_CLAIM_EVENTS)
      );
      return SEED_CLAIM_EVENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_CLAIM_EVENTS;
  } catch {
    return SEED_CLAIM_EVENTS;
  }
}

/**
 * Records a new claim lifecycle event without any citizen private witnesses.
 */
export function recordClaimEvent(
  entry: Omit<ClaimStatusEvent, "id" | "timestamp">
): ClaimStatusEvent {
  const events = getClaimEvents();
  const newEvent: ClaimStatusEvent = {
    ...entry,
    id: `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
  };

  const updated = [newEvent, ...events];
  try {
    localStorage.setItem(CLAIM_EVENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Failed to persist claim event to localStorage:", err);
  }

  return newEvent;
}

/**
 * Filters claim events by lifecycle stage.
 */
export function getEventsByStage(stage: ClaimLifecycleStage): ClaimStatusEvent[] {
  return getClaimEvents().filter((e) => e.stage === stage);
}

/**
 * Aggregates count of claims in each lifecycle stage for dashboard transparency.
 */
export function getLifecycleStats(): Record<ClaimLifecycleStage, number> {
  const events = getClaimEvents();
  const stats: Record<ClaimLifecycleStage, number> = {
    submitted: 0,
    proving: 0,
    verified: 0,
    disbursed: 0,
    receipt_downloaded: 0,
  };

  for (const event of events) {
    if (stats[event.stage] !== undefined) {
      stats[event.stage] += 1;
    }
  }

  return stats;
}

/**
 * Clears tracked claim history (useful for testing or cache refresh).
 */
export function clearClaimEvents(): void {
  try {
    localStorage.removeItem(CLAIM_EVENTS_STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear claim events:", err);
  }
}

/**
 * Resets storage to default seed events.
 */
export function resetToDefaultEvents(): ClaimStatusEvent[] {
  try {
    localStorage.setItem(
      CLAIM_EVENTS_STORAGE_KEY,
      JSON.stringify(SEED_CLAIM_EVENTS)
    );
  } catch (err) {
    console.warn("Failed to reset claim events:", err);
  }
  return SEED_CLAIM_EVENTS;
}
