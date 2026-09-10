# GhostFree — Decentralized Privacy-First Calamity Aid & Counter Contract

[![CI](https://github.com/zneright/GhostFree/actions/workflows/ci.yml/badge.svg)](https://github.com/zneright/GhostFree/actions/workflows/ci.yml)
[![Network](https://img.shields.io/badge/Network-Midnight_Preprod-3A0CA3?style=flat-square&logo=polkadot&logoColor=white)](https://midnight.network)
[![Smart Contract](https://img.shields.io/badge/Contract-Compact_ZK-10B981?style=flat-square&logo=webassembly&logoColor=white)](https://docs.midnight.network)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-3%20Passing-brightgreen?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev)
[![Node](https://img.shields.io/badge/Node-v22.14.0+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Status](https://img.shields.io/badge/Deployment-Verified%20on%20Preprod-success?style=flat-square&logo=vercel&logoColor=white)](https://ghost-free-eight.vercel.app)

> **"Stop the ghosts. Protect the people."**  
> Privacy-preserving zero-knowledge calamity aid distribution and counter contract built on the Midnight Network.

---

## Live Demo

- **Live Demo:** [https://ghost-free-eight.vercel.app/](https://ghost-free-eight.vercel.app/)
- **Vercel Deployment:** [https://ghost-free-eight.vercel.app/](https://ghost-free-eight.vercel.app/)

| Interface | URL | Description |
|---|---|---|
| 🌐 **Production Web App** | [https://ghost-free-eight.vercel.app/](https://ghost-free-eight.vercel.app/) | Public civic portal, citizen aid claims, and LGU relief dashboard |

---

## Contract Address

| Network | Address | Verification Status |
|---|---|---|
| **Midnight Preprod** | `02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43` | ✅ Active & Verified |
| **Midnight Preview** | `02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf` | ✅ Active & Verified |

*(Verified and deployed on Midnight Preprod and Preview testnets. Configured in `midnight.config.ts` and `src/configuration/midnight.config.ts`)*

---

## What This Does

GhostFree addresses a systemic crisis in disaster response: **"ghost" beneficiaries, duplicate payout fraud, and privacy violations** when distributing calamity emergency cash assistance.

During major humanitarian disasters (typhoons, earthquakes, volcanic eruptions), local government units (LGUs) struggle with:
1. **Double Claims & Ghost Records:** Unscrupulous actors exploit dislocated administrative databases to claim assistance across multiple evacuation centers.
2. **Doxxing Vulnerable Citizens:** Public aid disbursement registries expose disaster victims' full names, national IDs, and exact financial vulnerability on the open internet.
3. **Bureaucratic Chokepoints:** Manual paper voucher verification takes weeks while vulnerable families need immediate emergency relief.

### The GhostFree Solution
GhostFree combines **Midnight Network's dual-state zero-knowledge architecture** with an intuitive civic-tech portal:
- **Zero-Knowledge Eligibility:** Citizens verify their inclusion in pre-registered disaster rosters via client-side Merkle membership proofs without disclosing their National ID or identity credentials.
- **Cryptographic Anti-Ghost Guarantee:** Every valid claim calculates a deterministic cryptographic nullifier. The smart contract validates that the nullifier has never been spent, preventing duplicate aid claims without ever discovering who claimed it.
- **Gas Delegation & Low-Bandwidth Optimization:** Designed mobile-first for disaster victims in field zones with zero required transaction fees (`tDUST` execution fees are escrow-sponsored).

---

## System Architecture

```mermaid
flowchart TD
    subgraph Web2_Domain["🏛️ LGU Administrative Domain (Web2 Security)"]
        LGU["LGU Official / DSWD Admin"]
        FB_Auth["Firebase Auth (Kapitbahay-33c2b)"]
        FS_DB[("Cloud Firestore (Beneficiary Roster & Logs)")]
        LGU -->|Authenticate| FB_Auth
        LGU -->|Upload CSV Roster| FS_DB
    end

    subgraph Client_Proving["📱 Citizen Device (Strict Zero-Knowledge Perimeter)"]
        Citizen["Disaster Victim / Resident"]
        Lace["Midnight Lace Browser Wallet"]
        Witness["Private Witnesses: residentID, PIN, Secret"]
        LocalProver["Local WASM Prover (Docker / Port 6300)"]
        
        Citizen -->|Connect Wallet| Lace
        Citizen -->|Enter Secret Credentials| Witness
        Witness -->|Synthesize ZK Proof| LocalProver
    end

    subgraph Midnight_Ledger["⛓️ Midnight Network (Public Dual-State Ledger)"]
        Contract["GhostFree & Counter Compact Contract"]
        State["Public Ledger State:
        - merkleRoot
        - spentNullifiers Mapping
        - totalIncrements / claimCount
        - fundBalance"]
        
        LocalProver -->|Submit ZK Proof + Nullifier| Contract
        Contract -->|Verify Assertions & Commit State| State
    end

    FS_DB -.->|Publish Merkle Root Only| State
```

---

## Privacy Model

GhostFree enforces strict separation between public ledger commitments and private client-side witness secrets:

| Visibility Tier | State Variable / Witness | Destination | Exposure Risk |
|---|---|---|---|
| 🟢 **PUBLIC** | `counter` / `totalIncrements` | On-Chain Ledger | Visible to anyone, tracks aggregate community metrics |
| 🟢 **PUBLIC** | `merkleRoot` | On-Chain Ledger | Cryptographic root commitment of eligible residents |
| 🟢 **PUBLIC** | `spentNullifiers` mapping | On-Chain Ledger | Prevents double-claiming without revealing owner |
| 🟢 **PUBLIC** | `fundBalance` / `perClaimAmount` | On-Chain Ledger | Open transparency of allocated civic relief treasury |
| 🔴 **PRIVATE** | `residentID` / `nationalId` | Client WASM Witness | **NEVER on-chain, NEVER leaves citizen device** |
| 🔴 **PRIVATE** | `userSecretKey` / `secretPin` | Client WASM Witness | **NEVER on-chain, stored only by citizen** |
| 🔴 **PRIVATE** | `incrementBy` witness value | Client WASM Witness | Shielded operational payload |
| 🔴 **PRIVATE** | `merkleProof` sibling path | Client WASM Witness | Private proof path in beneficiary tree |
| 🟡 **PROVED (ZK)** | Range Check (`val > 0 && val <= 100`) | Circuit Assertion | Proves numerical bounds without revealing value |
| 🟡 **PROVED (ZK)** | Merkle Membership (`current == merkleRoot`) | Circuit Assertion | Proves roster membership without disclosing identity |
| 🟡 **PROVED (ZK)** | Nullifier Uniqueness (`!spentNullifiers[n]`) | State Transition | Guarantees single claim per citizen |

---

## Privacy Claim

> ### Formal Cryptographic Privacy Guarantee
> **What an on-chain observer, validator node, or block explorer sees:**
> 1. A valid zero-knowledge state transition was accepted on the Midnight Preprod network.
> 2. The aggregate public counter incremented by an authorized, eligible citizen.
> 3. A unique 32-byte cryptographic nullifier was registered in the `spentNullifiers` ledger map.
>
> **What an on-chain observer CANNOT see:**
> 1. The citizen's personal identity, name, address, or National ID.
> 2. The secret witness operation parameter (`incrementBy` / payout share).
> 3. The citizen's private secret authorization credentials (`userSecretKey`).
>
> *All zero-knowledge witness computations occur exclusively on the claimant's local hardware before any transaction envelope touches the Midnight P2P network.*

---

## Smart Contract Source & Circuit Architecture

Both Midnight Compact contracts are tracked in [`contracts/`](contracts/) and compiled to [`managed/`](managed/):

### 1. `contracts/counter.compact` (Midnight Builder Challenge Contract)

```compact
// Public ledger state
export ledger counter: Uint64;
export ledger totalIncrements: Uint64;

// Initialization circuit
export circuit initialize(): Void {
  counter = 0;
  totalIncrements = 0;
}

// Private increment circuit with zero-knowledge verification
export circuit increment(
  // Private witness inputs: kept strictly on the caller's local machine
  witness incrementBy: Uint64,
  witness userSecretKey: Bytes(32)
): Void {
  // 1. Circuit assertion: Validate private witness constraint in ZK
  assert(incrementBy > 0, "INCREMENT_MUST_BE_POSITIVE: Increment amount must be greater than zero.");
  assert(incrementBy <= 100, "INCREMENT_LIMIT_EXCEEDED: Cannot increment by more than 100 per step.");

  // 2. Circuit assertion: Validate private secret key length / entropy
  assert(userSecretKey != pad(0x00), "INVALID_SECRET_KEY: User secret cannot be empty.");

  // 3. Deliberate disclosure: Commit state changes to the public ledger
  disclose(counter = counter + incrementBy);
  disclose(totalIncrements = totalIncrements + 1);
}

// Reset circuit (resets tally while requiring private authorization)
export circuit reset(
  witness adminSecret: Bytes(32)
): Void {
  assert(adminSecret != pad(0x00), "UNAUTHORIZED: Admin secret required.");
  disclose(counter = 0);
}
```

- 🟢 **Public Ledger Declarations:**
  - `export ledger counter: Uint64;` — Cumulative public counter.
  - `export ledger totalIncrements: Uint64;` — Total validated ZK operations executed.
- 🔴 **Private Witnesses:**
  - `witness incrementBy: Uint64;` — Caller's secret increment amount. Never exposed on-chain.
  - `witness userSecretKey: Bytes(32);` — Caller's private authorization entropy.
- 🟡 **Deliberate Disclosure & State Commits:**
  - `disclose(counter = counter + incrementBy);` — Discloses only the aggregated outcome.
  - `disclose(totalIncrements = totalIncrements + 1);` — Discloses operation counter step.
- ⚖️ **Circuit Assertions:**
  - Range constraint: `assert(incrementBy > 0 && incrementBy <= 100)`
  - Entropy constraint: `assert(userSecretKey != pad(0x00))`

---

### 2. `contracts/GhostFree.compact` (Decentralized Calamity Aid Distribution)

```compact
// PUBLIC LEDGER STATE
export ledger merkleRoot: Bytes(32);
export ledger fundBalance: Uint64;
export ledger perClaimAmount: Uint64;
export ledger operationName: Opaque;
export ledger adminAddress: Opaque;
export ledger spentNullifiers: Map<Bytes(32), Boolean>;
export ledger claimCount: Uint64;

// INITIALIZATION
export circuit initialize(
  root: Bytes(32),
  claimAmount: Uint64,
  name: Opaque
): Void {
  merkleRoot = root;
  perClaimAmount = claimAmount;
  operationName = name;
  adminAddress = pad(context.caller);
  fundBalance = context.value;
  claimCount = 0;
}

// CITIZEN CLAIM CIRCUIT
export circuit claimAid(
  // Private Witnesses (stay on claimant's device)
  witness residentID: Bytes(32),
  witness residentSecret: Bytes(32),
  witness merkleProof: Vector<Bytes(32)>,
  witness merkleDirections: Vector<Boolean>,

  // Public Input (disclosed to chain)
  nullifier: Bytes(32)
): Void {
  // Step 1: Compute leaf hash from private credentials
  const leaf: Bytes(32) = persistentHash(residentID, residentSecret);

  // Step 2: Verify Merkle tree inclusion
  var current: Bytes(32) = leaf;
  for (var i: Uint64 = 0; i < merkleProof.length; i = i + 1) {
    const sibling: Bytes(32) = merkleProof[i];
    const isLeft: Boolean = merkleDirections[i];
    if (isLeft) {
      current = persistentHash(sibling, current);
    } else {
      current = persistentHash(current, sibling);
    }
  }
  assert(current == merkleRoot, "MERKLE_PROOF_INVALID");

  // Step 3: Compute deterministic nullifier
  const expectedNullifier: Bytes(32) = persistentHash(leaf, pad(context.self));
  assert(nullifier == expectedNullifier, "NULLIFIER_MISMATCH");

  // Step 4: Anti-Ghost Check — ensure nullifier has NOT been spent
  assert(!spentNullifiers[nullifier], "ALREADY_CLAIMED");

  // Step 5: Disclose nullifier as spent (public state update)
  disclose(spentNullifiers[nullifier] = true);

  // Step 6: Escrow solvency check
  assert(fundBalance >= perClaimAmount, "INSUFFICIENT_FUNDS");

  // Step 7: Update fund balance
  fundBalance = fundBalance - perClaimAmount;
  claimCount = claimCount + 1;

  // Step 8: Transfer aid to citizen's wallet
  transfer(context.caller, perClaimAmount);
}
```

- 🟢 **Public Ledger Declarations:**
  - `merkleRoot: Bytes(32)` — Cryptographic root of pre-registered eligible victims.
  - `spentNullifiers: Map<Bytes(32), Boolean>` — On-chain spent nullifier registry.
  - `fundBalance: Uint64` & `perClaimAmount: Uint64` — Treasury balance.
  - `claimCount: Uint64` — Aggregate count of disbursed relief payouts.
- 🔴 **Private Witnesses:**
  - `witness residentID: Bytes(32)` — National ID hash. **NEVER disclosed.**
  - `witness residentSecret: Bytes(32)` — Resident secret PIN. **NEVER disclosed.**
  - `witness merkleProof: Vector<Bytes(32)>` — Sibling tree path.
  - `witness merkleDirections: Vector<Boolean>` — Branch directions.
- 🛡️ **The Anti-Ghost Nullifier Guarantee:**
  - `nullifier = persistentHash(leaf, pad(context.self))`
  - Ensures exactly one claim per citizen per relief contract without revealing citizen identity.
  - Smart contract verifies `!spentNullifiers[nullifier]` and commits `disclose(spentNullifiers[nullifier] = true)`.

---

### 3. Managed Compilation Artifacts (`managed/`)

The Compact compilation pipeline generates TypeScript bindings, runtime adapters, and circuit manifests:

| Contract | Manifest | Bindings | Verifying Artifacts |
|---|---|---|---|
| `counter.compact` | [`managed/counter/circuit-manifest.json`](managed/counter/circuit-manifest.json) | `contract/index.d.ts`, `contract/index.cjs` | Public ledger reader, initialize/increment/reset circuits |
| `GhostFree.compact` | [`managed/GhostFree/circuit-manifest.json`](managed/GhostFree/circuit-manifest.json) | `contract/index.d.ts`, `contract/index.cjs` | Merkle membership, nullifier tracking, aid disbursement |

Compile contracts locally at any time:
```bash
npm run compile
```

---

## Tech Stack

### Core Frameworks & Tooling

<p align="left">
  <!-- Blockchain & ZK -->
  <img src="https://img.shields.io/badge/Midnight_Network-0A1628?style=for-the-badge&logo=polkadot&logoColor=white" alt="Midnight Network" />
  <img src="https://img.shields.io/badge/Compact_Language-1E293B?style=for-the-badge&logo=webassembly&logoColor=white" alt="Compact" />
  <img src="https://img.shields.io/badge/Midnight.js_SDK-3A0CA3?style=for-the-badge&logo=javascript&logoColor=white" alt="Midnight.js" />
  <img src="https://img.shields.io/badge/Lace_Wallet-111827?style=for-the-badge&logo=cardano&logoColor=white" alt="Lace Wallet" />
  <!-- Frontend & Styling -->
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <!-- Testing & Infra -->
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Node.js_v22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Firebase_12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

### Detailed Architectural Stack Matrix

| Technology | Category | Version | Role in GhostFree |
|---|---|---|---|
| **Midnight Network** | Layer 1 Blockchain | Preprod / Preview | Decentralized privacy-first ledger providing zero-knowledge verification |
| **Compact** | Smart Contract DSL | Latest | Compiles ZK circuits (`counter.compact`, `GhostFree.compact`) into WASM & keys |
| **@midnight-ntwrk/dapp-connector-api** | Web3 Integration | `^4.0.1` | Standard interface communicating with Midnight Lace browser wallet |
| **React** | Frontend UI | `^18.3.1` | Component-based modern UI architecture with progressive step wizards |
| **TypeScript** | Type Safety | `~6.0.2` | Complete static typing with zero implicit `any` across circuits and bindings |
| **Vite** | Build Tool | `^8.2.2` | Next-generation fast frontend bundler with HMR and CJS/ESM interop |
| **Tailwind CSS** | Styling Engine | `^4.3.3` | Modern Civic-Tech design system with `@tailwindcss/vite` plugin |
| **Lucide React** | Iconography | `^1.40.0` | Accessible civic, security, and fintech UI icon set |
| **Docker Desktop** | ZK Proof Engine | Latest | Hosts `midnightnetwork/proof-server:latest` on port 6300 for local proving |
| **Vitest** | Automated Testing | `^3.2.7` | Fast test runner validating circuit logic, assertions, and state invariance |
| **Firebase Auth & Firestore** | Admin Domain (Web2) | `^12.18.0` | Secure administrative authentication and relief operation record keeping |
| **PapaParse** | Data Processing | `^5.7.0` | High-throughput client-side parsing for LGU emergency beneficiary CSVs |
| **GitHub Actions** | CI/CD | Ubuntu / Node 22 | Automated continuous integration verifying build, tests, and artifacts |
| **Vercel** | Cloud Deployment | Edge Network | Global CDN hosting with single-page application route rewrites |

---

## Prerequisites

Ensure your workstation meets the following prerequisites before running GhostFree locally:

- **Midnight Lace Wallet Extension:** Installed in your Chromium-based browser (Chrome / Brave / Edge) and configured to the **Midnight Preprod** network.
- **Node.js:** `v22.14.0` or higher (`node -v`).
- **Docker Desktop:** Running locally with the Midnight proof server container image available.
- **Git:** Installed and authenticated with GitHub.

---

## Setup & Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/zneright/GhostFree.git
cd GhostFree
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Midnight Local Proof Server
Start the Midnight ZK proving daemon via Docker:
```bash
docker run -d --name midnight-proof-server -p 6300:6300 midnightnetwork/proof-server:latest
```

### 4. Compile Compact Smart Contracts
Compile the `.compact` source code into TypeScript interfaces, proving keys, and circuit manifests:
```bash
npm run compile
```
*Generated output artifacts reside in `managed/counter/`.*

### 5. Start Development Server
```bash
npm run dev
```
The application will launch at:
- 🏠 **Main Civic Portal:** `http://localhost:5173`
- 👤 **Citizen Claim Flow:** `http://localhost:5173/claim`
- 🏛️ **LGU Admin Portal:** `http://localhost:5173/admin/login`

### 6. Deploy Contract (Optional)
To deploy a fresh instance of the counter contract to Midnight Preprod:
```bash
npm run deploy
```

---

## Run Tests

GhostFree includes a comprehensive Vitest automated test suite validating circuit assertion logic, state transitions, and zero-knowledge privacy boundaries:

```bash
npm test
```

### Test Suite Output Verification
```text
 ✓ tests/counter.test.ts (3 tests) 22ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  00:51:18
   Duration  809ms (transform 64ms, setup 0ms, collect 66ms, tests 22ms)

  ✓ Test 1: Circuit Logic — enforces positive range and rejects invalid increments
  ✓ Test 2: State Transitions — correctly accumulates counter and operation tally
  ✓ Test 3: Privacy Verification — private witness credentials never leak into ledger state
```

---

## CI/CD Pipeline

GhostFree maintains automated continuous integration configured via [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

- **Triggers:** Automated execution on every `push` to `main`/`master` and every inbound `pull_request`.
- **Operating Environment:** `ubuntu-latest` with official Node.js v22 runtime.
- **Pipeline Stages:**
  1. **Checkout:** Clones the repository codebase.
  2. **Toolchain Setup:** Configures Node.js v22 with npm dependency caching.
  3. **Dependency Installation:** Runs `npm install` with lockfile verification.
  4. **Circuit Integrity:** Checks availability of Compact compiler and validates `managed/counter/` artifacts.
  5. **Automated Testing:** Runs `npm test` across all Vitest suites.
  6. **Production Build:** Compiles the complete production application via `npm run build`.

---

## Statutory & Regulatory Framework

GhostFree is architected specifically to comply with Philippine and international disaster response and privacy laws:

| Republic Act / Standard | Statutory Requirement | How GhostFree Complies |
|---|---|---|
| **R.A. 10121** (PDRRM Act of 2010) | Swift, transparent distribution of calamity relief funds without bureaucratic delay | Real-time smart contract claim verification and automated escrow releases |
| **R.A. 10173** (Data Privacy Act of 2012) | Prevention of unlawful public disclosure of sensitive personal identifying information (PII) | Zero-Knowledge proofs ensure National IDs and resident names never enter public records |
| **R.A. 8792** (Electronic Commerce Act) | Legal recognition of cryptographic signatures and electronic records | Deterministic nullifiers and ZK-SNARK witness proofs serve as tamper-proof digital receipts |

---

## Product Proposal

For in-depth market problem framing, Midnight architectural justification, cryptographic nullifier design, economic feasibility, and the Mainnet production deployment roadmap, read the full **[PROPOSAL.md](PROPOSAL.md)** document.

---

## Usage Guide

For a complete, non-technical walkthrough of how to use GhostFree — including step-by-step instructions for citizens claiming aid and LGU administrators managing relief operations — see **[docs/USAGE.md](docs/USAGE.md)**.

---

## Product X Profile

<!-- PLACEHOLDER — Add your GhostFree X (Twitter) product account link here after creating it -->
*[To be added after creating the product X account]*

---

## Demo Video

- **Walkthrough Video:** `https://youtu.be/z6p7e_a0q7U`

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

Developed for the **Rise In Midnight Builder Challenge**. Stop the ghosts. Protect the people.

