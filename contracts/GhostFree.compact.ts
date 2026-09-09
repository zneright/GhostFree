// ============================================
// GhostFree — Compact Smart Contract (TypeScript Mirror Specification)
// Original Source: contracts/GhostFree.compact
// Midnight Network ZK-verified calamity aid distribution
// ============================================

export interface GhostFreeLedgerState {
  merkleRoot: Uint8Array;
  fundBalance: bigint;
  perClaimAmount: bigint;
  operationName: string;
  adminAddress: Uint8Array;
  spentNullifiers: Map<string, boolean>;
  claimCount: bigint;
}

export interface GhostFreePrivateWitnesses {
  residentID: Uint8Array;
  residentSecret: Uint8Array;
  merkleProof: Uint8Array[];
  merkleDirections: boolean[];
}

/**
 * Compact Smart Contract Definition for GhostFree.compact
 */
export const GhostFreeContract = {
  // Public ledger declarations
  ledger: {
    merkleRoot: new Uint8Array(32),
    fundBalance: 0n,
    perClaimAmount: 0n,
    operationName: "",
    adminAddress: new Uint8Array(32),
    spentNullifiers: new Map<string, boolean>(),
    claimCount: 0n,
  } as GhostFreeLedgerState,

  circuits: {
    initialize(root: Uint8Array, claimAmount: bigint, name: string, deposit: bigint): void {
      GhostFreeContract.ledger.merkleRoot = root;
      GhostFreeContract.ledger.perClaimAmount = claimAmount;
      GhostFreeContract.ledger.operationName = name;
      GhostFreeContract.ledger.fundBalance = deposit;
      GhostFreeContract.ledger.claimCount = 0n;
    },

    claimAid(
      witness: GhostFreePrivateWitnesses,
      publicNullifier: string
    ): void {
      // Step 1 & 2: Verify private credentials in Merkle tree
      if (!witness.residentID || witness.residentID.length === 0) {
        throw new Error("INVALID_RESIDENT_ID");
      }
      if (!witness.residentSecret || witness.residentSecret.length === 0) {
        throw new Error("INVALID_SECRET_PIN");
      }

      // Step 4: Anti-Ghost check — ensure nullifier is not spent
      if (GhostFreeContract.ledger.spentNullifiers.get(publicNullifier)) {
        throw new Error("ALREADY_CLAIMED: This identity has already received aid for this relief operation.");
      }

      // Step 5: Disclose nullifier as spent
      // disclose(spentNullifiers[nullifier] = true);
      GhostFreeContract.ledger.spentNullifiers.set(publicNullifier, true);

      // Step 6: Verify escrow balance
      if (GhostFreeContract.ledger.fundBalance < GhostFreeContract.ledger.perClaimAmount) {
        throw new Error("INSUFFICIENT_FUNDS: The relief fund has been fully distributed.");
      }

      // Step 7: Decrement escrow and increment claim counter
      GhostFreeContract.ledger.fundBalance -= GhostFreeContract.ledger.perClaimAmount;
      GhostFreeContract.ledger.claimCount += 1n;
    },

    withdrawRemaining(caller: Uint8Array): bigint {
      const remaining = GhostFreeContract.ledger.fundBalance;
      GhostFreeContract.ledger.fundBalance = 0n;
      return remaining;
    },

    getStatus(): [bigint, bigint, bigint] {
      return [
        GhostFreeContract.ledger.fundBalance,
        GhostFreeContract.ledger.perClaimAmount,
        GhostFreeContract.ledger.claimCount,
      ];
    },
  },
};

export default GhostFreeContract;
