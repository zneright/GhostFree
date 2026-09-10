// ============================================
// GhostFree — Feedback & Receipt Unit Tests
// Tests for feedback submission, analytics, and receipt generation
// ============================================

import { describe, it, expect, beforeEach } from "vitest";
import {
  getFeedbackList,
  submitFeedback,
  updateFeedbackStatus,
  computeFeedbackAnalytics,
  generateReliefReceipt,
  clearFeedbackStorage,
  INITIAL_SEED_FEEDBACK,
} from "../src/services/feedback.service";

describe("Feedback Service & Living Feedback Loop", () => {
  beforeEach(() => {
    clearFeedbackStorage();
  });


  it("should initialize with seed feedback if storage is empty", () => {
    const list = getFeedbackList();
    expect(list.length).toBeGreaterThanOrEqual(INITIAL_SEED_FEEDBACK.length);
    expect(list[0].id).toBeDefined();
  });

  it("should submit new user feedback with calculated priority", () => {
    const submitted = submitFeedback({
      rating: 5,
      category: "privacy",
      role: "citizen",
      comment: "Very fast and private!",
    });

    expect(submitted.id).toMatch(/^fb-/);
    expect(submitted.rating).toBe(5);
    expect(submitted.status).toBe("new");
    expect(submitted.priority).toBe("low");

    const updatedList = getFeedbackList();
    expect(updatedList[0].id).toBe(submitted.id);
  });

  it("should assign high priority to low rating feedback (<= 2 stars)", () => {
    const poorRating = submitFeedback({
      rating: 2,
      category: "wallet",
      role: "volunteer",
      comment: "Encountered wallet delay.",
    });

    expect(poorRating.priority).toBe("high");
  });

  it("should update feedback status and priority", () => {
    const submitted = submitFeedback({
      rating: 4,
      category: "usability",
      role: "citizen",
      comment: "Add receipt copy button.",
    });

    const success = updateFeedbackStatus(submitted.id, "planned", "high");
    expect(success).toBe(true);

    const list = getFeedbackList();
    const item = list.find((f) => f.id === submitted.id);
    expect(item?.status).toBe("planned");
    expect(item?.priority).toBe("high");
  });

  it("should accurately compute feedback analytics and CSAT metrics", () => {
    const analytics = computeFeedbackAnalytics(INITIAL_SEED_FEEDBACK);
    expect(analytics.totalCount).toBe(INITIAL_SEED_FEEDBACK.length);
    expect(analytics.averageRating).toBeGreaterThanOrEqual(4.0);
    expect(analytics.ratingDistribution[5]).toBeGreaterThan(0);
    expect(analytics.categoryDistribution["privacy"]).toBeDefined();
  });

  it("should generate a valid cryptographic relief receipt without exposing private data", () => {
    const txHash = "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43";
    const receipt = generateReliefReceipt(txHash, 5000, "Typhoon Disaster Quick Response");

    expect(receipt.receiptId).toMatch(/^GFR-/);
    expect(receipt.transactionHash).toBe(txHash);
    expect(receipt.amount).toBe(5000);
    expect(receipt.status).toBe("confirmed");
    expect(receipt.nullifierSnippet).toBe("0x005a...1d43");
    expect(receipt.network).toContain("Midnight Testnet");
  });
});
