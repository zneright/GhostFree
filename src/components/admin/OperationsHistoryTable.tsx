// ==============================================================================
// GhostFree — Operations History & Public Audit Table
// Paginated, searchable, and exportable disaster relief operations roster.
// Fully compliant with Commission on Audit (COA) Circulars & R.A. 10121.
// ==============================================================================

import React, { useState, useMemo } from "react";
import {
  History,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Hash,
  Coins,
  Users,
  ShieldCheck,
} from "lucide-react";
import type { ReliefOperation } from "../../types";

interface OperationsHistoryTableProps {
  operations: ReliefOperation[];
  loading?: boolean;
  onRefresh?: () => void;
}

export const OperationsHistoryTable: React.FC<OperationsHistoryTableProps> = ({
  operations,
  loading = false,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOperations = useMemo(() => {
    return operations.filter((op) => {
      const matchesSearch =
        op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.merkleRoot.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || op.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [operations, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOperations.length / itemsPerPage));
  const paginatedOperations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOperations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOperations, currentPage, itemsPerPage]);

  const handleExportCSV = () => {
    const headers = [
      "Operation ID",
      "Operation Name",
      "Admin Name",
      "Merkle Root",
      "Beneficiary Count",
      "Total Fund (tNIGHT)",
      "Per Claim Amount (tNIGHT)",
      "Claims Settled",
      "Status",
      "Quorum Status",
      "Created At",
    ];

    const rows = operations.map((op) => [
      `"${op.id}"`,
      `"${op.name.replace(/"/g, '""')}"`,
      `"${op.adminName}"`,
      `"${op.merkleRoot}"`,
      op.leafCount,
      op.totalFund,
      op.perClaimAmount,
      op.claimedCount,
      op.status,
      op.quorumStatus || "pending",
      `"${op.createdAt}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GhostFree_Relief_Operations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search operation name or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 text-xs rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="deploying">Deploying</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Operations Table */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead>
              <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 font-mono text-[0.7rem] uppercase">
                <th className="py-3 px-4 font-semibold">Operation & ID</th>
                <th className="py-3 px-4 font-semibold">Merkle Root</th>
                <th className="py-3 px-4 font-semibold">Beneficiaries</th>
                <th className="py-3 px-4 font-semibold">Disbursed / Escrow</th>
                <th className="py-3 px-4 font-semibold">Quorum</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    <Clock className="w-5 h-5 animate-spin mx-auto mb-2 text-sky-400" />
                    <span>Loading operations history...</span>
                  </td>
                </tr>
              ) : paginatedOperations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No relief operations found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedOperations.map((op) => {
                  const disbursedAmount = op.claimedCount * op.perClaimAmount;
                  const progress = Math.min(100, Math.round((disbursedAmount / (op.totalFund || 1)) * 100));

                  return (
                    <tr key={op.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-white text-sm leading-tight">{op.name}</p>
                        <p className="text-[0.7rem] text-slate-400 font-mono mt-0.5">{op.id}</p>
                        <span className="text-[0.65rem] text-slate-500">
                          Created {new Date(op.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-1 text-sky-300 text-[0.7rem] truncate max-w-[150px]">
                          <Hash className="w-3 h-3 shrink-0 text-sky-400" />
                          <span title={op.merkleRoot}>{op.merkleRoot.slice(0, 10)}...</span>
                        </div>
                        <span className="text-[0.65rem] text-slate-400">Depth: {op.treeDepth || 6}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white">
                          {op.claimedCount} / {op.leafCount}
                        </span>
                        <span className="block text-[0.65rem] text-slate-400">claimed</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[0.7rem]">
                            <span className="font-bold text-emerald-400">
                              {disbursedAmount.toLocaleString()} tNIGHT
                            </span>
                            <span className="text-slate-400 text-[0.65rem]">
                              of {op.totalFund.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-28 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-sky-400 h-1.5 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-bold ${
                            op.quorumStatus === "fully_authorized"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {op.quorumStatus === "fully_authorized" ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-400" />
                          )}
                          <span>
                            {op.quorumStatus === "fully_authorized" ? "Dual-Key Sealed" : "Pending Sign-off"}
                          </span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[0.65rem] font-black uppercase ${
                            op.status === "active"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : op.status === "completed"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : op.status === "failed"
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {op.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing {paginatedOperations.length} of {filteredOperations.length} operations
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[0.7rem]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsHistoryTable;
