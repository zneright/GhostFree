import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.resolve("docs/screenshots");
const BASE_URL = "http://localhost:5173";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  console.log("🚀 Launching Chrome at:", CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });

  const page = await browser.newPage();

  // Helper for waiting
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- DESKTOP VIEWPORT (1440 x 900, 2x Retina) ---
  console.log("\n📸 CAPTURING DESKTOP SHOWCASE (1440x900 @ 2x)...");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Landing Page Hero & Metrics
  console.log("Capturing 01-landing-hero.png...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await sleep(1500); // Wait for framer-motion animations
  await page.screenshot({ path: path.join(OUTPUT_DIR, "01-landing-hero.png") });

  // 7. Bento Cryptographic Matrix on Landing
  console.log("Capturing 07-bento-cryptographic-matrix.png...");
  await page.evaluate(() => {
    const bento = document.getElementById("bento-architecture-matrix");
    if (bento) {
      bento.scrollIntoView({ behavior: "instant", block: "start" });
    }
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "07-bento-cryptographic-matrix.png") });

  // 12. Calamity Relief Operations Hub (Desktop)
  console.log("Capturing 12-calamity-relief-hub.png...");
  await page.evaluate(() => {
    const hub = document.getElementById("calamity-relief-hub");
    if (hub) {
      hub.scrollIntoView({ behavior: "instant", block: "start" });
    }
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "12-calamity-relief-hub.png") });

  // 2. Citizen Claim Terminal - Step 1
  console.log("Capturing 02-claim-terminal-step1.png...");
  await page.goto(`${BASE_URL}/claim`, { waitUntil: "networkidle0" });
  await sleep(1200);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "02-claim-terminal-step1.png") });

  // Click Sandbox Wallet to move to Step 2
  console.log("Transitioning to Step 2 via Evaluator Sandbox...");
  const sandboxBtn = await page.$("#sandbox-wallet-btn");
  if (sandboxBtn) {
    await sandboxBtn.click();
    await sleep(1000);
  }

  // 3. Citizen Claim Terminal - Step 2 (PhilSys ID & MPIN Keypad)
  console.log("Capturing 03-claim-terminal-step2.png...");
  const autoFillBtn = await page.$("#autofill-demo-btn");
  if (autoFillBtn) {
    await autoFillBtn.click();
    await sleep(500);
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, "03-claim-terminal-step2.png") });

  // Execute ZK Proof to reach Step 4
  console.log("Executing ZK Circuit proving...");
  const proveBtn = await page.$("#generate-zk-proof-btn");
  if (proveBtn) {
    await proveBtn.click();
    // Wait for proving radar and completion (approx 4-5 seconds)
    await sleep(5500);
  }

  // 4. Citizen Claim Terminal - Step 4 (Relief Voucher & Cleared Payout)
  console.log("Capturing 04-claim-payout-receipt.png...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "04-claim-payout-receipt.png") });

  // 5. Admin Login Portal
  console.log("Capturing 05-admin-login-drrm.png...");
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: "networkidle0" });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "05-admin-login-drrm.png") });

  // 6. Treasury Audit Explorer
  console.log("Capturing 06-treasury-explorer.png...");
  await page.goto(`${BASE_URL}/treasury`, { waitUntil: "networkidle0" });
  await sleep(1200);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "06-treasury-explorer.png") });

  // --- MOBILE SMARTPHONE VIEWPORT (393 x 852 iPhone 15, 2x Retina) ---
  console.log("\n📱 CAPTURING MOBILE SMARTPHONE SHOWCASE (393x852 @ 2x)...");
  await page.setViewport({
    width: 393,
    height: 852,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // 8. Mobile Claim Portal - Step 1
  console.log("Capturing 08-mobile-claim-hero.png...");
  await page.goto(`${BASE_URL}/claim`, { waitUntil: "networkidle0" });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "08-mobile-claim-hero.png") });

  // Connect Sandbox on Mobile
  const mobileSandboxBtn = await page.$("#sandbox-wallet-btn");
  if (mobileSandboxBtn) {
    await mobileSandboxBtn.click();
    await sleep(1000);
  }

  // 9. Mobile Claim Portal - Step 2 (PhilSys ID + MPIN Keypad)
  console.log("Capturing 09-mobile-claim-keypad.png...");
  const mobileAutoFill = await page.$("#autofill-demo-btn");
  if (mobileAutoFill) {
    await mobileAutoFill.click();
    await sleep(500);
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, "09-mobile-claim-keypad.png") });

  // Execute ZK Circuit on Mobile
  const mobileProveBtn = await page.$("#generate-zk-proof-btn");
  if (mobileProveBtn) {
    await mobileProveBtn.click();
    await sleep(5500);
  }

  // 10. Mobile Claim Portal - Step 4 (Relief Voucher & Payout)
  console.log("Capturing 10-mobile-relief-voucher.png...");
  await page.evaluate(() => {
    window.scrollTo(0, 160);
  });
  await sleep(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "10-mobile-relief-voucher.png") });

  // 11. Mobile Calamity Relief Hub (Landing Page Mobile)
  console.log("Capturing 11-mobile-calamity-hub.png...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await sleep(1000);
  await page.evaluate(() => {
    const hub = document.getElementById("calamity-relief-hub");
    if (hub) {
      hub.scrollIntoView({ behavior: "instant", block: "start" });
    }
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "11-mobile-calamity-hub.png") });

  console.log("\n✅ All 11 screenshots successfully captured and saved to docs/screenshots/!");
  await browser.close();
}

capture().catch((err) => {
  console.error("❌ Capture error:", err);
  process.exit(1);
});
