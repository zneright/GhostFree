// ============================================
// GhostFree — Public Calamity Treasury & Audit Explorer
// Real-time disaster relief fund telemetry & COA compliance
// Complies with Philippine R.A. 10121 & R.A. 10173
// ============================================

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Landmark,
  Shield,
  ShieldCheck,
  CircleDollarSign,
  Download,
  ArrowLeft,
  Lock,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  Activity,
  FileSpreadsheet,
  AlertTriangle,
  Scale,
  Search,
  Filter,
  Check,
} from "lucide-react";
import {
  getGovernanceOperations,
  computeTreasuryMetrics,
  generateCOAAuditCSV,
} from "../../services/governance.service";
import { MIDNIGHT_CONFIG } from "../../configuration/midnight.config";

export const TreasuryExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const [operations] = useState(() => getGovernanceOperations());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const metrics = useMemo(() => computeTreasuryMetrics(operations), [operations]);

  const filteredOperations = useMemo(() => {
    return operations.filter((op) => {
      const matchesSearch =
        op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.merkleRoot.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "authorized" && op.quorumStatus === "fully_authorized") ||
        (statusFilter === "pending" && op.quorumStatus !== "fully_authorized") ||
        op.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [operations, searchTerm, statusFilter]);

  const handleDownloadCOA = () => {
    const csvContent = generateCOAAuditCSV(operations);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `COA_Calamity_Relief_Audit_Report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Mock real-time anonymized nullifiers based on current disbursements
  const nullifiersFeed = useMemo(() => {
    return [
      {
        nullifier: "0x3f4a9b2c...8e1d",
        amount: "5,000 tNIGHT",
        operation: "Typhoon Marce QRF",
        time: "12 mins ago",
        status: "CONFIRMED",
      },
      {
        nullifier: "0x7a8b9c0d...2f3a",
        amount: "5,000 tNIGHT",
        operation: "Typhoon Marce QRF",
        time: "24 mins ago",
        status: "CONFIRMED",
      },
      {
        nullifier: "0x5e6f7a8b...0d1e",
        amount: "5,000 tNIGHT",
        operation: "Flash Flood Relief",
        time: "41 mins ago",
        status: "CONFIRMED",
      },
      {
        nullifier: "0x9c0d1e2f...4b5c",
        amount: "5,000 tNIGHT",
        operation: "Flash Flood Relief",
        time: "1 hour ago",
        status: "CONFIRMED",
      },
      {
        nullifier: "0x1a2b3c4d...6f7a",
        amount: "5,000 tNIGHT",
        operation: "Typhoon Marce QRF",
        time: "2 hours ago",
        status: "CONFIRMED",
      },
    ];
  }, []);

  return (
    <div className="min-h-dvh bg-[#0A1628] text-white selection:bg-civic-blue selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-civic-trust/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-md bg-[#0A1628]/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="btn-civic btn-ghost text-xs sm:text-sm py-1.5 px-2.5 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="h-5 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-accent-gold" />
              <h1 className="text-base sm:text-lg font-bold tracking-tight">
                Public Calamity Treasury & Audit Explorer
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-accent-success/15 text-accent-success border border-accent-success/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
              PREPROD VERIFIED
            </span>
            <button
              onClick={handleDownloadCOA}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-civic-trust hover:bg-civic-trust/80 text-white transition-all flex items-center gap-1.5 shadow-md shadow-civic-trust/20"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent-success" />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Download COA Audit (.CSV)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Statutory Compliance Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-accent-gold/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Republic Act 10121 & COA Disaster Relief Governance</span>
                <span className="px-2 py-0.5 rounded text-[0.65rem] font-semibold bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                  Statutory Transparency
                </span>
              </h2>
              <p className="text-xs text-white/60 mt-0.5 max-w-3xl leading-relaxed">
                Under the Philippine Disaster Risk Reduction & Management Act and Commission on Audit (COA) rules, all Quick Response Fund (QRF) allocations require dual-authority sign-off and public disbursement telemetry without doxxing vulnerable beneficiaries.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://preprod.midnight.network"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-civic-sky hover:underline flex items-center gap-1"
            >
              Midnight Preprod Ledger <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Real-time Treasury Telemetry HUD */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Total Allocated QRF
              </span>
              <CircleDollarSign className="w-4 h-4 text-accent-gold" />
            </div>
            <div className="text-2xl font-black text-white tracking-tight">
              {metrics.totalAllocatedFund.toLocaleString()} tNIGHT
            </div>
            <span className="text-[0.7rem] text-white/40 block mt-1">
              Guaranteed by Municipal Ordinances
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Disbursed to Victims
              </span>
              <Activity className="w-4 h-4 text-accent-success" />
            </div>
            <div className="text-2xl font-black text-accent-success tracking-tight">
              {metrics.totalDisbursedFund.toLocaleString()} tNIGHT
            </div>
            <span className="text-[0.7rem] text-accent-success/80 block mt-1">
              {metrics.totalVerifiedClaims} verified claims settled
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Remaining Escrow Reserve
              </span>
              <Lock className="w-4 h-4 text-civic-sky" />
            </div>
            <div className="text-2xl font-black text-civic-sky tracking-tight">
              {metrics.remainingEscrowFund.toLocaleString()} tNIGHT
            </div>
            <span className="text-[0.7rem] text-white/40 block mt-1">
              Held in Compact smart contract escrow
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Ghost Double-Claims Blocked
              </span>
              <ShieldCheck className="w-4 h-4 text-accent-purple" />
            </div>
            <div className="text-2xl font-black text-accent-purple tracking-tight">
              {metrics.duplicateAttemptsBlocked} Attempted
            </div>
            <span className="text-[0.7rem] text-white/40 block mt-1">
              100% prevented by nullifier collisions
            </span>
          </div>
        </div>

        {/* Operational Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-civic-sky shrink-0" />
            <div>
              <p className="text-white font-semibold">Average Proving Speed</p>
              <p className="text-white/50">{metrics.averageProvingTimeSeconds}s client-side WASM</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CircleDollarSign className="w-4 h-4 text-accent-gold shrink-0" />
            <div>
              <p className="text-white font-semibold">Citizen Gas Fees</p>
              <p className="text-accent-success font-medium">0.00 tDUST (100% LGU Sponsored)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-accent-success shrink-0" />
            <div>
              <p className="text-white font-semibold">Data Privacy Reassurance</p>
              <p className="text-white/50">0 Personal IDs Exposed to Public</p>
            </div>
          </div>
        </div>

        {/* Calamity Operations & Dual-Key Quorum Table */}
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-civic-sky" />
                <span>Active Calamity Operations & Municipal Quorum Status</span>
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Each operation must be sealed by both the DRRM Officer and Municipal Treasurer before funds are released.
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search operation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl text-xs bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-civic-sky"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs bg-black/40 border border-white/10 text-white focus:outline-none focus:border-civic-sky"
              >
                <option value="all">All Quorum</option>
                <option value="authorized">Fully Authorized</option>
                <option value="pending">Pending Sign-off</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 font-mono text-[0.7rem]">
                  <th className="pb-3 font-semibold">OPERATION & ID</th>
                  <th className="pb-3 font-semibold">ALLOCATED FUND</th>
                  <th className="pb-3 font-semibold">DISBURSED / REMAINING</th>
                  <th className="pb-3 font-semibold">DRRM OFFICER CLEARANCE</th>
                  <th className="pb-3 font-semibold">MUNICIPAL TREASURER CLEARANCE</th>
                  <th className="pb-3 font-semibold text-right">QUORUM STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOperations.map((op) => {
                  const drrm = op.approvals?.find((a) => a.officerRole === "drrm_officer");
                  const treas = op.approvals?.find((a) => a.officerRole === "municipal_treasurer");
                  const disbursed = op.claimedCount * op.perClaimAmount;
                  const remaining = Math.max(0, op.totalFund - disbursed);

                  return (
                    <tr key={op.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-white text-sm">{op.name}</p>
                        <p className="text-[0.7rem] text-white/40 font-mono mt-0.5">{op.id}</p>
                        <p className="text-[0.65rem] text-civic-sky font-mono truncate max-w-xs mt-0.5">
                          Root: {op.merkleRoot}
                        </p>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="font-bold text-white text-sm">
                          {op.totalFund.toLocaleString()} tNIGHT
                        </span>
                        <span className="block text-[0.65rem] text-white/50">
                          {op.perClaimAmount.toLocaleString()} tNIGHT / claim
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="font-semibold text-accent-success">
                          {disbursed.toLocaleString()} tNIGHT
                        </span>
                        <span className="block text-[0.65rem] text-white/40">
                          {remaining.toLocaleString()} tNIGHT remaining ({op.claimedCount} claims)
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        {drrm ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-accent-success font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span>{drrm.officerName}</span>
                            </div>
                            <p className="text-[0.65rem] text-white/40 font-mono">
                              ID: {drrm.agencyId}
                            </p>
                            <p className="text-[0.6rem] text-white/30 font-mono">
                              Seal: {drrm.signatureHash.slice(0, 10)}...
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-accent-warning">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending Sign-off</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 pr-4">
                        {treas ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-accent-success font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span>{treas.officerName}</span>
                            </div>
                            <p className="text-[0.65rem] text-white/40 font-mono">
                              ID: {treas.agencyId}
                            </p>
                            <p className="text-[0.6rem] text-white/30 font-mono">
                              Seal: {treas.signatureHash.slice(0, 10)}...
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-accent-warning">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending Sign-off</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {op.quorumStatus === "fully_authorized" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-accent-success/15 text-accent-success border border-accent-success/30">
                            <CheckCircle2 className="w-3 h-3" />
                            DUAL-KEY AUTHORIZED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-accent-warning/15 text-accent-warning border border-accent-warning/30">
                            <Clock className="w-3 h-3" />
                            AWAITING TREASURY
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Anonymized Nullifier Registry & Anti-Ghost Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent-purple" />
                  <span>Anonymous Nullifier Registry (Spent Commitments)</span>
                </h3>
                <p className="text-[0.7rem] text-white/50">
                  Each nullifier represents a settled claim without disclosing the citizen's personal identity.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[0.65rem] bg-accent-purple/20 text-accent-purple border border-accent-purple/30 font-mono">
                {metrics.totalVerifiedClaims} Settled
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto hide-scrollbar">
              {nullifiersFeed.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                    <div>
                      <p className="font-mono text-civic-sky text-xs">{entry.nullifier}</p>
                      <p className="text-[0.65rem] text-white/40">{entry.operation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-accent-success">{entry.amount}</span>
                    <span className="block text-[0.65rem] text-white/40">{entry.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Anti-Ghost Shield Guarantee */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-success/15 border border-accent-success/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-accent-success" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                100% Privacy Guarantee for Calamity Victims
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                Traditional calamity registries publish victims' full names, addresses, and poverty status on paper billboards, violating R.A. 10173.
              </p>
              <p className="text-xs text-white/60 leading-relaxed">
                GhostFree computes deterministic nullifiers:
                <br />
                <code className="text-accent-gold font-mono text-[0.7rem]">
                  nullifier = Hash(leafHash + contractAddress)
                </code>
                <br />
                The ledger records the mathematical settlement while ensuring the citizen's identity is impossible to deanonymize.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4">
              <button
                onClick={() => navigate("/claim")}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-civic-blue to-civic-trust text-white hover:brightness-110 shadow-md shadow-civic-blue/20 transition-all text-center"
              >
                Go to Citizen Claim Portal
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TreasuryExplorerPage;
