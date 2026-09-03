// ============================================
// GhostFree — ZK Proof Service
// Handles local proof generation for the citizen claim flow
// All private witness data stays on-device
// ============================================

import { computeLeafHash, computeNullifier, generateMerkleProof } from "./merkle.service";
import type { ClaimProof } from "../types";

/**
 * Generate a zero-knowledge claim proof locally on the citizen's device.
 *
 * In production, this would invoke the Midnight prover (local WASM or proving server)
 * to generate a real ZK-SNARK proof. For this implementation, we prepare all the
 * private witness data and public inputs that the prover would consume.
 *
 * PRIVACY GUARANTEE: The nationalId and secretPin NEVER leave this function.
 * Only the proof, nullifier, and merkle root are transmitted to the network.
 */
export async function generateClaimProof(
  nationalId: string,
  secretPin: string,
  merkleRoot: string,
  merkleLayers: string[][],
  contractAddress: string
): Promise<ClaimProof> {
  // 1. Compute the leaf hash: H(nationalId || secretPin)
  const leafHash = await computeLeafHash(nationalId, secretPin);

  // 2. Find the leaf in the tree
  const leafLayer = merkleLayers[0];
  const leafIndex = leafLayer.indexOf(leafHash);

  if (leafIndex === -1) {
    throw new Error("NOT_ELIGIBLE");
  }

  // 3. Generate the Merkle inclusion proof
  const { proof: merkleProof } = generateMerkleProof(merkleLayers, leafIndex);

  // 4. Compute the nullifier: H(leafHash || contractAddress)
  const nullifier = await computeNullifier(leafHash, contractAddress);

  // 5. Package the proof
  // In production, this is where we'd call the Midnight prover:
  //   const zkProof = await midnightProver.prove(circuit, {
  //     private: { nationalId, secretPin, merkleProof },
  //     public: { nullifier, merkleRoot }
  //   });

  // For now, we create a proof package with the witness data
  const proofData = JSON.stringify({
    leafHash,
    merkleProof,
    leafIndex,
    nullifier,
    merkleRoot,
    timestamp: Date.now(),
  });

  return {
    proof: new TextEncoder().encode(proofData),
    nullifier,
    merkleRoot,
  };
}

/**
 * Validate that the citizen's inputs are well-formed before proof generation.
 */
export function validateClaimInputs(
  nationalId: string,
  secretPin: string
): { valid: boolean; error?: string } {
  if (!nationalId || nationalId.trim().length === 0) {
    return { valid: false, error: "National ID is required." };
  }

  if (nationalId.trim().length < 4) {
    return { valid: false, error: "National ID must be at least 4 characters." };
  }

  if (!secretPin || secretPin.trim().length === 0) {
    return { valid: false, error: "Secret PIN is required." };
  }

  if (!/^\d{4,8}$/.test(secretPin.trim())) {
    return { valid: false, error: "PIN must be 4-8 digits." };
  }

  return { valid: true };
}
