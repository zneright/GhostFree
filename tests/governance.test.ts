// ============================================
// GhostFree — Governance & Treasury Unit Tests
// Tests for dual-key quorum signing, treasury metrics, and COA CSV generation
// ============================================

import { describe, it, expect, beforeEach } from "vitest";
import {
  getGovernanceOperations,
  signOperationQuorum,
  computeTreasuryMetrics,
  generateCOAAuditCSV,
  clearGovernanceStorage,
  computeOfficerSignatureHash,
  SEED_OPERATIONS,
} from "../src/services/governance.service";

describe("Governance & Treasury Service (Dual-Key Quorum & COA Audit)", () => {
  beforeEach(() => {
    clearGovernanceStorage();
  });

  it("should initialize with seed operations when storage is empty", () => {
    const ops = getGovernanceOperations();
    expect(ops.length).toBeGreaterThanOrEqual(SEED_OPERATIONS.length);
    expect(ops[0].id).toBe("op-qrf-2026-001");
    expect(ops[0].quorumStatus).toBe("fully_authorized");
  });

  it("should generate a deterministic cryptographic authorization hash", () => {
    const hash1 = computeOfficerSignatureHash(
      "drrm_officer",
      "Engr. Santos",
      "DRRM-01",
      "0x1234",
      "2026-09-13T00:00:00Z"
    );
    const hash2 = computeOfficerSignatureHash(
      "drrm_officer",
      "Engr. Santos",
      "DRRM-01",
      "0x1234",
      "2026-09-13T00:00:00Z"
    );

    expect(hash1).toMatch(/^0x/);
    expect(hash1).toBe(hash2);
  });

  it("should allow a Municipal Treasurer to sign a draft operation and complete quorum", () => {
    // op-qrf-2026-003 starts with pending_treasurer in seed data
    const result = signOperationQuorum(
      "op-qrf-2026-003",
      "municipal_treasurer",
      "Hon. Ricardo Tan",
      "TREAS-ID-991"
    );

    expect(result.success).toBe(true);
    expect(result.operation).toBeDefined();
    expect(result.operation?.quorumStatus).toBe("fully_authorized");
    expect(result.operation?.approvals?.length).toBe(2);

    const treasApproval = result.operation?.approvals?.find(
      (a) => a.officerRole === "municipal_treasurer"
    );
    expect(treasApproval?.officerName).toBe("Hon. Ricardo Tan");
    expect(treasApproval?.signatureHash).toMatch(/^0x/);
  });

  it("should reject duplicate signing by the same authority role", () => {
    // op-qrf-2026-001 already has drrm_officer approval
    const duplicateAttempt = signOperationQuorum(
      "op-qrf-2026-001",
      "drrm_officer",
      "Engr. Impostor",
      "DRRM-FAKE-01"
    );

    expect(duplicateAttempt.success).toBe(false);
    expect(duplicateAttempt.error).toContain("already been signed");
  });

  it("should compute accurate Treasury Metrics across operations", () => {
    const metrics = computeTreasuryMetrics();

    expect(metrics.totalAllocatedFund).toBeGreaterThan(0);
    expect(metrics.totalDisbursedFund).toBeGreaterThan(0);
    expect(metrics.remainingEscrowFund).toBe(
      metrics.totalAllocatedFund - metrics.totalDisbursedFund
    );
    expect(metrics.totalVerifiedClaims).toBeGreaterThan(0);
    expect(metrics.duplicateAttemptsBlocked).toBeGreaterThan(0);
  });

  it("should generate a valid Commission on Audit (COA) CSV string", () => {
    const csv = generateCOAAuditCSV();

    expect(csv).toContain("Operation ID,Calamity Operation Name,Merkle Root Commitment");
    expect(csv).toContain("Typhoon Marce Quick Response Cash Assistance");
    expect(csv).toContain("MDRRMO-IV-A-042");
    expect(csv).toContain("fully_authorized");
  });
});
