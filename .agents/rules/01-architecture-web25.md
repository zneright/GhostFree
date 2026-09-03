# Rule: Hybrid Web 2.5 Architecture Partitioning

## Objective
Enforce strict separation between the administrative Web2 governance fortress and the public Web3 citizen claiming interface.

## Mandatory Rules
1. **LGU Admin Portal (`/admin/*`)**:
   - Must use Firebase Authentication configured to `kapitbahay-33c2b`.
   - Admin profiles must be stored in Firestore `admin_profiles/{uid}`.
   - Relief operations must be recorded in Firestore `relief_operations/{id}`.
   - All admin dashboard routes must be guarded by `ProtectedRoute`. Unauthenticated users must be redirected to `/admin/login`.
2. **Citizen Claim Portal (`/claim`)**:
   - Must remain 100% public Web3.
   - **PROHIBITION:** Do NOT add Firebase Auth, email/password requirements, CAPTCHAs, or KYC account creation to `/claim`.
   - Citizens authenticate solely via cryptographic ownership of their Midnight Lace wallet and possession of their private National ID + secret PIN.
3. **Session Independence**:
   - The user session of the LGU Admin (Firebase JWT) and the citizen's Lace wallet connection (`window.midnight.mnLace`) must remain completely decoupled.
