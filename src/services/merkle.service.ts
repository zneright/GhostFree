// ============================================
// GhostFree — Merkle Tree Service
// Builds Merkle trees from eligibility hashes
// for ZK-friendly proof generation
// ============================================

import type { MerkleTreeResult } from "../types";

/**
 * Simple SHA-256 based hash function using Web Crypto API.
 * In production, this would use Poseidon hash (persistentHash)
 * for compatibility with the Compact circuit.
 */
async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Hash two sibling nodes to produce a parent node.
 * Sorts inputs to ensure consistent ordering.
 */
async function hashPair(left: string, right: string): Promise<string> {
  // Ensure deterministic ordering
  const [a, b] = left < right ? [left, right] : [right, left];
  return sha256(a + b);
}

/**
 * Build a Merkle tree from an array of leaf hashes.
 * Returns the root hash, depth, and full tree layers for proof generation.
 */
export async function buildMerkleTree(
  leafHashes: string[]
): Promise<MerkleTreeResult & { layers: string[][] }> {
  if (leafHashes.length === 0) {
    throw new Error("Cannot build Merkle tree from empty leaf set.");
  }

  // Pad to next power of 2 with zero hashes
  const depth = Math.ceil(Math.log2(Math.max(leafHashes.length, 2)));
  const paddedSize = Math.pow(2, depth);
  const zeroHash = "0".repeat(64);
  const paddedLeaves = [
    ...leafHashes,
    ...Array(paddedSize - leafHashes.length).fill(zeroHash),
  ];

  const layers: string[][] = [paddedLeaves];

  // Build tree bottom-up
  let currentLayer = paddedLeaves;
  while (currentLayer.length > 1) {
    const nextLayer: string[] = [];
    for (let i = 0; i < currentLayer.length; i += 2) {
      const parent = await hashPair(currentLayer[i], currentLayer[i + 1]);
      nextLayer.push(parent);
    }
    layers.push(nextLayer);
    currentLayer = nextLayer;
  }

  return {
    root: currentLayer[0],
    leafCount: leafHashes.length,
    depth,
    leaves: leafHashes,
    layers,
  };
}

/**
 * Generate a Merkle proof for a specific leaf.
 * Returns the sibling hashes needed to reconstruct the path to the root.
 */
export function generateMerkleProof(
  layers: string[][],
  leafIndex: number
): { proof: string[]; directions: ("left" | "right")[] } {
  const proof: string[] = [];
  const directions: ("left" | "right")[] = [];
  let index = leafIndex;

  for (let i = 0; i < layers.length - 1; i++) {
    const layer = layers[i];
    const isLeft = index % 2 === 0;
    const siblingIndex = isLeft ? index + 1 : index - 1;

    if (siblingIndex < layer.length) {
      proof.push(layer[siblingIndex]);
      directions.push(isLeft ? "right" : "left");
    }

    index = Math.floor(index / 2);
  }

  return { proof, directions };
}

/**
 * Verify a Merkle proof against a root hash.
 */
export async function verifyMerkleProof(
  root: string,
  leaf: string,
  proof: string[],
  directions: ("left" | "right")[]
): Promise<boolean> {
  let current = leaf;

  for (let i = 0; i < proof.length; i++) {
    if (directions[i] === "left") {
      current = await hashPair(proof[i], current);
    } else {
      current = await hashPair(current, proof[i]);
    }
  }

  return current === root;
}

/**
 * Hash a National ID + Secret PIN to produce a leaf hash.
 * This mirrors the circuit's leaf computation.
 */
export async function computeLeafHash(
  nationalId: string,
  secretPin: string
): Promise<string> {
  return sha256(nationalId + ":" + secretPin);
}

/**
 * Compute a deterministic nullifier from a leaf hash and contract address.
 * Prevents double-claiming while preserving anonymity.
 */
export async function computeNullifier(
  leafHash: string,
  contractAddress: string
): Promise<string> {
  return sha256(leafHash + ":" + contractAddress);
}
