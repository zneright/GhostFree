// ============================================
// GhostFree — TypeScript Type Definitions
// ============================================

/** LGU Admin profile stored in Firestore */
export interface AdminProfile {
  uid: string;
  email: string;
  name: string;
  role: 'lgu_admin' | 'system_admin';
  status: 'active' | 'suspended' | 'pending';
  municipality?: string;
  province?: string;
  region?: string;
  createdAt: string;
  lastLoginAt?: string;
}

/** Relief operation record in Firestore */
export interface ReliefOperation {
  id: string;
  name: string;
  adminUid: string;
  adminName: string;
  merkleRoot: string;
  leafCount: number;
  treeDepth: number;
  totalFund: number;
  perClaimAmount: number;
  contractAddress?: string;
  status: 'draft' | 'deploying' | 'active' | 'paused' | 'completed' | 'failed';
  claimedCount: number;
  createdAt: string;
  deployedAt?: string;
  completedAt?: string;
}

/** Citizen eligibility entry from CSV */
export interface EligibilityEntry {
  idHash: string;
  index: number;
}

/** Lace wallet connection state */
export interface WalletState {
  address: string | null;
  connected: boolean;
  connecting: boolean;
  networkId: string | null;
  error: string | null;
}

/** Lace wallet API interface */
export interface MidnightWalletAPI {
  getUnshieldedAddress(): Promise<string | { unshieldedAddress: string }>;
  getShieldedAddress?(): Promise<string | { shieldedAddress: string }>;
  signTransaction?(tx: unknown): Promise<unknown>;
  getBalance?(): Promise<{ unshielded: string; shielded: string }>;
}

/** Merkle tree result */
export interface MerkleTreeResult {
  root: string;
  leafCount: number;
  depth: number;
  leaves: string[];
}

/** ZK claim proof package */
export interface ClaimProof {
  proof: Uint8Array;
  nullifier: string;
  merkleRoot: string;
}

/** Claim result from contract */
export interface ClaimResult {
  success: boolean;
  transactionHash?: string;
  amount?: number;
  error?: string;
  errorCode?: 'NOT_ELIGIBLE' | 'ALREADY_CLAIMED' | 'INSUFFICIENT_FUNDS' | 'PROOF_INVALID' | 'NETWORK_ERROR';
}

/** Claim portal step tracking */
export type ClaimStep = 'connect' | 'credentials' | 'proving' | 'result';

/** Contract public ledger state */
export interface ContractState {
  merkleRoot: string;
  fundBalance: number;
  perClaimAmount: number;
  operationName: string;
  totalClaimed: number;
}
