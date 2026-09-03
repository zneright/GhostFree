# GhostFree — Decentralized Privacy-First Calamity Aid & Counter Contract
[![CI](https://github.com/zneright/GhostFree/actions/workflows/ci.yml/badge.svg)](https://github.com/zneright/GhostFree/actions/workflows/ci.yml)
> Privacy-preserving zero-knowledge calamity aid distribution and counter contract built on the Midnight Network.

## Live Demo
- **Production Web Application:** [https://ghostfree-midnight.vercel.app](https://ghostfree-midnight.vercel.app)
- **Interactive Level 2 & 3 Circuit Demo:** [https://ghostfree-midnight.vercel.app/demo](https://ghostfree-midnight.vercel.app/demo)

## Contract Address
| Network  | Address                                                            |
|----------|--------------------------------------------------------------------|
| Preprod  | `02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43` |
| Preview  | `02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf` |

*(Verified and deployed on Midnight Preprod and Preview testnets)*

## What This Does
GhostFree is a decentralized civic-tech dApp that prevents duplicate aid claims ("stopping the ghosts") and enables confidential counter operations using Zero-Knowledge proofs on the Midnight Network. Disaster victims and participants can prove their eligibility and submit state updates without revealing their private identities, National IDs, or sensitive credentials to the public ledger.

## Privacy Model
- **PUBLIC (on-chain, visible to anyone):**
  - The aggregate ledger counter value (`counter`) and total operation tally (`totalIncrements`).
  - The Merkle root committing to authorized participants (`merkleRoot`).
  - The public map of spent nullifiers preventing double-spending and double-claiming (`spentNullifiers`).
- **PRIVATE (private witness, never on-chain):**
  - The private user secret key (`userSecretKey` / `residentSecret`).
  - The secret operational witness values (`incrementBy` / `residentID`).
  - The local Merkle inclusion authentication path (`merkleProof`).
- **PROVED without revealing:**
  - Proves that the input satisfies operational constraints (> 0 and <= 100) without exposing the secret input.
  - Proves knowledge of an authorized private key/witness without revealing identity.
  - Generates a deterministic nullifier verifying eligibility while preserving full anonymity.

## Privacy Claim
> **Specific Privacy Guarantee:**  
> An on-chain observer, node operator, or indexer sees that a valid zero-knowledge state transition was committed, the public counter was incremented by an authorized participant, and a unique cryptographic nullifier was registered.  
> **An on-chain observer CANNOT see:**  
> 1. The caller's personal identity or National ID.  
> 2. The secret operational witness amount (`incrementBy`).  
> 3. The private voucher authorization PIN (`userSecretKey`).  
> All sensitive witness computations occur strictly on the user's client device via local WebAssembly proving logic before any transaction envelope is submitted to the network.

## Tech Stack
- **Network:** Midnight Network (Preprod / Preview Testnets)
- **Smart Contract:** Compact Language (`contracts/counter.compact`, `contracts/GhostFree.compact`)
- **SDKs:** Midnight.js SDK, DApp Connector API (`@midnight-ntwrk/dapp-connector-api`)
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS v4, Lucide Icons
- **Wallet:** Midnight Lace Wallet Extension

## Prerequisites
- **Lace Wallet Extension**: Installed in browser and connected to Midnight Preprod.
- **Node.js**: v22.14.0 or higher.
- **Docker Desktop**: Required to run the Midnight proof server (`midnightnetwork/proof-server`) on port 6300.

## Setup & Run Locally
```bash
# 1. Clone the repository
git clone https://github.com/zneright/GhostFree.git
cd GhostFree

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# App will run at http://localhost:5173 (Visit http://localhost:5173/demo for Level 2 & 3 circuit runner)

# 4. Start Midnight Proof Server (requires Docker)
docker run -d -p 6300:6300 midnightnetwork/proof-server

# 5. Compile Compact contract
npm run compile

# 6. Deploy contract
npm run deploy
```

## Run Tests
Run the comprehensive Vitest suite covering circuit logic, state transitions, and zero-knowledge privacy:
```bash
npm test
```

### Test Suite Output Proof
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

## CI/CD
The project features an automated continuous integration pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml):
- **Triggers:** Every push to `main`/`master` and every pull request.
- **Environment:** Ubuntu Linux container with Node.js v22.
- **Workflow Pipeline:**
  1. Checks out repository source code.
  2. Sets up Node.js v22 with npm cache.
  3. Installs dependencies (`npm install`).
  4. Verifies Compact compiler availability and checks generated `managed/` circuit artifacts.
  5. Executes automated Vitest test suite (`npm test`).
  6. Compiles production frontend bundle with zero TypeScript warnings (`npm run build`).

## Product Proposal
For complete problem framing, Midnight architectural justification, data privacy model, and Mainnet feasibility roadmap, see [PROPOSAL.md](PROPOSAL.md).

## Demo Video
- **Level 2 & 3 Walkthrough:** `[DEMO VIDEO LINK: https://youtu.be/... (Record under 1 min following Level 3 Step 7 checklist)]`
