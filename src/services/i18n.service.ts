// ============================================
// GhostFree — Disaster Regional Dialect Localization
// Multi-language support: English, Filipino (Tagalog), Cebuano (Bisaya)
// Addresses feedback fb-user-008 for regional evacuation center claimants
// ============================================

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
    citizenTabDesc: "Walang username o password. Ikonekta ang wallet, ilagay ang PIN, tanggapin ang ayuda.",
    tryLiveClaim: "Subukan ang Live Claim Flow →",
    adminTabTag: "Para sa mga Opisyal ng Munisipyo at DRRM",
    adminTabTitle: "Emergency Command Center ng Pamahalaan",
    adminTabDesc: "Mag-upload ng listahan ng ayuda, magpatupad ng dual-officer approval, at pigilan ang pandaraya.",
    openGovPortal: "Buksan ang Portal ng Pamahalaan →",
    treasuryTabTag: "Bukas na Pamamahala at Pagsusuri ng Pondo",
    treasuryTabTitle: "Suriin ang Bawat Piso nang Walang Ibinubunyag na Pangalan",
    treasuryTabDesc: "Buong transparency para sa mamamayan, watchdogs, at mga auditor ng pamahalaan.",
    viewLiveTreasury: "Tingnan ang Live na Pondo →",

    // Comparison Section
    comparisonTag: "Bakit Mahalaga ang GhostFree",
    comparisonTitle: "Ang Lumang Paraan vs. Ang GhostFree",
    comparisonSubtitle: "Tingnan kung paano nilulutas ng makabagong teknolohiya ang korapsyon at pagkaantala sa pamamahagi ng ayuda.",
    comparisonAspect: "Aspeto",
    comparisonOldWayHeader: "Ang Lumang Paraan (Papel na Voucher)",
    comparisonGhostFreeHeader: "Ang Paraan ng GhostFree",

    // 4-Step Process Section
    stepsTag: "Madaling 4 na Hakbang",
    stepsTitle: "Paano Nakakatanggap ng Ayuda ang Mamamayan",
    stepsSubtitle: "Pindutin ang bawat hakbang upang makita kung paano magkasamang nagpoprotekta ang privacy at seguridad.",
    whatObserverSees: "Ang Sinusuri ng Sistema (Publiko)",
    whatStaysPrivate: "Ang Mananatili sa Iyo (Pribado)",

    // Bento 4 Core Guarantees
    bentoTag: "Apat na Pangunahing Garantiya",
    bentoTitle: "Itinayo para sa Buong Tiwala",
    bentoSubtitle: "Bawat biktima ng kalamidad at opisyal ay may garantisadong proteksyon sa datos at panloloko.",
    bentoPrivateTitle: "100% Pribado",
    bentoPrivateDesc: "Ang iyong National ID at PIN ay mananatili sa iyong selpon. Walang sentral na database na nag-iimbak o naglalabas ng iyong impormasyon.",
    bentoGhostTitle: "Zero Ghost Claims",
    bentoGhostDesc: "Bawat voucher ay lumilikha ng one-time digital lock code. Sa sandaling makuha ang ayuda, permanente itong naka-lock laban sa duplicate claims.",
    bentoFreeTitle: "Libre para sa Pamilya",
    bentoFreeDesc: "Sagot ng lokal na pamahalaan ang lahat ng technical gas fees. Ang mga biktima sa kalamidad ay ₱0 ang babayaran.",
    bentoAuditTitle: "Bukas na Pagsusuri sa Publiko",
    bentoAuditDesc: "Maaaring suriin ng mamamayan at COA ang bawat pisong naipamahagi sa live dashboard nang walang nakikitang pangalan.",

    // Laws & Compliance
    lawsTag: "Pagsunod sa Batas ng Pilipinas",
    lawsTitle: "Alinsunod sa mga Batas ng Pamahalaan",
    lawsSubtitle: "Tugma ang GhostFree sa mga pamantayan ng Commission on Audit at karapatan sa privacy sa ilalim ng pambansang batas.",
    govAuditCompliant: "Tugma sa Pamantayan ng Audit",

    // FAQs Section
    faqTitle: "Mga Madalas Itanong",
    faqSubtitle: "Diretsahang kasagutan tungkol sa mga account, privacy, at pamamahagi ng pondo.",

    // Bottom CTA
    ctaTitle: "Handa Ka Bang Mamahagi ng Ayuda nang Walang Ghost Claims?",
    ctaSubtitle: "Subukan ang live claim portal sa Midnight Preprod, o tingnan ang command center ng lokal na pamahalaan ngayon.",
    ctaClaimBtn: "Mag-claim ng Ayuda bilang Mamamayan",
    ctaAdminBtn: "Mag-login bilang Opisyal ng Munisipyo",
  },

  ceb: {
    appName: "GhostFree",
    tagline: "Hunonga ang mga multo. Panalipdi ang katawhan.",
    treasury: "Pundo",
    tour: "Giya",
    verifyVoucher: "I-beripika ang Resibo",
    giveFeedback: "Ihatag ang Puna",
    howItWorks: "Giunsa Kini Paglihok",
    publicTreasury: "Publikong Pundo",
    privacyModel: "Proteksyon sa Pribasiya (ZK)",

    // Claim Flow Steps
    stepConnect: "Ikonektar",
    stepVerify: "Susiha",
    stepProve: "Pamatud-i",
    stepResult: "Resulta",

    // Step 1: Connect
    connectTitle: "Ikonektar ang Midnight Lace Wallet",
    connectDesc: "Ikonektar ang imong Lace wallet sa Midnight Preprod aron direktang madawat ang ayuda sa katalagman.",
    connectButton: "Ikonektar ang Lace Wallet",
    connecting: "Nagkonektar sa Lace...",
    walletConnected: "Konektado ang Wallet",
    noLaceDetected: "Wala makit-i ang Lace wallet extension. Palihug i-install ang Midnight Lace aron makapadayon.",

    // Step 2: Credentials
    credentialsTitle: "Pribadong Pagsusi sa Katungod",
    credentialsDesc: "Ibutang ang imong PhilSys Resident ID ug 6-digit Secret PIN. Kini nga datos magpabilin lamang sa imong selpon.",
    residentIdLabel: "PhilSys Resident ID",
    residentIdPlaceholder: "pananglitan: PH-NCR-2026-0081",
    pinLabel: "6-Digit Tinagong PIN",
    pinPlaceholder: "••••••",
    privacyNotice: "Pribadong Pagsiguro: Ang imong PIN ug resident ID gi-proseso lang sulod sa imong selpon. Walay bisan unsang sensitibong datos nga ipadala sa internet.",
    proceedToProof: "Paghimo og Pribadong Pamatuod",

    // Step 3: Proving
    provingTitle: "Naghimo og Zero-Knowledge Proof",
    provingDesc: "Gisusi ang Merkle inclusion ug gikuwenta ang anti-ghost nullifier sa imong kaugalingong selpon...",
    provingProgress: "Progreso sa Pagpamatuod",
    provingDisclaimer: "Gikuwenta ang cryptographic constraints. Walay personal nga ngalan o detalye nga ipadayag.",

    // Step 4: Result
    resultSuccessTitle: "Malamposong Naapod-apod ang Ayuda!",
    resultSuccessDesc: "Giberipika sa Midnight Preprod smart contract ang imong cryptographic proof. Gibalhin na ang hinabang pundo sa katalagman.",
    resultFailedTitle: "Napakyas ang Pag-claim",
    amountDisbursed: "Gidaghanon sa Ayuda",
    transactionHash: "Transaction Hash",
    nullifierHash: "Cryptographic Nullifier",
    viewReceipt: "Tan-awa ug I-download ang Resibo",
    claimAnother: "Balik sa Portal sa Ayuda",

    // Receipts & Common
    receiptTitle: "Kompidensyal nga Resibo sa Hinabang",
    receiptSubtitle: "Ipakita kining resiboha sa mga checkpoint o distribution table sa barangay",
    close: "Sirad-i",
    printVoucher: "I-print / I-export ang Resibo",
    verifiedValid: "Gipamatud-ang Balido",
    alreadyClaimedError: "Kini nga pagkatawo nakadawat na og ayuda alang niining relief operation.",

    // Landing Page Navigation & Hero
    navClaimAid: "Mag-claim og Hinabang",
    navGovPortal: "Portal sa Kagamhanan",
    navLivePreprod: "Aktibo sa Preprod",
    navZeroGhostSub: "Walay Ghost Claims · Hinabang sa Katalagman",
    releasePillText: "Nasulayan ug Aktibo sa Preprod · 75 Beripikadong Partisipante ug Walay Pagtagas sa Datos",
    heroTitlePrefix: "Hunonga ang mga Multo.",
    heroTitleSuffix: "Panalipdi ang Katawhan.",
    heroSubtitle: "Usa ka luwas nga plataporma sa ayuda diin ang mga biktima sa katalagman makadawat og tabang pinansyal sa pipila ka segundo. Ang imong ID magpabilin sa imong selpon, ug awtomatikong pugngan ang doble nga pag-claim.",
    claimEmergencyAid: "Mag-claim og Hinabang sa Katalagman",
    localGovernmentPortal: "Portal sa Lokal nga Kagamhanan",

    // Telemetry HUD
    statFundsLocked: "Naka-lock nga Pundo sa Katalagman",
    statFundsLockedSub: "Gipanalipdan sa Tipiganan sa Lungsod",
    statGhostBlocked: "Napugngang Doble o Ghost Claims",
    statGhostBlockedSub: "Awtomatikong napugngan ang mga peke nga claim",
    statFamiliesHelped: "Giberipikang Pamilya nga Natabangan",
    statFamiliesHelpedSub: "Naapod-apod nga 100% pribado",
    statDataLeaks: "Pagtagas sa Personal nga Datos",
    statDataLeaksSub: "Walay personal nga datos nga gitipigan",

    // Interactive Window
    livePreviewTag: "Aktibong Pagsulay sa Sistema",
    livePreviewTitle: "Susihon ang Plataporma sa Aksyon",
    livePreviewSubtitle: "Tan-awa kung giunsa sayon magamit sa mga biktima, opisyal, ug auditor ang GhostFree nga walay kakulian.",
    tabCitizen: "Pag-claim sa Katawhan",
    tabAdmin: "Portal sa Munisipyo",
    tabTreasury: "Publikong Pagsusi",
    citizenTabTag: "Alang sa mga Biktima sa Katalagman ug Evacuees",
    citizenTabTitle: "Paspas ug Pribadong Hinabang sa Bisan Unsang Selpon",
    citizenTabDesc: "Walay username o password. Ikonektar ang wallet, ibutang ang PIN, dawata ang ayuda.",
    tryLiveClaim: "Sulayi ang Live Claim Flow →",
    adminTabTag: "Alang sa mga Opisyal sa Munisipyo ug DRRM",
    adminTabTitle: "Emergency Command Center sa Kagamhanan",
    adminTabDesc: "I-upload ang listahan sa ayuda, ipatuman ang dual-officer approval, ug pugngi ang panlimbong.",
    openGovPortal: "Ablihi ang Portal sa Kagamhanan →",
    treasuryTabTag: "Bukas nga Pagdumala ug Pagsusi sa Pundo",
    treasuryTabTitle: "Susiha ang Matag Piso nga Walay Gipadayag nga Ngalan",
    treasuryTabDesc: "Tibuok transparency alang sa katawhan, watchdogs, ug mga auditor sa kagamhanan.",
    viewLiveTreasury: "Tan-awa ang Live nga Pundo →",

    // Comparison Section
    comparisonTag: "Nganong Importante ang GhostFree",
    comparisonTitle: "Ang Karaang Paagi batok sa GhostFree",
    comparisonSubtitle: "Tan-awa giunsa pagsulbad sa modernong teknolohiya ang korapsyon ug kalangan sa pag-apod-apod sa ayuda.",
    comparisonAspect: "Aspeto",
    comparisonOldWayHeader: "Ang Karaang Paagi (Papel nga Resibo)",
    comparisonGhostFreeHeader: "Ang Paagi sa GhostFree",

    // 4-Step Process Section
    stepsTag: "Sayon nga 4 ka Lakang",
    stepsTitle: "Giunsa Pagdawat og Hinabang sa mga Biktima",
    stepsSubtitle: "Pindota ang matag lakang aron makita giunsa pagtinabangay ang pribasiya ug proteksyon.",
    whatObserverSees: "Ang Gisusi sa Sistema (Publiko)",
    whatStaysPrivate: "Ang Magpabilin Kanimo (Pribado)",

    // Bento 4 Core Guarantees
    bentoTag: "Upat ka Pangunang Garantiya",
    bentoTitle: "Gihimo alang sa Tibuok Pagsalig",
    bentoSubtitle: "Matag biktima sa katalagman ug opisyal adunay garantisadong proteksyon sa datos ug panlimbong.",
    bentoPrivateTitle: "100% Pribado",
    bentoPrivateDesc: "Ang imong National ID ug PIN magpabilin sa imong selpon. Walay sentral nga database nga magtipig o magpagula sa imong impormasyon.",
    bentoGhostTitle: "Zero Ghost Claims",
    bentoGhostDesc: "Matag resibo maghimo og one-time digital lock code. Sa higayon nga madawat ang ayuda, permanente kining ma-lock batok sa doble nga claim.",
    bentoFreeTitle: "Libre alang sa Pamilya",
    bentoFreeDesc: "Abagahon sa lokal nga kagamhanan ang tanang technical gas fees. Ang mga biktima sa katalagman ₱0 ang bayran.",
    bentoAuditTitle: "Bukas nga Pagsusi sa Publiko",
    bentoAuditDesc: "Mahimong susihon sa katawhan ug COA ang matag piso nga naapod-apod sa live dashboard nga walay makitang ngalan.",

    // Laws & Compliance
    lawsTag: "Pagsunod sa Balaod sa Pilipinas",
    lawsTitle: "Nahiuyon sa mga Balaod sa Kagamhanan",
    lawsSubtitle: "Nahiuyon ang GhostFree sa mga sumbanan sa Commission on Audit ug katungod sa pribasiya ubos sa nasudnong balaod.",
    govAuditCompliant: "Nahiuyon sa Sumbanan sa Audit",

    // FAQs Section
    faqTitle: "Mga Kasagarang Pangutana",
    faqSubtitle: "Diretsong tubag mahitungod sa mga account, pribasiya, ug pag-apod-apod sa pundo.",

    // Bottom CTA
    ctaTitle: "Andam Na Ba Ka Moapod-apod og Hinabang nga Walay Ghost Claims?",
    ctaSubtitle: "Sulayi ang live claim portal sa Midnight Preprod, o susiha ang command center sa lokal nga kagamhanan karon.",
    ctaClaimBtn: "Mag-claim og Hinabang isip Katawhan",
    ctaAdminBtn: "Mag-login isip Opisyal sa Munisipyo",
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
