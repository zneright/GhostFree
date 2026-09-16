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
  approvals?: DualKeyApproval[];
  quorumStatus?: QuorumStatus;
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

/** User feedback record for continuous feedback loop */
export interface UserFeedback {
  id: string;
  rating: number; // 1 to 5
  category: 'usability' | 'wallet' | 'speed' | 'privacy' | 'feature_request' | 'accessibility' | 'general';
  role: 'citizen' | 'lgu_officer' | 'volunteer' | 'security_researcher' | 'other';
  comment: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'planned' | 'resolved';
  priority: 'low' | 'medium' | 'high';
}

/** Confidential Calamity Relief Receipt */
export interface ReliefReceipt {
  receiptId: string;
  transactionHash: string;
  timestamp: string;
  nullifierSnippet: string;
  operationName: string;
  amount: number;
  network: string;
  status: 'confirmed';
}

/** Dual-key municipal quorum authorization for emergency funds release */
export type OfficerRole = 'drrm_officer' | 'municipal_treasurer';
export type QuorumStatus = 'pending_drrm' | 'pending_treasurer' | 'fully_authorized';

export interface DualKeyApproval {
  officerRole: OfficerRole;
  officerName: string;
  agencyId: string;
  signedAt: string;
  signatureHash: string;
}

/** Public Calamity Treasury metrics */
export interface TreasuryMetrics {
  totalAllocatedFund: number;
  totalDisbursedFund: number;
  remainingEscrowFund: number;
  totalVerifiedClaims: number;
  duplicateAttemptsBlocked: number;
  activeOperationsCount: number;
  averageProvingTimeSeconds: number;
  networkFeeSponsored: number;
}

/** Commission on Audit (COA) compliance entry */
export interface AuditReportEntry {
  operationId: string;
  operationName: string;
  merkleRoot: string;
  allocatedAmount: number;
  disbursedAmount: number;
  claimCount: number;
  drrmSigner: string;
  treasurerSigner: string;
  status: string;
  contractAddress: string;
  timestamp: string;
}

/** Accessibility preferences for disaster zone mobile optimization (feedback-driven: fb-user-006) */
export interface AccessibilityPreferences {
  highContrast: boolean;
  largeText: boolean;
  textScale?: 'normal' | 'large' | 'xlarge';
  sunlightMode?: boolean;
}

/** Claim lifecycle stage for status tracking (feedback-driven: fb-user-007) */
export type ClaimLifecycleStage = 'submitted' | 'proving' | 'verified' | 'disbursed' | 'receipt_downloaded';

/** Anonymized claim status event for LGU audit trail */
export interface ClaimStatusEvent {
  id: string;
  nullifierSnippet: string;
  stage: ClaimLifecycleStage;
  timestamp: string;
  operationName: string;
  amount?: number;
}
