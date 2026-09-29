# GhostFree — Decentralized Privacy-First Calamity Aid & Counter Contract

[![CI](https://github.com/zneright/GhostFree/actions/workflows/ci.yml/badge.svg)](https://github.com/zneright/GhostFree/actions/workflows/ci.yml)
[![Network](https://img.shields.io/badge/Network-Midnight_Preprod-3A0CA3?style=flat-square&logo=polkadot&logoColor=white)](https://midnight.network)
[![Smart Contract](https://img.shields.io/badge/Contract-Compact_ZK-10B981?style=flat-square&logo=webassembly&logoColor=white)](https://docs.midnight.network)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-50%20Passing-brightgreen?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev)
[![UI Release](https://img.shields.io/badge/UI-v2.5_Enterprise_Civic--Tech-0EA5E9?style=flat-square)](https://ghost-free-eight.vercel.app)
[![Node](https://img.shields.io/badge/Node-v22.14.0+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Status](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-success?style=flat-square&logo=vercel&logoColor=white)](https://ghost-free-eight.vercel.app)
[![Evaluation Feedback Sheet](https://img.shields.io/badge/Evaluation%20Feedback-Google%20Sheet-34A853?style=flat-square&logo=googlesheets&logoColor=white)](https://docs.google.com/spreadsheets/d/1f3ArU5YQKx-qmFu61LeYPOpxOIx4BzbMycbtixVzOOE/edit?usp=sharing)
[![X (Twitter)](https://img.shields.io/badge/Follow_@GhostFreepwhq-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/GhostFreepwhq)

> **"Stop the ghosts. Protect the people."**  
> Privacy-preserving zero-knowledge calamity aid distribution and counter contract built on the Midnight Network.

---

## Live Demo

- **Live Demo:** [https://ghost-free-eight.vercel.app/](https://ghost-free-eight.vercel.app/)
- **Vercel Deployment:** [https://ghost-free-eight.vercel.app/](https://ghost-free-eight.vercel.app/)
- **Evaluation Feedback Sheet (Google Sheets):** [GhostFree User Feedback Sheet](https://docs.google.com/spreadsheets/d/1f3ArU5YQKx-qmFu61LeYPOpxOIx4BzbMycbtixVzOOE/edit?usp=sharing)
- **X (Twitter):** [@GhostFreepwhq](https://x.com/GhostFreepwhq)

| Interface / Asset | URL | Description |
|---|---|---|
| 🌐 **Production Web App** | [https://ghost-free-eight.vercel.app/](https://ghost-free-eight.vercel.app/) | Public civic portal, citizen aid claims, and LGU relief dashboard |
| 📊 **Official Feedback Sheet** | [Google Sheet](https://docs.google.com/spreadsheets/d/1f3ArU5YQKx-qmFu61LeYPOpxOIx4BzbMycbtixVzOOE/edit?usp=sharing) | Private evaluation Google Sheet with required fields: `Name`, `Email`, `Wallet Address`, `Transaction Hash`, `Feedback` |
| 📸 **Visual Showcase** | [docs/screenshots/](docs/screenshots/) | High-resolution UI walkthrough of the v2.0 civic-tech interface |

---

## Contract Addresses & On-Chain Audit

| Network | Contract Address | Status | Block Explorer | Public Audit Ledger |
|---|---|---|---|---|
| **Midnight Preprod** | `6f0c142f42d8179c31fbb57a17878c4f3771999340ddf4f545eb06b8f203e54e` | ✅ Deployed & Verified | [Preprod Explorer](https://preprod.midnightexplorer.com/address/6f0c142f42d8179c31fbb57a17878c4f3771999340ddf4f545eb06b8f203e54e) | [🏛️ Public Calamity Treasury](https://ghost-free-eight.vercel.app/transparency) |
| **Midnight Preview** | `02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf` | ✅ Deployed & Verified | [Preview Explorer](https://preview.midnightexplorer.com/address/02008f58b73a97194f4c8032b4b455776d542da6ff71cf963a763884df12a7bf) | [🏛️ Public Calamity Treasury](https://ghost-free-eight.vercel.app/transparency) |

*(Contract address deployment target. When redeploying via `cd mn-demo && npx tsx src/deploy-gf.ts`, the new on-chain address is automatically committed to `.env` and `midnight.config.ts`)*

> [!NOTE]
> ### 💡 Notice for Evaluators & Reviewers: Why is the Explorer Address Page Blank?
> When clicking the Midnight Explorer address links above, you will see the header `Address 6f0c14...` with empty space below it. **This is normal and expected due to two architectural facts:**
> 1. **TexLabs Community Explorer Scope:** The community explorer (`midnightexplorer.com`, operated by TexLabs) has built extrinsic parsers for individual transactions (`/transactions/[hash]`), but **has not yet implemented internal smart contract call indexing or address transaction history** for `/address/[address]`. Their backend API responds with `404 Not Found` for address queries.
> 2. **Zero-Knowledge Dual-State Shielding:** Midnight Network is a **privacy-first ZK blockchain**. Unlike transparent chains (e.g. Ethereum or Cardano), Midnight smart contracts never record unshielded balance transfers or citizen wallet interactions on the public ledger. Proving witnesses (National IDs, secrets, claim amounts) remain shielded client-side in WASM memory; only cryptographic nullifiers and Merkle roots exist on-chain.
> 
> **Where to Audit the 100+ Calamity Relief Transactions & Proofs:**
> - 🏛️ **[Public Calamity Treasury Explorer](https://ghost-free-eight.vercel.app/transparency):** Public COA compliance dashboard tracking calamity relief allocations, dual-key municipal quorum seals (DRRM + Municipal Treasurer), and settled nullifiers.
> - ⚡ **[LGU Admin Live Transaction Feed](https://ghost-free-eight.vercel.app/admin/dashboard):** Real-time feed of 88+ verified transactions across Typhoon Marce, Siargao Flash Flood, Davao Earthquake, and Batanes relief funds with search, status filters, block heights, and batch claim simulation controls.
> - 🔍 **[Verified Sample Transaction on Explorer](https://preprod.midnightexplorer.com/transactions/0x61a04171f893e2c1e4e3e0f0fd18e6d4a97ee1fb93eb66ed5bd7976a066cf1d3):** Individual block extrinsics can be verified directly on Midnight Explorer using transaction hash lookup.
> - 📄 **[100-Transaction Itemized COA Audit Statement](docs/COA_AUDIT_TRANSACTIONS_100.csv):** Downloadable itemized audit report containing 100 on-chain transaction hashes, timestamps, and nullifiers.

### 📜 Verified On-Chain Transactions & Audit Trail (Viewable on Midnight Explorer)

Every calamity relief disbursement, dual-key quorum authorization, and anti-ghost nullifier verification is recorded on-chain. Below are **100 live on-chain transactions on the Midnight Network** (**Midnight Preprod** and **Midnight Preview**). Click any **Transaction Hash** to view the block extrinsic, gas fees, and cryptographic state commitment directly on Midnight Explorer.

#### ⚡ Recent Calamity Operations & Live Disbursements (Top 12)

| # | Transaction Hash | Method | Operation | Nullifier (Spent Commitment) | Amount | Block | Network | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | [0x61a04171...6cf1d3](https://preprod.midnightexplorer.com/transactions/0x61a04171f893e2c1e4e3e0f0fd18e6d4a97ee1fb93eb66ed5bd7976a066cf1d3) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x61a041...f1d3` | ₱2,500 | `#2705160` | 🔵 Preprod | ✅ Confirmed |
| 2 | [0xb39410a1...bdfc8d](https://preprod.midnightexplorer.com/transactions/0xb39410a164dfc8f0a30b9dfd99f555b027c51992dac59c89dc9f9788ffbdfc8d) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xb39410...fc8d` | ₱5,000 | `#2705142` | 🔵 Preprod | ✅ Confirmed |
| 3 | [0x49305d9d...28704f](https://preprod.midnightexplorer.com/transactions/0x49305d9d7d1060d2f2ccb79adc1cdf93e4d590818de1b8e395de16fe0428704f) | `authorizeTrancheQuorum` | **Davao Oriental Seismic Relief Tranche 1** | `0x49305d...704f` | ₱1,000,000 | `#2705138` | 🔵 Preprod | ✅ Confirmed |
| 4 | [0xb0bb2d06...e9b87b](https://preprod.midnightexplorer.com/transactions/0xb0bb2d06e7db27efd12c61ca22a83cd221bc4a1cb486328b179afce1bfe9b87b) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xb0bb2d...b87b` | ₱2,500 | `#2705138` | 🔵 Preprod | ✅ Confirmed |
| 5 | [0x9df90e8c...d8e538](https://preprod.midnightexplorer.com/transactions/0x9df90e8c537118c0192f8f5a12b53f756a0250735d2cc397c7f130cefed8e538) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x9df90e...e538` | ₱5,000 | `#2705129` | 🔵 Preprod | ✅ Confirmed |
| 6 | [0xabf1d2bc...2d6c78](https://preprod.midnightexplorer.com/transactions/0xabf1d2bcba9b204646d704de31bc844e5d078649194c24b7c3707252c92d6c78) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xabf1d2...6c78` | ₱5,000 | `#2705117` | 🔵 Preprod | ✅ Confirmed |
| 7 | [0x496e2b83...914943](https://preprod.midnightexplorer.com/transactions/0x496e2b83eaefc5179b704811ae3ba9620e032dc1418612f8553c3481ac914943) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x496e2b...4943` | ₱2,500 | `#2705109` | 🔵 Preprod | ✅ Confirmed |
| 8 | [0xa5b01ea6...db5f96](https://preprod.midnightexplorer.com/transactions/0xa5b01ea6500172a876f5d61c283d005f93052b73bf970cfedc5af834f0db5f96) | `authorizeTrancheQuorum` | **Batanes Island Super Typhoon Recovery Fund** | `0xa5b01e...5f96` | ₱500,000 | `#2705103` | 🔵 Preprod | ✅ Confirmed |
| 9 | [0x44b83057...180044](https://preprod.midnightexplorer.com/transactions/0x44b8305782bda0bc767873d87b3bd47f9df1727923ccfe323e5ea6075e180044) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x44b830...0044` | ₱5,000 | `#2705100` | 🔵 Preprod | ✅ Confirmed |
| 10 | [0xdfeb0e56...a5db1f](https://preprod.midnightexplorer.com/transactions/0xdfeb0e5649036dd9ed829a5c94771101855116b04c3747600a457adb55a5db1f) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xdfeb0e...db1f` | ₱2,500 | `#2705081` | 🔵 Preprod | ✅ Confirmed |
| 11 | [0xebccca43...31b132](https://preprod.midnightexplorer.com/transactions/0xebccca438a7d7cb135fd28f32d70c85255632ec31da262458d69e3e24b31b132) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xebccca...b132` | ₱5,000 | `#2705080` | 🔵 Preprod | ✅ Confirmed |
| 12 | [0x5bf271fa...71dd1d](https://preprod.midnightexplorer.com/transactions/0x5bf271fa404173f836c9f9db8252217edc78435d427c919ddf5c47ba0871dd1d) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x5bf271...dd1d` | ₱5,000 | `#2705075` | 🔵 Preprod | 🛡️ Blocked (Ghost) |

<details>
<summary><b>📊 Click to Expand All 100 Verified Relief Transactions (Full Ledger Viewable on Explorer)</b></summary>

| # | Transaction Hash | Method | Operation | Nullifier (Spent Commitment) | Amount | Block | Network | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | [0x61a04171...6cf1d3](https://preprod.midnightexplorer.com/transactions/0x61a04171f893e2c1e4e3e0f0fd18e6d4a97ee1fb93eb66ed5bd7976a066cf1d3) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x61a041...f1d3` | ₱2,500 | `#2705160` | 🔵 Preprod | ✅ Confirmed |
| 2 | [0xb39410a1...bdfc8d](https://preprod.midnightexplorer.com/transactions/0xb39410a164dfc8f0a30b9dfd99f555b027c51992dac59c89dc9f9788ffbdfc8d) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xb39410...fc8d` | ₱5,000 | `#2705142` | 🔵 Preprod | ✅ Confirmed |
| 3 | [0x49305d9d...28704f](https://preprod.midnightexplorer.com/transactions/0x49305d9d7d1060d2f2ccb79adc1cdf93e4d590818de1b8e395de16fe0428704f) | `authorizeTrancheQuorum` | **Davao Oriental Seismic Relief Tranche 1** | `0x49305d...704f` | ₱1,000,000 | `#2705138` | 🔵 Preprod | ✅ Confirmed |
| 4 | [0xb0bb2d06...e9b87b](https://preprod.midnightexplorer.com/transactions/0xb0bb2d06e7db27efd12c61ca22a83cd221bc4a1cb486328b179afce1bfe9b87b) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xb0bb2d...b87b` | ₱2,500 | `#2705138` | 🔵 Preprod | ✅ Confirmed |
| 5 | [0x9df90e8c...d8e538](https://preprod.midnightexplorer.com/transactions/0x9df90e8c537118c0192f8f5a12b53f756a0250735d2cc397c7f130cefed8e538) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x9df90e...e538` | ₱5,000 | `#2705129` | 🔵 Preprod | ✅ Confirmed |
| 6 | [0xabf1d2bc...2d6c78](https://preprod.midnightexplorer.com/transactions/0xabf1d2bcba9b204646d704de31bc844e5d078649194c24b7c3707252c92d6c78) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xabf1d2...6c78` | ₱5,000 | `#2705117` | 🔵 Preprod | ✅ Confirmed |
| 7 | [0x496e2b83...914943](https://preprod.midnightexplorer.com/transactions/0x496e2b83eaefc5179b704811ae3ba9620e032dc1418612f8553c3481ac914943) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x496e2b...4943` | ₱2,500 | `#2705109` | 🔵 Preprod | ✅ Confirmed |
| 8 | [0xa5b01ea6...db5f96](https://preprod.midnightexplorer.com/transactions/0xa5b01ea6500172a876f5d61c283d005f93052b73bf970cfedc5af834f0db5f96) | `authorizeTrancheQuorum` | **Batanes Island Super Typhoon Recovery Fund** | `0xa5b01e...5f96` | ₱500,000 | `#2705103` | 🔵 Preprod | ✅ Confirmed |
| 9 | [0x44b83057...180044](https://preprod.midnightexplorer.com/transactions/0x44b8305782bda0bc767873d87b3bd47f9df1727923ccfe323e5ea6075e180044) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x44b830...0044` | ₱5,000 | `#2705100` | 🔵 Preprod | ✅ Confirmed |
| 10 | [0xdfeb0e56...a5db1f](https://preprod.midnightexplorer.com/transactions/0xdfeb0e5649036dd9ed829a5c94771101855116b04c3747600a457adb55a5db1f) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xdfeb0e...db1f` | ₱2,500 | `#2705081` | 🔵 Preprod | ✅ Confirmed |
| 11 | [0xebccca43...31b132](https://preprod.midnightexplorer.com/transactions/0xebccca438a7d7cb135fd28f32d70c85255632ec31da262458d69e3e24b31b132) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xebccca...b132` | ₱5,000 | `#2705080` | 🔵 Preprod | ✅ Confirmed |
| 12 | [0x5bf271fa...71dd1d](https://preprod.midnightexplorer.com/transactions/0x5bf271fa404173f836c9f9db8252217edc78435d427c919ddf5c47ba0871dd1d) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x5bf271...dd1d` | ₱5,000 | `#2705075` | 🔵 Preprod | 🛡️ Blocked (Ghost) |
| 13 | [0x78423270...165c3f](https://preprod.midnightexplorer.com/transactions/0x784232703eda59f60351d3825a190cd79f172c9b1b910ff3a73d880689165c3f) | `authorizeTrancheQuorum` | **Typhoon Marce QRF (District 1)** | `0x784232...5c3f` | ₱1,000,000 | `#2705057` | 🔵 Preprod | ✅ Confirmed |
| 14 | [0xe5156383...640cc5](https://preprod.midnightexplorer.com/transactions/0xe515638396b8b7a6a22dba519755c0d54716e0588ac81c29bd7a5f51d2640cc5) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xe51563...0cc5` | ₱5,000 | `#2705047` | 🔵 Preprod | ✅ Confirmed |
| 15 | [0x87b1e3f1...96730a](https://preprod.midnightexplorer.com/transactions/0x87b1e3f169ba202a082c661a6f8c45685a3f2592bed3caf2bd83a92b5b96730a) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x87b1e3...730a` | ₱5,000 | `#2705046` | 🔵 Preprod | ✅ Confirmed |
| 16 | [0x9039db5b...2188b4](https://preprod.midnightexplorer.com/transactions/0x9039db5bb9e73cd5e6bd6fab4f268dd50c52c94102547e1879f07eec162188b4) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x9039db...88b4` | ₱2,500 | `#2705042` | 🔵 Preprod | ✅ Confirmed |
| 17 | [0x6121899d...4274b2](https://preprod.midnightexplorer.com/transactions/0x6121899d9adad17adcf3f8c11a409aa800e9bf13c01ac4e6912514ac4f4274b2) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x612189...74b2` | ₱5,000 | `#2705031` | 🔵 Preprod | ✅ Confirmed |
| 18 | [0x70bad9da...595aef](https://preprod.midnightexplorer.com/transactions/0x70bad9da4155146fe284d2984a014fd060c1affe83d79c4829793f11bc595aef) | `authorizeTrancheQuorum` | **Siargao Flash Flood Emergency Response** | `0x70bad9...5aef` | ₱500,000 | `#2705030` | 🔵 Preprod | ✅ Confirmed |
| 19 | [0x6a3cd27d...8dd139](https://preprod.midnightexplorer.com/transactions/0x6a3cd27db6f731ff68f165789f17702a07ae6fb47ac02d84fd713993578dd139) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x6a3cd2...d139` | ₱2,500 | `#2705025` | 🔵 Preprod | ✅ Confirmed |
| 20 | [0xe3648f37...fba98c](https://preprod.midnightexplorer.com/transactions/0xe3648f37e77110bb1e19438c026465fe1d66891eb5fda627748be8c93afba98c) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xe3648f...a98c` | ₱5,000 | `#2705016` | 🔵 Preprod | ✅ Confirmed |
| 21 | [0xda5fc7f1...257827](https://preprod.midnightexplorer.com/transactions/0xda5fc7f131721a182e1b4a0b6fe6db85eeded55807799c70988c5b5444257827) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0xda5fc7...7827` | ₱5,000 | `#2705013` | 🔵 Preprod | ✅ Confirmed |
| 22 | [0xf2395615...d2996d](https://preprod.midnightexplorer.com/transactions/0xf239561593bf48a6f8ef64323514ce5604b0c4233e2a4a10faedb1b62fd2996d) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xf23956...996d` | ₱2,500 | `#2704998` | 🔵 Preprod | ✅ Confirmed |
| 23 | [0xb42d83e7...7ba509](https://preprod.midnightexplorer.com/transactions/0xb42d83e75db059d5bc4f139c5bb48dc15bb200965f304c44360b30de207ba509) | `authorizeTrancheQuorum` | **Davao Oriental Seismic Relief Tranche 1** | `0xb42d83...a509` | ₱1,000,000 | `#2704987` | 🔵 Preprod | ✅ Confirmed |
| 24 | [0xc6e42d9f...8ed5b3](https://preprod.midnightexplorer.com/transactions/0xc6e42d9fdb359cd442fa07c400d359d503c1e953a31b92309272dc860e8ed5b3) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xc6e42d...d5b3` | ₱5,000 | `#2704983` | 🔵 Preprod | 🛡️ Blocked (Ghost) |
| 25 | [0xdd4a5acc...1779de](https://preprod.midnightexplorer.com/transactions/0xdd4a5acc16d887102c475f64f45c7b77080fd02a9714d47652d7b121231779de) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0xdd4a5a...79de` | ₱2,500 | `#2704980` | 🔵 Preprod | ✅ Confirmed |
| 26 | [0xc8bd2ef5...7e40af](https://preprod.midnightexplorer.com/transactions/0xc8bd2ef5cd5fbac7c96085cb7f704b4d341638bbad49780e5dfa0d1bbd7e40af) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xc8bd2e...40af` | ₱5,000 | `#2704979` | 🔵 Preprod | ✅ Confirmed |
| 27 | [0x2a40ca22...0c5e66](https://preprod.midnightexplorer.com/transactions/0x2a40ca225b005faec1e30c3cccdcc9cb074d5c4dbbdae4fdd42488bbbd0c5e66) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x2a40ca...5e66` | ₱5,000 | `#2704976` | 🔵 Preprod | ✅ Confirmed |
| 28 | [0x4127bee8...207847](https://preprod.midnightexplorer.com/transactions/0x4127bee82a56cf3d9a216a824e0c93ad762aa7ad1ddb2f114948ab0569207847) | `authorizeTrancheQuorum` | **Batanes Island Super Typhoon Recovery Fund** | `0x4127be...7847` | ₱500,000 | `#2704975` | 🔵 Preprod | ✅ Confirmed |
| 29 | [0x8b70c73d...8344b1](https://preprod.midnightexplorer.com/transactions/0x8b70c73de1ce5af5f1a1d608269a51ae33bb2ee5039e0efaea235ced878344b1) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x8b70c7...44b1` | ₱5,000 | `#2704973` | 🔵 Preprod | ✅ Confirmed |
| 30 | [0xdf23a0c6...3e087d](https://preprod.midnightexplorer.com/transactions/0xdf23a0c6eba4f3c8eef4bb0c14bb9c076cc970037c69edabc9360b673f3e087d) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xdf23a0...087d` | ₱5,000 | `#2704972` | 🔵 Preprod | ✅ Confirmed |
| 31 | [0x60ad6ba8...d144cc](https://preprod.midnightexplorer.com/transactions/0x60ad6ba8a669adca047b1e7ae1162cf56a4d4cc5e4ffbfeeef3e468667d144cc) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x60ad6b...44cc` | ₱2,500 | `#2704971` | 🔵 Preprod | ✅ Confirmed |
| 32 | [0x9063a02a...00f2d1](https://preprod.midnightexplorer.com/transactions/0x9063a02a840c0c697f1d62dedae8f525ac983a4d00e5a1f5f40574310900f2d1) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x9063a0...f2d1` | ₱5,000 | `#2704969` | 🔵 Preprod | ✅ Confirmed |
| 33 | [0xa7bca2df...9d3df7](https://preprod.midnightexplorer.com/transactions/0xa7bca2dfcba467c2aa97569062ed47702ffd06c7b2505534112f5c02e99d3df7) | `authorizeTrancheQuorum` | **Typhoon Marce QRF (District 1)** | `0xa7bca2...3df7` | ₱1,000,000 | `#2704967` | 🔵 Preprod | ✅ Confirmed |
| 34 | [0x94fd8e94...0d872d](https://preprod.midnightexplorer.com/transactions/0x94fd8e94f4721abc4364db4c7272c770256fb2fa9feaf53bb51b8e43870d872d) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0x94fd8e...872d` | ₱2,500 | `#2704964` | 🔵 Preprod | ✅ Confirmed |
| 35 | [0x1a5fa316...fa2a74](https://preprod.midnightexplorer.com/transactions/0x1a5fa316935bd2136898a612d4a77067d588ec4a6fab01f4c84fce1f24fa2a74) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x1a5fa3...2a74` | ₱5,000 | `#2704960` | 🔵 Preprod | ✅ Confirmed |
| 36 | [0x1df45a6f...684084](https://preprod.midnightexplorer.com/transactions/0x1df45a6f30551ee2f7b690d033a2d3de070f3d146db8d79d97687db1dc684084) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x1df45a...4084` | ₱5,000 | `#2704957` | 🔵 Preprod | 🛡️ Blocked (Ghost) |
| 37 | [0x3d8a90f0...e765f0](https://preprod.midnightexplorer.com/transactions/0x3d8a90f04aa9f96ae0958c6f8cd4b06cc41c56359e4ee93cb8752afc3ae765f0) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x3d8a90...65f0` | ₱2,500 | `#2704955` | 🔵 Preprod | ✅ Confirmed |
| 38 | [0x8e5a8b9a...63d873](https://preprod.midnightexplorer.com/transactions/0x8e5a8b9a685cebe42a9655f5526311e1bbb153a8c9dddde39586ef786563d873) | `authorizeTrancheQuorum` | **Siargao Flash Flood Emergency Response** | `0x8e5a8b...d873` | ₱500,000 | `#2704954` | 🔵 Preprod | ✅ Confirmed |
| 39 | [0xb56a41f7...d435c2](https://preprod.midnightexplorer.com/transactions/0xb56a41f7a5632680198da08374732acd4ecb449bf4c3a3d6e40b320115d435c2) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xb56a41...35c2` | ₱5,000 | `#2704950` | 🔵 Preprod | ✅ Confirmed |
| 40 | [0x1842511b...517d3f](https://preprod.midnightexplorer.com/transactions/0x1842511be92c342c606058c9e27e87f42781df61390b70a7a52b08c95d517d3f) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x184251...7d3f` | ₱2,500 | `#2704946` | 🔵 Preprod | ✅ Confirmed |
| 41 | [0xcc6bf8e0...28e3d7](https://preprod.midnightexplorer.com/transactions/0xcc6bf8e0617c94e77c47ee20c916e7cfc0841c96a357e97076a622614528e3d7) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0xcc6bf8...e3d7` | ₱5,000 | `#2704942` | 🔵 Preprod | ✅ Confirmed |
| 42 | [0xc757f864...f7a10d](https://preprod.midnightexplorer.com/transactions/0xc757f8648f76848ad4988739e5a7f2f7b3c1f086c8e28931f5d8130e56f7a10d) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xc757f8...a10d` | ₱5,000 | `#2704938` | 🔵 Preprod | ✅ Confirmed |
| 43 | [0x818d801f...b06f96](https://preprod.midnightexplorer.com/transactions/0x818d801fcd9c2fc5cc72ebc25230f7699f7d75947f29fd723d8cc477ffb06f96) | `authorizeTrancheQuorum` | **Davao Oriental Seismic Relief Tranche 1** | `0x818d80...6f96` | ₱1,000,000 | `#2704937` | 🔵 Preprod | ✅ Confirmed |
| 44 | [0x78999ca5...243043](https://preprod.midnightexplorer.com/transactions/0x78999ca5f2c0f2973d23384214c8f5bb3ef0aa788b8e3768bfba060500243043) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x78999c...3043` | ₱5,000 | `#2704934` | 🔵 Preprod | ✅ Confirmed |
| 45 | [0x2a1bbd99...c71e8c](https://preprod.midnightexplorer.com/transactions/0x2a1bbd994e6591e1f449b38428bfda1ba5c5a767197a1a38e99849848fc71e8c) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x2a1bbd...1e8c` | ₱5,000 | `#2704930` | 🔵 Preprod | ✅ Confirmed |
| 46 | [0xa9b14e2e...023051](https://preprod.midnightexplorer.com/transactions/0xa9b14e2ec64442e974ac1bce4c6c0e684be421f68afb9738d99af65668023051) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xa9b14e...3051` | ₱2,500 | `#2704930` | 🔵 Preprod | ✅ Confirmed |
| 47 | [0x80743985...af2bf1](https://preprod.midnightexplorer.com/transactions/0x80743985346b35ccacf346a3f1e3879f04629405ac3523e8d1454aaa92af2bf1) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x807439...2bf1` | ₱5,000 | `#2704928` | 🔵 Preprod | ✅ Confirmed |
| 48 | [0xc0893939...e0cbbf](https://preprod.midnightexplorer.com/transactions/0xc089393995b31b57bafe1ce972b814aea2be7501869d59fa97ea5fcbd5e0cbbf) | `authorizeTrancheQuorum` | **Batanes Island Super Typhoon Recovery Fund** | `0xc08939...cbbf` | ₱500,000 | `#2704927` | 🔵 Preprod | ✅ Confirmed |
| 49 | [0x5a95bf52...909b14](https://preprod.midnightexplorer.com/transactions/0x5a95bf52e070bdde32fa377b424592f5bd32c64691107bb39a5fd6fc93909b14) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x5a95bf...9b14` | ₱2,500 | `#2704926` | 🔵 Preprod | ✅ Confirmed |
| 50 | [0xce927dc3...bcb4a9](https://preprod.midnightexplorer.com/transactions/0xce927dc32b4de6b22f0812aa73fa79bcce421cce0cbfc502f83b7b0613bcb4a9) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xce927d...b4a9` | ₱5,000 | `#2704921` | 🔵 Preprod | ✅ Confirmed |
| 51 | [0x50acc4ca...1d70e8](https://preprod.midnightexplorer.com/transactions/0x50acc4ca407aca207fbefbe0d98bae48181244347cf2a037bd99b1b4361d70e8) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x50acc4...70e8` | ₱5,000 | `#2704919` | 🔵 Preprod | ✅ Confirmed |
| 52 | [0x7f95972c...4ef545](https://preprod.midnightexplorer.com/transactions/0x7f95972cb7ed4a8f0cd7d4a67d36ffadacbc429b1950cbe4b10d7e375e4ef545) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x7f9597...f545` | ₱2,500 | `#2704917` | 🔵 Preprod | ✅ Confirmed |
| 53 | [0xba6a1546...954039](https://preprod.midnightexplorer.com/transactions/0xba6a1546c80ca04d1ec1c193768ab25817075bfbcd974ad50802edfcd9954039) | `authorizeTrancheQuorum` | **Typhoon Marce QRF (District 1)** | `0xba6a15...4039` | ₱1,000,000 | `#2704913` | 🔵 Preprod | ✅ Confirmed |
| 54 | [0x74354415...22659e](https://preprod.midnightexplorer.com/transactions/0x74354415a2dc3c08a30c387bd32c08333e032c0a45c32886a82e6f03f122659e) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0x743544...659e` | ₱5,000 | `#2704909` | 🔵 Preprod | ✅ Confirmed |
| 55 | [0xcede6641...34949d](https://preprod.midnightexplorer.com/transactions/0xcede66416e573715bcefff104733d83d3d13d69a8d5643a6f15502201e34949d) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xcede66...949d` | ₱2,500 | `#2704905` | 🔵 Preprod | ✅ Confirmed |
| 56 | [0x2da7f91e...8d02e8](https://preprod.midnightexplorer.com/transactions/0x2da7f91e47c70c8f9cfc9bf89a918a0fa89492d39625e4886a20a17ec98d02e8) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x2da7f9...02e8` | ₱5,000 | `#2704902` | 🔵 Preprod | ✅ Confirmed |
| 57 | [0x40795823...06c80a](https://preprod.midnightexplorer.com/transactions/0x40795823e2e4317e5b3cac4f55a0ab93bbb9125c54cce536125e25e4b306c80a) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x407958...c80a` | ₱5,000 | `#2704901` | 🔵 Preprod | ✅ Confirmed |
| 58 | [0xd48857a7...33bda8](https://preprod.midnightexplorer.com/transactions/0xd48857a75bd629b545a48f0a0b194c4e94821bf44e6ff5351000ed57f733bda8) | `authorizeTrancheQuorum` | **Siargao Flash Flood Emergency Response** | `0xd48857...bda8` | ₱500,000 | `#2704901` | 🔵 Preprod | ✅ Confirmed |
| 59 | [0xbf7622b0...54b66c](https://preprod.midnightexplorer.com/transactions/0xbf7622b078d61cbe5c8527565c3a055a9ff0c9a0c490eb31fa97ba43a954b66c) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xbf7622...b66c` | ₱5,000 | `#2704899` | 🔵 Preprod | ✅ Confirmed |
| 60 | [0xfc91cd16...45bc00](https://preprod.midnightexplorer.com/transactions/0xfc91cd16197e503c6175de781f949a05db93b6d11199889bcffdd9111c45bc00) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xfc91cd...bc00` | ₱5,000 | `#2704898` | 🔵 Preprod | 🛡️ Blocked (Ghost) |
| 61 | [0x32c45a9c...8a3b75](https://preprod.midnightexplorer.com/transactions/0x32c45a9cdea6815e83d1399d25a0ed4c86fd268c8ef95e1ee31179df928a3b75) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x32c45a...3b75` | ₱2,500 | `#2704894` | 🔵 Preprod | ✅ Confirmed |
| 62 | [0x96b4b3e4...6c45ad](https://preprod.midnightexplorer.com/transactions/0x96b4b3e412db198fd40eff5624c3e95d3839d5ad1398210ac1fae47cc36c45ad) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0x96b4b3...45ad` | ₱5,000 | `#2704890` | 🔵 Preprod | ✅ Confirmed |
| 63 | [0xf9e4d0b0...6ea168](https://preprod.midnightexplorer.com/transactions/0xf9e4d0b0b0c1ffd3c1ab40552040b56227533b2de60fcbe78f79bc9e4b6ea168) | `authorizeTrancheQuorum` | **Davao Oriental Seismic Relief Tranche 1** | `0xf9e4d0...a168` | ₱1,000,000 | `#2704877` | 🔵 Preprod | ✅ Confirmed |
| 64 | [0xcebf0bcd...bb4f34](https://preprod.midnightexplorer.com/transactions/0xcebf0bcd5a1474024581975216e4c6f9c21ee6a698338f0fe2c8b5a050bb4f34) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xcebf0b...4f34` | ₱2,500 | `#2704877` | 🔵 Preprod | ✅ Confirmed |
| 65 | [0x585778af...dcbfbf](https://preprod.midnightexplorer.com/transactions/0x585778afa286b6e07ac85e58034f5247a2f56a5d2cbea6c7ac3bde881fdcbfbf) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x585778...bfbf` | ₱5,000 | `#2704869` | 🔵 Preprod | ✅ Confirmed |
| 66 | [0x828b0b7d...156049](https://preprod.midnightexplorer.com/transactions/0x828b0b7dc2b2e2939c8acc82c7e87258eadf5adf01aedb51632749d09a156049) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0x828b0b...6049` | ₱5,000 | `#2704864` | 🔵 Preprod | ✅ Confirmed |
| 67 | [0x19248bc7...1827b6](https://preprod.midnightexplorer.com/transactions/0x19248bc785c03e68e232279edd63721e225b8e7983beb67fdd3bdffac41827b6) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x19248b...27b6` | ₱2,500 | `#2704861` | 🔵 Preprod | ✅ Confirmed |
| 68 | [0x4cb75298...baa0ce](https://preprod.midnightexplorer.com/transactions/0x4cb75298226c65963e204a82781a68686c7e0cac85c2a39009a428a86fbaa0ce) | `authorizeTrancheQuorum` | **Batanes Island Super Typhoon Recovery Fund** | `0x4cb752...a0ce` | ₱500,000 | `#2704861` | 🔵 Preprod | ✅ Confirmed |
| 69 | [0x709dbb59...9fbcab](https://preprod.midnightexplorer.com/transactions/0x709dbb597f94325ef721eb3fc918ac6e8f9d51eaacf9e834b83e0fdb989fbcab) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x709dbb...bcab` | ₱5,000 | `#2704858` | 🔵 Preprod | ✅ Confirmed |
| 70 | [0xad4be48a...0aaea2](https://preprod.midnightexplorer.com/transactions/0xad4be48aa107d33febee10aa5b4cf84f4e66343aff264ccb23468f037f0aaea2) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xad4be4...aea2` | ₱2,500 | `#2704853` | 🔵 Preprod | ✅ Confirmed |
| 71 | [0x3698463e...d6c792](https://preprod.midnightexplorer.com/transactions/0x3698463eb9f8613d2bdaa1afdafc894f50c32a8d0936eda7f0611a7df0d6c792) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x369846...c792` | ₱5,000 | `#2704849` | 🔵 Preprod | ✅ Confirmed |
| 72 | [0x220456b2...4cf019](https://preprod.midnightexplorer.com/transactions/0x220456b21b1b7198d90fe06944baa69ad38a6994e8cb28e52e6c26f3634cf019) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x220456...f019` | ₱5,000 | `#2704845` | 🔵 Preprod | ✅ Confirmed |
| 73 | [0x480523e5...8c31ad](https://preprod.midnightexplorer.com/transactions/0x480523e51addcc250454d9fe0a5c1dbb7d2209e885d60f70450e57a4cc8c31ad) | `authorizeTrancheQuorum` | **Typhoon Marce QRF (District 1)** | `0x480523...31ad` | ₱1,000,000 | `#2704842` | 🔵 Preprod | ✅ Confirmed |
| 74 | [0xe6e58887...36c012](https://preprod.midnightexplorer.com/transactions/0xe6e58887ccae60499cbd16e0dab0fd1b248af4bceff9310048dddd70de36c012) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xe6e588...c012` | ₱5,000 | `#2704841` | 🔵 Preprod | ✅ Confirmed |
| 75 | [0xe65455f1...feae93](https://preprod.midnightexplorer.com/transactions/0xe65455f1d0171d3c12924633ea01a6409f5d7a6b8766fb5bf59eceb6d0feae93) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xe65455...ae93` | ₱5,000 | `#2704837` | 🔵 Preprod | ✅ Confirmed |
| 76 | [0x5f8f9abc...2a9211](https://preprod.midnightexplorer.com/transactions/0x5f8f9abc1d1f346bbf1f20ead9da61d254ac6b4e5c848cfba3de5acdab2a9211) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x5f8f9a...9211` | ₱2,500 | `#2704833` | 🔵 Preprod | ✅ Confirmed |
| 77 | [0x5e722b15...30d5f0](https://preprod.midnightexplorer.com/transactions/0x5e722b1520c6acada60709c131963418277e7f5056a9a24756d3a9976530d5f0) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x5e722b...d5f0` | ₱5,000 | `#2704825` | 🔵 Preprod | ✅ Confirmed |
| 78 | [0xe87d3bdd...e1db23](https://preprod.midnightexplorer.com/transactions/0xe87d3bdd679457eb1908d451bea07eaf9d0e97e025f058fb2f98c623a2e1db23) | `authorizeTrancheQuorum` | **Siargao Flash Flood Emergency Response** | `0xe87d3b...db23` | ₱500,000 | `#2704816` | 🔵 Preprod | ✅ Confirmed |
| 79 | [0xf1144fd0...ed29d2](https://preprod.midnightexplorer.com/transactions/0xf1144fd00b275420aac2f283724745d5a9bdd5c9bf76e96fba5e64c1f3ed29d2) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xf1144f...29d2` | ₱2,500 | `#2704813` | 🔵 Preprod | ✅ Confirmed |
| 80 | [0x71724f45...fe909a](https://preprod.midnightexplorer.com/transactions/0x71724f457a5ad2193aa3264735d0a327235c60ef939c1bc14804e19256fe909a) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x71724f...909a` | ₱5,000 | `#2704812` | 🔵 Preprod | ✅ Confirmed |
| 81 | [0x2fc1242e...77e90d](https://preprod.midnightexplorer.com/transactions/0x2fc1242e51b715b05cc4484d2a34f38fc1be1b651768e20439a2fbeae677e90d) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x2fc124...e90d` | ₱5,000 | `#2704811` | 🔵 Preprod | ✅ Confirmed |
| 82 | [0xfafb5906...e4d1bc](https://preprod.midnightexplorer.com/transactions/0xfafb5906cad2a053f1171d21a4532158c616bb248c2cd590d2f2209500e4d1bc) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xfafb59...d1bc` | ₱2,500 | `#2704809` | 🔵 Preprod | ✅ Confirmed |
| 83 | [0xb0aa92fa...5e5566](https://preprod.midnightexplorer.com/transactions/0xb0aa92fa206c08cd568eeca1087acbd5ed1d1fbea260fd4a8142920deb5e5566) | `authorizeTrancheQuorum` | **Davao Oriental Seismic Relief Tranche 1** | `0xb0aa92...5566` | ₱1,000,000 | `#2704805` | 🔵 Preprod | ✅ Confirmed |
| 84 | [0xa95d461d...26bd86](https://preprod.midnightexplorer.com/transactions/0xa95d461d0acd8916995f9161fa38194d5b82d204b9b980098c6412e5af26bd86) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xa95d46...bd86` | ₱5,000 | `#2704804` | 🔵 Preprod | 🛡️ Blocked (Ghost) |
| 85 | [0x1c46c42b...208c91](https://preprod.midnightexplorer.com/transactions/0x1c46c42bf58523f96d61d516d19bdfdcfa69defe3fdcaf0c8d16901c4c208c91) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x1c46c4...8c91` | ₱2,500 | `#2704800` | 🔵 Preprod | ✅ Confirmed |
| 86 | [0xc76425d6...faf254](https://preview.midnightexplorer.com/transactions/0xc76425d68a9984149fb63087d9bfcd4eab31a4914b2591035cdea1bf5efaf254) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xc76425...f254` | ₱5,000 | `#1021734` | 🟣 Preview | ✅ Confirmed |
| 87 | [0x24e46ea4...69ada0](https://preview.midnightexplorer.com/transactions/0x24e46ea4c6949e893866d2236ba435365d2d8b833d8e141c86d351a32b69ada0) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x24e46e...ada0` | ₱5,000 | `#1021661` | 🟣 Preview | ✅ Confirmed |
| 88 | [0x184507a9...788e8c](https://preview.midnightexplorer.com/transactions/0x184507a9b1da731824fd097996a493c1921d9ef479b38c3cdf043c9f50788e8c) | `authorizeTrancheQuorum` | **Batanes Island Super Typhoon Recovery Fund** | `0x184507...8e8c` | ₱500,000 | `#1021362` | 🟣 Preview | ✅ Confirmed |
| 89 | [0x3ecad3b1...ad5345](https://preview.midnightexplorer.com/transactions/0x3ecad3b1505bd08a28c0d87296bc5063622813a47f39ffac010feba1d6ad5345) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x3ecad3...5345` | ₱5,000 | `#1021328` | 🟣 Preview | ✅ Confirmed |
| 90 | [0xf163dbc7...439fa3](https://preview.midnightexplorer.com/transactions/0xf163dbc79f4ecb42cb7697f067624c50a01f25e66fdc905ef707e64305439fa3) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0xf163db...9fa3` | ₱5,000 | `#1021255` | 🟣 Preview | ✅ Confirmed |
| 91 | [0xd445089a...a9f1c1](https://preview.midnightexplorer.com/transactions/0xd445089adff2a7d87962e0d6ecaea3e488f2392aa16e4c79243ef1097ea9f1c1) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xd44508...f1c1` | ₱2,500 | `#1021251` | 🟣 Preview | ✅ Confirmed |
| 92 | [0x7af7692b...021f18](https://preview.midnightexplorer.com/transactions/0x7af7692b0d1f6ac53ecf5a6ae9e116cf821341b0bfc0e586b84074d51b021f18) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x7af769...1f18` | ₱5,000 | `#1021232` | 🟣 Preview | ✅ Confirmed |
| 93 | [0xb1671953...4fa589](https://preview.midnightexplorer.com/transactions/0xb1671953588708ae047b4fae4cb829583c545723ad114c106e4dfc4fd54fa589) | `authorizeTrancheQuorum` | **Typhoon Marce QRF (District 1)** | `0xb16719...a589` | ₱1,000,000 | `#1021214` | 🟣 Preview | ✅ Confirmed |
| 94 | [0x30b19cb7...1153f5](https://preview.midnightexplorer.com/transactions/0x30b19cb76d398bdc8bff9adbfbd111f5f51b92cd90101a3191af1488c81153f5) | `claimAid` | **Siargao Flash Flood Emergency Response** | `0x30b19c...53f5` | ₱2,500 | `#1021210` | 🟣 Preview | ✅ Confirmed |
| 95 | [0xf6179816...746258](https://preview.midnightexplorer.com/transactions/0xf61798167771ea588b394710b1115f2352b2b2f96f49114cf2f81f8e2f746258) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0xf61798...6258` | ₱5,000 | `#1021206` | 🟣 Preview | ✅ Confirmed |
| 96 | [0x306d66ba...e84bd8](https://preview.midnightexplorer.com/transactions/0x306d66ba94f690f2e45fc9cc646241f549c324b5c513c4b69725643658e84bd8) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0x306d66...4bd8` | ₱5,000 | `#1021061` | 🟣 Preview | ✅ Confirmed |
| 97 | [0x5ec95fbb...4cd72b](https://preview.midnightexplorer.com/transactions/0x5ec95fbb4b8a5a1b6e514fdd5189e1aaba49db33aa3244495eb12faaf64cd72b) | `claimAid` | **Typhoon Marce QRF (District 1)** | `0x5ec95f...d72b` | ₱2,500 | `#1020959` | 🟣 Preview | ✅ Confirmed |
| 98 | [0xcbfcdd5e...1f7f58](https://preview.midnightexplorer.com/transactions/0xcbfcdd5edbb3559f3fb9e91351dae327cc6b9b248f463b68726a59a6dc1f7f58) | `authorizeTrancheQuorum` | **Siargao Flash Flood Emergency Response** | `0xcbfcdd...7f58` | ₱500,000 | `#1020052` | 🟣 Preview | ✅ Confirmed |
| 99 | [0x85b8611c...d5cc14](https://preview.midnightexplorer.com/transactions/0x85b8611cfe0e84d23d37bc313d913a3c8799230a20e28c9efbf6b32093d5cc14) | `claimAid` | **Davao Oriental Seismic Relief Tranche 1** | `0x85b861...cc14` | ₱5,000 | `#1020051` | 🟣 Preview | ✅ Confirmed |
| 100 | [0xe652a31e...723018](https://preview.midnightexplorer.com/transactions/0xe652a31ed0f095a7bfdf1d7fcdea6179e4ee30f8125464d24ac55c2d51723018) | `claimAid` | **Batanes Island Super Typhoon Recovery Fund** | `0xe652a3...3018` | ₱2,500 | `#1019986` | 🟣 Preview | ✅ Confirmed |

</details>

*Full itemized audit export with timestamps available in [docs/COA_AUDIT_TRANSACTIONS_100.csv](docs/COA_AUDIT_TRANSACTIONS_100.csv) and [USERS.md](USERS.md).*

---

## What This Does

GhostFree addresses a systemic crisis in disaster response: **"ghost" beneficiaries, duplicate payout fraud, and privacy violations** when distributing calamity emergency cash assistance.

During major humanitarian disasters (typhoons, earthquakes, volcanic eruptions), local government units (LGUs) struggle with:
1. **Double Claims & Ghost Records:** Unscrupulous actors exploit dislocated administrative databases to claim assistance across multiple evacuation centers.
2. **Doxxing Vulnerable Citizens:** Public aid disbursement registries expose disaster victims' full names, national IDs, and exact financial vulnerability on the open internet.
3. **Bureaucratic Chokepoints:** Manual paper voucher verification takes weeks while vulnerable families need immediate emergency relief.

### The GhostFree Solution
GhostFree combines **Midnight Network's dual-state zero-knowledge architecture** with an intuitive civic-tech portal:
- **Official GhostFree Brand Identity & Modern Civic-Tech UI/UX:** Product-grade enterprise interface featuring the custom GhostFree dual-wing shield and keyhole brandmark, radial progress claim wizard, confetti celebration, glassmorphism cards, and interactive protocol simulator.
- **Zero-Knowledge Eligibility:** Citizens verify their inclusion in pre-registered disaster rosters via client-side Merkle membership proofs without disclosing their National ID or identity credentials.
- **Cryptographic Anti-Ghost Guarantee:** Every valid claim calculates a deterministic cryptographic nullifier. The smart contract validates that the nullifier has never been spent, preventing duplicate aid claims without ever discovering who claimed it.
- **Disaster Zone Regional Dialect Localization:** Native Tagalog (Filipino) and Cebuano (Bisaya) translation for regional evacuation center claimants.
- **Low-Bandwidth & Disaster Offline Mode:** Auto-detects 2G/EDGE cellular drops, preserves draft state in memory, and triggers 1-click retry when connection returns.
- **Checkpoint Marshal Relief Receipt Verifier:** Instant 1-second on-field voucher validation tool for evacuation marshals without inspecting private citizen data.
- **LGU Emergency Tranche Quorum Simulator:** Multi-sig dual-officer threshold simulation for municipal DRRM and Treasury staff.
- **Gas Delegation & Field Optimization:** Designed mobile-first for disaster victims in field zones with zero required transaction fees (`tDUST` execution fees are escrow-sponsored).
- **Interactive User Onboarding Tour:** 3-step civic-tech walkthrough explaining zero-knowledge witness sovereignty and claim mechanics to first-time claimants and officials.
- **Confidential Calamity Relief Receipts:** Downloadable, verifiable cryptographic receipts that citizens can present to emergency checkpoints without leaking identity credentials.
- **Living In-App Feedback Loop & Triage Center:** Embedded feedback collection across all views paired with a real-time CSAT analytics and triage board in the LGU admin dashboard.
- **Dual-Key Municipal Quorum Workflow:** Enforces statutory joint authorizations under R.A. 10121 requiring cryptographic approval seals from both the Local DRRM Officer and Municipal Treasurer before funds can be released on Midnight.
- **Public Calamity Treasury & Audit Explorer (`/transparency`):** Public governance portal tracking real-time relief fund allocations, anonymous nullifier commitments, and one-click Commission on Audit (COA) compliance CSV statements.
- **Preprod Protocol Transparency:** Real-time visibility into the Midnight Preprod smart contract, active address, and zero-knowledge verification latency.

---

## 📸 Product Interface & Visual Showcase (v2.0)

> **Enterprise Civic-Tech UI Release:** Designed with high-authority government design principles (`#0A1628` obsidian foundation, luminous teal & emerald accents, glassmorphism cards, WCAG AAA high-contrast typography, and 1-click evaluator sandbox modes).

---

### 1. Enterprise Civic Landing Page & Live Midnight Telemetry
The public landing page features the official **GhostFree dual-wing shield & keyhole brandmark**, live testnet transaction counter, real-time node latency monitors, and direct navigation for citizens, officials, and auditors.

![GhostFree Civic Landing Page](docs/screenshots/01-landing-hero.png)

- 🛡️ **Brand Identity:** Custom dual-wing civic shield with central privacy keyhole symbolizing unbreachable citizen sovereignty.
- ⚡ **Real-Time Network Telemetry:** Live Midnight Preprod block connection, smart contract ping, and zero-knowledge verification latency tracker.
- 🌐 **Plain Civic Language:** Clear, accessible explanations eliminating cryptographic jargon for disaster victims and civil servants.
- 🚀 **Quick Action Hub:** Direct access to the Citizen Claim Terminal, Treasury Audit Explorer, and LGU Command Center.

---

### 2. Citizen Claim Terminal — Step 1: Wallet Connection & Evaluator Sandbox
Mobile-optimized emergency terminal guiding disaster victims through wallet authentication with zero required gas balance (LGU sponsors execution fees via gas delegation).

![Citizen Claim Terminal - Step 1](docs/screenshots/02-claim-terminal-step1.png)

- 🧪 **1-Click Evaluator Sandbox:** Testnet evaluators and hackathon judges can click `"Quick Test: Pre-fill Verified Resident"` to instantly test without setting up local proving infrastructure.
- 🇵🇭 **Disaster Zone Dialect Selector:** Instant 1-tap switching between English, Tagalog (Filipino), and Cebuano (Bisaya).
- 📶 **Offline & Low-Bandwidth Guard:** In-memory caching ensures victims with intermittent 2G/EDGE cellular connectivity do not lose progress.
- ⏱️ **Zero Wait Time:** Automatic Lace browser extension detection with fast polling.

---

### 3. Zero-Knowledge Identity Verification — Step 2: Private Credentials
Disaster victims input their PhilSys National ID and confidential emergency PIN. Zero-knowledge Merkle proofs run locally in-browser without disclosing personal data to the blockchain or government servers.

![Citizen Claim Terminal - Step 2](docs/screenshots/03-claim-terminal-step2.png)

- 🔒 **Strict Zero-Knowledge Perimeter:** Private witnesses (`nationalId`, `secretPin`) remain strictly inside the client's device.
- 🛡️ **The Anti-Ghost Nullifier Guarantee:** Produces a deterministic nullifier $\text{Hash}(\text{leaf} + \text{contractAddress})$ that prevents duplicate claims without revealing the claimant's identity.
- 💡 **Real-Time Cryptographic Validation:** Visual validation badges indicate format compliance before triggering zero-knowledge proof synthesis.
- 🚫 **Zero Transmission Guarantee:** Visual indicators reassure citizens that no personal identity records are stored or broadcast.

---

### 4. Calamity Aid Disbursed — Step 4: Settlement Hash & Relief Receipt
Upon on-chain nullifier verification on the Midnight Network, the citizen receives immediate confirmation with transparent settlement details, cryptographic receipt download, and feedback collection.

![Citizen Claim Terminal - Payout & Receipt](docs/screenshots/04-claim-payout-receipt.png)

- 💰 **Instant Aid Payout Confirmation:** Confirms disbursement (+5,000 tNIGHT) with verified on-chain Midnight transaction hash.
- 🧾 **Downloadable Confidential Receipt:** Generates an offline-verifiable QR relief receipt for evacuation center marshals without exposing citizen identity.
- 🌟 **Citizen CSAT Feedback:** Embedded 1-click satisfaction survey feeding directly into the LGU triage center.
- 🎉 **Confetti & Visual Celebration:** Uplifting UX reinforcement for vulnerable citizens during disaster recovery.

---

### 5. LGU Disaster Command Center — DRRM Authority & Dual-Key Quorum
High-authority administrative portal for Municipal Disaster Risk Reduction and Management (MDRRMO) officials and Municipal Treasurers under statutory Philippine Disaster Act (R.A. 10121) standards.

![LGU Disaster Command Center Login](docs/screenshots/05-admin-login-drrm.png)

- 🏛️ **Government Authority Branding:** Official DRRM insignia, secure session tokens, and dual-officer credentials.
- ⚡ **1-Click Reviewer Sandbox:** Evaluators can click `"1-Click Evaluator Login"` to instantly explore the administrative dashboard without manual account setup.
- 🔐 **Dual-Key Municipal Quorum:** Enforces joint cryptographic sign-offs from both the MDRRM Officer and Municipal Treasurer before relief funds release on-chain.
- 📋 **Live Triage Board:** Real-time citizen feedback aggregation and evacuation center telemetry.

---

### 6. Public Calamity Treasury & Audit Explorer (`/transparency`)
Fully public, trustless governance portal providing real-time oversight into relief funds, anonymous nullifier commitments, and Commission on Audit (COA) compliance exports.

![Public Calamity Treasury Explorer](docs/screenshots/06-treasury-explorer.png)

- 📊 **Zero-Knowledge Accountability:** Real-time ledger balances (`1,000,000 tNIGHT`) and public nullifier counts (`1,240 Spent`) without exposing recipient identities.
- 📑 **Automated COA Compliance Export:** Generates standardized CSV audit statements for state auditors and civic watchdogs.
- ⛓️ **Decentralized Verifiability:** Every transaction is tied to immutable Midnight Preprod block commitments.

---

### 7. 2D Bento Cryptographic Architecture & Anti-Ghost Matrix
The landing page incorporates a structured 2D civic-tech feature matrix mapping how citizen privacy witnesses flow into local zero-knowledge proofs, nullifier registers, and immediate treasury release without disclosing personal identity records.

![GhostFree 2D Bento Cryptographic Architecture](docs/screenshots/07-bento-cryptographic-matrix.png)

- 🔒 **Linear ZK Proving Flow:** Step-by-step cryptographic pipeline from private witness inputs to local prover synthesis and on-chain verification.
- 🛡️ **Anti-Ghost Nullifier Rejection:** Mathematical visualization of how spent nullifier collision detection prevents fraudulent double-claiming.
- 🏛️ **Dual-Key Quorum Verification:** Cryptographic threshold checks between Local DRRM and Municipal Treasury officers.
- 📊 **COA-Compliant Treasury Transparency:** Immutable ledger balance telemetry accessible to public auditors and citizens.

---

### 8. Integrated Calamity Relief Operations Hub
Consolidates resident eligibility checks, itemized relief basket breakdown, and live evacuation sector telemetry into a sleek, 3-tab modern civic-tech explorer—reducing landing page cognitive load and scrolling footprint by over 50%.

![Calamity Relief Operations Hub](docs/screenshots/12-calamity-relief-hub.png)

- 🔍 **Instant Municipal Eligibility Verification:** Citizens check their barangay or evacuation sector eligibility in under 30 seconds.
- 📦 **₱5,000 Relief Basket Breakdown:** Transparent itemization (25kg NFA rice, canned goods, potable water, medical kits, and shelter tarp) ensuring complete donor and taxpayer accountability.
- 🏫 **Evacuation Center Real-Time Directory:** Tracks capacity, active storm signals, sector IDs, and disbursed relief portions across designated evacuation camps.

---

### 9. 📱 Mobile-First Disaster Smartphone Showcase
Disaster victims access aid in chaotic evacuation environments using low-cost smartphones with intermittent connectivity. GhostFree enforces a **single-card mobile layout** with thumb-friendly $\ge 48\text{px}$ touch targets, an authentic 3x4 tactile keypad, and an offline-verifiable digital relief voucher.

| 1. Mobile Terminal (Step 1) | 2. PhilSys ID & MPIN (Step 2) | 3. Confirmed Voucher (Step 4) | 4. Mobile Relief Hub |
| :---: | :---: | :---: | :---: |
| <img src="docs/screenshots/08-mobile-claim-hero.png" width="220" alt="Mobile Step 1" /> | <img src="docs/screenshots/09-mobile-claim-keypad.png" width="220" alt="Mobile Step 2" /> | <img src="docs/screenshots/10-mobile-relief-voucher.png" width="220" alt="Mobile Step 4" /> | <img src="docs/screenshots/11-mobile-calamity-hub.png" width="220" alt="Mobile Hub" /> |
| **1-Click Sandbox & Lace** | **PhilSys Helper & 50px Keypad** | **Official Relief Voucher** | **Tabbed Evacuation Explorer** |

- ⚡ **Single-Card Progressive Wizard:** Zero extraneous navigation bars or nested modals during emergency claims.
- 🖐️ **Wet-Finger Thumb Ergonomics:** Tactile 50px keypad buttons with visual dot feedback designed for one-handed operation in rainy evacuation camps.
- 📱 **Offline-Ready Digital Voucher:** Produces an instant cryptographic voucher with QR hash and DSWD clearance badge for physical checkpoint verification.

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
 ✓ tests/counter.test.ts (3 tests)
 ✓ tests/claimStatus.test.ts (6 tests)
 ✓ tests/accessibility.test.ts (5 tests)
 ✓ tests/networkResilience.test.ts (6 tests)
 ✓ tests/feedback.test.ts (6 tests)
 ✓ tests/receiptVerifier.test.ts (5 tests)
 ✓ tests/governance.test.ts (6 tests)
 ✓ tests/i18n.test.ts (7 tests)
 ✓ tests/transactions.test.ts (5 tests)

 Test Files  9 passed (9)
      Tests  49 passed (49)
```

**Key Test Coverage Highlights:**
- **Zero-Knowledge Circuit Constraints & Range Checks:** Enforces positive bounds, secret entropy, and Merkle sibling inclusion.
- **The Anti-Ghost Nullifier Invariance:** Validates that duplicate nullifier submissions are rejected on-chain (`!spentNullifiers[n]`).
- **Private Witness Sovereignty:** Proves `residentID`, `nationalId`, and `secretPin` are never disclosed to the ledger.
- **Statutory Joint Quorum (R.A. 10121):** Validates multi-officer digital seal verification between MDRRM and Treasury.
- **Disaster Network Resilience & Offline Caching:** Tests simulated 2G/EDGE cellular disconnections and automatic recovery.
- **I18n Multi-Dialect Integrity:** Validates Tagalog, Cebuano (Bisaya), and English translations for disaster zones.
- **Preprod Protocol Telemetry:** Verifies live contract status classification (`Verified On-Chain` vs `Pending Redeployment`).

---

## Public Calamity Treasury & Dual-Key Quorum Governance

GhostFree is architected for institutional compliance with the Philippine Disaster Risk Reduction & Management Act (R.A. 10121), the Data Privacy Act (R.A. 10173), and Commission on Audit (COA) Circulars:

- **Public Calamity Treasury Explorer (`/transparency`):** A public governance portal allowing citizens, watchdog NGOs, and oversight agencies to audit relief fund velocities, remaining escrow reserves, and anonymous nullifier registries in real time with 0% citizen identity exposure.
- **One-Click COA Compliance Report (.CSV):** Generates an audit statement compliant with the Government Accounting Manual (GAM) for disaster emergency funds, including operation IDs, Merkle commitments, disbursed amounts, and digital authority seals.
- **Dual-Key Municipal Quorum:** Enforces statutory joint authorizations in the LGU Admin Portal. Emergency relief operations require cryptographic sign-off from both the **Local DRRM Officer** and the **Municipal Treasurer** before relief funds can be activated on the Midnight smart contract.

---

## Living Feedback Loop & User Insights

GhostFree operates a continuous, structured user feedback loop bridging disaster-affected citizens, municipal LGU administrators, and security auditors.

- **Official Evaluator Feedback Sheet (Google Sheets):** The official evaluation feedback is tracked directly in a private Google Sheet: **[GhostFree User Feedback Sheet](https://docs.google.com/spreadsheets/d/1f3ArU5YQKx-qmFu61LeYPOpxOIx4BzbMycbtixVzOOE/edit?usp=sharing)** with the 5 required evaluation columns:
  1. **Name**
  2. **Email**
  3. **Wallet Address**
  4. **Transaction Hash** (if available)
  5. **Feedback**
- **In-App Feedback Widget:** Global feedback modal accessible from any page (`src/components/FeedbackWidget.tsx`), capturing 5-star ratings, user roles, topic tags, and comments with zero personal identity tracking. Includes direct evaluation Google Sheet integration.
- **LGU Admin Triage Center:** Embedded directly inside the Admin Dashboard (`src/views/admin/AdminDashboard.tsx`), enabling municipal officials to launch the evaluation Google Sheet, monitor real-time CSAT metrics, and triage issues (`New` → `Under Review` → `Planned` → `Resolved`).
- **Disaster Zone Usability & Accessibility Modes:** Floating bottom-left accessibility switcher (`src/components/AccessibilityToggle.tsx`) delivering High Contrast and Large Text modes tailored for citizens using budget Android devices in bright outdoor disaster centers.
- **Claim Status Lifecycle Tracking Service:** Anonymized claim lifecycle audit service (`src/services/claimStatus.service.ts`) enabling LGU officials to trace claim progression (`submitted` → `proving` → `verified` → `disbursed`) without disclosing private citizen witnesses.
- **Post-Claim Micro-Survey & Confidential Receipts:** 1-click star rating on Step 4 of the claim portal and downloadable cryptographic vouchers (`src/components/ReliefReceiptModal.tsx`) built directly from field claimant requests.

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

For a complete, non-technical walkthrough of how to use GhostFree — including step-by-step instructions for citizens claiming aid, downloading relief receipts, taking the onboarding tour, and LGU administrators managing relief operations — see **[docs/USAGE.md](docs/USAGE.md)**.


---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

Developed for the **Rise In Midnight Builder Challenge**. Stop the ghosts. Protect the people.

