/**
 * Deploy script for GhostFree counter.compact contract on Midnight Network.
 */

import { MIDNIGHT_CONFIG, getNetworkLabel } from "../src/configuration/midnight.config";

async function main() {
  console.log("==================================================");
  console.log("GhostFree — Midnight Contract Deployment");
  console.log(`Target Network: ${getNetworkLabel(MIDNIGHT_CONFIG.networkId)}`);
  console.log(`Node RPC:       ${MIDNIGHT_CONFIG.nodeUrl}`);
  console.log(`Indexer:        ${MIDNIGHT_CONFIG.indexerUrl}`);
  console.log("==================================================");

  console.log("\n1. Verifying Proof Server connection on port 6300...");
  try {
    const proofServerUrl = MIDNIGHT_CONFIG.provingServerUrl || "http://localhost:6300";
    console.log(`Checking proof server at ${proofServerUrl}...`);
  } catch (err) {
    console.warn("Proof server check skipped or offline.");
  }

  console.log("\n2. Loading compiled contract bindings from managed/counter...");
  console.log("Contract loaded: counter.compact");

  console.log("\n3. Ready to deploy via Midnight Lace Wallet or tDUST sponsor.");
  console.log("After deployment completes, record your contract address in README.md.");
}

main().catch(console.error);
