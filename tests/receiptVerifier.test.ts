import { describe, it, expect } from "vitest";
import { verifyReliefVoucher } from "../src/services/receiptVerifier.service";

describe("Checkpoint Marshal Receipt Verifier Service (fb-user-010)", () => {
  it("should successfully verify a valid relief voucher code", async () => {
    const result = await verifyReliefVoucher("GF-CALAMITY-8A2F-9C1D");
    expect(result.valid).toBe(true);
    expect(result.status).toBe("VALID");
    expect(result.amount).toBe(100);
    expect(result.contractAddress).toBeDefined();
    expect(result.details).toBeDefined();
    expect(result.details?.network).toBe("Midnight Preprod Testnet");
  });

  it("should reject inputs with invalid length or empty strings", async () => {
    const result = await verifyReliefVoucher("   ");
    expect(result.valid).toBe(false);
    expect(result.status).toBe("INVALID_FORMAT");
  });

  it("should detect tampered or unknown voucher codes", async () => {
    const result = await verifyReliefVoucher("GF-TAMPERED-VOUCHER-999");
    expect(result.valid).toBe(false);
    expect(result.status).toBe("NOT_FOUND");
    expect(result.message).toContain("No matching disbursement record");
  });

  it("should detect already claimed / double-spent nullifiers", async () => {
    const result = await verifyReliefVoucher("GF-SPENT-DOUBLE-001");
    expect(result.valid).toBe(false);
    expect(result.status).toBe("ALREADY_CLAIMED");
    expect(result.message).toContain("already been spent");
  });

  it("should enforce zero PII exposure in the verification payload", async () => {
    const result = await verifyReliefVoucher("GF-CALAMITY-1122-3344");
    const anyResult = result as unknown as Record<string, unknown>;
    expect(anyResult.residentId).toBeUndefined();
    expect(anyResult.nationalId).toBeUndefined();
    expect(anyResult.secretPin).toBeUndefined();
    expect(anyResult.fullName).toBeUndefined();
  });
});
