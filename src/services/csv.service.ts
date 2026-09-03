// ============================================
// GhostFree — CSV Service
// Parses eligibility CSV files containing resident ID hashes
// ============================================

import Papa from "papaparse";
import type { EligibilityEntry } from "../types";

const MAX_ROWS = 1_000_000; // 1M max beneficiaries

/**
 * Parse a CSV file containing eligible resident ID hashes.
 * Expected format: single column of pre-hashed national IDs,
 * or a column named "id_hash" / "hash" / "national_id_hash".
 */
export async function parseEligibilityCSV(file: File): Promise<EligibilityEntry[]> {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith(".csv")) {
      reject(new Error("Please upload a .csv file."));
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      reject(new Error("File size exceeds 50MB limit."));
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const entries = extractHashes(results.data as Record<string, string>[]);
          resolve(entries);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => {
        reject(new Error(`CSV parsing failed: ${err.message}`));
      },
    });
  });
}

/**
 * Extract unique hashes from parsed CSV rows.
 * Looks for common column names: id_hash, hash, national_id_hash, or the first column.
 */
function extractHashes(rows: Record<string, string>[]): EligibilityEntry[] {
  if (rows.length === 0) {
    throw new Error("CSV file is empty. Please upload a file with at least one row.");
  }

  if (rows.length > MAX_ROWS) {
    throw new Error(`CSV exceeds maximum of ${MAX_ROWS.toLocaleString()} rows.`);
  }

  // Find the hash column
  const firstRow = rows[0];
  const columns = Object.keys(firstRow);
  const hashColumn = columns.find((col) => {
    const lower = col.toLowerCase().replace(/[^a-z]/g, "");
    return (
      lower === "idhash" ||
      lower === "hash" ||
      lower === "nationalidhash" ||
      lower === "residenthash" ||
      lower === "idHash"
    );
  }) || columns[0]; // Fallback to first column

  const seen = new Set<string>();
  const entries: EligibilityEntry[] = [];

  for (let i = 0; i < rows.length; i++) {
    const hash = rows[i][hashColumn]?.trim();
    if (!hash) continue;

    // Validate hash format (hex string, 64 chars for SHA-256 / Poseidon)
    if (!/^(0x)?[a-fA-F0-9]{16,128}$/.test(hash)) {
      throw new Error(
        `Invalid hash format at row ${i + 2}: "${hash.substring(0, 20)}...". ` +
        `Expected a hexadecimal string.`
      );
    }

    const normalized = hash.toLowerCase().replace(/^0x/, "");
    if (seen.has(normalized)) continue; // Deduplicate
    seen.add(normalized);

    entries.push({ idHash: normalized, index: entries.length });
  }

  if (entries.length === 0) {
    throw new Error("No valid ID hashes found in the CSV.");
  }

  return entries;
}

/**
 * Validate and summarize a parsed eligibility list.
 */
export function getCSVSummary(entries: EligibilityEntry[]) {
  return {
    totalRows: entries.length,
    uniqueHashes: entries.length,
    sampleHashes: entries.slice(0, 5).map((e) => e.idHash),
    estimatedTreeDepth: Math.ceil(Math.log2(Math.max(entries.length, 1))),
  };
}
