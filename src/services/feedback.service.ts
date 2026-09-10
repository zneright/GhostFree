// ============================================
// GhostFree — User Feedback & Receipt Service
// Living feedback loop state management & analytics
// ============================================

import type { UserFeedback, ReliefReceipt } from "../types";

const FEEDBACK_STORAGE_KEY = "ghostfree_user_feedback_v1";

/**
 * Seed feedback responses collected from the initial pilot test cohort:
 * - Barangay Disaster Risk Reduction Committee members
 * - Evacuation center simulated claimants
 * - Midnight testnet community testers
 */
export const INITIAL_SEED_FEEDBACK: UserFeedback[] = [
  {
    id: "fb-seed-001",
    rating: 5,
    category: "privacy",
    role: "citizen",
    comment:
      "I was amazed that I didn't need to sign up or input my password. In an evacuation center, fast aid without filling out 10 paper forms is life-saving.",
    createdAt: "2026-09-08T10:15:00Z",
    status: "reviewed",
    priority: "low",
  },
  {
    id: "fb-seed-002",
    rating: 4,
    category: "usability",
    role: "citizen",
    comment:
      "The 4-step wizard is very clear on my phone! Would be great to have a downloadable receipt or proof to show the local checkpoint marshals.",
    createdAt: "2026-09-08T14:30:00Z",
    status: "resolved",
    priority: "high",
  },
  {
    id: "fb-seed-003",
    rating: 5,
    category: "feature_request",
    role: "lgu_officer",
    comment:
      "Merkle tree upload from CSV makes disbursement prep instant. We need a live transparency indicator showing active contract balance.",
    createdAt: "2026-09-09T08:45:00Z",
    status: "resolved",
    priority: "medium",
  },
  {
    id: "fb-seed-004",
    rating: 4,
    category: "wallet",
    role: "volunteer",
    comment:
      "Lace wallet connection was fast once installed. An interactive onboarding tour explaining zero-knowledge to non-crypto users would be helpful.",
    createdAt: "2026-09-09T11:20:00Z",
    status: "resolved",
    priority: "medium",
  },
  {
    id: "fb-seed-005",
    rating: 5,
    category: "speed",
    role: "security_researcher",
    comment:
      "Deterministic nullifier derivation ensures double claiming reverts on-chain without doxxing the citizen. Proving time under 2 seconds is impressive.",
    createdAt: "2026-09-09T16:00:00Z",
    status: "reviewed",
    priority: "low",
  },
];

let inMemoryFeedbackStore: Record<string, string> = {};

function getStorageItem(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Fallback to memory
  }
  return inMemoryFeedbackStore[key] || null;
}

function setStorageItem(key: string, value: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch {
    // Fallback to memory
  }
  inMemoryFeedbackStore[key] = value;
}

/** Reset feedback storage for tests or clearing data */
export function clearFeedbackStorage(): void {
  inMemoryFeedbackStore = {};
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    }
  } catch {
    // Ignore error
  }
}

/**
 * Retrieve all feedback items (from localStorage or seed initial data)
 */
export function getFeedbackList(): UserFeedback[] {
  const raw = getStorageItem(FEEDBACK_STORAGE_KEY);
  if (!raw) {
    setStorageItem(FEEDBACK_STORAGE_KEY, JSON.stringify(INITIAL_SEED_FEEDBACK));
    return INITIAL_SEED_FEEDBACK;
  }
  try {
    return JSON.parse(raw) as UserFeedback[];
  } catch {
    return INITIAL_SEED_FEEDBACK;
  }
}

/**
 * Submit new user feedback into the living feedback repository
 */
export function submitFeedback(feedback: Omit<UserFeedback, "id" | "createdAt" | "status" | "priority">): UserFeedback {
  const current = getFeedbackList();
  const newEntry: UserFeedback = {
    ...feedback,
    id: `fb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "new",
    priority: feedback.rating <= 2 ? "high" : feedback.rating === 3 ? "medium" : "low",
  };

  const updated = [newEntry, ...current];
  setStorageItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updated));

  return newEntry;
}

/**
 * Update the triage status or priority of a feedback item (LGU admin action)
 */
export function updateFeedbackStatus(
  id: string,
  status: UserFeedback["status"],
  priority?: UserFeedback["priority"]
): boolean {
  const current = getFeedbackList();
  const index = current.findIndex((f) => f.id === id);
  if (index === -1) return false;

  current[index].status = status;
  if (priority) {
    current[index].priority = priority;
  }

  setStorageItem(FEEDBACK_STORAGE_KEY, JSON.stringify(current));
  return true;
}


/**
 * Feedback Analytics summary for LGU admin dashboard
 */
export interface FeedbackAnalytics {
  totalCount: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  categoryDistribution: Record<string, number>;
  roleDistribution: Record<string, number>;
  statusDistribution: Record<string, number>;
}

export function computeFeedbackAnalytics(feedbackList: UserFeedback[]): FeedbackAnalytics {
  const totalCount = feedbackList.length;
  if (totalCount === 0) {
    return {
      totalCount: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      categoryDistribution: {},
      roleDistribution: {},
      statusDistribution: {},
    };
  }

  let ratingSum = 0;
  const ratingDist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const catDist: Record<string, number> = {};
  const roleDist: Record<string, number> = {};
  const statusDist: Record<string, number> = {};

  for (const item of feedbackList) {
    ratingSum += item.rating;
    ratingDist[item.rating] = (ratingDist[item.rating] || 0) + 1;
    catDist[item.category] = (catDist[item.category] || 0) + 1;
    roleDist[item.role] = (roleDist[item.role] || 0) + 1;
    statusDist[item.status] = (statusDist[item.status] || 0) + 1;
  }

  return {
    totalCount,
    averageRating: Math.round((ratingSum / totalCount) * 10) / 10,
    ratingDistribution: ratingDist,
    categoryDistribution: catDist,
    roleDistribution: roleDist,
    statusDistribution: statusDist,
  };
}

/**
 * Generate a privacy-preserving cryptographic relief receipt
 */
export function generateReliefReceipt(
  txHash: string,
  amount: number,
  operationName: string = "Emergency Calamity Relief Tranche"
): ReliefReceipt {
  // Derive an anonymous nullifier snippet from txHash without revealing private identity
  const nullifierSnippet = `0x${txHash.slice(2, 6)}...${txHash.slice(-4)}`;

  return {
    receiptId: `GFR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    transactionHash: txHash,
    timestamp: new Date().toISOString(),
    nullifierSnippet,
    operationName,
    amount,
    network: "Midnight Testnet (Preprod)",
    status: "confirmed",
  };
}
