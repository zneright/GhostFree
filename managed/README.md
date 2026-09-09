# Managed Compact Artifacts

This directory contains the auto-generated TypeScript definitions, CommonJS runtime bindings, circuit manifests, and verification assets compiled from the Compact smart contracts:

- **`managed/counter/`**: Generated bindings for `contracts/counter.compact`
  - `contract/index.d.ts`: TypeScript interface definitions for public ledger and private witness circuits.
  - `contract/index.cjs`: Midnight JS contract runtime adapter.
  - `circuit-manifest.json`: Circuit input/output/disclosure specifications for `initialize`, `increment`, and `reset`.

- **`managed/GhostFree/`**: Generated bindings for `contracts/GhostFree.compact`
  - `contract/index.d.ts`: TypeScript definitions for `merkleRoot`, `spentNullifiers`, and `claimAid` circuits.
  - `contract/index.cjs`: Runtime contract adapter for zero-knowledge aid claims.
  - `circuit-manifest.json`: Circuit specification declaring `claimAid`, `initialize`, `withdrawRemaining`, and `getStatus`.
