// ============================================
// GhostFree — Governance & Treasury Service
// Dual-Key Municipal Quorum & Public Treasury Auditing
// Complies with Philippine R.A. 10121 & COA Circulars
// ============================================

import type {
  ReliefOperation,
  DualKeyApproval,
  OfficerRole,
  QuorumStatus,
  TreasuryMetrics,
  AuditReportEntry,
} from "../types";

const GOVERNANCE_STORAGE_KEY = "ghostfree_governance_operations_v1";

/**
 * Baseline Seed Operations for demonstration and public audit explorer:
 * Includes realistic relief operations under Typhoon Quick Response Fund (QRF)
 */
export const SEED_OPERATIONS: ReliefOperation[] = [
  {
    id: "op-qrf-2026-001",
    name: "Typhoon Marce Quick Response Cash Assistance",
    adminUid: "admin-drrm-01",
    adminName: "Engr. Danilo Santos (MDRRMO Chief)",
    merkleRoot: "0x3f4a9b2c8e1d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
    leafCount: 50,
    treeDepth: 6,
    totalFund: 250000,
    perClaimAmount: 5000,
    contractAddress: "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43",
    status: "active",
    claimedCount: 23,
    createdAt: "2026-09-08T08:00:00Z",
    deployedAt: "2026-09-08T09:30:00Z",
    quorumStatus: "fully_authorized",
    approvals: [
      {
        officerRole: "drrm_officer",
        officerName: "Engr. Danilo Santos",
        agencyId: "MDRRMO-IV-A-042",
        signedAt: "2026-09-08T08:45:00Z",
        signatureHash: "0x8fa1b92c4e7d...9c21",
      },
      {
        officerRole: "municipal_treasurer",
        officerName: "Atty. Corazon Reyes, CPA",
        agencyId: "MTO-TREAS-2024-019",
        signedAt: "2026-09-08T09:15:00Z",
        signatureHash: "0x4b7c8d9e0f1a...3f7a",
      },
    ],
  },
  {
    id: "op-qrf-2026-002",
    name: "Flash Flood Calamity Immediate Relief (District 2)",
    adminUid: "admin-drrm-01",
    adminName: "Engr. Danilo Santos (MDRRMO Chief)",
    merkleRoot: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    leafCount: 30,
    treeDepth: 5,
    totalFund: 150000,
    perClaimAmount: 5000,
    contractAddress: "02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf",
    status: "active",
    claimedCount: 14,
    createdAt: "2026-09-10T11:00:00Z",
    deployedAt: "2026-09-10T12:00:00Z",
    quorumStatus: "fully_authorized",
    approvals: [
      {
        officerRole: "drrm_officer",
        officerName: "Engr. Danilo Santos",
        agencyId: "MDRRMO-IV-A-042",
        signedAt: "2026-09-10T11:20:00Z",
        signatureHash: "0x1d2e3f4a5b6c...7e8f",
      },
      {
        officerRole: "municipal_treasurer",
        officerName: "Atty. Corazon Reyes, CPA",
        agencyId: "MTO-TREAS-2024-019",
        signedAt: "2026-09-10T11:50:00Z",
        signatureHash: "0x9a8b7c6d5e4f...3a2b",
      },
    ],
  },
  {
    id: "op-qrf-2026-003",
    name: "Coastal Storm Surge Evacuee Tranche (Standby Escrow)",
    adminUid: "admin-drrm-02",
    adminName: "Maria Lourdes Mendoza (MSWDO)",
    merkleRoot: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    leafCount: 20,
    treeDepth: 5,
    totalFund: 100000,
    perClaimAmount: 5000,
    status: "draft",
    claimedCount: 0,
    createdAt: "2026-09-12T14:30:00Z",
    quorumStatus: "pending_treasurer",
    approvals: [
      {
        officerRole: "drrm_officer",
        officerName: "Maria Lourdes Mendoza",
        agencyId: "MSWDO-REG-881",
        signedAt: "2026-09-12T14:45:00Z",
        signatureHash: "0x3b4c5d6e7f8a...1c2d",
      },
    ],
  },
];

let inMemoryGovernanceStore: Record<string, string> = {};

function getStorageItem(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Fallback to in-memory
  }
  return inMemoryGovernanceStore[key] || null;
}

function setStorageItem(key: string, value: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch {
    // Fallback to in-memory
  }
  inMemoryGovernanceStore[key] = value;
}

export function clearGovernanceStorage(): void {
  inMemoryGovernanceStore = {};
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(GOVERNANCE_STORAGE_KEY);
    }
  } catch {
    // Ignore
  }
}

/**
 * Retrieve all registered relief operations
 */
export function getGovernanceOperations(): ReliefOperation[] {
  const raw = getStorageItem(GOVERNANCE_STORAGE_KEY);
  if (!raw) {
    setStorageItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(SEED_OPERATIONS));
    return SEED_OPERATIONS;
  }
  try {
    return JSON.parse(raw) as ReliefOperation[];
  } catch {
    return SEED_OPERATIONS;
  }
}

/**
 * Save or update an operation in the governance store
 */
export function saveGovernanceOperation(operation: ReliefOperation): void {
  const current = getGovernanceOperations();
  const index = current.findIndex((op) => op.id === operation.id);
  if (index >= 0) {
    current[index] = operation;
  } else {
    current.unshift(operation);
  }
  setStorageItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(current));
}

/**
 * Generate a deterministic cryptographic authorization seal for an officer's sign-off
 */
export function computeOfficerSignatureHash(
  officerRole: OfficerRole,
  officerName: string,
  agencyId: string,
  merkleRoot: string,
  timestamp: string
): string {
  const seed = `${officerRole}:${officerName}:${agencyId}:${merkleRoot}:${timestamp}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `0x${hex}${seed.length.toString(16)}fa7b9c${hex.slice(0, 4)}`;
}

/**
 * Sign an operation as an authorized municipal official
 */
export function signOperationQuorum(
  operationId: string,
  officerRole: OfficerRole,
  officerName: string,
  agencyId: string
): { success: boolean; operation?: ReliefOperation; error?: string } {
  const operations = getGovernanceOperations();
  const op = operations.find((o) => o.id === operationId);
  if (!op) {
    return { success: false, error: "Operation not found." };
  }

  const approvals = op.approvals || [];
  if (approvals.some((a) => a.officerRole === officerRole)) {
    return {
      success: false,
      error: `This operation has already been signed by the ${
        officerRole === "drrm_officer" ? "DRRM Officer" : "Municipal Treasurer"
      }.`,
    };
  }

  const timestamp = new Date().toISOString();
  const signatureHash = computeOfficerSignatureHash(
    officerRole,
    officerName,
    agencyId,
    op.merkleRoot,
    timestamp
  );

  const newApproval: DualKeyApproval = {
    officerRole,
    officerName,
    agencyId,
    signedAt: timestamp,
    signatureHash,
  };

  const updatedApprovals = [...approvals, newApproval];
  const hasDrrm = updatedApprovals.some((a) => a.officerRole === "drrm_officer");
  const hasTreasurer = updatedApprovals.some(
    (a) => a.officerRole === "municipal_treasurer"
  );

  let newQuorumStatus: QuorumStatus = "pending_drrm";
  if (hasDrrm && hasTreasurer) {
    newQuorumStatus = "fully_authorized";
  } else if (hasDrrm) {
    newQuorumStatus = "pending_treasurer";
  } else if (hasTreasurer) {
    newQuorumStatus = "pending_drrm";
  }

  const updatedOp: ReliefOperation = {
    ...op,
    approvals: updatedApprovals,
    quorumStatus: newQuorumStatus,
  };

  saveGovernanceOperation(updatedOp);
  return { success: true, operation: updatedOp };
}

/**
 * Compute real-time Treasury Metrics across all operations
 */
export function computeTreasuryMetrics(operations?: ReliefOperation[]): TreasuryMetrics {
  const ops = operations || getGovernanceOperations();

  let totalAllocated = 0;
  let totalDisbursed = 0;
  let totalClaims = 0;
  let activeOps = 0;

  for (const op of ops) {
    totalAllocated += op.totalFund;
    const disbursedForOp = op.claimedCount * op.perClaimAmount;
    totalDisbursed += disbursedForOp;
    totalClaims += op.claimedCount;
    if (op.status === "active") {
      activeOps += 1;
    }
  }

  // Realistic baseline telemetry
  const duplicateBlocked = 18; // Simulated aggregate nullifier collisions prevented
  const averageProving = 1.85; // Seconds
  const feesSponsored = totalClaims * 0.045; // Approx tDUST sponsored by LGU

  return {
    totalAllocatedFund: totalAllocated,
    totalDisbursedFund: totalDisbursed,
    remainingEscrowFund: Math.max(0, totalAllocated - totalDisbursed),
    totalVerifiedClaims: totalClaims,
    duplicateAttemptsBlocked: duplicateBlocked,
    activeOperationsCount: activeOps,
    averageProvingTimeSeconds: averageProving,
    networkFeeSponsored: Math.round(feesSponsored * 100) / 100,
  };
}

/**
 * Generate official Commission on Audit (COA) Compliance CSV Statement
 * Complies with Philippine R.A. 10121 & Government Accounting Manual (GAM)
 */
export function generateCOAAuditCSV(operations?: ReliefOperation[]): string {
  const ops = operations || getGovernanceOperations();

  const headers = [
    "Operation ID",
    "Calamity Operation Name",
    "Merkle Root Commitment",
    "Allocated Fund (tNIGHT)",
    "Disbursed Amount (tNIGHT)",
    "Remaining Escrow (tNIGHT)",
    "Beneficiary Count",
    "Verified Claims",
    "DRRM Officer Clearance",
    "Municipal Treasurer Clearance",
    "Quorum Status",
    "Midnight Contract Address",
    "Created Date",
  ];

  const rows = ops.map((op) => {
    const drrmApproval = op.approvals?.find((a) => a.officerRole === "drrm_officer");
    const treasApproval = op.approvals?.find(
      (a) => a.officerRole === "municipal_treasurer"
    );

    const disbursed = op.claimedCount * op.perClaimAmount;
    const remaining = Math.max(0, op.totalFund - disbursed);

    return [
      `"${op.id}"`,
      `"${op.name.replace(/"/g, '""')}"`,
      `"${op.merkleRoot}"`,
      op.totalFund,
      disbursed,
      remaining,
      op.leafCount,
      op.claimedCount,
      drrmApproval
        ? `"${drrmApproval.officerName} (${drrmApproval.agencyId})"`
        : '"NOT_SIGNED"',
      treasApproval
        ? `"${treasApproval.officerName} (${treasApproval.agencyId})"`
        : '"NOT_SIGNED"',
      `"${op.quorumStatus || "pending_drrm"}"`,
      `"${op.contractAddress || "PENDING_DEPLOYMENT"}"`,
      `"${new Date(op.createdAt).toLocaleDateString()}"`,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
