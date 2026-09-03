# Rule: Zero-Knowledge Privacy & Private Witness Sovereignty

## Objective
Guarantee absolute privacy for disaster victims claiming calamity aid under extreme distress.

## Mandatory Rules
1. **Private Witness Invariance (Zero Transmission Rule)**:
   - Sensitive credentials (`residentID`, `nationalId`, `residentSecret`, `secretPin`) are classified as **Private Witnesses**.
   - These variables must NEVER be transmitted over network requests, written into databases, sent to telemetry, or printed to application logs.
   - All cryptographic computation using these credentials must occur in-browser on the client machine.
2. **Deterministic Anti-Ghost Nullifier Generation**:
   - The nullifier must be computed deterministically:
     $$\text{nullifier} = \text{Hash}(\text{leafHash} + \text{contractAddress})$$
   - It is mathematically impossible to invert the nullifier to discover the citizen's National ID.
   - The contract records the nullifier upon first claim to permanently block duplicate "ghost" claims.
3. **Public Output Disclosure**:
   - Only the mathematical proof, nullifier, and transaction recipient address may be broadcast to the Midnight network.
