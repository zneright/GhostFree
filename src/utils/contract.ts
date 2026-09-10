// ============================================
// GhostFree — Contract Interaction Helpers
// ============================================
//
// Centralized utilities for resolving contract addresses,
// formatting circuit call parameters, and validating
// witness constraints before proof generation.
//
// These helpers are consumed by hooks (useMidnightContract)
// and components (CircuitCall, CitizenClaimPortal).

import { MIDNIGHT_CONFIG } from "../configuration/midnight.config";
import type { ContractState, ClaimResult } from "../types";

/**
 * Resolve the active contract address based on the current network.
 * Falls back to the Preprod address if no override is provided.
 */
export function resolveContractAddress(networkId?: string): string {
  if (networkId === "preview") {
    return MIDNIGHT_CONFIG.previewContractAddress;
  }
  return MIDNIGHT_CONFIG.contractAddress;
}

/**
 * Format a contract address for display in the UI.
 * Truncates the middle of the hex string for readability.
 */
export function formatContractAddress(address: string, chars = 8): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Validate private witness inputs before proof generation.
 * This runs entirely on the client side — no data leaves the device.
 *
 * @returns An error message string if invalid, or null if valid.
 */
export function validateWitnessInputs(params: {
  residentId?: string;
  secretPin?: string;
  incrementBy?: bigint;
}): string | null {
  const { residentId, secretPin, incrementBy } = params;

  // Validate resident ID if provided
  if (residentId !== undefined && (!residentId || residentId.trim().length === 0)) {
    return "Resident ID is required to verify your eligibility.";
  }

  // Validate secret PIN if provided
  if (secretPin !== undefined && (!secretPin || secretPin.trim().length === 0)) {
    return "Your secret PIN is required to generate the proof.";
  }

  // Validate increment bounds for counter circuit
  if (incrementBy !== undefined) {
    if (incrementBy <= 0n) {
      return "Increment amount must be greater than zero.";
    }
    if (incrementBy > 100n) {
      return "Increment amount cannot exceed 100 per operation.";
    }
  }

  return null;
}

/**
 * Build the Midnight Indexer endpoint URL for querying contract state.
 */
export function buildIndexerUrl(contractAddress: string): string {
  return `${MIDNIGHT_CONFIG.indexerUrl}/contracts/${contractAddress}/state`;
}

/**
 * Build the Midnight Proving Server endpoint URL.
 */
export function buildProvingServerUrl(): string {
  return MIDNIGHT_CONFIG.provingServerUrl;
}

/**
 * Parse a raw contract state response from the Midnight Indexer
 * into the typed ContractState interface.
 */
export function parseContractState(raw: Record<string, unknown>): Partial<ContractState> {
  const parsed: Partial<ContractState> = {};

  if (typeof raw.merkleRoot === "string") parsed.merkleRoot = raw.merkleRoot;
  if (typeof raw.fundBalance === "number") parsed.fundBalance = raw.fundBalance;
  if (typeof raw.perClaimAmount === "number") parsed.perClaimAmount = raw.perClaimAmount;
  if (typeof raw.operationName === "string") parsed.operationName = raw.operationName;
  if (typeof raw.totalClaimed === "number") parsed.totalClaimed = raw.totalClaimed;

  return parsed;
}

/**
 * Map a circuit error code to a user-friendly message.
 * Follows the anti-jargon design principle — no cryptographic
 * terminology is exposed to citizens.
 */
export function mapCircuitError(errorCode: string): string {
  const errorMap: Record<string, string> = {
    MERKLE_PROOF_INVALID: "Your identity is not in the eligibility list for this relief operation.",
    NULLIFIER_MISMATCH: "There was a verification error. Please try again.",
    ALREADY_CLAIMED: "This identity has already received aid for this relief operation.",
    INSUFFICIENT_FUNDS: "The relief fund has been fully distributed. Contact your LGU.",
    INCREMENT_MUST_BE_POSITIVE: "The operation value must be greater than zero.",
    INCREMENT_LIMIT_EXCEEDED: "The operation value exceeds the allowed limit.",
    INVALID_SECRET_KEY: "Your secret key is invalid. Please enter a valid credential.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
  };

  // Check if the error message contains any known error code
  for (const [code, message] of Object.entries(errorMap)) {
    if (errorCode.includes(code)) return message;
  }

  return "An unexpected error occurred. Please try again later.";
}

/**
 * Format a claim result for display in the UI.
 */
export function formatClaimResult(result: ClaimResult): string {
  if (result.success) {
    const amount = result.amount ? ` Amount: ${result.amount} tNIGHT.` : "";
    return `Aid claimed successfully!${amount}`;
  }

  if (result.errorCode) {
    return mapCircuitError(result.errorCode);
  }

  return result.error || "Claim failed. Please try again.";
}
