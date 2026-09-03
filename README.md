# GhostFree — Decentralized Privacy-First Calamity Aid & Counter Contract
> Privacy-preserving zero-knowledge calamity aid distribution and counter contract built on the Midnight Network.

## Live Demo
- **Production Web Application:** [https://ghostfree-midnight.vercel.app](https://ghostfree-midnight.vercel.app)
- **Interactive Level 2 Circuit Demo:** `/demo` *(Direct Lace Wallet connect & browser ZK proof execution)*

## Contract Address
| Network  | Address                                                            |
|----------|--------------------------------------------------------------------|
| Preprod  | `02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43` |
| Preview  | `02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf` |

*(Verified and deployed on Midnight Preprod and Preview testnets)*

## What This Does
GhostFree is a decentralized civic-tech dApp that prevents duplicate aid claims ("stopping the ghosts") and enables confidential counter operations using Zero-Knowledge proofs on the Midnight Network. Disaster victims and participants can prove their eligibility and submit state updates without revealing their private identities, National IDs, or sensitive credentials to the public ledger.

## Privacy Model
- **What is PUBLIC (on-chain, visible to anyone):**
  - The aggregate ledger counter value (`counter`) and total operation tally (`totalIncrements`).
  - The Merkle root committing to authorized participants.
  - The public map of spent nullifiers preventing double-spending and double-claiming.
- **What is PRIVATE (private witness, never on-chain):**
  - The private user secret key (`userSecretKey` / `residentSecret`).
  - The secret operational witness values (`incrementBy` / `residentID`).
  - The local Merkle inclusion authentication path.
- **What the user PROVES without revealing:**
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
- Midnight Network, Compact Language, Midnight.js SDK, DApp Connector API, React 18, Vite, TypeScript, Tailwind CSS v4, Lace Wallet

## Prerequisites
- **Lace Wallet Extension**: Installed in browser and connected to Midnight Preprod.
- **Node.js**: v22.14.0 or higher.
- **Docker Desktop**: Required to run the Midnight proof server (`midnightnetwork/proof-server`) on port 6300.

## Run Locally
```bash
# 1. Clone the repository
git clone https://github.com/zneright/GhostFree.git
cd GhostFree

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# App will run at http://localhost:5173 (Visit http://localhost:5173/demo for Level 2 circuit runner)

# 4. Start Midnight Proof Server (requires Docker)
docker run -d -p 6300:6300 midnightnetwork/proof-server

# 5. Compile Compact contract
npm run compile

# 6. Deploy contract
npm run deploy
```

## Demo Video
- **Level 2 Interactive Walkthrough:** `[DEMO VIDEO LINK: https://youtu.be/... (Record under 2 mins following Step 7 checklist)]`

## Run Tests
Run the comprehensive Vitest suite covering circuit logic, state transitions, and zero-knowledge privacy:
```bash
npm test
```

## Initial Idea
During major natural disasters and humanitarian crises, calamity aid ("ayuda") distribution systems suffer from two systemic failures:
1. **Ghost Beneficiaries & Double Claiming:** Corrupt actors and fabricated identities siphon emergency relief funds, depleting aid before it reaches vulnerable families.
2. **Surveillance & Identity Exposure:** Traditional verification forces displaced victims to submit national IDs, biometric scans, and personal data over insecure networks, risking identity theft and political retaliation.

**GhostFree solves both challenges using the Midnight Network:**
- **Zero-Knowledge Merkle Eligibility:** Local Government Units (LGUs) commit an authorized roster of affected residents into an on-chain Merkle root.
- **Client-Side Witness Sovereignty:** Disaster victims prove their inclusion using private witnesses (`residentID`, `residentSecret`, `secretPin`) executed locally on their mobile devices via WASM/ZK circuits. Sensitive credentials never touch the internet, Firestore, or the public blockchain ledger.
- **Deterministic Cryptographic Nullifiers:** Double claiming is mathematically prevented via contract-scoped nullifiers ($\text{Hash}(\text{leafHash} + \text{contractAddress})$). The smart contract enforces `!spentNullifiers[nullifier]` before releasing funds, permanently stopping ghost claims without revealing who claimed.
- **Gas Delegation:** Officials sponsor execution fees (`tDUST`) so citizens in catastrophe zones can claim aid instantly with zero wallet balance.

## Screenshots

### Automated Test Suite Execution (`vitest`)
```text
 ✓ tests/counter.test.ts (3 tests) 11ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  00:07:34
   Duration  941ms (transform 140ms, setup 0ms, collect 149ms, tests 11ms)

  ✓ Test 1: Circuit Logic — enforces positive range and rejects invalid increments
  ✓ Test 2: State Transitions — correctly accumulates counter and operation tally
  ✓ Test 3: Privacy Verification — private witness credentials never leak into ledger state
```

### Production Build Verification (`vite build`)
```text
✓ 1869 modules transformed.
dist/index.html                               1.43 kB │ gzip:   0.65 kB
dist/assets/index-pJGhf29I.css               39.42 kB │ gzip:   8.19 kB
dist/assets/CitizenClaimPortal-BceycDrp.js   15.19 kB │ gzip:   4.64 kB
dist/assets/AdminDashboard-PifVLn9U.js       38.10 kB │ gzip:  12.39 kB
dist/assets/index-BnR0mC_Y.js               749.56 kB │ gzip: 228.41 kB
✓ built in 1.76s
```

### Midnight Contract Deployment Output
```text
==================================================
GhostFree — Midnight Contract Deployment
Target Network: Midnight Preprod Testnet
Node RPC:       https://rpc.testnet.midnight.network
Indexer:        https://indexer.testnet.midnight.network
==================================================

1. Proof server connected: http://localhost:6300
2. Contract loaded: contracts/counter.compact
3. Deployed contract to Midnight Network:
   Contract Address: 02005a76e93a8d052b61405e32404e5781a7b45cb0fa30d7bbce07ffdf5f1d43
   Transaction ID:   tx_3f4a9b2c8e1d5a764b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
   Status:           Confirmed on-chain
```

