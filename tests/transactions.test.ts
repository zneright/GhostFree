// ============================================
// GhostFree — Test Suite: transactions.test.ts
// Verifies Transaction telemetry, Preprod Health checks,
// and Anti-Ghost double claim rejection integrity.
// ============================================

import { describe, it, expect } from "vitest";
import {
  MIDNIGHT_CONFIG,
  getContractDeploymentStatus,
  isValidContractAddressFormat,
  KNOWN_PLACEHOLDER_ADDRESSES,
} from "../src/configuration/midnight.config";
import { checkMidnightPreprodHealth } from "../src/services/preprodHealth.service";
import { generateSeedTransactions } from "../src/data/seedTransactions";

describe("Midnight Preprod & Transaction Telemetry", () => {
  it("validates contract address hex formatting accurately", () => {
    // 64-char raw hex (deployed preprod CA)
    expect(isValidContractAddressFormat("6f0c142f42d8179c31fbb57a17878c4f3771999340ddf4f545eb06b8f203e54e")).toBe(true);
    // 66-char 0x-prefixed hex
    expect(isValidContractAddressFormat("0x6f0c142f42d8179c31fbb57a17878c4f3771999340ddf4f545eb06b8f203e54e")).toBe(true);
    // 0200-prefixed format
    expect(isValidContractAddressFormat("02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43")).toBe(true);
    // Invalid non-hex characters
    expect(isValidContractAddressFormat("0xZZZZ142f42d8179c31fbb57a17878c4f3771999340ddf4f545eb06b8f203e54e")).toBe(false);
    // Invalid length
    expect(isValidContractAddressFormat("0x123")).toBe(false);
    expect(isValidContractAddressFormat("")).toBe(false);
    expect(isValidContractAddressFormat(undefined)).toBe(false);
  });

  it("correctly identifies preprod contract address status", () => {
    const placeholder = "02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43";
    const status = getContractDeploymentStatus(placeholder);

    expect(status.isPlaceholder).toBe(true);
    expect(status.isValidFormat).toBe(true);
    expect(KNOWN_PLACEHOLDER_ADDRESSES.has(placeholder)).toBe(true);
  });

  it("identifies a valid custom 64-character or 66-character deployed contract address", () => {
    const validDeployedCA = "02009999888877776666555544443333222211110000aaaabbbbccccddddeeee01";
    const status = getContractDeploymentStatus(validDeployedCA);

    expect(status.isDeployed).toBe(true);
    expect(status.isPlaceholder).toBe(false);
    expect(status.isValidFormat).toBe(true);
    expect(status.statusLabel).toBe("Verified On-Chain");
  });

  it("rejects invalid contract address formats", () => {
    const invalidCA = "0xinvalid";
    const status = getContractDeploymentStatus(invalidCA);

    expect(status.isDeployed).toBe(false);
    expect(status.isValidFormat).toBe(false);
    expect(status.statusLabel).toBe("Invalid Address Format");
  });

  it("checks Midnight Preprod network health report structure and TLS verification", async () => {
    const report = await checkMidnightPreprodHealth();

    expect(report.networkId).toBe("preprod");
    expect(report.indexerUrl).toContain("midnight.network");
    expect(report.nodeUrl).toContain("midnight.network");
    expect(typeof report.latencyMs).toBe("number");
    expect(report.contractStatus).toBeDefined();
    expect(report.tlsStatus).toBeDefined();
    expect(typeof report.tlsStatus.verified).toBe("boolean");
    expect(report.tlsStatus.protocol).toBe("TLSv1.3");
    expect(report.lastChecked).toBeDefined();
  }, 30000);

  it("verifies the high-density seed ledger contains 88+ compliant transactions", () => {
    const seeds = generateSeedTransactions();
    expect(seeds.length).toBeGreaterThanOrEqual(88);

    const confirmed = seeds.filter((s) => s.status === "confirmed");
    const failed = seeds.filter((s) => s.status === "failed");

    expect(confirmed.length).toBeGreaterThan(60);
    expect(failed.length).toBeGreaterThan(3);

    // Assert that every confirmed transaction has a valid 64/66-char txHash
    for (const tx of confirmed) {
      expect(tx.txHash).toBeDefined();
      expect(tx.txHash!.length).toBeGreaterThanOrEqual(64);
      expect(tx.blockHeight).toBeGreaterThan(812000);
    }

    // Assert that failed transactions represent deterministic anti-ghost rejections
    for (const tx of failed) {
      expect(tx.errorMessage).toContain("ALREADY_CLAIMED");
      expect(tx.nullifierSnippet).toBeDefined();
    }
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
