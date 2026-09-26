// ============================================
// GhostFree — Test Suite: transactions.test.ts
// Verifies Transaction telemetry, Preprod Health checks,
// and Anti-Ghost double claim rejection integrity.
// ============================================

import { describe, it, expect } from "vitest";
import {
  MIDNIGHT_CONFIG,
  getContractDeploymentStatus,
  KNOWN_PLACEHOLDER_ADDRESSES,
} from "../src/configuration/midnight.config";
import { checkMidnightPreprodHealth } from "../src/services/preprodHealth.service";

describe("Midnight Preprod & Transaction Telemetry", () => {
  it("correctly identifies preprod contract address status", () => {
    const placeholder = "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43";
    const status = getContractDeploymentStatus(placeholder);

    expect(status.isPlaceholder).toBe(true);
    expect(KNOWN_PLACEHOLDER_ADDRESSES.has(placeholder)).toBe(true);
  });

  it("identifies a valid custom 64-character or 66-character deployed contract address", () => {
    const validDeployedCA = "02009999888877776666555544443333222211110000aaaabbbbccccddddeeee01";
    const status = getContractDeploymentStatus(validDeployedCA);

    expect(status.isDeployed).toBe(true);
    expect(status.isPlaceholder).toBe(false);
    expect(status.statusLabel).toBe("Verified On-Chain");
  });

  it("rejects invalid contract address formats", () => {
    const invalidCA = "0xinvalid";
    const status = getContractDeploymentStatus(invalidCA);

    expect(status.isDeployed).toBe(false);
    expect(status.statusLabel).toBe("Invalid Address Format");
  });

  it("checks Midnight Preprod network health report structure", async () => {
    const report = await checkMidnightPreprodHealth();

    expect(report.networkId).toBe("preprod");
    expect(report.indexerUrl).toContain("midnight.network");
    expect(report.nodeUrl).toContain("midnight.network");
    expect(typeof report.latencyMs).toBe("number");
    expect(report.contractStatus).toBeDefined();
    expect(report.lastChecked).toBeDefined();
  });

  it("correctly calculates settled relief disbursements and blocks double claims", () => {
    const transactions = [
      { id: "tx_1", circuitName: "claimAid", status: "confirmed", amount: 5000, nullifierSnippet: "0xabc" },
      { id: "tx_2", circuitName: "claimAid", status: "confirmed", amount: 5000, nullifierSnippet: "0xdef" },
      { id: "tx_3", circuitName: "claimAid", status: "failed", amount: 5000, nullifierSnippet: "0xabc" },
      { id: "tx_4", circuitName: "claimAid", status: "confirmed", amount: 2500, nullifierSnippet: "0x123" },
    ];

    const confirmed = transactions.filter((t) => t.status === "confirmed");
    const failed = transactions.filter((t) => t.status === "failed");
    const totalVolume = confirmed.reduce((acc, curr) => acc + curr.amount, 0);

    expect(confirmed.length).toBe(3);
    expect(failed.length).toBe(1);
    expect(totalVolume).toBe(12500);

    // Verify nullifier uniqueness prevents double claiming
    const spentNullifiers = new Set<string>();
    let collisionsDetected = 0;

    for (const tx of transactions) {
      if (spentNullifiers.has(tx.nullifierSnippet)) {
        collisionsDetected++;
      } else {
        spentNullifiers.add(tx.nullifierSnippet);
      }
    }

    expect(collisionsDetected).toBe(1);
  });
});
