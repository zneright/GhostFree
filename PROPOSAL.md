# Product Proposal

## What is the product, and who uses it?
**GhostFree** is a decentralized, privacy-first calamity aid distribution dApp built on the **Midnight Network**.
- **Beneficiaries (Citizens & Disaster Victims):** Displaced residents affected by typhoons and natural catastrophes who need to claim emergency relief aid ("ayuda") with zero identity exposure and zero gas fees.
- **Municipal Governments & LGUs (Local Government Units):** Local disaster risk reduction officers and social welfare administrators who need to escrow emergency funds, commit beneficiary rosters, and disburse relief without risk of duplicate claims or "ghost" beneficiaries.

## Why Midnight specifically?
Traditional transparent public blockchains (like Ethereum or Stellar) force a fatal tradeoff in civic aid:
1. **Public Surveillance:** Publishing aid distributions on a transparent ledger exposes vulnerable citizens' National IDs, balances, and relief records to anyone on the internet, creating severe identity theft and political targeting risks.
2. **Centralized Corruption:** Keeping records off-chain in centralized databases enables corrupt actors to inject fake names ("ghost beneficiaries") and siphon emergency funds without auditability.

**Midnight uniquely solves this through dual-state zero-knowledge architecture:**
- **Zero-Knowledge Inclusion Proofs:** Citizens prove they belong to an authorized disaster relief roster (Merkle tree) without revealing their identity.
- **Cryptographic Nullifiers:** Double claiming is mathematically prevented on-chain ($\text{nullifier} = \text{Hash}(\text{leafHash} + \text{contractAddress})$) without the contract ever learning who claimed.
- **Private Witness Sovereignty:** Citizen credentials (`residentID`, `residentSecret`, `secretPin`) remain strictly client-side on mobile devices.

## Data Model
| Data Point | Type | Disclosed To |
| :--- | :--- | :--- |
| `merkleRoot` | Public ledger | Everyone (On-chain) |
| `spentNullifiers` | Public ledger | Everyone (On-chain map) |
| `fundBalance` | Public ledger | Everyone (On-chain) |
| `counter` / `claimCount` | Public ledger | Everyone (On-chain) |
| `residentID` | Private witness | No one (Client device only) |
| `secretPin` / `voucherKey` | Private witness | No one (Client device only) |
| `residentSecret` | Private witness | No one (Client device only) |
| `merkleProof` path | Private witness | No one (Client device only) |

## Mainnet Feasibility
GhostFree is highly feasible for **Midnight Mainnet**:
1. **Low Computational Footprint:** Merkle membership proofs and deterministic Poseidon nullifiers require minimal circuit constraints, ensuring fast client-side proof generation (~1.5s) on standard mobile devices in disaster zones.
2. **Regulatory & Statutory Compliance:** Fully aligned with the Philippine **Data Privacy Act of 2012 (R.A. 10173)** by ensuring zero unshielded personal data touches the chain, and **R.A. 10121 (Disaster Risk Reduction and Management Act)** for algorithmic fund disbursement auditability.
3. **Gas Delegation (Sponsored Transactions):** Disaster victims have empty wallets; LGU officials escrow `tDUST` execution fees so claimants interact with zero gas barriers.
