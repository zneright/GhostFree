# How to Use GhostFree

GhostFree enables disaster victims to privately claim emergency calamity aid on the Midnight Network — without revealing personal identity, National ID, or any private credentials.

---

## What You Need

Before using GhostFree, make sure you have the following:

1. **A Chromium-Based Browser** — Google Chrome, Brave, or Microsoft Edge.
2. **Midnight Lace Wallet Extension** — Install from [midnight.network](https://midnight.network) and configure it to the **Midnight Preprod** network.
3. **An Internet Connection** — The portal is optimized for mobile devices in disaster areas with limited bandwidth.
4. **Your Eligibility Credentials** — Your Resident ID and Secret PIN, which were provided to you by your local government unit (LGU) during the pre-registration process.

> **Note:** You do NOT need any cryptocurrency, tokens, or gas fees to claim aid. The LGU sponsors all transaction costs on your behalf.

---

## Step-by-Step Guide

### For Citizens (Claiming Aid)

#### Step 1: Open the Claim Portal
Visit the GhostFree Citizen Claim Portal:
- **Live:** [https://ghost-free-eight.vercel.app/claim](https://ghost-free-eight.vercel.app/claim)
- **Local:** `http://localhost:5173/claim`

#### Step 2: Connect Your Wallet
- Click the **"Connect Wallet"** button.
- Your Midnight Lace browser extension will pop up asking for approval.
- Approve the connection. Your wallet address will appear on screen.
- This connection is **ephemeral** — no account or registration is created.

#### Step 3: Enter Your Credentials
- Enter your **Resident ID** and **Secret PIN** in the secure input fields.
- These credentials stay **entirely on your device**. They are never sent over the internet, never stored in any database, and never appear on the blockchain.

#### Step 4: Verify Your Eligibility
- Click **"Verify Eligibility"**.
- The portal privately checks whether your identity is included in the approved disaster relief roster using a cryptographic proof.
- You will see **"Verifying your eligibility privately..."** while the proof is being generated on your device.

#### Step 5: Receive Your Aid & Download Proof Receipt
- If eligible and you haven't already claimed, the smart contract will automatically transfer your aid allocation to your wallet.
- You will see a confirmation with a transaction reference.
- Click **"View & Download Proof Receipt"** to open your **Confidential Calamity Relief Receipt**. You can copy the proof text or download the JSON receipt to present to evacuation marshals at local relief checkpoints.
- Rate your claim experience using the **1-click satisfaction stars** to provide immediate feedback to the response team.
- If you've already claimed, you will see: **"This identity has already received aid."**

#### Quick Tip: Interactive Onboarding Tour
- If you are new to zero-knowledge privacy, click the **"Tour"** button in the header at any time to view the 3-step interactive onboarding walkthrough.

---

### For LGU Administrators (Managing Relief Operations)

#### Step 1: Log In
- Navigate to [/admin/login](https://ghost-free-eight.vercel.app/admin/login).
- Sign in with your authorized LGU administrator credentials (Firebase Auth).

#### Step 2: Create a Relief Operation
- Upload a CSV file containing the eligible beneficiary list.
- The system builds a cryptographic Merkle tree from the roster.
- Set the per-claim amount and total fund allocation.

#### Step 3: Deploy and Monitor
- Deploy the relief operation smart contract to Midnight Preprod.
- Monitor claim activity in real time from the admin dashboard.
- All claims are anonymous — you can see how many people claimed, but not who.

#### Step 4: Triage Citizen Feedback
- Click the **"Feedback & Insights"** button in the dashboard action bar.
- View real-time Citizen CSAT metrics, filter feedback by topic (Usability, Wallet, Speed, Privacy), and update triage statuses (`New` → `Under Review` → `Planned` → `Resolved`).

---

### Submitting General Feedback
- On any page, click the floating **"Give Feedback"** button in the bottom right corner.
- Rate your experience (1–5 stars), choose your role, select a feedback topic, and write your suggestions. Zero personal identity data is ever tracked or required.

---

## What Gets Proved (and What Stays Private)

| What Happens | What Gets Proved | What Stays Private |
|---|---|---|
| **Eligibility Check** | ✅ "This person is on the approved list" | 🔒 Their name, National ID, and address |
| **Anti-Duplicate Check** | ✅ "This person has not claimed before" | 🔒 Which specific person is claiming |
| **Fund Transfer** | ✅ "Funds were sent to a valid claimant" | 🔒 The claimant's real-world identity |
| **Increment Counter** | ✅ "A valid operation was performed" | 🔒 The secret key and the exact increment value |

**In simple terms:** The blockchain sees *that* someone eligible claimed aid. It never sees *who* that person is.

---

## Troubleshooting

### "Wallet not detected"
- Make sure the Midnight Lace wallet extension is installed in your browser.
- Refresh the page and wait a few seconds — the extension may need time to load.
- Ensure you are using Chrome, Brave, or Edge (Firefox is not supported).

### "This identity has already received aid"
- Each eligible person can only claim once per relief operation. This is by design to prevent fraud.
- If you believe this is an error, contact your local government disaster relief office.

### "Your identity is not in the eligibility list"
- Your Resident ID and Secret PIN must match exactly what was registered by your LGU.
- Double-check for typos in your credentials.
- Contact your barangay or municipal hall to verify your registration.

### "Insufficient funds"
- The relief operation's escrow has been fully distributed.
- Contact your LGU administrator for information on additional fund allocations.

### Page loads slowly or times out
- GhostFree is optimized for low-bandwidth connections, but a minimum internet connection is required.
- Try refreshing the page or switching to a different network (e.g., mobile data).

### Proof generation takes a long time
- Zero-knowledge proof generation runs locally on your device. On older or slower phones, this may take 10-20 seconds.
- Do not close the browser tab while the proof is generating.

---

## Need More Help?

- **GitHub:** [https://github.com/zneright/GhostFree](https://github.com/zneright/GhostFree)
- **README:** See the project [README.md](../README.md) for technical documentation.
- **LGU Support:** Contact your local government unit's disaster risk reduction office.
