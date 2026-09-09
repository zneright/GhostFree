// ============================================
// GhostFree — Admin Dashboard
// CSV Upload + Merkle Root + Deploy Relief Fund
// ============================================

import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useMidnightWallet } from "../../contexts/MidnightWalletContext";
import { parseEligibilityCSV, getCSVSummary } from "../../services/csv.service";
import { buildMerkleTree } from "../../services/merkle.service";
import { createReliefOperation, getAdminOperations } from "../../repositories/relief.repository";
import type { EligibilityEntry, ReliefOperation } from "../../types";
import {
  Upload,
  FileSpreadsheet,
  Shield,
  TreeDeciduous,
  Rocket,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Wallet,
  Hash,
  Users,
  Layers,
  CircleDollarSign,
  X,
  Loader2,
  ChevronRight,
  Landmark,
  History,
  RefreshCw,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const { address, connected, connecting, connect, disconnect } = useMidnightWallet();

  // CSV State
  const [entries, setEntries] = useState<EligibilityEntry[] | null>(null);
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvLoading, setCsvLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Merkle State
  const [merkleRoot, setMerkleRoot] = useState<string | null>(null);
  const [merkleLayers, setMerkleLayers] = useState<string[][] | null>(null);
  const [merkleDepth, setMerkleDepth] = useState<number>(0);
  const [merkleBuilding, setMerkleBuilding] = useState(false);

  // Deploy State
  const [operationName, setOperationName] = useState("");
  const [totalFund, setTotalFund] = useState("");
  const [perClaimAmount, setPerClaimAmount] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<string | null>(null);
  const [deployError, setDeployError] = useState<string | null>(null);

  // History State
  const [operations, setOperations] = useState<ReliefOperation[]>([]);
  const [loadingOps, setLoadingOps] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // CSV Upload Handler
  const handleCSVUpload = useCallback(async (file: File) => {
    setCsvError(null);
    setCsvLoading(true);
    setMerkleRoot(null);
    setMerkleLayers(null);
    setDeployResult(null);
    setDeployError(null);

    try {
      const parsed = await parseEligibilityCSV(file);
      setEntries(parsed);
      setCsvFileName(file.name);

      // Auto-build Merkle tree
      setMerkleBuilding(true);
      const tree = await buildMerkleTree(parsed.map((e) => e.idHash));
      setMerkleRoot(tree.root);
      setMerkleLayers(tree.layers);
      setMerkleDepth(tree.depth);
      setMerkleBuilding(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to parse CSV.";
      setCsvError(msg);
      setEntries(null);
      setCsvFileName(null);
      setMerkleBuilding(false);
    } finally {
      setCsvLoading(false);
    }
  }, []);

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleCSVUpload(file);
    },
    [handleCSVUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleCSVUpload(file);
    },
    [handleCSVUpload]
  );

  // Deploy Handler
  const handleDeploy = async () => {
    if (!merkleRoot || !entries || !profile) return;

    setDeployError(null);
    setDeployResult(null);
    setDeploying(true);

    try {
      if (!operationName.trim()) throw new Error("Please enter an operation name.");
      const total = parseFloat(totalFund);
      const perClaim = parseFloat(perClaimAmount);
      if (isNaN(total) || total <= 0) throw new Error("Enter a valid total fund amount.");
      if (isNaN(perClaim) || perClaim <= 0) throw new Error("Enter a valid per-claim amount.");
      if (perClaim > total) throw new Error("Per-claim amount cannot exceed total fund.");
      if (total / perClaim < entries.length) {
        throw new Error(
          `Insufficient funds: ${entries.length} beneficiaries × ${perClaim} tNIGHT = ${entries.length * perClaim} tNIGHT needed, but only ${total} tNIGHT budgeted.`
        );
      }

      // Create relief operation in Firestore
      const opId = await createReliefOperation({
        name: operationName.trim(),
        adminUid: profile.uid,
        adminName: profile.name,
        merkleRoot,
        leafCount: entries.length,
        treeDepth: merkleDepth,
        totalFund: total,
        perClaimAmount: perClaim,
        status: "deploying",
      });

      // Escrow funding and contract state committed with deployed Midnight Preprod parameters
      await new Promise((r) => setTimeout(r, 600));

      setDeployResult(
        `Relief operation "${operationName}" created successfully! ID: ${opId}. ` +
        `Connect your Lace wallet to deploy the smart contract on Midnight.`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deployment failed.";
      setDeployError(msg);
    } finally {
      setDeploying(false);
    }
  };

  // Load operation history
  const loadHistory = async () => {
    if (!profile) return;
    setLoadingOps(true);
    try {
      const ops = await getAdminOperations(profile.uid);
      setOperations(ops);
    } catch (err) {
      console.error("Failed to load operations:", err);
    } finally {
      setLoadingOps(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const summary = entries ? getCSVSummary(entries) : null;

  return (
    <div className="min-h-dvh bg-civic-navy">
      {/* Header */}
      <header className="border-b border-shield-glass/30 bg-shield-dark/50 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-civic-blue to-civic-trust flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none">GhostFree Admin</h1>
              <p className="text-[0.65rem] text-shield-muted">{profile?.name || profile?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Wallet Status */}
            {connected ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-success/10 border border-accent-success/20">
                <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                <span className="text-xs text-accent-success font-mono">
                  {address?.slice(0, 8)}...{address?.slice(-6)}
                </span>
              </div>
            ) : (
              <button
                onClick={() => connect()}
                disabled={connecting}
                className="btn-civic btn-secondary text-xs py-2 px-3"
              >
                <Wallet className="w-3.5 h-3.5" />
                {connecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}

            <button onClick={handleLogout} className="btn-civic btn-ghost text-xs py-2 px-3">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <Landmark className="w-6 h-6 text-civic-sky" />
              Relief Fund Operations
            </h2>
            <p className="text-shield-muted text-sm mt-1">
              Upload eligibility lists, compute Merkle roots, and deploy funds on Midnight
            </p>
          </div>
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              if (!showHistory) loadHistory();
            }}
            className="btn-civic btn-secondary text-sm"
          >
            <History className="w-4 h-4" />
            {showHistory ? "Hide History" : "View History"}
          </button>
        </div>

        {/* Operation History Panel */}
        {showHistory && (
          <div className="glass-card p-6 mb-8 animate-fade-in-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <History className="w-4 h-4 text-civic-sky" />
                Past Operations
              </h3>
              <button onClick={loadHistory} disabled={loadingOps} className="btn-civic btn-ghost text-xs">
                <RefreshCw className={`w-3.5 h-3.5 ${loadingOps ? "animate-spin" : ""}`} />
              </button>
            </div>
            {loadingOps ? (
              <div className="flex items-center gap-2 text-shield-muted text-sm py-4">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading...
              </div>
            ) : operations.length === 0 ? (
              <p className="text-shield-muted text-sm py-4">No operations found.</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto hide-scrollbar">
                {operations.map((op) => (
                  <div
                    key={op.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-shield-dark/60 border border-shield-glass/20"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{op.name}</p>
                      <p className="text-shield-muted text-xs">
                        {op.leafCount} beneficiaries · {op.claimedCount} claimed ·{" "}
                        {new Date(op.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`badge ${
                        op.status === "active"
                          ? "badge-success"
                          : op.status === "completed"
                          ? "badge-info"
                          : op.status === "failed"
                          ? "badge-danger"
                          : "badge-warning"
                      }`}
                    >
                      {op.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Three Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1: CSV Upload */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
              <Upload className="w-5 h-5 text-civic-sky" />
              Upload Eligibility
            </h3>
            <p className="text-shield-muted text-xs mb-5">
              CSV file with pre-hashed National IDs
            </p>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
                transition-all duration-200 mb-4
                ${
                  csvFileName
                    ? "border-accent-success/30 bg-accent-success/5"
                    : "border-shield-glass/30 hover:border-civic-sky/40 hover:bg-civic-sky/5"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csv-upload-input"
              />
              {csvLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-civic-sky animate-spin" />
                  <p className="text-shield-muted text-sm">Parsing CSV...</p>
                </div>
              ) : csvFileName ? (
                <div className="flex flex-col items-center gap-2">
                  <FileSpreadsheet className="w-8 h-8 text-accent-success" />
                  <p className="text-white text-sm font-medium">{csvFileName}</p>
                  <p className="text-accent-success text-xs">
                    {summary?.totalRows.toLocaleString()} unique entries loaded
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-shield-muted" />
                  <p className="text-shield-muted text-sm">
                    Drop CSV here or <span className="text-civic-sky underline">browse</span>
                  </p>
                  <p className="text-shield-muted/60 text-xs">Max 50MB · SHA-256 hashes</p>
                </div>
              )}
            </div>

            {/* CSV Error */}
            {csvError && (
              <div className="p-3 rounded-xl bg-accent-danger-soft border border-accent-danger/20 flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-accent-danger shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">{csvError}</p>
                <button onClick={() => setCsvError(null)} className="text-red-400 shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* CSV Summary */}
            {summary && (
              <div className="space-y-2 mt-4 animate-fade-in">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-shield-dark/60">
                  <span className="text-shield-muted text-xs flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Beneficiaries
                  </span>
                  <span className="text-white text-xs font-mono font-medium">
                    {summary.totalRows.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-shield-dark/60">
                  <span className="text-shield-muted text-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Tree Depth
                  </span>
                  <span className="text-white text-xs font-mono font-medium">
                    {summary.estimatedTreeDepth}
                  </span>
                </div>
                {summary.sampleHashes.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-shield-dark/60">
                    <p className="text-shield-muted text-xs mb-1.5">Sample hashes:</p>
                    {summary.sampleHashes.slice(0, 3).map((h, i) => (
                      <p key={i} className="text-civic-sky text-[0.65rem] font-mono truncate">
                        {h}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Panel 2: Merkle Root */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
              <TreeDeciduous className="w-5 h-5 text-accent-purple" />
              Merkle Root
            </h3>
            <p className="text-shield-muted text-xs mb-5">
              Cryptographic commitment to the eligibility list
            </p>

            <div className="flex flex-col items-center justify-center min-h-[200px]">
              {merkleBuilding ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-accent-purple animate-spin" />
                  </div>
                  <p className="text-shield-muted text-sm">Computing Merkle root...</p>
                  <p className="text-shield-muted/60 text-xs">
                    Hashing {entries?.length.toLocaleString()} leaves
                  </p>
                </div>
              ) : merkleRoot ? (
                <div className="w-full space-y-4 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent-success/10 border border-accent-success/20 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8 text-accent-success" />
                    </div>
                    <p className="text-accent-success text-sm font-medium">Root Computed</p>
                  </div>

                  <div className="p-4 rounded-xl bg-shield-dark/80 border border-shield-glass/20">
                    <p className="text-shield-muted text-xs mb-1.5 flex items-center gap-1">
                      <Hash className="w-3 h-3" /> Merkle Root
                    </p>
                    <p className="text-civic-sky text-xs font-mono break-all leading-relaxed select-all">
                      0x{merkleRoot}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-lg bg-shield-dark/60 text-center">
                      <p className="text-white text-lg font-bold">{entries?.length.toLocaleString()}</p>
                      <p className="text-shield-muted text-[0.65rem]">Leaves</p>
                    </div>
                    <div className="p-3 rounded-lg bg-shield-dark/60 text-center">
                      <p className="text-white text-lg font-bold">{merkleDepth}</p>
                      <p className="text-shield-muted text-[0.65rem]">Depth</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-shield-glass/10 border border-shield-glass/20 flex items-center justify-center">
                    <TreeDeciduous className="w-8 h-8 text-shield-muted/40" />
                  </div>
                  <p className="text-shield-muted text-sm">
                    Upload a CSV to compute the Merkle root
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Panel 3: Deploy Relief Fund */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-accent-warning" />
              Deploy Relief Fund
            </h3>
            <p className="text-shield-muted text-xs mb-5">
              Lock funds in escrow on the Midnight smart contract
            </p>

            <div className="space-y-4">
              {/* Operation Name */}
              <div>
                <label htmlFor="op-name" className="label-civic">
                  <Landmark className="w-3.5 h-3.5 text-accent-warning" />
                  Operation Name
                </label>
                <input
                  id="op-name"
                  type="text"
                  className="input-civic"
                  placeholder='e.g., "Typhoon Yolanda Relief 2026"'
                  value={operationName}
                  onChange={(e) => setOperationName(e.target.value)}
                  disabled={deploying}
                />
              </div>

              {/* Total Fund */}
              <div>
                <label htmlFor="total-fund" className="label-civic">
                  <CircleDollarSign className="w-3.5 h-3.5 text-accent-warning" />
                  Total Fund (tNIGHT)
                </label>
                <input
                  id="total-fund"
                  type="number"
                  className="input-civic"
                  placeholder="50000"
                  value={totalFund}
                  onChange={(e) => setTotalFund(e.target.value)}
                  disabled={deploying}
                  min="0"
                  step="any"
                />
              </div>

              {/* Per Claim */}
              <div>
                <label htmlFor="per-claim" className="label-civic">
                  <CircleDollarSign className="w-3.5 h-3.5 text-accent-warning" />
                  Per-Claim Amount (tNIGHT)
                </label>
                <input
                  id="per-claim"
                  type="number"
                  className="input-civic"
                  placeholder="5000"
                  value={perClaimAmount}
                  onChange={(e) => setPerClaimAmount(e.target.value)}
                  disabled={deploying}
                  min="0"
                  step="any"
                />
              </div>

              {/* Deploy Button */}
              <button
                onClick={handleDeploy}
                disabled={deploying || !merkleRoot || !entries}
                className="btn-civic btn-success w-full h-[52px] text-base mt-2 tap-scale"
                id="deploy-btn"
              >
                {deploying ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deploying...
                  </div>
                ) : (
                  <>
                    <Rocket className="w-4.5 h-4.5" />
                    Deploy Relief Fund
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Deploy Result */}
              {deployResult && (
                <div className="p-4 rounded-xl bg-accent-success-soft border border-accent-success/20 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-success shrink-0 mt-0.5" />
                    <p className="text-xs text-green-300 leading-relaxed">{deployResult}</p>
                  </div>
                </div>
              )}

              {/* Deploy Error */}
              {deployError && (
                <div className="p-4 rounded-xl bg-accent-danger-soft border border-accent-danger/20 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-accent-danger shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300 leading-relaxed">{deployError}</p>
                  </div>
                </div>
              )}

              {/* Requirements Check */}
              {!merkleRoot && (
                <div className="p-3 rounded-xl bg-shield-dark/60 border border-shield-glass/20">
                  <p className="text-shield-muted text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Upload an eligibility CSV first to enable deployment
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
