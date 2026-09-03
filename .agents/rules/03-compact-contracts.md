# Rule: Compact Smart Contract Standards (Midnight Network)

## Objective
Maintain rigorous correctness and zero-knowledge circuit security when writing and compiling Compact smart contracts.

## Mandatory Rules
1. **Contract Structure**:
   - Location: `/contracts/*.compact`.
   - Top-level comment block must clearly document what state is **Public** vs. what witnesses are **Private**.
2. **Dual-State Separation**:
   - `export ledger <var>`: Reserved strictly for non-sensitive public state (`merkleRoot`, `fundBalance`, `perClaimAmount`, `spentNullifiers`, `claimCount`).
   - `witness <var>`: Required for all private inputs to circuits (`residentID`, `residentSecret`, `merkleProof`, `merkleDirections`).
3. **Deliberate State Disclosure**:
   - Use `disclose()` intentionally only when updating public ledger state.
   - Example: `disclose(spentNullifiers[nullifier] = true);`
4. **Anti-Ghost Circuit Verification**:
   - Always verify that the computed Merkle root matches the contract's stored `merkleRoot`.
   - Always verify that `!spentNullifiers[nullifier]` before releasing funds.
   - Always verify that `fundBalance >= perClaimAmount` before calling `transfer()`.
