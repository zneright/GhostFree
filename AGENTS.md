# GhostFree Development Rules & Architectural Principles

## System Identity & Core Philosophy
GhostFree is a decentralized, privacy-first calamity aid distribution dApp built on the **Midnight Network**.
**Tagline:** *"Stop the ghosts. Protect the people."*

Every line of code and user interface decision in this codebase must adhere to the core principles below.

---

## 1. Hybrid Web 2.5 Architecture Partitioning
- **Strict Domain Separation:**
  - **LGU Admin Portal (`/admin/*`):** Operates under Web2 security. Uses Firebase Auth (`kapitbahay-33c2b`) and Firestore (`admin_profiles`, `relief_operations`). All administrative dashboard routes MUST be wrapped inside `ProtectedRoute`.
  - **Citizen Claim Portal (`/claim`):** Operates as a completely public Web3 interface. **NEVER** introduce Firebase Auth, user registration, passwords, email verification, or KYC account creation to the citizen claim flow.
- **Route Guarding:** Unauthenticated requests to `/admin/dashboard` must redirect to `/admin/login`. The citizen route (`/claim`) and home (`/`) must remain universally accessible without barriers.

---

## 2. Zero-Knowledge Privacy & Witness Sovereignty
- **Private Witness Invariance:**
  - A citizen's `residentID`, `nationalId`, `residentSecret`, and `secretPin` are **Private Witnesses**.
  - **ZERO TRANSMISSION RULE:** These values must NEVER be sent over HTTP, written to Firestore, logged via `console.log`, transmitted to third parties, or disclosed on the blockchain ledger.
  - All proof generation must occur strictly on the client's device via local WASM / client-side proving logic.
- **The Anti-Ghost Nullifier Guarantee:**
  - Double claiming is prevented using deterministic cryptographic nullifiers:
    $$\text{nullifier} = \text{Hash}(\text{leafHash} + \text{contractAddress})$$
  - Each citizen's private identity produces exactly one unique nullifier per contract.
  - The smart contract verifies that `!spentNullifiers[nullifier]` before releasing funds, and records `spentNullifiers[nullifier] = true` to permanently prevent "ghost" double claims without ever identifying the claimant.

---

## 3. Compact Smart Contract Standards
- **File Location:** All smart contracts must reside in `/contracts` with the `.compact` extension.
- **Dual-State Model:**
  - **Public Ledger State:** Only non-sensitive aggregate variables belong in the public ledger (`merkleRoot`, `fundBalance`, `perClaimAmount`, `spentNullifiers`, `claimCount`).
  - **Private Witnesses:** All sensitive input arguments must be explicitly declared with the `witness` keyword.
- **Deliberate Disclosure:**
  - Use `disclose()` exclusively when state transitions must be committed to the public ledger (e.g. marking a nullifier as spent, decrementing funds).
- **Circuit Assertions:**
  - Always validate Merkle inclusion proofs (`current == merkleRoot`).
  - Always assert that the caller's computed nullifier matches the witness leaf derivation before disclosing.

---

## 4. Modern Civic-Tech UI/UX Design System
- **Styling Engine:** Tailwind CSS v4 using the `@tailwindcss/vite` plugin.
- **Visual Aesthetic:** "Modern Civic-Tech" — a clean, trust-inspiring portal combining government authority with modern fintech polish (dark navy/slate background `#0A1628`, subtle radial glows, glassmorphism cards, and high contrast).
- **Mobile-First Disaster Zone Optimization:**
  - The `/claim` portal is designed for citizens on mobile smartphones in catastrophe areas.
  - Enforce single-card, focused progressive wizards (Step 1: Connect → Step 2: Verify → Step 3: Prove → Step 4: Payout).
  - No bloated sidebars, unnecessary navigation links, or extraneous modals on mobile views.
- **Anti-Jargon Language:**
  - Hide complex cryptographic terminology from citizens.
  - Instead of "Generating ZK-SNARK witness proof", use *"Verifying your eligibility privately..."*.
  - Instead of "Poseidon Merkle nullifier collision", use *"This identity has already received aid."*.

---

## 5. Wallet & Web3 Connectivity
- **Midnight & Lace Wallet:**
  - Integrate via `window.midnight?.mnLace`.
  - Provide automatic polling detection (100ms interval with timeout) to allow browser extensions time to inject their API.
  - Never couple Lace wallet addresses to Firebase UID accounts. The wallet connection on `/claim` is strictly ephemeral and client-side.
- **Gas Delegation:**
  - The LGU official escrows funds and sponsors `tDUST` execution fees so disaster victims can claim aid with zero gas balance.

---

## 6. Code Quality, Testing & Build Verification
- **TypeScript:** Strict typing without implicit `any`. All domain models must be defined in `src/types/index.ts`.
- **Test Integrity:** Every circuit transition and business rule must be backed by automated Vitest suites in `/tests`. All tests must pass (`npm test`).
- **Production Build:** The project must build cleanly with zero errors (`npm run build`).
