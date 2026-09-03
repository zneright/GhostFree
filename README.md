# GhostFree — Decentralized Privacy-First Calamity Aid & Counter Contract
> Privacy-preserving zero-knowledge calamity aid distribution and counter contract built on the Midnight Network.

## Contract Address
| Network  | Address                          |
|----------|----------------------------------|
| Preview  | [PASTE ADDRESS AFTER DEPLOY]     |
| Preprod  | [PASTE ADDRESS AFTER DEPLOY]     |

*(This section is MANDATORY. Placeholders are populated upon deployment to Preview / Preprod.)*

## What This Does
GhostFree prevents duplicate aid claims ("stopping the ghosts") and enables confidential counter operations using Zero-Knowledge proofs on the Midnight Network. Citizens and participants can prove their eligibility and submit updates without revealing their private identities or sensitive credentials to the public ledger.

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

## Tech Stack
- Midnight Network, Compact Language, Node.js v22, Docker, React 18, TypeScript, Tailwind CSS, Vitest

## Prerequisites
- **Node.js**: v22.14.0 or higher
- **Docker Desktop**: Required to run the Midnight proof server (`midnightntwrk/proof-server:8.1.0`) on port 6300
- **Lace Wallet**: Browser extension for Midnight Network interaction

## Setup
```bash
# 1. Clone the repository
git clone https://github.com/[YOUR-USERNAME]/GhostFree.git
cd GhostFree

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Start Midnight Proof Server (requires Docker)
docker run -d -p 6300:6300 midnightntwrk/proof-server:8.1.0
```

## Run Tests
Run the comprehensive Vitest suite covering circuit logic, state transitions, and zero-knowledge privacy:
```bash
npm test
```

## Initial Idea
[LEAVE PLACEHOLDER — I will fill this in manually]

## Screenshots
[LEAVE PLACEHOLDER — I will add compile output and contract address screenshots]
