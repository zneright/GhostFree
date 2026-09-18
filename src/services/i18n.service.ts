// ============================================
// GhostFree — Disaster Regional Dialect Localization
// Multi-language support: English, Filipino (Tagalog), Cebuano (Bisaya)
// Addresses feedback fb-user-008 for regional evacuation center claimants
// ============================================

import { useState, useEffect } from "react";

export type SupportedLanguage = "en" | "fil" | "ceb";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  badge: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", badge: "EN" },
  { code: "fil", name: "Filipino", nativeName: "Wikang Filipino", badge: "FIL" },
  { code: "ceb", name: "Cebuano", nativeName: "Sinugbuanong Binisaya", badge: "CEB" },
];

const I18N_STORAGE_KEY = "ghostfree_language_preference";

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appName: "GhostFree",
    tagline: "Stop the ghosts. Protect the people.",
    treasury: "Treasury",
    tour: "Tour",
    verifyVoucher: "Verify Voucher",
    giveFeedback: "Give Feedback",
    howItWorks: "How It Works",
    publicTreasury: "Public Treasury",
    privacyModel: "Zero-Knowledge Privacy",
    
    // Claim Flow Steps
    stepConnect: "Connect",
    stepVerify: "Verify",
    stepProve: "Prove",
    stepResult: "Result",

    // Step 1: Connect
    connectTitle: "Connect Midnight Lace Wallet",
    connectDesc: "Connect your Lace wallet on Midnight Preprod to receive decentralized emergency relief funds directly.",
    connectButton: "Connect Lace Wallet",
    connecting: "Connecting to Lace...",
    walletConnected: "Wallet Connected",
    noLaceDetected: "Lace wallet extension not detected. Please install Midnight Lace to proceed.",
    
    // Step 2: Credentials
    credentialsTitle: "Private Eligibility Verification",
    credentialsDesc: "Enter your PhilSys Resident ID and 6-digit Secret PIN. This data stays entirely on your phone.",
    residentIdLabel: "PhilSys Resident ID",
    residentIdPlaceholder: "e.g. PH-NCR-2026-0081",
    pinLabel: "6-Digit Secret PIN",
    pinPlaceholder: "••••••",
    privacyNotice: "Witness Sovereignty: Your PIN and resident ID are processed exclusively inside client-side WASM. Zero bytes of sensitive data leave your device.",
    proceedToProof: "Generate Private Proof",

    // Step 3: Proving
    provingTitle: "Generating Zero-Knowledge Proof",
    provingDesc: "Evaluating Merkle inclusion and deriving deterministic anti-ghost nullifier locally...",
    provingProgress: "Proving Progress",
    provingDisclaimer: "Computing cryptographic polynomial constraints. No personal identity is disclosed.",

    // Step 4: Result
    resultSuccessTitle: "Calamity Relief Disbursed!",
    resultSuccessDesc: "Your cryptographic proof was verified by the Midnight Preprod smart contract. Emergency relief funds have been transferred.",
    resultFailedTitle: "Claim Verification Failed",
    amountDisbursed: "Disbursement Amount",
    transactionHash: "Transaction Hash",
    nullifierHash: "Cryptographic Nullifier",
    viewReceipt: "View & Download Proof Receipt",
    claimAnother: "Return to Claim Portal",

    // Receipts & Common
    receiptTitle: "Confidential Calamity Relief Voucher",
    receiptSubtitle: "Present this voucher at local barangay relief checkpoints",
    close: "Close",
    printVoucher: "Print / Export Voucher",
    verifiedValid: "Verified Valid",
    alreadyClaimedError: "This identity has already received calamity aid for this relief operation.",

    // Landing Page Navigation & Hero
    navClaimAid: "Claim Aid",
    navGovPortal: "Government Portal",
    navLivePreprod: "Live Preprod",
    navZeroGhostSub: "Zero Ghost Claims · Emergency Aid",
    releasePillText: "Tested & Live on Preprod · 75 Verified Testers & Zero Data Leaks",
    heroTitlePrefix: "Stop the Ghosts.",
    heroTitleSuffix: "Protect the People.",
    heroSubtitle: "A secure emergency relief platform where disaster victims receive financial aid in seconds. Your private ID never leaves your phone, and duplicate claims are automatically blocked.",
    claimEmergencyAid: "Claim Emergency Aid",
    localGovernmentPortal: "Local Government Portal",

    // Telemetry HUD
    statFundsLocked: "Disaster Funds Locked",
    statFundsLockedSub: "Protected in Town Treasury",
    statGhostBlocked: "Duplicate Claims Blocked",
    statGhostBlockedSub: "Ghost claims stopped automatically",
    statFamiliesHelped: "Verified Families Helped",
    statFamiliesHelpedSub: "Aid delivered with 100% privacy",
    statDataLeaks: "Personal Data Leaks",
    statDataLeaksSub: "Zero personal data ever stored",

    // Interactive Window
    livePreviewTag: "Interactive Live Preview",
    livePreviewTitle: "Explore the Platform in Action",
    livePreviewSubtitle: "See how disaster victims, local officials, and public auditors use GhostFree with zero friction.",
    tabCitizen: "Citizen Claim",
    tabAdmin: "Town Hall Portal",
    tabTreasury: "Public Audit",
    citizenTabTag: "For Disaster Victims & Evacuees",
    citizenTabTitle: "Fast, Private Emergency Aid on Any Phone",
    citizenTabDesc: "No username or password. Connect wallet, enter voucher PIN, receive cash aid.",
    tryLiveClaim: "Try Live Claim Flow →",
    adminTabTag: "For Municipal Officials & DRRM Officers",
    adminTabTitle: "Local Government Emergency Command Center",
    adminTabDesc: "Upload disaster rosters, enforce dual-officer approvals, and prevent fraud.",
    openGovPortal: "Open Government Portal →",
    treasuryTabTag: "Open Public Governance & Audit",
    treasuryTabTitle: "Track Every Peso Without Leaking Names",
    treasuryTabDesc: "Full public transparency for citizens, watchdogs, and government auditors.",
    viewLiveTreasury: "View Live Treasury →",

    // Comparison Section
    comparisonTag: "Why GhostFree Matters",
    comparisonTitle: "The Old Way vs. The GhostFree Way",
    comparisonSubtitle: "See how modern civic technology solves decades of disaster relief corruption and delays.",
    comparisonAspect: "Aspect",
    comparisonOldWayHeader: "The Old Way (Paper Vouchers)",
    comparisonGhostFreeHeader: "The GhostFree Way",

    // 4-Step Process Section
    stepsTag: "Simple 4-Step Process",
    stepsTitle: "How Disaster Victims Receive Aid",
    stepsSubtitle: "Click through the 4 steps below to see how privacy and duplicate protection work hand-in-hand.",
    whatObserverSees: "What the System Checks (Public)",
    whatStaysPrivate: "What Stays With You (Private)",

    // Bento 4 Core Guarantees
    bentoTag: "Four Core Guarantees",
    bentoTitle: "Engineered for Complete Trust",
    bentoSubtitle: "Every disaster victim and municipal official gets ironclad privacy and fraud protection.",
    bentoPrivateTitle: "100% Private",
    bentoPrivateDesc: "Your National ID and private PIN stay on your phone. No central database ever collects or leaks your personal information.",
    bentoGhostTitle: "Zero Ghost Claims",
    bentoGhostDesc: "Each voucher generates a one-time digital lock code. The moment aid is received, the code is locked permanently against repeat claims.",
    bentoFreeTitle: "Free for Families",
    bentoFreeDesc: "The local government sponsors all technical execution fees in advance. Victims in disaster zones pay ₱0 to claim relief.",
    bentoAuditTitle: "Open Public Audit",
    bentoAuditDesc: "Watchdogs and citizens can verify every peso distributed on a live public dashboard without revealing recipient names.",

    // Laws & Compliance
    lawsTag: "Philippine Legal Compliance",
    lawsTitle: "Backed by Philippine Governance Law",
    lawsSubtitle: "GhostFree meets official government audit standards and citizen privacy rights under national law.",
    govAuditCompliant: "Government Audit Compliant",

    // FAQs Section
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Straightforward answers about accounts, privacy, and emergency payouts.",

    // Bottom CTA
    ctaTitle: "Ready to Deliver Calamity Aid with Zero Ghosts?",
    ctaSubtitle: "Test the live claim portal on Midnight Preprod, or tour the local government command center today.",
    ctaClaimBtn: "Claim Aid as a Citizen",
    ctaAdminBtn: "Login as Town Hall Official",

    // Additional Comprehensive Civic-Tech UI Keys
    advisoryBadge: "CALAMITY ADVISORY",
    advisoryMarquee: "🚨 TYPHOON RELIEF ACTIVE: Region II & IV-A evacuation centers eligible for ₱5,000 emergency cash assistance. Zero gas fees sponsored by DRRM.",
    headerTagline: "Safe Disaster Aid. Zero Ghost Beneficiaries.",
    claimAyudaButton: "Claim Aid (₱5,000)",
    lguDrrmButton: "LGU DRRM",
    verifyVoucherButton: "Verify Voucher",
    tourGuideButton: "Guide / Tour",

    // Landing Hero & Badges
    heroBadge: "🚨 Quick Response Fund: ₱5,000 Payout Per Family",
    heroHeadline1: "Safe Calamity Aid.",
    heroHeadlineHighlight: "Zero Ghost Beneficiaries.",
    heroHeadline2: "Zero Hassle.",
    heroSubtitleText: "Privacy-first emergency cash aid distribution on the Midnight Network. Direct aid to calamity survivors without exposing national IDs or paying gas fees.",
    heroClaimBtn: "Claim Aid (₱5,000)",
    heroTreasuryBtn: "Public Treasury (COA Explorer)",
    heroVerifyBtn: "Verify Relief Voucher",
    heroVoiceBtn: "Listen to Guide (Voice)",
    heroVoiceStop: "Stop Voice",
    searchBarangayPlaceholder: "Check your barangay eligibility (e.g. San Roque, Gonzaga)...",
    checkButton: "Check Eligibility",
    assuranceId: "100% Secret ID",
    assuranceIdSub: "Zero-Knowledge",
    assuranceGas: "Zero Gas Fees",
    assuranceGasSub: "0 tDUST cost",
    assuranceGhost: "No Double Claims",
    assuranceGhostSub: "Anti-Ghost Nullifier",
    assuranceCoa: "COA Compliant",
    assuranceCoaSub: "R.A. 10121 DRRM",

    // Relief Basket
    basketTag: "How the Aid Helps",
    basketTitle: "Where Does the ₱5,000 Emergency Cash Aid Go?",
    basketSubtitle: "Built according to DSWD Disaster Response Management Bureau standards to sustain a family through the first 21 days of disaster.",
    basketRiceName: "25kg NFA Well-Milled Rice",
    basketRiceTag: "Rice for 3 weeks",
    basketRiceDesc: "Core staple sustenance for a family of 5 across the initial emergency recovery period.",
    basketFoodName: "DSWD Family Food Packs",
    basketFoodTag: "Canned Goods, Noodles, Coffee",
    basketFoodDesc: "12 cans of corned beef & sardines, 10 instant noodle packs, cereal drinks, and coffee.",
    basketWaterName: "Clean Water & Hygiene Kit",
    basketWaterTag: "Clean Drinking Water & Sanitation",
    basketWaterDesc: "2x 5-gallon purified water containers, antibacterial soap, toothpaste, sanitary kits, and bleach.",
    basketMedName: "Emergency First Aid & Medicine",
    basketMedTag: "Paracetamol, Rehydration, Antiseptic",
    basketMedDesc: "Fever paracetamol, oral rehydration salts for dehydration, band-aids, betadine, and alcohol.",
    basketShelterName: "Emergency Shelter Repair Kit",
    basketShelterTag: "Heavy Tarpaulin, Rope, Nails",
    basketShelterDesc: "Heavy-duty waterproof tarpaulin, nylon rigging rope, and nails for emergency roof repairs.",
    basketTotalLabel: "Total Emergency Relief Package",
    basketTotalPerFamily: "₱5,000.00 Aid Assistance per Eligible Family",
    basketClaimBtn: "Start Claim (₱5,000)",

    // Evacuation Directory
    evacTag: "Active NDRRMO Operations",
    evacTitle: "Accredited Evacuation Centers in Northern Luzon",
    evacSubtitle: "Real-time on-chain telemetry of evacuation sites with active GhostFree smart contract disbursement.",
    evacDisbursedLabel: "Funds Disbursed:",
    evacFamiliesLabel: "families",
    evacActivelyDisbursing: "Actively Disbursing",
    evacFullyDisbursed: "100% Fully Disbursed",
    evacZeroGhost: "0 Ghost Claims",

    // 30-Sec Eligibility Checker
    checkerTitle: "30-Second Quick Eligibility Lookup",
    checkerSubtitle: "Check if your barangay or municipality has an active emergency relief declaration before claiming:",
    checkerPlaceholder: "Enter your Barangay or Town (e.g. Brgy. San Roque, Gonzaga)",
    checkerButton: "Check Area",
    checkerExamples: "Examples:",
    checkerEligibleTitle: "YOUR AREA IS ELIGIBLE!",
    checkerEligibleSub: "Active emergency assistance per family under declared QRF.",
    checkerClaimNow: "Claim Aid Now",

    // Comparison Headers
    compareOldWayHeader: "❌ Traditional Aid Distribution",
    compareGhostFreeHeader: "✅ GhostFree on Midnight Network",
    compareFeature1: "Speed of Receiving Aid",
    compareOld1: "Hours waiting in intense heat or rain at crowded evacuation center queues",
    compareNew1: "30 seconds on your mobile phone with direct funds settlement",
    compareFeature2: "Identity Privacy Protection",
    compareOld2: "Full name and National ID exposed on open paper roster billboards",
    compareNew2: "100% shielded privacy using Zero-Knowledge cryptography",
    compareFeature3: "Ghost Beneficiaries & Fraud",
    compareOld3: "Corrupt middlemen and deceased names stealing emergency relief",
    compareNew3: "Mathematically blocked by deterministic anti-ghost nullifiers",
    compareFeature4: "Public Audit (COA Compliance)",
    compareOld4: "Lost paper slips and receipts taking months to audit",
    compareNew4: "Real-time public dashboard tracking every peso disbursed",
    compareFeature5: "Cost to Calamity Victims",
    compareOld5: "Paying bus fare, photocopies, and processing service fees",
    compareNew5: "₱0 cost. 100% gas execution fees sponsored by municipal DRRM",

    // FAQs
    faqSectionTag: "Common Questions",
    faqSectionTitle: "Clear Answers for Citizens",
    faqQ1: "Do I need cryptocurrency or blockchain knowledge to receive aid?",
    faqA1: "No! GhostFree is engineered for everyday citizens. Simply enter your PhilSys ID and 4-digit PIN from your evacuation slip, and funds arrive instantly with zero technical barrier.",
    faqQ2: "How does GhostFree ensure no one can see my National ID?",
    faqA2: "GhostFree uses client-side Zero-Knowledge proofs on Midnight. Your phone itself validates you are on the roster without ever transmitting your name or ID over the internet.",
    faqQ3: "What if there is weak cellular signal in the evacuation center?",
    faqA3: "GhostFree includes Disaster Resilience caching that saves your transaction state offline and settles as soon as connectivity resumes. Printable offline vouchers are also supported.",
    faqQ4: "What does the anti-ghost nullifier do?",
    faqA4: "Each family produces a unique deterministic cryptographic lock code. Once your aid is claimed, the lock is permanently recorded on-chain, preventing double claiming by anyone.",
    faqQ5: "Can senior citizens and PWDs easily use this system?",
    faqA5: "Yes! GhostFree includes a Spoken Voice Guide in English, Tagalog, and Cebuano, 3-level text scaling up to 150%, and Sunlight Outdoor Mode for bright daylight viewing.",

    // Claim Portal
    claimQrfActive: "QRF Active",
    claimTyphoonTitle: "Typhoon Marce Calamity Assistance",
    claimPerFamily: "/ family assistance",
    claimFreeAssurance: "100% Free · Zero Gas Fees · Identity Shielded by ZK",
    claimVoiceBtn: "Listen to Guide (Voice)",
    claimVoiceStop: "Stop Voice",
    step1Title: "Start Your Calamity Aid Claim",
    step1Subtitle: "Connect with your Midnight Lace Wallet or try the 1-Click Evaluator Sandbox.",
    step1SandboxTitle: "Evaluator & Reviewer 1-Click Sandbox Mode",
    step1SandboxDesc: "Want to test the full ZK circuit immediately without installing the Lace browser extension?",
    step1SandboxBtn: "Launch Evaluator Sandbox (1-Click)",
    step1LaceBtn: "Connect with Midnight Lace Wallet",
    step1Connecting: "Connecting to Lace Wallet...",
    step1GasNotice: "Municipal DRRM disaster escrow sponsors all transaction gas fees (₱0 / 0 tDUST cost).",
    step2Title: "Enter Your Private Credentials",
    step2Subtitle: "These numbers stay exclusively inside your phone's memory.",
    step2WalletLabel: "Connected Wallet:",
    step2IdLabel: "1. PhilSys National ID Number",
    step2IdPlaceholder: "e.g. PSN-2024-8849-1102",
    step2PinLabel: "2. 4-Digit Secret PIN (from Barangay Relief Slip)",
    step2ShowPin: "Show",
    step2HidePin: "Hide",
    step2KeypadClear: "Clear",
    step2KeypadHelper: "Use touch keypad for PIN",
    step2Proceed: "Generate Private ZK Proof",
    step3Title: "Synthesizing Zero-Knowledge Proof",
    step3Subtitle: "Evaluating cryptographic Merkle tree and generating anti-ghost nullifier on your phone...",
    step3RadarTag: "Secure ZK",
    step3MathProof: "Generating mathematical zero-knowledge proof...",
    step3CheckingNullifier: "Verifying nullifier is unspent...",
    step3Disbursing: "Executing escrow disbursement...",
    step4Title: "Calamity Relief Successfully Disbursed!",
    step4Subtitle: "5,000 tNIGHT has been deposited into your wallet. Download your verifiable relief voucher below.",
    step4DisbursedLabel: "Disbursed Amount",
    step4TxHash: "Transaction Seal",
    step4NullifierHash: "Anti-Ghost Nullifier",
    step4DownloadVoucher: "Download Official Voucher (.PNG)",
    step4Share: "Share Proof Receipt",
    step4Feedback: "Submit Civilian Feedback",

    // Treasury Explorer
    treasuryTitle: "Public Calamity Treasury & Audit Explorer",
    treasurySubtitle: "Real-time disaster relief fund telemetry & COA compliance under Philippine R.A. 10121 & R.A. 10173",
    downloadCoa: "Download COA Audit (.CSV)",
    audioBriefing: "Audio Briefing (Voice)",
    statAllocated: "Total Allocated QRF",
    statAllocatedSub: "Guaranteed by Municipal Ordinances",
    statDisbursed: "Disbursed to Victims",
    statDisbursedSub: "verified claims settled",
    statRemaining: "Remaining Escrow Reserve",
    statRemainingSub: "Held in Compact smart contract escrow",
    statBlocked: "Ghost Double-Claims Blocked",
    statBlockedSub: "100% prevented by nullifier collisions",
    statSpeed: "Average Proving Speed",
    statSpeedSub: "client-side WASM",
    statGas: "Citizen Gas Fees",
    statGasSub: "0.00 tDUST (100% LGU Sponsored)",
    statPrivacy: "Data Privacy Reassurance",
    statPrivacySub: "0 Personal IDs Exposed to Public",
    quorumTitle: "Active Calamity Operations & Municipal Quorum Status",
    quorumSubtitle: "Each operation must be sealed by both the DRRM Officer and Municipal Treasurer before funds are released.",
    colOperation: "OPERATION & ID",
    colAllocated: "ALLOCATED FUND",
    colDisbursed: "DISBURSED / REMAINING",
    colDrrm: "DRRM OFFICER CLEARANCE",
    colTreasurer: "MUNICIPAL TREASURER CLEARANCE",
    colQuorum: "QUORUM STATUS",
    registryTitle: "Anonymous Nullifier Registry (Spent Commitments)",
    registrySubtitle: "Each nullifier represents a settled claim without disclosing the citizen's personal identity.",
  },

  fil: {
    appName: "GhostFree",
    tagline: "Pigilan ang ghost claims. Protektahan ang mamamayan.",
    treasury: "Pondo",
    tour: "Gabay",
    verifyVoucher: "I-verify ang Voucher",
    giveFeedback: "Magbigay ng Puna",
    howItWorks: "Paano Ito Gumagana",
    publicTreasury: "Pampublikong Pondo",
    privacyModel: "Proteksyon ng Pribadong Datos (ZK)",

    // Claim Flow Steps
    stepConnect: "Ikonekta",
    stepVerify: "Beripika",
    stepProve: "Patunayan",
    stepResult: "Resulta",

    // Step 1: Connect
    connectTitle: "Ikonekta ang Midnight Lace Wallet",
    connectDesc: "Ikonekta ang iyong Lace wallet sa Midnight Preprod upang direktang matanggap ang pondo ng ayuda sa kalamidad.",
    connectButton: "Ikonekta ang Lace Wallet",
    connecting: "Konektado na sa Lace...",
    walletConnected: "Konektado ang Wallet",
    noLaceDetected: "Hindi nakita ang Lace wallet extension. Mangyaring i-install ang Midnight Lace upang magpatuloy.",

    // Step 2: Credentials
    credentialsTitle: "Pribadong Pagpapatunay ng Karapatan",
    credentialsDesc: "Ilagay ang iyong PhilSys Resident ID at 6-digit Secret PIN. Ang datos na ito ay mananatili lamang sa iyong telepono.",
    residentIdLabel: "PhilSys Resident ID",
    residentIdPlaceholder: "hal. PH-NCR-2026-0081",
    pinLabel: "6-Digit Lihim na PIN",
    pinPlaceholder: "••••••",
    privacyNotice: "Soberanya ng Datos: Ang iyong PIN at resident ID ay pinoproseso lamang sa loob ng iyong telepono. Walang kahit anong sensitibong impormasyon ang ipinapadala sa internet.",
    proceedToProof: "Bumuo ng Pribadong Patunay",

    // Step 3: Proving
    provingTitle: "Bumubuo ng Zero-Knowledge Proof",
    provingDesc: "Sinisuri ang Merkle inclusion at kinakalkula ang anti-ghost nullifier nang lokal sa iyong device...",
    provingProgress: "Progreso ng Pagpapatunay",
    provingDisclaimer: "Kinakalkula ang cryptographic constraints. Walang personal na pagkakakilanlan ang ibinubunyag.",

    // Step 4: Result
    resultSuccessTitle: "Matagumpay na Naipamahagi ang Ayuda!",
    resultSuccessDesc: "Na-verify ng Midnight Preprod smart contract ang iyong cryptographic proof. Naipadala na ang iyong pondong pang-emerhensiya.",
    resultFailedTitle: "Hindi Matagumpay ang Pag-claim",
    amountDisbursed: "Halaga ng Ayuda",
    transactionHash: "Transaction Hash",
    nullifierHash: "Cryptographic Nullifier",
    viewReceipt: "Tingnan at I-download ang Katibayan",
    claimAnother: "Bumalik sa Claim Portal",

    // Receipts & Common
    receiptTitle: "Kumpidensyal na Voucher ng Ayuda",
    receiptSubtitle: "Ipakita ang voucher na ito sa mga barangay checkpoint o distribution table",
    close: "Isara",
    printVoucher: "I-print / I-export ang Voucher",
    verifiedValid: "Beripikadong Wasto",
    alreadyClaimedError: "Ang pagkakakilanlang ito ay nakatanggap na ng ayuda para sa relief operation na ito.",

    // Landing Page Navigation & Hero
    navClaimAid: "Mag-claim ng Ayuda",
    navGovPortal: "Portal ng Pamahalaan",
    navLivePreprod: "Aktibo sa Preprod",
    navZeroGhostSub: "Walang Ghost Claims · Ayuda sa Kalamidad",
    releasePillText: "Nasubukan at Aktibo sa Preprod · 75 Beripikadong Kalahok at Walang Tagas ng Datos",
    heroTitlePrefix: "Pigilan ang mga Multo.",
    heroTitleSuffix: "Protektahan ang Mamamayan.",
    heroSubtitle: "Isang ligtas na plataporma ng ayuda kung saan mabilis na nakakatanggap ng tulong ang mga biktima ng kalamidad. Ang iyong ID ay mananatili sa iyong selpon, at kusang hinaharang ang paulit-ulit na pag-claim.",
    claimEmergencyAid: "Mag-claim ng Ayuda sa Kalamidad",
    localGovernmentPortal: "Portal ng Lokal na Pamahalaan",

    // Telemetry HUD
    statFundsLocked: "Naka-lock na Pondo sa Kalamidad",
    statFundsLockedSub: "Protektado sa Ingat-yaman ng Bayan",
    statGhostBlocked: "Naharang na Doble o Ghost Claims",
    statGhostBlockedSub: "Kusang napigilan ang mga pekeng claim",
    statFamiliesHelped: "Beripikadong Pamilyang Natulungan",
    statFamiliesHelpedSub: "Naipamahagi nang 100% pribado",
    statDataLeaks: "Tagas ng Personal na Datos",
    statDataLeaksSub: "Walang personal na datos na naitatala",

    // Interactive Window
    livePreviewTag: "Aktibong Pagsubok sa Sistema",
    livePreviewTitle: "Tuklasin ang Plataporma sa Aksyon",
    livePreviewSubtitle: "Alamin kung paano madaling nagagamit ng mga biktima, opisyal, at auditor ang GhostFree nang walang sagabal.",
    tabCitizen: "Pag-claim ng Mamamayan",
    tabAdmin: "Portal ng Munisipyo",
    tabTreasury: "Pampublikong Pagsusuri",
    citizenTabTag: "Para sa mga Biktima ng Kalamidad at Evacuees",
    citizenTabTitle: "Mabilis at Pribadong Ayuda sa Anumang Selpon",
    citizenTabDesc: "Walang username o password. Ikonekta ang wallet, ilagay ang PIN, at tanggapin ang pera.",
    tryLiveClaim: "Subukan ang Live Claim →",
    adminTabTag: "Para sa mga Opisyal ng Munisipyo at DRRM",
    adminTabTitle: "Command Center ng Lokal na Pamahalaan",
    adminTabDesc: "Mag-upload ng listahan, magpatupad ng dual-approval, at pigilan ang korapsyon.",
    openGovPortal: "Buksan ang Portal ng Pamahalaan →",
    treasuryTabTag: "Bukas na Pagsusuri at Audit",
    treasuryTabTitle: "Subaybayan ang Bawat Piso nang Ligtas ang Pangalan",
    treasuryTabDesc: "Ganap na pampublikong transparency para sa mamamayan at auditor.",
    viewLiveTreasury: "Tingnan ang Live Treasury →",

    // Comparison Section
    comparisonTag: "Bakit Mahalaga ang GhostFree",
    comparisonTitle: "Ang Lumang Sistema vs. Ang GhostFree",
    comparisonSubtitle: "Alamin kung paano nilulutas ng makabagong civic tech ang dekadang korapsyon sa ayuda.",
    comparisonAspect: "Aspeto",
    comparisonOldWayHeader: "Ang Lumang Sistema (Papel na Listahan)",
    comparisonGhostFreeHeader: "Ang Paraan ng GhostFree",

    // 4-Step Process Section
    stepsTag: "Apat na Madaling Hakbang",
    stepsTitle: "Paano Tumatanggap ng Ayuda ang Biktima",
    stepsSubtitle: "Pindutin ang mga hakbang sa ibaba upang makita ang proteksyon sa datos.",
    whatObserverSees: "Ang Sinusuri ng Sistema (Publiko)",
    whatStaysPrivate: "Ang Nananatili sa Iyo (Lihim)",

    // Bento 4 Core Guarantees
    bentoTag: "Apat na Pangunahing Garantiya",
    bentoTitle: "Idinisenyo para sa Ganap na Tiwala",
    bentoSubtitle: "Bawat pamilya at opisyal ay may garantisadong proteksyon laban sa pandaraya.",
    bentoPrivateTitle: "100% Pribado",
    bentoPrivateDesc: "Ang iyong National ID at PIN ay nananatili sa iyong telepono. Walang database na makakapag-leak ng datos.",
    bentoGhostTitle: "Walang Ghost Claims",
    bentoGhostDesc: "Bawat claim ay may one-time cryptographic lock. Kapag natanggap na, permanently sarado na.",
    bentoFreeTitle: "Libre para sa Pamilya",
    bentoFreeDesc: "Sagot ng munisipyo ang lahat ng technical fees. Walang babayarang piso ang nasalanta.",
    bentoAuditTitle: "Bukas sa Pagsusuri ng Publiko",
    bentoAuditDesc: "Maaaring suriin ng COA at mamamayan ang bawat piso sa live dashboard nang walang pangalang inilalantad.",

    // Laws & Compliance
    lawsTag: "Pagsunod sa Batas ng Pilipinas",
    lawsTitle: "Umaayon sa Batas ng Pamahalaan",
    lawsSubtitle: "Sumusunod ang GhostFree sa pamantayan ng COA at karapatan sa data privacy.",
    govAuditCompliant: "Umaayon sa Audit ng Pamahalaan",

    // FAQs Section
    faqTitle: "Mga Karaniwang Tanong",
    faqSubtitle: "Diretsong sagot tungkol sa account, privacy, at pamamahagi ng ayuda.",

    // Bottom CTA
    ctaTitle: "Handa Ka Bang Mamahagi ng Ayuda nang Walang Ghost Claims?",
    ctaSubtitle: "Subukan ang live claim portal sa Midnight Preprod, o libutin ang command center ng munisipyo ngayon.",
    ctaClaimBtn: "Mag-claim ng Ayuda bilang Mamamayan",
    ctaAdminBtn: "Mag-login bilang Opisyal ng Munisipyo",

    // Additional Filipino Keys
    advisoryBadge: "PAUNAWANG KALAMIDAD",
    advisoryMarquee: "🚨 RELIEF SA BAGYO AKTIBO: Region II & IV-A evacuation centers kwalipikado sa ₱5,000 emergency ayuda. Libreng gas fees sagot ng DRRM.",
    headerTagline: "Ligtas na Ayuda. Walang Ghost Beneficiaries.",
    claimAyudaButton: "Kumuha ng Ayuda (₱5,000)",
    lguDrrmButton: "LGU DRRM",
    verifyVoucherButton: "I-verify ang Voucher",
    tourGuideButton: "Gabay / Tour",

    // Landing Hero & Badges
    heroBadge: "🚨 Quick Response Fund: ₱5,000 Payout Bawat Pamilya",
    heroHeadline1: "Ligtas na Ayuda.",
    heroHeadlineHighlight: "Walang Ghost Beneficiaries.",
    heroHeadline2: "Walang Pahirap.",
    heroSubtitleText: "Privacy-first emergency cash aid distribution sa Midnight Network. Direktang tulong sa nasalanta nang hindi inilalantad ang personal na National ID o nakakaltasan ng bayad.",
    heroClaimBtn: "Kumuha ng Ayuda (Claim ₱5,000)",
    heroTreasuryBtn: "Pampublikong Pondo (COA Explorer)",
    heroVerifyBtn: "I-verify ang Relief Voucher",
    heroVoiceBtn: "Pakinggan ang Gabay (Voice)",
    heroVoiceStop: "Ihinto ang Boses",
    searchBarangayPlaceholder: "Suriin ang iyong barangay (hal. San Roque, Gonzaga)...",
    checkButton: "Suriin",
    assuranceId: "100% Lihim ang ID",
    assuranceIdSub: "Zero-Knowledge",
    assuranceGas: "Libre ang Gas Fees",
    assuranceGasSub: "0 tDUST gastusin",
    assuranceGhost: "Bawal ang Doble",
    assuranceGhostSub: "Anti-Ghost Nullifier",
    assuranceCoa: "COA Compliant",
    assuranceCoaSub: "R.A. 10121 DRRM",

    // Relief Basket
    basketTag: "Paano Makatutulong ang Ayuda",
    basketTitle: "Saan Napupunta ang ₱5,000 Emergency Calamity Cash Aid?",
    basketSubtitle: "Binuo ayon sa pamantayan ng DSWD Disaster Response Management Bureau (DRMB) upang matustusan ang pangangailangan ng isang pamilya sa unang 21 araw ng kalamidad.",
    basketRiceName: "25kg NFA Well-Milled Rice",
    basketRiceTag: "Bigas para sa 3 linggo",
    basketRiceDesc: "Sapat na pangunahing pagkain para sa isang pamilyang may 5 miyembro sa buong emergency period.",
    basketFoodName: "DSWD Family Food Packs",
    basketFoodTag: "Canned Goods, Noodles, Kape",
    basketFoodDesc: "12 latang sardinas at corned beef, 10 packs instant noodles, cereal drink, at kape para sa almusal at hapunan.",
    basketWaterName: "Clean Water & Hygiene Kit",
    basketWaterTag: "Malinis na Tubig & Sanitation",
    basketWaterDesc: "2x 5-gallon purified drinking water containers, sabon, shampoo, toothpaste, sanitary napkins, at bleach.",
    basketMedName: "Emergency First Aid & Medicine",
    basketMedTag: "Paracetamol, Gamot, Antiseptic",
    basketMedDesc: "Paracetamol para sa lagnat, oral rehydration salts para sa dehydration, band-aids, betadine, at alcohol.",
    basketShelterName: "Emergency Shelter Repair Kit",
    basketShelterTag: "Trapal, Lubid, Pako",
    basketShelterDesc: "Mabigat na trapal (tarpaulin), nylon rope, at pako upang pansamantalang protektahan ang nawasak na bubong.",
    basketTotalLabel: "Kabuuang Emergency Relief Package",
    basketTotalPerFamily: "₱5,000.00 Ayuda Assistance bawat Kwalipikadong Pamilya",
    basketClaimBtn: "Simulan ang Claim (₱5,000)",

    // Evacuation Directory
    evacTag: "Aktibong Operasyon ng NDRRMO",
    evacTitle: "Mga Akreditadong Evacuation Center sa Northern Luzon",
    evacSubtitle: "Real-time on-chain telemetry ng mga evacuation sites na may aktibong GhostFree smart contract disbursement.",
    evacDisbursedLabel: "Pondo Naipamahagi:",
    evacFamiliesLabel: "pamilya",
    evacActivelyDisbursing: "Aktibong Namamahagi",
    evacFullyDisbursed: "100% Ganap na Naipamahagi",
    evacZeroGhost: "0 Ghost Claims",

    // 30-Sec Eligibility Checker
    checkerTitle: "30-Segundong Pagsusuri ng Kwalipikasyon",
    checkerSubtitle: "Tingnan kung ang iyong barangay o bayan ay may aktibong emergency relief declaration bago mag-claim:",
    checkerPlaceholder: "I-type ang iyong Barangay o Bayan (hal. Brgy. San Roque, Gonzaga)",
    checkerButton: "Suriin ang Lugar",
    checkerExamples: "Mga halimbawa:",
    checkerEligibleTitle: "KWALIPIKADO ANG IYONG LUGAR!",
    checkerEligibleSub: "May aktibong emergency ayuda bawat pamilya sa ilalim ng deklaradong QRF.",
    checkerClaimNow: "I-claim ang Ayuda Ngayon",

    // Comparison Headers & Items
    compareOldWayHeader: "❌ Tradisyunal na Ayuda Distribution",
    compareGhostFreeHeader: "✅ GhostFree sa Midnight Network",
    compareFeature1: "Bilis ng Pagkuha ng Ayuda",
    compareOld1: "Oras ng pagpila sa init ng araw o ulan sa evacuation center",
    compareNew1: "30 segundo sa iyong telepono na may agarang pondo",
    compareFeature2: "Proteksyon sa Pagkakakilanlan",
    compareOld2: "Nakasulat ang buong pangalan at National ID sa bukas na papel",
    compareNew2: "100% pribado gamit ang Zero-Knowledge cryptography",
    compareFeature3: "Pandaraya at Ghost Beneficiaries",
    compareOld3: "Mga tiwaling middleman at pekeng pangalan na nagnanakaw ng pondo",
    compareNew3: "Imposible. Awtomatikong hinaharang ng anti-ghost nullifier",
    compareFeature4: "Pampublikong Audit (COA Compliance)",
    compareOld4: "Mga resibong papel at spreadsheet na buwan bago ma-audit",
    compareNew4: "Real-time COA dashboard na sumusubaybay sa bawat piso",
    compareFeature5: "Gastos ng Biktima ng Kalamidad",
    compareOld5: "Nagbabayad ng pamasahe, photocopy, at transaction charges",
    compareNew5: "₱0 gastos. Sagot ng DRRM ang lahat ng gas execution fees",

    // FAQs
    faqSectionTag: "Mga Karaniwang Tanong",
    faqSectionTitle: "Sagot para sa mga Mamamayan",
    faqQ1: "Kailangan ko ba ng cryptocurrency o kaalaman sa blockchain para makakuha ng ayuda?",
    faqA1: "Hindi! Ginawa ang GhostFree para sa ordinaryong mamamayan. Ilagay lamang ang iyong PhilSys ID at 4-digit PIN mula sa evacuation center slip, at matatanggap mo na ang iyong pondo nang walang bayad.",
    faqQ2: "Paano nasisiguro ng GhostFree na walang makakakita sa aking National ID?",
    faqA2: "Gumagamit ang GhostFree ng Zero-Knowledge cryptography sa Midnight Network. Ang iyong telepono mismo ang nagpapatunay na ikaw ay nasa listahan nang hindi ipinapadala ang iyong ID o pangalan sa internet.",
    faqQ3: "Paano kung mahina ang signal o walang internet sa evacuation center?",
    faqA3: "May Disaster Resilience Mode ang GhostFree na nagse-save ng draft state sa iyong telepono at awtomatikong nagpapadala kapag nagkaroon muli ng koneksyon. Mayroon ding printable voucher para sa physical checkpoint gates.",
    faqQ4: "Ano ang ginagawa ng anti-ghost nullifier?",
    faqA4: "Bawat pamilya ay may natatanging cryptographic code na tinatawag na 'nullifier'. Kapag nakuha mo na ang iyong ayuda, minamarkahan ito sa blockchain. Hindi maaaring kunin muli ng sinuman ang iyong ayuda.",
    faqQ5: "Maaari ba itong gamitin ng mga lolo, lola, o may kapansanan (PWD)?",
    faqA5: "Oo! Mayroong built-in na Voice Assistant na nagbabasa ng panuto sa Tagalog, 3-level Text Scaling (hanggang 150%), at Sunlight Outdoor Mode para sa maliwanag na sikat ng araw.",

    // Claim Portal
    claimQrfActive: "Aktibong QRF",
    claimTyphoonTitle: "Ayuda sa Bagyong Marce",
    claimPerFamily: "/ bawat pamilya",
    claimFreeAssurance: "100% Libre · Zero Gas Fees · Hindi nakikita ng iba ang iyong personal na ID",
    claimVoiceBtn: "Pakinggan ang Gabay (Voice)",
    claimVoiceStop: "Ihinto ang Boses",
    step1Title: "Simulan ang Pag-claim ng Ayuda",
    step1Subtitle: "Piliin kung nais mong kumonekta gamit ang Midnight Lace Wallet o subukan gamit ang 1-Click Evaluator Sandbox.",
    step1SandboxTitle: "Evaluator & Reviewer 1-Click Sandbox Mode",
    step1SandboxDesc: "Nais mo bang subukan kaagad ang buong ZK circuit nang hindi nag-i-install ng Lace browser extension?",
    step1SandboxBtn: "I-launch ang Evaluator Sandbox (1-Click)",
    step1LaceBtn: "Konekta gamit ang Midnight Lace Wallet",
    step1Connecting: "Kumokonekta sa Lace Wallet...",
    step1GasNotice: "Sagot ng LGU Disaster Escrow ang lahat ng gas fees (₱0 / 0 tDUST gastusin).",
    step2Title: "Ipasok ang Iyong Impormasyon",
    step2Subtitle: "Mananatiling lihim sa loob ng iyong telepono ang mga numerong ito.",
    step2WalletLabel: "Konektadong Wallet:",
    step2IdLabel: "1. PhilSys National ID Number",
    step2IdPlaceholder: "Halimbawa: PSN-2024-8849-1102",
    step2PinLabel: "2. 4-Digit Secret PIN (mula sa Barangay Relief Slip)",
    step2ShowPin: "Ipakita",
    step2HidePin: "Itago",
    step2KeypadClear: "Burahin",
    step2KeypadHelper: "Gamitin ang touch keypad para sa PIN",
    step2Proceed: "Bumuo ng Pribadong Patunay",
    step3Title: "Bumubuo ng Zero-Knowledge Proof",
    step3Subtitle: "Sinisuri ang Merkle inclusion at kinakalkula ang anti-ghost nullifier nang lokal sa iyong device...",
    step3RadarTag: "Ligtas na ZK",
    step3MathProof: "Bumubuo ng mathematical zero-knowledge proof...",
    step3CheckingNullifier: "Sinisigurong hindi pa nagagamit ang nullifier...",
    step3Disbursing: "Naglilipat ng pondo mula sa escrow...",
    step4Title: "Matagumpay na Naipamahagi ang Ayuda!",
    step4Subtitle: "Naipadala na ang 5,000 tNIGHT sa iyong wallet. I-download ang iyong opisyal na relief voucher sa ibaba.",
    step4DisbursedLabel: "Halaga ng Naipamahagi",
    step4TxHash: "Selyo ng Transaksyon",
    step4NullifierHash: "Cryptographic Nullifier",
    step4DownloadVoucher: "I-download ang Opisyal na Voucher (.PNG)",
    step4Share: "Ibahagi ang Katibayan",
    step4Feedback: "Magpadala ng Puna",

    // Treasury Explorer
    treasuryTitle: "Public Calamity Treasury & Audit Explorer",
    treasurySubtitle: "Real-time disaster relief fund telemetry & COA compliance under Philippine R.A. 10121 & R.A. 10173",
    downloadCoa: "I-download ang COA Audit (.CSV)",
    audioBriefing: "Gabay sa Boses (Audio)",
    statAllocated: "Kabuuang Naka-allocate na QRF",
    statAllocatedSub: "Ginagarantiyahan ng Ordinansa ng Bayan",
    statDisbursed: "Naipamahagi sa mga Biktima",
    statDisbursedSub: "mga beripikadong claim na natugunan",
    statRemaining: "Natitirang Reserba sa Escrow",
    statRemainingSub: "Naka-lock sa Compact smart contract escrow",
    statBlocked: "Dobleng Ghost Claims Naharang",
    statBlockedSub: "100% naharang ng anti-ghost nullifier",
    statSpeed: "Bilis ng Pagpapatunay",
    statSpeedSub: "client-side WASM sa selpon",
    statGas: "Gastusin ng Mamamayan",
    statGasSub: "0.00 tDUST (100% Sagot ng Munisipyo)",
    statPrivacy: "Proteksyon sa Pagkakakilanlan",
    statPrivacySub: "0 Personal na ID ang Ibinunyag",
    quorumTitle: "Aktibong Operasyon ng Kalamidad at Quorum Status ng Munisipyo",
    quorumSubtitle: "Kailangang aprubahan ng DRRM Officer at Municipal Treasurer bago mailabas ang pondo.",
    colOperation: "OPERASYON AT ID",
    colAllocated: "NAKA-ALLOCATE NA PONDO",
    colDisbursed: "NAIPAMAHAGI / NATITIRA",
    colDrrm: "KAPAHINTULUTAN NG DRRM OFFICER",
    colTreasurer: "KAPAHINTULUTAN NG MUNICIPAL TREASURER",
    colQuorum: "QUORUM STATUS",
    registryTitle: "Anonymous Nullifier Registry (Spent Commitments)",
    registrySubtitle: "Bawat nullifier ay kumakatawan sa naipamahaging ayuda nang hindi inilalantad ang pangalan ng biktima.",
  },

  ceb: {
    appName: "GhostFree",
    tagline: "Hunonga ang mga multo. Panalipdi ang katawhan.",
    treasury: "Pundo",
    tour: "Giya",
    verifyVoucher: "Susiha ang Voucher",
    giveFeedback: "Panglantaw / Puna",
    howItWorks: "Giunsa Paglihok",
    publicTreasury: "Pampublikong Pundo",
    privacyModel: "Proteksyon sa Pribadong Datos (ZK)",

    // Claim Flow Steps
    stepConnect: "Ikonektar",
    stepVerify: "Susiha",
    stepProve: "Pamatud-i",
    stepResult: "Resulta",

    // Step 1: Connect
    connectTitle: "Ikonektar ang Midnight Lace Wallet",
    connectDesc: "Ikonektar ang imong Lace wallet sa Midnight Preprod aron direktang madawat ang pundo sa hinabang.",
    connectButton: "Ikonektar ang Lace Wallet",
    connecting: "Nagkonektar sa Lace...",
    walletConnected: "Konektado ang Wallet",
    noLaceDetected: "Wala makit-i ang Lace wallet extension. Palihug i-install ang Midnight Lace aron makapadayon.",

    // Step 2: Credentials
    credentialsTitle: "Pribadong Pagsusi sa Kwalipikasyon",
    credentialsDesc: "Isulod ang imong PhilSys Resident ID ug 6-digit Secret PIN. Kining mga numeroha magpabilin ra sa imong telepono.",
    residentIdLabel: "PhilSys Resident ID",
    residentIdPlaceholder: "pananglitan: PH-NCR-2026-0081",
    pinLabel: "6-Digit Lihim nga PIN",
    pinPlaceholder: "••••••",
    privacyNotice: "Soberanya sa Datos: Ang imong PIN ug resident ID ginaproseso lamang sa sulod sa imong telepono. Walay bisan unsa nga sensitibong datos ang mogawas sa internet.",
    proceedToProof: "Paghimo og Pribadong Patunay",

    // Step 3: Proving
    provingTitle: "Naghimo og Zero-Knowledge Proof",
    provingDesc: "Ginasusi ang Merkle inclusion ug gikalkula ang anti-ghost nullifier sa imong telepono...",
    provingProgress: "Progreso sa Pagsusi",
    provingDisclaimer: "Gikalkula ang cryptographic constraints. Walay personal nga pagkatawo ang ipadayag.",

    // Step 4: Result
    resultSuccessTitle: "Malamposong Na-apod-apod ang Hinabang!",
    resultSuccessDesc: "Na-verify sa Midnight Preprod smart contract ang imong cryptographic proof. Nabalhin na ang imong pundo.",
    resultFailedTitle: "Wala Molampos ang Pag-claim",
    amountDisbursed: "Gidaghanon sa Hinabang",
    transactionHash: "Transaction Hash",
    nullifierHash: "Cryptographic Nullifier",
    viewReceipt: "Tan-awa ug I-download ang Resibo",
    claimAnother: "Balik sa Claim Portal",

    // Receipts & Common
    receiptTitle: "Kumpidensyal nga Voucher sa Hinabang",
    receiptSubtitle: "Ipakita kining voucher sa mga checkpoint o relief table sa barangay",
    close: "Sirad-i",
    printVoucher: "I-print / I-export ang Voucher",
    verifiedValid: "Beripikadong Balido",
    alreadyClaimedError: "Kining maong pagkatawo nakadawat na og hinabang alang niining operasyon sa hinabang.",

    // Landing Page Navigation & Hero
    navClaimAid: "Pag-claim og Hinabang",
    navGovPortal: "Portal sa Kagamhanan",
    navLivePreprod: "Aktibo sa Preprod",
    navZeroGhostSub: "Walay Ghost Claims · Hinabang sa Kalamidad",
    releasePillText: "Nasulayan ug Aktibo sa Preprod · 75 Beripikadong Partisipante ug Walay Tagas sa Datos",
    heroTitlePrefix: "Hunonga ang mga Multo.",
    heroTitleSuffix: "Panalipdi ang Katawhan.",
    heroSubtitle: "Usa ka luwas nga plataporma sa hinabang diin ang mga biktima sa katalagman makadawat og tabang sulod sa pipila ka segundo. Ang imong ID magpabilin sa imong selpon, ug awtomatikong gibabagan ang balik-balik nga pag-claim.",
    claimEmergencyAid: "Pag-claim og Hinabang sa Kalamidad",
    localGovernmentPortal: "Portal sa Lokal nga Kagamhanan",

    // Telemetry HUD
    statFundsLocked: "Naka-lock nga Pundo sa Kalamidad",
    statFundsLockedSub: "Gipanalipdan sa Panalapi sa Lungsod",
    statGhostBlocked: "Nababagan nga Doble o Ghost Claims",
    statGhostBlockedSub: "Awtomatikong napugngan ang mga peke",
    statFamiliesHelped: "Beripikadong Pamilya nga Natabangan",
    statFamiliesHelpedSub: "Na-apod-apod nga 100% pribado",
    statDataLeaks: "Tagas sa Personal nga Datos",
    statDataLeaksSub: "Walay personal nga datos nga narekord",

    // Interactive Window
    livePreviewTag: "Aktibong Pagsulay sa Sistema",
    livePreviewTitle: "Susihon ang Plataporma sa Lihok",
    livePreviewSubtitle: "Tan-awa kon giunsa paggamit sa mga biktima, opisyal, ug auditor ang GhostFree nga walay kakulian.",
    tabCitizen: "Pag-claim sa Katawhan",
    tabAdmin: "Portal sa Munisipyo",
    tabTreasury: "Pampublikong Pagsusi",
    citizenTabTag: "Alang sa mga Biktima sa Katalagman ug Evacuees",
    citizenTabTitle: "Paspas ug Pribadong Hinabang sa Bisan Unsang Selpon",
    citizenTabDesc: "Walay username o password. Ikonektar ang pitaka, isulod ang PIN, ug dawata ang hinabang.",
    tryLiveClaim: "Sulayi ang Live Claim →",
    adminTabTag: "Alang sa mga Opisyal sa Munisipyo ug DRRM",
    adminTabTitle: "Command Center sa Lokal nga Kagamhanan",
    adminTabDesc: "Pag-upload og lista, pagpatuman og dual-approval, ug pugngi ang korapsyon.",
    openGovPortal: "Ablihi ang Portal sa Kagamhanan →",
    treasuryTabTag: "Bukas nga Pagsusi ug Audit",
    treasuryTabTitle: "Subaya ang Matag Piso nga Luwas ang Ngalan",
    treasuryTabDesc: "Hingpit nga pampublikong transparency alang sa katawhan ug auditor.",
    viewLiveTreasury: "Tan-awa ang Live Treasury →",

    // Comparison Section
    comparisonTag: "Nganong Importante ang GhostFree",
    comparisonTitle: "Ang Karaang Paagi vs. Ang GhostFree",
    comparisonSubtitle: "Tan-awa kon giunsa pagsulbad sa modernong civic tech ang dekada nga korapsyon sa hinabang.",
    comparisonAspect: "Aspeto",
    comparisonOldWayHeader: "Ang Karaang Paagi (Papel nga Listahan)",
    comparisonGhostFreeHeader: "Ang Paagi sa GhostFree",

    // 4-Step Process Section
    stepsTag: "Upat ka Sayon nga Lakang",
    stepsTitle: "Giunsa Pagdawat sa Biktima ang Hinabang",
    stepsSubtitle: "Pindota ang mga lakang sa ubos aron makita ang proteksyon sa datos.",
    whatObserverSees: "Ang Ginasusi sa Sistema (Publiko)",
    whatStaysPrivate: "Ang Magpabilin Kanimo (Lihim)",

    // Bento 4 Core Guarantees
    bentoTag: "Upat ka Pangunang Garantiya",
    bentoTitle: "Gidisenyo alang sa Hingpit nga Salig",
    bentoSubtitle: "Matag pamilya ug opisyal dunay garantisadong proteksyon batok sa pagpanikas.",
    bentoPrivateTitle: "100% Pribado",
    bentoPrivateDesc: "Ang imong National ID ug PIN magpabilin sa imong telepono. Walay database nga makapadayag sa datos.",
    bentoGhostTitle: "Walay Ghost Claims",
    bentoGhostDesc: "Matag claim dunay one-time cryptographic lock. Kon madawat na, permanente kining masirado.",
    bentoFreeTitle: "Libre alang sa mga Pamilya",
    bentoFreeDesc: "Abagahon sa munisipyo ang tanang technical fees. Walay ibayad bisan usa ka dako ang apektado.",
    bentoAuditTitle: "Bukas sa Pagsusi sa Publiko",
    bentoAuditDesc: "Mahimong susihon sa COA ug katawhan ang matag piso sa live dashboard nga walay ngalan nga mapadayag.",

    // Laws & Compliance
    lawsTag: "Pagsunod sa Balaod sa Pilipinas",
    lawsTitle: "Nahiuyon sa Balaod sa Kagamhanan",
    lawsSubtitle: "Nahiuyon ang GhostFree sa sumbanan sa COA ug katungod sa data privacy.",
    govAuditCompliant: "Nahiuyon sa Sumbanan sa Audit",

    // FAQs Section
    faqTitle: "Mga Kasagarang Pangutana",
    faqSubtitle: "Diretsong tubag mahitungod sa mga account, pribasiya, ug pag-apod-apod sa pundo.",

    // Bottom CTA
    ctaTitle: "Andam Na Ba Ka Moapod-apod og Hinabang nga Walay Ghost Claims?",
    ctaSubtitle: "Sulayi ang live claim portal sa Midnight Preprod, o susiha ang command center sa lokal nga kagamhanan karon.",
    ctaClaimBtn: "Mag-claim og Hinabang isip Katawhan",
    ctaAdminBtn: "Mag-login isip Opisyal sa Munisipyo",

    // Additional Cebuano Keys
    advisoryBadge: "PAHIBALO SA KALAMIDAD",
    advisoryMarquee: "🚨 AYUDA SA BAGYO AKTIBO: Region II & IV-A evacuation centers kwalipikado sa ₱5,000 emergency hinabang. Libreng gas fees abagahon sa DRRM.",
    headerTagline: "Luwag nga Hinabang. Walay Ghost Beneficiaries.",
    claimAyudaButton: "Pag-claim og Ayuda (₱5,000)",
    lguDrrmButton: "LGU DRRM",
    verifyVoucherButton: "Susiha ang Voucher",
    tourGuideButton: "Giya / Tour",

    // Landing Hero & Badges
    heroBadge: "🚨 Quick Response Fund: ₱5,000 Hinabang Matag Pamilya",
    heroHeadline1: "Luwag nga Ayuda.",
    heroHeadlineHighlight: "Walay Ghost Beneficiaries.",
    heroHeadline2: "Walay Hasol.",
    heroSubtitleText: "Privacy-first emergency cash aid distribution sa Midnight Network. Direktang tabang sa mga biktima nga dili kinahanglan ibutyag ang National ID o mabuhisan og gas fees.",
    heroClaimBtn: "Kuhaa ang Ayuda (Claim ₱5,000)",
    heroTreasuryBtn: "Pampublikong Pundo (COA Explorer)",
    heroVerifyBtn: "Susiha ang Relief Voucher",
    heroVoiceBtn: "Paminawa ang Giya (Voice)",
    heroVoiceStop: "Hunonga ang Tingog",
    searchBarangayPlaceholder: "Susiha ang imong barangay (pananglitan: San Roque, Gonzaga)...",
    checkButton: "Susiha",
    assuranceId: "100% Tinago ang ID",
    assuranceIdSub: "Zero-Knowledge",
    assuranceGas: "Libre ang Gas Fees",
    assuranceGasSub: "0 tDUST gasto",
    assuranceGhost: "Dili Pwede ang Doble",
    assuranceGhostSub: "Anti-Ghost Nullifier",
    assuranceCoa: "COA Compliant",
    assuranceCoaSub: "R.A. 10121 DRRM",

    // Relief Basket
    basketTag: "Unsaon Pagtabang sa Ayuda",
    basketTitle: "Asa Mopaingon ang ₱5,000 Emergency Calamity Cash Aid?",
    basketSubtitle: "Gibuhat subay sa sumbanan sa DSWD Disaster Response Management Bureau aron matubag ang panginahanglan sa usa ka pamilya sulod sa unang 21 ka adlaw sa kalamidad.",
    basketRiceName: "25kg NFA Well-Milled Bugas",
    basketRiceTag: "Bugas alang sa 3 ka semana",
    basketRiceDesc: "Pangunang pagkaon alang sa pamilyang dunay 5 ka sakop sulod sa unang panahon sa katalagman.",
    basketFoodName: "DSWD Family Food Packs",
    basketFoodTag: "Delata, Noodles, Kape",
    basketFoodDesc: "12 ka latang sardinas ug corned beef, 10 ka pakete sa instant noodles, cereal drinks, ug kape.",
    basketWaterName: "Clean Water & Hygiene Kit",
    basketWaterTag: "Limpyong Tubig & Panglimpyo",
    basketWaterDesc: "2x 5-gallon purified drinking water containers, sabon, shampoo, toothpaste, sanitary napkins, ug bleach.",
    basketMedName: "Emergency First Aid & Tambal",
    basketMedTag: "Paracetamol, Tambal, Antiseptic",
    basketMedDesc: "Paracetamol alang sa hilanat, oral rehydration salts batok dehydration, band-aids, betadine, ug alcohol.",
    basketShelterName: "Emergency Shelter Repair Kit",
    basketShelterTag: "Trapal, Pisi, Lansang",
    basketShelterDesc: "Bagang trapal (tarpaulin), lig-ong pisi, ug lansang aron temporaryong masalipdan ang naguba nga atop.",
    basketTotalLabel: "Kinatibuk-ang Emergency Relief Package",
    basketTotalPerFamily: "₱5,000.00 Hinabang matag Kwalipikadong Pamilya",
    basketClaimBtn: "Sugdi ang Pag-claim (₱5,000)",

    // Evacuation Directory
    evacTag: "Aktibong Operasyon sa NDRRMO",
    evacTitle: "Mga Akreditadong Evacuation Center sa Amihanang Luzon",
    evacSubtitle: "Real-time on-chain telemetry sa mga evacuation sites nga dunay aktibong pag-apod-apod sa GhostFree smart contract.",
    evacDisbursedLabel: "Pundo Na-apod-apod:",
    evacFamiliesLabel: "pamilya",
    evacActivelyDisbursing: "Aktibong Nag-apod-apod",
    evacFullyDisbursed: "100% Hingpit Na-apod-apod",
    evacZeroGhost: "0 Ghost Claims",

    // 30-Sec Eligibility Checker
    checkerTitle: "30-Segundos nga Pagsusi sa Kwalipikasyon",
    checkerSubtitle: "Susiha kon ang imong barangay o lungsod dunay aktibong deklarasyon sa hinabang sa kalamidad sa dili pa mag-claim:",
    checkerPlaceholder: "I-type ang imong Barangay o Lungsod (pananglitan: Brgy. San Roque, Gonzaga)",
    checkerButton: "Susiha ang Lugar",
    checkerExamples: "Mga pananglitan:",
    checkerEligibleTitle: "KWALIPIKADO ANG IMONG LUGAR!",
    checkerEligibleSub: "Dunay aktibong hinabang matag pamilya ubos sa gideklarar nga QRF.",
    checkerClaimNow: "I-claim ang Hinabang Karon",

    // Comparison Headers & Items
    compareOldWayHeader: "❌ Tradisyonal nga Pag-apod-apod sa Ayuda",
    compareGhostFreeHeader: "✅ GhostFree sa Midnight Network",
    compareFeature1: "Kalaksi sa Pagdawat sa Hinabang",
    compareOld1: "Mga oras sa paglinya ilawom sa init o ulan sa evacuation center",
    compareNew1: "30 segundos sa imong telepono nga dunay diha-diha nga pundo",
    compareFeature2: "Proteksyon sa Pagkatawo",
    compareOld2: "Nakasulat ang tibuok ngalan ug National ID sa bukas nga papel",
    compareNew2: "100% pribado gamit ang Zero-Knowledge cryptography",
    compareFeature3: "Panikas ug Ghost Beneficiaries",
    compareOld3: "Mga kawatan nga middleman ug pekeng ngalan nga nangawat sa pundo",
    compareNew3: "Imposible. Awtomatikong gibabagan sa anti-ghost nullifier",
    compareFeature4: "Pampublikong Audit (COA Compliance)",
    compareOld4: "Mga resibo nga papel nga abtan og mga bulan una ma-audit",
    compareNew4: "Real-time COA dashboard nga nagsubay sa matag piso",
    compareFeature5: "Gasto sa Biktima sa Katalagman",
    compareOld5: "Nagbayad og plete, photocopy, ug transaction service charges",
    compareNew5: "₱0 gasto. Sagubangon sa DRRM ang tanang gas execution fees",

    // FAQs
    faqSectionTag: "Mga Kasagarang Pangutana",
    faqSectionTitle: "Tubag alang sa Katawhan",
    faqQ1: "Kinahanglan ba ko og cryptocurrency o kahibalo sa blockchain aron makadawat og ayuda?",
    faqA1: "Dili! Gidisenyo ang GhostFree alang sa ordinaryong katawhan. Isulod lamang ang imong PhilSys ID ug 4-digit PIN gikan sa evacuation slip, ug madawat nimo ang pundo nga walay bayad.",
    faqQ2: "Giunsa pagsiguro sa GhostFree nga walay makakita sa akong National ID?",
    faqA2: "Gigamit sa GhostFree ang Zero-Knowledge cryptography sa Midnight Network. Ang imong telepono mismo ang mopamatuod nga anaa ka sa lista nga dili ipadala ang imong ID o ngalan sa internet.",
    faqQ3: "Unsaon man kon hinay ang signal o walay internet sa evacuation center?",
    faqA3: "Dunay Disaster Resilience Mode ang GhostFree nga mag-save sa transaction sa imong telepono ug awtomatikong mopadala kon mobalik na ang koneksyon. Dunay printable voucher sab alang sa mga checkpoint.",
    faqQ4: "Unsa ang gibuhat sa anti-ghost nullifier?",
    faqA4: "Matag pamilya dunay talagsaong cryptographic code nga gitawag og 'nullifier'. Sa higayon nga makuha na nimo ang hinabang, markahan kini sa blockchain. Dili na makuha pag-usab ni bisan kinsa.",
    faqQ5: "Magamit ba kini sa mga lolo, lola, o mga may kakulian (PWD)?",
    faqA5: "Oo! Dunay built-in Voice Assistant nga nagbasa sa panudlo, 3-level Text Scaling (hangtod 150%), ug Sunlight Outdoor Mode alang sa hayag nga silaw sa adlaw.",

    // Claim Portal
    claimQrfActive: "Aktibong QRF",
    claimTyphoonTitle: "Hinabang sa Bagyong Marce",
    claimPerFamily: "/ matag pamilya",
    claimFreeAssurance: "100% Libre · Zero Gas Fees · Protektado ang imong personal nga ID pinaagi sa ZK",
    claimVoiceBtn: "Paminawa ang Giya (Voice)",
    claimVoiceStop: "Hunonga ang Tingog",
    step1Title: "Sugdi ang Pag-claim sa Hinabang",
    step1Subtitle: "Pilia kon gusto nimo mokonektar gamit ang Midnight Lace Wallet o sulayan pinaagi sa 1-Click Evaluator Sandbox.",
    step1SandboxTitle: "Evaluator & Reviewer 1-Click Sandbox Mode",
    step1SandboxDesc: "Gusto ba nimong sulayan dayon ang tibuok ZK circuit nga dili mag-install og Lace extension?",
    step1SandboxBtn: "I-launch ang Evaluator Sandbox (1-Click)",
    step1LaceBtn: "Ikonektar gamit ang Midnight Lace Wallet",
    step1Connecting: "Nagkonektar sa Lace Wallet...",
    step1GasNotice: "Abagahon sa LGU Disaster Escrow ang tanang gas fees (₱0 / 0 tDUST gasto).",
    step2Title: "Isulod ang Imong Impormasyon",
    step2Subtitle: "Magpabilin kining tinago sa sulod sa imong telepono.",
    step2WalletLabel: "Konektadong Pitaka:",
    step2IdLabel: "1. Numero sa PhilSys National ID",
    step2IdPlaceholder: "Pananglitan: PSN-2024-8849-1102",
    step2PinLabel: "2. 4-Digit Secret PIN (gikan sa Barangay Relief Slip)",
    step2ShowPin: "Ipakita",
    step2HidePin: "Itago",
    step2KeypadClear: "Papasa",
    step2KeypadHelper: "Gamita ang touch keypad alang sa PIN",
    step2Proceed: "Paghimo og Pribadong Patunay",
    step3Title: "Naghimo og Zero-Knowledge Proof",
    step3Subtitle: "Gisusi ang Merkle inclusion ug gikalkula ang anti-ghost nullifier sa imong telepono...",
    step3RadarTag: "Luwag nga ZK",
    step3MathProof: "Naghimo og mathematical zero-knowledge proof...",
    step3CheckingNullifier: "Gisiguro nga wala pa magamit ang nullifier...",
    step3Disbursing: "Nagbalhin sa pundo gikan sa escrow...",
    step4Title: "Malamposong Na-apod-apod ang Hinabang!",
    step4Subtitle: "Nabalhin na ang 5,000 tNIGHT sa imong pitaka. I-download ang imong opisyal nga relief voucher sa ubos.",
    step4DisbursedLabel: "Gidaghanon sa Na-apod-apod",
    step4TxHash: "Selyo sa Transaksyon",
    step4NullifierHash: "Cryptographic Nullifier",
    step4DownloadVoucher: "I-download ang Opisyal nga Voucher (.PNG)",
    step4Share: "Ipaambit ang Katibayan",
    step4Feedback: "Pagpadala og Puna",

    // Treasury Explorer
    treasuryTitle: "Public Calamity Treasury & Audit Explorer",
    treasurySubtitle: "Real-time disaster relief fund telemetry & COA compliance under Philippine R.A. 10121 & R.A. 10173",
    downloadCoa: "I-download ang COA Audit (.CSV)",
    audioBriefing: "Giya sa Tingog (Audio)",
    statAllocated: "Kinatibuk-ang Gi-allocate nga QRF",
    statAllocatedSub: "Gigarantiya sa Ordinansa sa Lungsod",
    statDisbursed: "Na-apod-apod sa mga Biktima",
    statDisbursedSub: "mga beripikadong claim nga natubag",
    statRemaining: "Nabilin nga Reserba sa Escrow",
    statRemainingSub: "Naka-lock sa Compact smart contract escrow",
    statBlocked: "Dobleng Ghost Claims Nababagan",
    statBlockedSub: "100% nababagan sa anti-ghost nullifier",
    statSpeed: "Kalaksi sa Pagsusi",
    statSpeedSub: "client-side WASM sa selpon",
    statGas: "Gasto sa Katawhan",
    statGasSub: "0.00 tDUST (100% Abagahon sa Munisipyo)",
    statPrivacy: "Proteksyon sa Pagkatawo",
    statPrivacySub: "0 Personal nga ID ang Gipadayag",
    quorumTitle: "Aktibong Operasyon sa Katalagman ug Quorum Status sa Munisipyo",
    quorumSubtitle: "Kinahanglan aprubahan sa DRRM Officer ug Municipal Treasurer sa dili pa ipagawas ang pundo.",
    colOperation: "OPERASYON UG ID",
    colAllocated: "GI-ALLOCATE NGA PUNDO",
    colDisbursed: "NA-APOD-APOD / NABILIN",
    colDrrm: "PAGTUGOT SA DRRM OFFICER",
    colTreasurer: "PAGTUGOT SA MUNICIPAL TREASURER",
    colQuorum: "QUORUM STATUS",
    registryTitle: "Anonymous Nullifier Registry (Spent Commitments)",
    registrySubtitle: "Matag nullifier nagrepresentar sa na-apod-apod nga hinabang nga wala gipadayag ang ngalan sa biktima.",
  },
};

let currentInMemoryLang: SupportedLanguage = "en";
type LanguageListener = (lang: SupportedLanguage) => void;
const listeners: Set<LanguageListener> = new Set();

export function getStoredLanguage(): SupportedLanguage {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(I18N_STORAGE_KEY) as SupportedLanguage | null;
      if (saved && (saved === "en" || saved === "fil" || saved === "ceb")) {
        currentInMemoryLang = saved;
        return saved;
      }
    } catch {
      // ignore storage access errors
    }
  }
  return currentInMemoryLang;
}

export function setLanguage(lang: SupportedLanguage): void {
  currentInMemoryLang = lang;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(I18N_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }
  listeners.forEach((listener) => listener(lang));
}

export function subscribeLanguageChange(listener: LanguageListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function t(key: string, lang?: SupportedLanguage): string {
  const currentLang = lang || getStoredLanguage();
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

/**
 * Reactive React hook that subscribes to language changes
 * and returns translation function `t` and current language.
 */
export function useTranslation() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(getStoredLanguage());

  useEffect(() => {
    setCurrentLang(getStoredLanguage());
    return subscribeLanguageChange((newLang) => {
      setCurrentLang(newLang);
    });
  }, []);

  return {
    lang: currentLang,
    setLanguage,
    t: (key: string, fallback?: string) => {
      const val = t(key, currentLang);
      return val !== key ? val : (fallback !== undefined ? fallback : key);
    },
  };
}
