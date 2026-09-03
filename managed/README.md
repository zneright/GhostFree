# Managed Compact Artifacts

This directory contains the auto-generated TypeScript definitions, CommonJS runtime bindings, circuit metadata, and verification assets compiled from the Compact smart contracts:

- `managed/counter/`: Generated bindings for `contracts/counter.compact`
  - `contract/index.d.ts`: TypeScript interface definitions for public ledger and private witness circuits.
  - `contract/index.cjs`: Midnight JS contract runtime adapter.
  - `circuit-manifest.json`: Circuit input/output/disclosure specifications.
