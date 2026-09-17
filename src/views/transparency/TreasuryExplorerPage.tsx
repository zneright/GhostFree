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
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  getGovernanceOperations,
  computeTreasuryMetrics,
  generateCOAAuditCSV,
} from "../../services/governance.service";
import { MIDNIGHT_CONFIG } from "../../configuration/midnight.config";
import Layout from "../../components/Layout";
import { useTranslation } from "../../services/i18n.service";
import { useVoiceAssistant } from "../../services/voice.service";

export const TreasuryExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const { isSpeaking, speak, stop } = useVoiceAssistant();
  const [operations] = useState(() => getGovernanceOperations());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const metrics = useMemo(() => computeTreasuryMetrics(operations), [operations]);

  const handleVoiceBriefing = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak("treasury");
    }
  };

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
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 select-none">
        {/* Top Header Bar inside page */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border-2 border-amber-500/30 flex items-center justify-center text-amber-400">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t("treasuryTitle") || "Public Calamity Treasury & Audit Explorer"}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PREPROD LIVE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {t("treasurySubtitle") || "Real-time disaster relief fund telemetry & COA compliance under Philippine R.A. 10121 & R.A. 10173"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Audio Briefing Voice Button */}
            <button
              onClick={handleVoiceBriefing}
              className={`py-2.5 px-3.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 shadow-md ${
                isSpeaking
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse font-extrabold"
                  : "bg-white/10 text-amber-300 hover:bg-white/15 border-amber-400/40"
              }`}
              id="treasury-voice-briefing-btn"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>
                {isSpeaking
                  ? (lang === "en" ? "Stop Audio" : lang === "ceb" ? "Hunonga Tingog" : "Ihinto Boses")
                  : (lang === "en" ? "Audio Briefing (Voice)" : lang === "ceb" ? "Tingog nga Giya (Voice)" : "Audio Briefing (Boses)")}
              </span>
            </button>

            <button
              onClick={handleDownloadCOA}
              className="btn-civic-gold py-2.5 px-4 text-xs font-black shadow-lg"
              id="download-coa-audit-btn"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>{lang === "en" ? "Report Downloaded!" : lang === "ceb" ? "Na-download na ang Report!" : "Na-download na ang Report!"}</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4 text-slate-950" />
                  <span>{t("downloadCoa") || "Download COA Audit (.CSV)"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Statutory Compliance Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-accent-gold/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
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
                {lang === "en"
                  ? "Under the Philippine Disaster Risk Reduction & Management Act and Commission on Audit (COA) rules, all Quick Response Fund (QRF) allocations require dual-authority sign-off and public disbursement telemetry without doxxing vulnerable beneficiaries."
                  : lang === "ceb"
                  ? "Ubos sa Philippine Disaster Risk Reduction & Management Act ug lagda sa Commission on Audit (COA), ang tanang Quick Response Fund (QRF) nagkinahanglan og dual-authority sign-off ug bukas nga disbursement telemetry nga dili ibutyag ang personal nga ngalan."
                  : "Sa ilalim ng Philippine Disaster Risk Reduction & Management Act at mga patakaran ng Commission on Audit (COA), ang lahat ng Quick Response Fund (QRF) ay nangangailangan ng dual-authority sign-off at pampublikong disbursement telemetry nang hindi inilalantad ang personal na impormasyon ng mga benepisyaryo."}
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
                {t("statAllocated") || "Total Allocated QRF"}
              </span>
              <CircleDollarSign className="w-4 h-4 text-accent-gold" />
            </div>
            <div className="text-2xl font-black text-white tracking-tight">
              {metrics.totalAllocatedFund.toLocaleString()} tNIGHT
            </div>
            <span className="text-[0.7rem] text-white/40 block mt-1">
              {t("statAllocatedSub") || "Guaranteed by Municipal Ordinances"}
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                {t("statDisbursed") || "Disbursed to Victims"}
              </span>
              <Activity className="w-4 h-4 text-accent-success" />
            </div>
            <div className="text-2xl font-black text-accent-success tracking-tight">
              {metrics.totalDisbursedFund.toLocaleString()} tNIGHT
            </div>
            <span className="text-[0.7rem] text-accent-success/80 block mt-1">
              {metrics.totalVerifiedClaims} {t("statDisbursedSub") || "verified claims settled"}
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                {t("statRemaining") || "Remaining Escrow Reserve"}
              </span>
              <Lock className="w-4 h-4 text-civic-sky" />
            </div>
            <div className="text-2xl font-black text-civic-sky tracking-tight">
              {metrics.remainingEscrowFund.toLocaleString()} tNIGHT
            </div>
            <span className="text-[0.7rem] text-white/40 block mt-1">
              {t("statRemainingSub") || "Held in Compact smart contract escrow"}
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                {t("statBlocked") || "Ghost Double-Claims Blocked"}
              </span>
              <ShieldCheck className="w-4 h-4 text-accent-purple" />
            </div>
            <div className="text-2xl font-black text-accent-purple tracking-tight">
              {metrics.duplicateAttemptsBlocked} Attempted
            </div>
            <span className="text-[0.7rem] text-white/40 block mt-1">
              {t("statBlockedSub") || "100% prevented by nullifier collisions"}
            </span>
          </div>
        </div>

        {/* Operational Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-civic-sky shrink-0" />
            <div>
              <p className="text-white font-semibold">{t("statSpeed") || "Average Proving Speed"}</p>
              <p className="text-white/50">{metrics.averageProvingTimeSeconds}s {t("statSpeedSub") || "client-side WASM"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CircleDollarSign className="w-4 h-4 text-accent-gold shrink-0" />
            <div>
              <p className="text-white font-semibold">{t("statGas") || "Citizen Gas Fees"}</p>
              <p className="text-accent-success font-medium">{t("statGasSub") || "0.00 tDUST (100% LGU Sponsored)"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-accent-success shrink-0" />
            <div>
              <p className="text-white font-semibold">{t("statPrivacy") || "Data Privacy Reassurance"}</p>
              <p className="text-white/50">{t("statPrivacySub") || "0 Personal IDs Exposed to Public"}</p>
            </div>
          </div>
        </div>

        {/* Calamity Operations & Dual-Key Quorum Table */}
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-civic-sky" />
                <span>{t("quorumTitle") || "Active Calamity Operations & Municipal Quorum Status"}</span>
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                {t("quorumSubtitle") || "Each operation must be sealed by both the DRRM Officer and Municipal Treasurer before funds are released."}
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === "en" ? "Search operation..." : lang === "ceb" ? "Pangitaa ang operasyon..." : "Maghanap ng operasyon..."}
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
                <option value="all">{lang === "en" ? "All Quorum" : lang === "ceb" ? "Tanan nga Quorum" : "Lahat ng Quorum"}</option>
                <option value="authorized">{lang === "en" ? "Fully Authorized" : lang === "ceb" ? "Hingpit nga Awtorisado" : "Ganap na Awtorisado"}</option>
                <option value="pending">{lang === "en" ? "Pending Sign-off" : lang === "ceb" ? "Naghulat og Pirma" : "Naghihintay ng Lagda"}</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 font-mono text-[0.7rem]">
                  <th className="pb-3 font-semibold">{t("colOperation") || "OPERATION & ID"}</th>
                  <th className="pb-3 font-semibold">{t("colAllocated") || "ALLOCATED FUND"}</th>
                  <th className="pb-3 font-semibold">{t("colDisbursed") || "DISBURSED / REMAINING"}</th>
                  <th className="pb-3 font-semibold">{t("colDrrm") || "DRRM OFFICER CLEARANCE"}</th>
                  <th className="pb-3 font-semibold">{t("colTreasurer") || "MUNICIPAL TREASURER CLEARANCE"}</th>
                  <th className="pb-3 font-semibold text-right">{t("colQuorum") || "QUORUM STATUS"}</th>
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
                  <span>{t("registryTitle") || "Anonymous Nullifier Registry (Spent Commitments)"}</span>
                </h3>
                <p className="text-[0.7rem] text-white/50">
                  {t("registrySubtitle") || "Each nullifier represents a settled claim without disclosing the citizen's personal identity."}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[0.65rem] bg-accent-purple/20 text-accent-purple border border-accent-purple/30 font-mono">
                {metrics.totalVerifiedClaims} {lang === "en" ? "Settled" : lang === "ceb" ? "Nahusay" : "Naresolba"}
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto hide-scrollbar">
              {nullifiersFeed.map((entry, idx) => (
                <div
                  key={idx}
                  className="treasury-feed-item flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/10 text-xs transition-colors"
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
                {lang === "en" ? "100% Privacy Guarantee for Calamity Victims" : lang === "ceb" ? "100% Garantiya sa Pribasiya alang sa mga Biktima" : "100% Garantiyang Pribado para sa mga Nasalanta"}
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                {lang === "en"
                  ? "Traditional calamity registries publish victims' full names, addresses, and poverty status on paper billboards, violating R.A. 10173."
                  : lang === "ceb"
                  ? "Ang karaang paagi sa hinabang nagmantala sa tibuok ngalan ug adres sa mga biktima sa papel, nga nakasupak sa R.A. 10173."
                  : "Ang mga tradisyunal na listahan ng kalamidad ay naglalathala ng buong pangalan, tirahan, at antas ng pamumuhay ng mga biktima sa mga pader o papel, na labag sa R.A. 10173."}
              </p>
              <p className="text-xs text-white/60 leading-relaxed">
                GhostFree computes deterministic nullifiers:
                <br />
                <code className="text-accent-gold font-mono text-[0.7rem]">
                  nullifier = Hash(leafHash + contractAddress)
                </code>
                <br />
                {lang === "en"
                  ? "The ledger records the mathematical settlement while ensuring the citizen's identity is impossible to deanonymize."
                  : lang === "ceb"
                  ? "Ginatala sa ledger ang transaksiyon samtang imposible nga mailhan ang pagkatawo sa biktima."
                  : "Itinatala ng ledger ang pamamahagi ng pondo habang imposibleng malaman ninuman ang totoong pagkakakilanlan ng mamamayan."}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4">
              <button
                onClick={() => navigate("/claim")}
                className="btn-civic-gold w-full py-2.5 text-xs font-black shadow-md text-center"
              >
                {lang === "en" ? "Go to Citizen Claim Portal (Claim ₱5,000)" : lang === "ceb" ? "Adto sa Citizen Claim Portal (Pag-claim og ₱5,000)" : "Pumunta sa Citizen Claim Portal (Kumuha ng ₱5,000)"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TreasuryExplorerPage;
