import fs from "fs";

async function run() {
  console.log("Fetching real on-chain transactions from Midnight Preprod...");
  const preprodBase = "https://preprod-service-v2-02.midnightexplorer.com/api/v1";
  const previewBase = "https://preview-service-v2-02.midnightexplorer.com/api/v1";

  const preprodTxs = [];
  let cursor = null;

  while (preprodTxs.length < 85) {
    const url = `${preprodBase}/transactions${cursor ? "?cursor=" + cursor : ""}`;
    const res = await fetch(url);
    const json = await res.json();
    if (!json.data?.items?.length) break;
    preprodTxs.push(...json.data.items);
    cursor = json.data.nextCursor;
    console.log(`Fetched ${preprodTxs.length} Preprod txs...`);
    if (!cursor) break;
  }

  console.log("Fetching real on-chain transactions from Midnight Preview...");
  const previewTxs = [];
  try {
    const res = await fetch(`${previewBase}/transactions`);
    const json = await res.json();
    if (json.data?.items?.length) {
      previewTxs.push(...json.data.items.slice(0, 15));
      console.log(`Fetched ${previewTxs.length} Preview txs.`);
    }
  } catch (e) {
    console.log("Preview fetch error:", e.message);
  }

  const allTxs = [
    ...preprodTxs.slice(0, 85).map(tx => ({ ...tx, network: "Midnight Preprod", explorerUrl: `https://preprod.midnightexplorer.com/transactions/${tx.hash}` })),
    ...previewTxs.map(tx => ({ ...tx, network: "Midnight Preview", explorerUrl: `https://preview.midnightexplorer.com/transactions/${tx.hash}` }))
  ];

  console.log(`Total live on-chain transactions collected: ${allTxs.length}`);
  fs.writeFileSync("scratch_real_txs.json", JSON.stringify(allTxs, null, 2), "utf8");
}

run();
