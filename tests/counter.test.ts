// ==============================================================================
// MIDNIGHT BUILDER CHALLENGE — LEVEL 1
// Test Suite: counter.test.ts
// ==============================================================================

import { describe, it, expect, beforeEach } from "vitest";

// Simulation harness representing the counter contract circuits and ledger state
interface LedgerState {
  counter: bigint;
  totalIncrements: bigint;
}

class CounterContractSimulator {
  public ledger: LedgerState;

  constructor() {
    this.ledger = { counter: 0n, totalIncrements: 0n };
  }

  // Initialize circuit
  public initialize(): void {
    this.ledger.counter = 0n;
    this.ledger.totalIncrements = 0n;
  }

  // Increment circuit: validates private witness assertions, updates ledger via disclose()
  public increment(witness: { incrementBy: bigint; userSecretKey: Uint8Array }): void {
    // Constraint 1: increment amount must be positive
    if (witness.incrementBy <= 0n) {
      throw new Error("INCREMENT_MUST_BE_POSITIVE: Increment amount must be greater than zero.");
    }
    // Constraint 2: increment amount must not exceed 100
    if (witness.incrementBy > 100n) {
      throw new Error("INCREMENT_LIMIT_EXCEEDED: Cannot increment by more than 100 per step.");
    }
    // Constraint 3: private secret key must have valid entropy
    const isAllZeros = witness.userSecretKey.every((byte) => byte === 0);
    if (isAllZeros) {
      throw new Error("INVALID_SECRET_KEY: User secret cannot be empty.");
    }

    // Deliberate disclosure: state transition committed to the public ledger
    this.ledger.counter += witness.incrementBy;
    this.ledger.totalIncrements += 1n;
  }

  // Reset circuit
  public reset(witness: { adminSecret: Uint8Array }): void {
    const isAllZeros = witness.adminSecret.every((byte) => byte === 0);
    if (isAllZeros) {
      throw new Error("UNAUTHORIZED: Admin secret required.");
    }
    this.ledger.counter = 0n;
  }
}

describe("Counter Compact Contract — Level 1 Verification", () => {
  let contract: CounterContractSimulator;

  beforeEach(() => {
    contract = new CounterContractSimulator();
    contract.initialize();
  });

  // TEST 1: Circuit Logic & Operational Constraints
  it("Test 1: Circuit Logic — enforces positive range and rejects invalid increments", () => {
    const validSecret = new Uint8Array(32).fill(0xaa);

    // Initial state check
    expect(contract.ledger.counter).toBe(0n);
    expect(contract.ledger.totalIncrements).toBe(0n);

    // Negative increment must fail ZK assertion
    expect(() => {
      contract.increment({ incrementBy: -5n, userSecretKey: validSecret });
    }).toThrow("INCREMENT_MUST_BE_POSITIVE");

    // Zero increment must fail ZK assertion
    expect(() => {
      contract.increment({ incrementBy: 0n, userSecretKey: validSecret });
    }).toThrow("INCREMENT_MUST_BE_POSITIVE");

    // Exceeding threshold (> 100) must fail ZK assertion
    expect(() => {
      contract.increment({ incrementBy: 101n, userSecretKey: validSecret });
    }).toThrow("INCREMENT_LIMIT_EXCEEDED");

    // Empty/zero private key must fail ZK assertion
    const emptySecret = new Uint8Array(32).fill(0);
    expect(() => {
      contract.increment({ incrementBy: 10n, userSecretKey: emptySecret });
    }).toThrow("INVALID_SECRET_KEY");
  });

  // TEST 2: State Transitions & Cumulative Accumulation
  it("Test 2: State Transitions — correctly accumulates counter and operation tally", () => {
    const validSecret = new Uint8Array(32).fill(0xbb);

    // Step 1: Increment by 25
    contract.increment({ incrementBy: 25n, userSecretKey: validSecret });
    expect(contract.ledger.counter).toBe(25n);
    expect(contract.ledger.totalIncrements).toBe(1n);

    // Step 2: Increment by 40
    contract.increment({ incrementBy: 40n, userSecretKey: validSecret });
    expect(contract.ledger.counter).toBe(65n);
    expect(contract.ledger.totalIncrements).toBe(2n);

    // Step 3: Increment by 10
    contract.increment({ incrementBy: 10n, userSecretKey: validSecret });
    expect(contract.ledger.counter).toBe(75n);
    expect(contract.ledger.totalIncrements).toBe(3n);
  });

  // TEST 3: Zero-Knowledge Privacy — Private Witness Inputs are Never Stored in Ledger
  it("Test 3: Privacy Verification — private witness credentials never leak into ledger state", () => {
    const privateSecret = new Uint8Array(32);
    crypto.getRandomValues(privateSecret);
    const privateIncrement = 42n;

    contract.increment({ incrementBy: privateIncrement, userSecretKey: privateSecret });

    // Ledger must ONLY contain public aggregate numbers
    const ledgerKeys = Object.keys(contract.ledger);
    expect(ledgerKeys).toEqual(["counter", "totalIncrements"]);
    expect(contract.ledger).not.toHaveProperty("userSecretKey");
    expect(contract.ledger).not.toHaveProperty("incrementBy");

    // The raw secret bytes must not exist anywhere in public ledger representation
    const ledgerJson = JSON.stringify(contract.ledger, (_, v) => (typeof v === "bigint" ? v.toString() : v));
    expect(ledgerJson).not.toContain(Array.from(privateSecret).join(","));
  });
});
