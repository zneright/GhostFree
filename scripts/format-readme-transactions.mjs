import fs from "fs";
import path from "path";

const csvPath = path.resolve("docs/COA_AUDIT_TRANSACTIONS_100.csv");
const readmePath = path.resolve("README.md");

const csvRaw = fs.readFileSync(csvPath, "utf8").trim().split("\n");
const dataLines = csvRaw.slice(1);

function parseCsvLine(text) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

let topRows = "";
let allRows = "";

dataLines.forEach((line, index) => {
  if (!line.trim()) return;
  const cols = parseCsvLine(line);
  const [num, hash, circuit, status, amount, nullifier, block, op, net, time, url] = cols;
  const shortHash = `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  const statusBadge = status === "confirmed" ? "✅ Confirmed" : "🛡️ Blocked (Ghost)";
  const netBadge = net.includes("Preview") ? "🟣 Preview" : "🔵 Preprod";
  const row = `| ${num} | [${shortHash}](${url}) | \`${circuit}\` | **${op}** | \`${nullifier}\` | ₱${Number(amount).toLocaleString()} | \`#${block}\` | ${netBadge} | ${statusBadge} |\n`;
  
  if (index < 12) {
    topRows += row;
  }
  allRows += row;
});

const sectionMarkdown = `### 📜 Verified On-Chain Transactions & Audit Trail

Every calamity relief disbursement, dual-key quorum authorization, and anti-ghost nullifier verification is recorded on-chain. Below are the verified transactions on **Midnight Preprod** and **Midnight Preview**. Click any **Transaction Hash** to inspect the block extrinsic and zero-knowledge state commitment directly on Midnight Explorer.

#### ⚡ Recent Calamity Operations & Live Disbursements (Top 12)

| # | Transaction Hash | Method | Operation | Nullifier (Spent Commitment) | Amount | Block | Network | Status |
|---|---|---|---|---|---|---|---|---|
${topRows}
<details>
<summary><b>📊 Click to Expand All 100 Verified Relief Transactions (Full Ledger)</b></summary>

| # | Transaction Hash | Method | Operation | Nullifier (Spent Commitment) | Amount | Block | Network | Status |
|---|---|---|---|---|---|---|---|---|
${allRows}
</details>

*Full itemized audit export with timestamps available in [docs/COA_AUDIT_TRANSACTIONS_100.csv](docs/COA_AUDIT_TRANSACTIONS_100.csv) and [USERS.md](USERS.md).*
`;

console.log("Generated Markdown characters:", sectionMarkdown.length);
fs.writeFileSync("scratch_tx_section.md", sectionMarkdown, "utf8");
