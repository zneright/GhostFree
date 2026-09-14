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
