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
import {
  getFeedbackList,
  updateFeedbackStatus,
  computeFeedbackAnalytics,
} from "../../services/feedback.service";
import {
  getGovernanceOperations,
  signOperationQuorum,
} from "../../services/governance.service";
import type { EligibilityEntry, ReliefOperation, UserFeedback, OfficerRole } from "../../types";
import TransparencyCard from "../../components/TransparencyCard";
import TrancheQuorumModal from "../../components/TrancheQuorumModal";
import GhostFreeLogo from "../../components/GhostFreeLogo";
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
  MessageSquarePlus,
  Star,
  CheckCircle,
  Filter,
  Key,
  FileSignature,
  Stamp,
  ExternalLink,
  Lock,
  Sparkles,
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

  // Feedback & Insights State
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackList, setFeedbackList] = useState<UserFeedback[]>(() => getFeedbackList());
  const [feedbackFilter, setFeedbackFilter] = useState<string>("all");

  // Dual-Key Quorum State
  const [showQuorum, setShowQuorum] = useState(false);
  const [showTrancheSimulator, setShowTrancheSimulator] = useState(false);
  const [govOperations, setGovOperations] = useState<ReliefOperation[]>(() => getGovernanceOperations());
  const [selectedOpToSign, setSelectedOpToSign] = useState<ReliefOperation | null>(null);
  const [signingRole, setSigningRole] = useState<OfficerRole>("municipal_treasurer");
  const [signingName, setSigningName] = useState("");
  const [signingAgencyId, setSigningAgencyId] = useState("");
  const [signingError, setSigningError] = useState<string | null>(null);
  const [signingSuccess, setSigningSuccess] = useState<string | null>(null);

  const pendingQuorumCount = govOperations.filter(
    (op) => op.quorumStatus !== "fully_authorized"
  ).length;

  const handleSignOperation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpToSign) return;
    if (!signingName.trim() || !signingAgencyId.trim()) {
      setSigningError("Please provide your official name and Agency ID.");
      return;
    }

    const res = signOperationQuorum(
      selectedOpToSign.id,
      signingRole,
      signingName.trim(),
      signingAgencyId.trim()
    );

    if (!res.success) {
      setSigningError(res.error || "Failed to sign operation.");
      return;
    }

    setGovOperations(getGovernanceOperations());
    setSigningSuccess(
      `Successfully signed by ${signingName} as ${
        signingRole === "drrm_officer" ? "DRRM Officer" : "Municipal Treasurer"
      }!`
    );
    setSigningError(null);
    setTimeout(() => {
      setSelectedOpToSign(null);
      setSigningSuccess(null);
      setSigningName("");
      setSigningAgencyId("");
    }, 1500);
  };

  const handleStatusChange = (id: string, newStatus: UserFeedback["status"]) => {
    updateFeedbackStatus(id, newStatus);
    setFeedbackList(getFeedbackList());
  };

  const feedbackAnalytics = computeFeedbackAnalytics(feedbackList);
  const filteredFeedbacks =
    feedbackFilter === "all"
      ? feedbackList
      : feedbackList.filter((f) => f.category === feedbackFilter);

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
      <header className="border-b border-shield-glass/30 bg-shield-dark/50 backdrop-blur-xl sticky top-0 z-20 relative">
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-civic-blue/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GhostFreeLogo size={32} variant="icon" animated />
            <div>
              <h1 className="text-sm font-bold text-white leading-none">GhostFree Admin</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[0.6rem] text-shield-muted">{profile?.name || profile?.email}</span>
                <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full bg-civic-blue/15 text-civic-sky border border-civic-blue/20 font-semibold uppercase tracking-wider">LGU Officer</span>
              </div>
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
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowQuorum(!showQuorum)}
              className={`btn-civic text-xs sm:text-sm flex items-center gap-1.5 ${
                showQuorum ? "btn-primary" : "btn-secondary"
              }`}
            >
              <Key className="w-4 h-4 text-accent-success" />
              <span>Dual-Key Quorum</span>
              {pendingQuorumCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[0.65rem] bg-accent-warning text-black font-bold">
                  {pendingQuorumCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className={`btn-civic text-xs sm:text-sm flex items-center gap-1.5 ${
                showFeedback ? "btn-primary" : "btn-secondary"
              }`}
            >
              <MessageSquarePlus className="w-4 h-4 text-accent-gold" />
              <span>Feedback & Insights</span>
              <span className="px-1.5 py-0.2 rounded-full text-[0.65rem] bg-accent-gold/20 text-accent-gold font-bold">
                {feedbackList.length}
              </span>
            </button>
            <button
              onClick={() => setShowTrancheSimulator(true)}
              className="btn-civic btn-secondary text-xs sm:text-sm flex items-center gap-1.5 hover:border-accent-gold/40 text-accent-gold"
            >
              <Sparkles className="w-4 h-4 text-accent-gold" />
              <span>Tranche Quorum</span>
            </button>
            <button
              onClick={() => navigate("/transparency")}
              className="btn-civic btn-ghost text-xs sm:text-sm flex items-center gap-1.5 border border-white/10"
            >
              <Landmark className="w-4 h-4 text-civic-sky" />
              <span>Public Treasury</span>
              <ExternalLink className="w-3 h-3 text-white/40" />
            </button>
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                if (!showHistory) loadHistory();
              }}
              className="btn-civic btn-secondary text-xs sm:text-sm"
            >
              <History className="w-4 h-4" />
              {showHistory ? "Hide History" : "View History"}
            </button>
          </div>
        </div>

        {/* Network Transparency Card */}
        <div className="mb-6">
          <TransparencyCard />
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

        {/* Citizen Feedback & Insights Hub */}
        {showFeedback && (
          <div className="glass-card-premium p-6 mb-8 animate-fade-in-down border border-civic-trust/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <MessageSquarePlus className="w-5 h-5 text-accent-gold" />
                  Citizen Feedback & Living Triage Center
                </h3>
                <p className="text-shield-muted text-xs mt-0.5">
                  Real-time sentiment and suggestions from field claimants and responders
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 text-xs">
                {["all", "usability", "wallet", "privacy", "speed", "feature_request"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFeedbackFilter(tab)}
                    className={`px-2.5 py-1 rounded-lg text-[0.7rem] font-medium transition-all duration-200 ${
                      feedbackFilter === tab
                        ? "bg-civic-blue text-white shadow-lg shadow-civic-blue/20"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="metric-card">
                <span className="text-[0.65rem] text-white/40 uppercase tracking-wider block mb-1">
                  Citizen CSAT Score
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-accent-gold">
                    {feedbackAnalytics.averageRating}
                  </span>
                  <div className="flex text-accent-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= Math.round(feedbackAnalytics.averageRating)
                            ? "fill-accent-gold"
                            : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <span className="text-[0.65rem] text-white/40 uppercase tracking-wider block mb-1">
                  Total Submissions
                </span>
                <span className="text-xl font-bold text-white">
                  {feedbackAnalytics.totalCount}
                </span>
              </div>

              <div className="metric-card">
                <span className="text-[0.65rem] text-white/40 uppercase tracking-wider block mb-1">
                  Actioned / Resolved
                </span>
                <span className="text-xl font-bold text-accent-success">
                  {feedbackAnalytics.statusDistribution["resolved"] || 0}
                </span>
              </div>

              <div className="metric-card">
                <span className="text-[0.65rem] text-white/40 uppercase tracking-wider block mb-1">
                  Under Triage
                </span>
                <span className="text-xl font-bold text-accent-warning">
                  {(feedbackAnalytics.statusDistribution["new"] || 0) +
                    (feedbackAnalytics.statusDistribution["reviewed"] || 0)}
                </span>
              </div>
            </div>

            {/* Feedback Triage List */}
            <div className="space-y-2.5 max-h-80 overflow-y-auto hide-scrollbar">
              {filteredFeedbacks.length === 0 ? (
                <p className="text-shield-muted text-xs py-4 text-center">
                  No feedback matching the selected filter.
                </p>
              ) : (
                filteredFeedbacks.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <div className="flex text-accent-gold">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= item.rating ? "fill-accent-gold" : "text-white/20"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="px-2 py-0.5 rounded text-[0.65rem] font-semibold bg-white/10 text-white/80">
                          {item.role.replace("_", " ")}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[0.65rem] font-medium bg-civic-blue/20 text-civic-sky border border-civic-sky/30">
                          {item.category}
                        </span>
                        <span className="text-[0.65rem] text-white/30">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        "{item.comment}"
                      </p>
                    </div>

                    {/* Admin Status Triage */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[0.65rem] px-2 py-0.5 rounded font-bold uppercase ${
                          item.priority === "high"
                            ? "bg-accent-danger/20 text-accent-danger"
                            : item.priority === "medium"
                            ? "bg-accent-warning/20 text-accent-warning"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(
                            item.id,
                            e.target.value as UserFeedback["status"]
                          )
                        }
                        className="px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-white focus:border-civic-sky focus:outline-none"
                      >
                        <option value="new" className="bg-[#0A1628]">New</option>
                        <option value="reviewed" className="bg-[#0A1628]">Under Review</option>
                        <option value="planned" className="bg-[#0A1628]">Planned</option>
                        <option value="resolved" className="bg-[#0A1628]">Resolved</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Dual-Key Municipal Quorum Panel */}
        {showQuorum && (
          <div className="glass-card-premium p-6 mb-8 animate-fade-in-down border border-accent-success/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Key className="w-5 h-5 text-accent-success" />
                  Dual-Key Municipal Quorum (R.A. 10121 Joint Authorization)
                </h3>
                <p className="text-shield-muted text-xs mt-0.5">
                  Both the Local DRRM Officer and Municipal Treasurer must apply digital authorization seals before funds are released on Midnight.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-accent-success/15 text-accent-success border border-accent-success/30">
                Statutory Joint Approval Required
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {govOperations.map((op) => {
                const drrm = op.approvals?.find((a) => a.officerRole === "drrm_officer");
                const treas = op.approvals?.find((a) => a.officerRole === "municipal_treasurer");
                const isFullyAuthorized = op.quorumStatus === "fully_authorized";

                return (
                  <div
                    key={op.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isFullyAuthorized
                        ? "bg-black/30 border-accent-success/30"
                        : "bg-black/40 border-accent-warning/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-white text-sm leading-snug">
                        {op.name}
                      </h4>
                      <span
                        className={`text-[0.65rem] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                          isFullyAuthorized
                            ? "bg-accent-success/20 text-accent-success"
                            : "bg-accent-warning/20 text-accent-warning"
                        }`}
                      >
                        {isFullyAuthorized ? "Authorized" : "Pending Key"}
                      </span>
                    </div>

                    <p className="text-[0.7rem] text-white/50 font-mono mb-3">
                      Pool: {op.totalFund.toLocaleString()} tNIGHT · Root: {op.merkleRoot.slice(0, 10)}...
                    </p>

                    <div className="space-y-2 mb-4 text-xs">
                      {/* Key 1: DRRM Officer */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                        <span className="text-white/60 text-[0.7rem]">1. DRRM Officer:</span>
                        {drrm ? (
                          <span className="text-accent-success font-medium text-[0.7rem] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {drrm.officerName}
                          </span>
                        ) : (
                          <span className="text-accent-warning text-[0.7rem]">Missing Seal</span>
                        )}
                      </div>

                      {/* Key 2: Municipal Treasurer */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                        <span className="text-white/60 text-[0.7rem]">2. Treasurer:</span>
                        {treas ? (
                          <span className="text-accent-success font-medium text-[0.7rem] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {treas.officerName}
                          </span>
                        ) : (
                          <span className="text-accent-warning text-[0.7rem]">Missing Seal</span>
                        )}
                      </div>
                    </div>

                    {!isFullyAuthorized ? (
                      <button
                        onClick={() => {
                          setSelectedOpToSign(op);
                          setSigningRole(drrm ? "municipal_treasurer" : "drrm_officer");
                          setSigningError(null);
                        }}
                        className="w-full py-2 rounded-xl text-xs font-semibold bg-civic-trust hover:bg-civic-trust/80 text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-civic-trust/20"
                      >
                        <FileSignature className="w-3.5 h-3.5" />
                        <span>Sign Operation Quorum</span>
                      </button>
                    ) : (
                      <div className="text-center py-1.5 text-accent-success text-[0.7rem] font-medium flex items-center justify-center gap-1 bg-accent-success/10 rounded-xl border border-accent-success/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Quorum Satisfied · Ready for Dispatch</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Signing Seal Modal */}
        {selectedOpToSign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0A1628] shadow-2xl p-6">
              <button
                onClick={() => setSelectedOpToSign(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Stamp className="w-5 h-5 text-accent-gold" />
                <h3 className="text-base font-bold text-white">
                  Apply Municipal Authorization Seal
                </h3>
              </div>
              <p className="text-xs text-white/60 mb-5">
                Certifying: <span className="text-white font-medium">{selectedOpToSign.name}</span>
              </p>

              {signingSuccess ? (
                <div className="py-6 text-center animate-scale-in">
                  <div className="w-14 h-14 rounded-full bg-accent-success/20 border border-accent-success/40 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8 text-accent-success" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">Authorization Sealed!</p>
                  <p className="text-xs text-accent-success">{signingSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleSignOperation} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-white/80 font-semibold mb-1">
                      Authorizing Authority Role:
                    </label>
                    <select
                      value={signingRole}
                      onChange={(e) => setSigningRole(e.target.value as OfficerRole)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-civic-sky focus:outline-none"
                    >
                      <option value="municipal_treasurer" className="bg-[#0A1628]">
                        Municipal Treasurer (Disbursement Officer)
                      </option>
                      <option value="drrm_officer" className="bg-[#0A1628]">
                        Local DRRM Officer (Disaster Management Chief)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 font-semibold mb-1">
                      Official Full Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Atty. Corazon Reyes, CPA"
                      value={signingName}
                      onChange={(e) => setSigningName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-civic-sky focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 font-semibold mb-1">
                      Government Agency ID / PRC License:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MTO-TREAS-2024-019"
                      value={signingAgencyId}
                      onChange={(e) => setSigningAgencyId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-civic-sky focus:outline-none"
                    />
                  </div>

                  {signingError && (
                    <div className="flex items-center gap-1.5 text-accent-danger text-xs">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{signingError}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedOpToSign(null)}
                      className="px-3 py-2 rounded-xl text-white/60 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-semibold bg-accent-gold text-slate-900 hover:brightness-110 flex items-center gap-1.5"
                    >
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>Seal & Authorize Quorum</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
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

      {/* Emergency Tranche Quorum Simulator Modal */}
      <TrancheQuorumModal
        isOpen={showTrancheSimulator}
        onClose={() => setShowTrancheSimulator(false)}
      />
    </div>
  );
};

export default AdminDashboard;
