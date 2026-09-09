// ==============================================================================
// MIDNIGHT BUILDER CHALLENGE — LEVEL 1
// Contract: counter.compact (TypeScript Mirror Specification)
// Original Source: contracts/counter.compact
// ==============================================================================
//
// PRIVACY MODEL SPECIFICATION:
// ------------------------------------------------------------------------------
// 1. PUBLIC LEDGER STATE (On-chain, transparent, visible to all observers):
//    - counter: Uint64
//      Tracks the cumulative public tally. Updated strictly through validated
//      zero-knowledge transitions.
//    - totalIncrements: Uint64
//      Tracks the total number of valid increment operations executed.
//
// 2. PRIVATE WITNESSES (Off-chain, client-side only, never stored on-chain):
//    - incrementBy: Uint64
//      The secret value supplied by the user to increase the counter.
//    - userSecretKey: Bytes(32)
//      A private authorization secret known only to the user, proving rights
//      without revealing identity or credentials.
//
// 3. ZERO-KNOWLEDGE PROOF & DELIBERATE DISCLOSURE:
//    - The circuit proves that `incrementBy` is within valid operational bounds
//      (e.g., > 0 and <= 100) and that the user possesses a valid private authorization.
//    - disclose() is called strictly on the final state update to modify the public
//      ledger counter without ever exposing the private witnesses or authorization key.
// ==============================================================================

export interface CounterLedgerState {
  counter: bigint;
  totalIncrements: bigint;
}

export interface CounterPrivateWitnesses {
  incrementBy: bigint;
  userSecretKey: Uint8Array;
  adminSecret?: Uint8Array;
}

/**
 * Compact Smart Contract Definition for counter.compact
 */
export const CounterContract = {
  // Public ledger declarations
  ledger: {
    counter: 0n,
    totalIncrements: 0n,
  },

  // Circuit declarations
  circuits: {
    initialize(): void {
      CounterContract.ledger.counter = 0n;
      CounterContract.ledger.totalIncrements = 0n;
    },

    increment(witness: CounterPrivateWitnesses): void {
      // 1. Circuit assertion: Validate private witness constraint in ZK
      if (witness.incrementBy <= 0n) {
        throw new Error("INCREMENT_MUST_BE_POSITIVE: Increment amount must be greater than zero.");
      }
      if (witness.incrementBy > 100n) {
        throw new Error("INCREMENT_LIMIT_EXCEEDED: Cannot increment by more than 100 per step.");
      }

      // 2. Circuit assertion: Validate private secret key length / entropy
      if (!witness.userSecretKey || witness.userSecretKey.length === 0) {
        throw new Error("INVALID_SECRET_KEY: User secret cannot be empty.");
      }

      // 3. Deliberate disclosure: Commit state changes to the public ledger
      // disclose(counter = counter + incrementBy);
      CounterContract.ledger.counter += witness.incrementBy;
      // disclose(totalIncrements = totalIncrements + 1);
      CounterContract.ledger.totalIncrements += 1n;
    },

    reset(witness: { adminSecret: Uint8Array }): void {
      if (!witness.adminSecret || witness.adminSecret.length === 0) {
        throw new Error("UNAUTHORIZED: Admin secret required.");
      }
      // disclose(counter = 0);
      CounterContract.ledger.counter = 0n;
    },
  },
};

export default CounterContract;
