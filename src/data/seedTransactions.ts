// ============================================
// GhostFree — High-Density Preprod Transaction Ledger (v2.5)
// 88+ Deterministic Zero-Knowledge Calamity Relief Transactions
// Compliant with Midnight Network Preprod & R.A. 10121 COA Audit
// Zero-PII: Private witnesses never leave client device memory
// ============================================

import type { TransactionRecord } from "../types";

/**
 * Deterministically derives an 88-record verified transaction ledger
 * spanning active calamity relief operations across the Philippines:
 * - Typhoon Marce Emergency QRF (Cagayan Valley / District 1)
 * - Siargao Island Flash Flood Calamity Relief (Surigao del Norte)
 * - Davao Oriental Seismic Disaster Response (Region XI)
 * - Batanes Island Super Typhoon Recovery Fund (Region II)
 */
export function generateSeedTransactions(): TransactionRecord[] {
  const now = Date.now();
  const minute = 60 * 1000;

  // Base curated high-fidelity transactions
  const curatedBase: TransactionRecord[] = [
    {
      id: "tx_gf_001",
      txHash: "02008f12cc3e819b02a77b10fa982a5c48b291c94d13e7102e3a76b91129ac88",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x8f12cc3e...ac88",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 1.2 * minute).toISOString(),
      confirmedAt: new Date(now - 0.9 * minute).toISOString(),
      blockHeight: 812948,
    },
    {
      id: "tx_gf_002",
      txHash: "02003c77d291ba40f9012e87a201b1f945d820c81249b561c2018ea34912fa01",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x3c77d291...fa01",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 2.5 * minute).toISOString(),
      confirmedAt: new Date(now - 2.1 * minute).toISOString(),
      blockHeight: 812946,
    },
    {
      id: "tx_gf_003",
      txHash: "0200b39f71ac2e690f9119aac39812df598124b8109312c982301fa9471b02cc",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xb39f71ac...02cc",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 4.1 * minute).toISOString(),
      confirmedAt: new Date(now - 3.8 * minute).toISOString(),
      blockHeight: 812944,
    },
    {
      id: "tx_gf_004",
      txHash: "0200881f9a2e6b01cf8812fa9102938ba102948c901923fa8102938c9201948b",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x5a76e93a...3bba",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 6.0 * minute).toISOString(),
      confirmedAt: new Date(now - 5.7 * minute).toISOString(),
      blockHeight: 812942,
    },
    {
      id: "tx_gf_005",
      txHash: "02009d43ab881c300f88bb2c4901823a9481029c8192384a019238fb019237cc",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x9d43ab88...37cc",
      amount: 2500,
      retryCount: 0,
      startedAt: new Date(now - 7.5 * minute).toISOString(),
      confirmedAt: new Date(now - 7.1 * minute).toISOString(),
      blockHeight: 812940,
    },
    {
      id: "tx_gf_006",
      txHash: "02007e21fa90124ba910283c7490182ca9102938a192039481029384b019283f",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x7e21fa90...283f",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 9.0 * minute).toISOString(),
      confirmedAt: new Date(now - 8.6 * minute).toISOString(),
      blockHeight: 812938,
    },
    {
      id: "tx_gf_007",
      circuitName: "claimAid",
      status: "failed",
      nullifierSnippet: "0x5a76e93a...3bba",
      amount: 5000,
      errorMessage: "ALREADY_CLAIMED: Nullifier 0x5a76e93a is already spent in contract escrow.",
      retryCount: 1,
      startedAt: new Date(now - 11.2 * minute).toISOString(),
    },
    {
      id: "tx_gf_008",
      txHash: "02001c90fa124ba901827364501928374901823a9481029384019283fa01928b",
      circuitName: "authorizeTrancheQuorum",
      status: "confirmed",
      amount: 500000,
      retryCount: 0,
      startedAt: new Date(now - 13.0 * minute).toISOString(),
      confirmedAt: new Date(now - 12.6 * minute).toISOString(),
      blockHeight: 812935,
    },
    {
      id: "tx_gf_009",
      txHash: "0200448192301fa9471b02ccb39f71ac2e690f9119aac39812df598124b81093",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x44819230...1093",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 15.5 * minute).toISOString(),
      confirmedAt: new Date(now - 15.1 * minute).toISOString(),
      blockHeight: 812932,
    },
    {
      id: "tx_gf_010",
      txHash: "0200923fa8102938c9201948ba81203bba5a76e93a86c0b938f97b102948c901",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x923fa810...c901",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 17.8 * minute).toISOString(),
      confirmedAt: new Date(now - 17.4 * minute).toISOString(),
      blockHeight: 812930,
    },
    {
      id: "tx_gf_011",
      txHash: "0200a1827364501928374901823a9481029384019283fa01928b1c90fa124ba9",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xa1827364...4ba9",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 20.0 * minute).toISOString(),
      confirmedAt: new Date(now - 19.6 * minute).toISOString(),
      blockHeight: 812928,
    },
    {
      id: "tx_gf_012",
      txHash: "0200e3a76b91129ac888f12cc3e819b02a77b10fa982a5c48b291c94d13e7102",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xe3a76b91...7102",
      amount: 10000,
      retryCount: 0,
      startedAt: new Date(now - 22.4 * minute).toISOString(),
      confirmedAt: new Date(now - 22.0 * minute).toISOString(),
      blockHeight: 812925,
    },
    {
      id: "tx_gf_013",
      txHash: "02007f31aa9e8d120a61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43",
      circuitName: "deployReliefFund",
      status: "confirmed",
      amount: 2500000,
      retryCount: 0,
      startedAt: new Date(now - 25.0 * minute).toISOString(),
      confirmedAt: new Date(now - 24.3 * minute).toISOString(),
      blockHeight: 812920,
    },
    {
      id: "tx_gf_014",
      txHash: "020066b1820491029384b019283f7e21fa90124ba910283c7490182ca9102938",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x66b18204...2938",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 27.8 * minute).toISOString(),
      confirmedAt: new Date(now - 27.4 * minute).toISOString(),
      blockHeight: 812918,
    },
    {
      id: "tx_gf_015",
      txHash: "020088bb2c4901823a9481029c8192384a019238fb019237cc9d43ab881c300f",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x88bb2c49...300f",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 30.1 * minute).toISOString(),
      confirmedAt: new Date(now - 29.7 * minute).toISOString(),
      blockHeight: 812915,
    },
    {
      id: "tx_gf_016",
      txHash: "020012df598124b8109312c982301fa9471b02ccb39f71ac2e690f9119aac398",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x12df5981...c398",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 33.0 * minute).toISOString(),
      confirmedAt: new Date(now - 32.6 * minute).toISOString(),
      blockHeight: 812912,
    },
    {
      id: "tx_gf_017",
      txHash: "020081203bba5a76e93a86c0b938f97b102948c901923fa8102938c9201948ba",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x81203bba...48ba",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 36.2 * minute).toISOString(),
      confirmedAt: new Date(now - 35.8 * minute).toISOString(),
      blockHeight: 812910,
    },
    {
      id: "tx_gf_018",
      txHash: "020019283fa01928b1c90fa124ba901827364501928374901823a94810293840",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0x19283fa0...3840",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 39.5 * minute).toISOString(),
      confirmedAt: new Date(now - 39.1 * minute).toISOString(),
      blockHeight: 812907,
    },
    {
      id: "tx_gf_019",
      txHash: "0200d13e7102e3a76b91129ac888f12cc3e819b02a77b10fa982a5c48b291c94",
      circuitName: "claimAid",
      status: "confirmed",
      nullifierSnippet: "0xd13e7102...1c94",
      amount: 5000,
      retryCount: 0,
      startedAt: new Date(now - 42.0 * minute).toISOString(),
      confirmedAt: new Date(now - 41.6 * minute).toISOString(),
      blockHeight: 812905,
    },
    {
      id: "tx_gf_020",
      circuitName: "claimAid",
      status: "failed",
      nullifierSnippet: "0x3c77d291...fa01",
      amount: 5000,
      errorMessage: "ALREADY_CLAIMED: Nullifier collision detected. Identity has already received aid.",
      retryCount: 1,
      startedAt: new Date(now - 45.0 * minute).toISOString(),
    },
  ];

  // Procedurally generate 68 additional realistic, distinct transactions (total 88)
  const additional: TransactionRecord[] = [];
  const circuits = ["claimAid", "claimAid", "claimAid", "authorizeTrancheQuorum", "claimAid"];
  const amounts = [2500, 5000, 5000, 10000, 5000];

  for (let i = 21; i <= 88; i++) {
    const minutesAgo = 45 + i * 4.2;
    const isFailed = i % 14 === 0;
    const circuit = isFailed ? "claimAid" : circuits[i % circuits.length];
    const amount = circuit === "authorizeTrancheQuorum" ? 150000 + (i % 5) * 100000 : amounts[i % amounts.length];
    const blockHeight = 812900 - Math.floor(i * 1.8);

    // Deterministic pseudo-random hex generators for reliable reproducibility
    const hexA = (((i * 9301 + 49297) % 233280) / 233280).toString(16).slice(2, 10);
    const hexB = (((i * 49297 + 9301) % 233280) / 233280).toString(16).slice(2, 10);
    const hexC = (((i * 23328 + 12345) % 233280) / 233280).toString(16).slice(2, 10);
    const hexD = (((i * 67891 + 54321) % 233280) / 233280).toString(16).slice(2, 10);
    const fullHash = `0200${hexA}${hexB}${hexC}${hexD}${hexA}${hexB}`.padEnd(66, "0").slice(0, 66);
    const nullifierSnippet = `0x${hexA.slice(0, 6)}...${hexB.slice(-4)}`;

    if (isFailed) {
      additional.push({
        id: `tx_gf_${String(i).padStart(3, "0")}`,
        circuitName: "claimAid",
        status: "failed",
        nullifierSnippet,
        amount: 5000,
        errorMessage: `ALREADY_CLAIMED: Nullifier ${nullifierSnippet.slice(0, 8)} is already marked spent on Midnight ledger.`,
        retryCount: 1,
        startedAt: new Date(now - minutesAgo * minute).toISOString(),
      });
    } else {
      additional.push({
        id: `tx_gf_${String(i).padStart(3, "0")}`,
        txHash: fullHash,
        circuitName: circuit,
        status: "confirmed",
        nullifierSnippet,
        amount,
        retryCount: 0,
        startedAt: new Date(now - minutesAgo * minute).toISOString(),
        confirmedAt: new Date(now - (minutesAgo - 0.4) * minute).toISOString(),
        blockHeight,
      });
    }
  }

  return [...curatedBase, ...additional];
}
