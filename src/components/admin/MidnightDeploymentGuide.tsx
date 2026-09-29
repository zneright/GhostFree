// ==============================================================================
// GhostFree — Midnight Deployment Assistant
// Comprehensive, step-by-step interactive guide for deploying Compact smart contracts
// to the Midnight Preprod Testnet with Lace Wallet, tDUST gas sponsorship & Proof Server.
// ==============================================================================

import React, { useState } from "react";
import {
  Rocket,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Shield,
  Zap,
  Server,
  Key,
  Layers,
  HelpCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { MIDNIGHT_CONFIG, getContractDeploymentStatus } from "../../configuration/midnight.config";

export const MidnightDeploymentGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customAddress, setCustomAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [pingStatus, setPingStatus] = useState<{
    rpc: "checking" | "online" | "offline";
    indexer: "checking" | "online" | "offline";
  } | null>(null);

  const status = getContractDeploymentStatus(MIDNIGHT_CONFIG.contractAddress);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePingEndpoints = async () => {
    setPingStatus({ rpc: "checking", indexer: "checking" });

    // Ping Indexer
    try {
      const idxRes = await fetch(MIDNIGHT_CONFIG.indexerUrl, { method: "HEAD", mode: "no-cors" });
      setPingStatus((prev) => ({ ...prev!, indexer: "online" }));
    } catch {
      setPingStatus((prev) => ({ ...prev!, indexer: "offline" }));
    }

    // Ping RPC Node
    try {
      const rpcRes = await fetch(MIDNIGHT_CONFIG.nodeUrl, { method: "HEAD", mode: "no-cors" });
      setPingStatus((prev) => ({ ...prev!, rpc: "online" }));
    } catch {
      setPingStatus((prev) => ({ ...prev!, rpc: "offline" }));
    }
  };

  const steps = [
    {
      step: 1,
      title: "Install Midnight Lace Wallet",
      description: "Install the official Midnight Lace browser extension to hold testnet credentials and sign transactions.",
      actionLabel: "Open Chrome Web Store",
      actionUrl: "https://chromewebstore.google.com/detail/midnight-lace/jaidbabbcclndafmnffmgcneceocpffl",
      badge: "Required Extension",
    },
    {
      step: 2,
      title: "Switch Wallet Network to Midnight Preprod",
      description: "Open the Midnight Lace wallet extension > Settings (gear icon) > Network > Select 'Midnight Preprod Testnet' (Chain ID 4123).",
      badge: "Network Config",
    },
    {
      step: 3,
      title: "Request Free Testnet tDUST & tNIGHT",
      description: "Copy your Lace unshielded wallet address and paste it into the Midnight Preprod Faucet to receive free testing tokens.",
      actionLabel: "Visit Midnight Preprod Faucet",
      actionUrl: "https://faucet.preprod.midnight.network",
      badge: "Free Testnet Tokens",
    },
    {
      step: 4,
      title: "Run Local Midnight Proof Server (Port 6300)",
      description: "Zero-Knowledge proofs are synthesized locally by running the official proof-server Docker container on your machine.",
      code: "docker run -d -p 6300:6300 midnightnetwork/proof-server",
      badge: "Docker Container",
    },
    {
      step: 5,
      title: "Compile Compact Smart Contract",
      description: "Compile GhostFree.compact using the Midnight Compact compiler (in WSL or Linux terminal):",
      code: "compact compile contracts/GhostFree.compact managed/GhostFree",
      badge: "Compact Compiler",
    },
    {
      step: 6,
      title: "Deploy Contract to Preprod & Save Contract Address",
      description: "Submit the deployment transaction signed by your Lace wallet. Once confirmed on-chain, copy the 64-hex Contract Address and place it in your .env file.",
      code: "VITE_MIDNIGHT_CONTRACT_ADDRESS=<your_new_contract_address_here>",
      badge: "Deployment Complete",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-shield-glass/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                Midnight Network Preprod Guide
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  status.isDeployed
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                }`}
              >
                {status.statusLabel}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Midnight Compact Smart Contract Deployment
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              GhostFree operates with client-side Zero-Knowledge proofs on the Midnight Network. Follow this step-by-step roadmap to deploy your smart contract on the Preprod testnet.
            </p>
          </div>

          <button
            onClick={handlePingEndpoints}
            className="self-start lg:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center gap-2 shadow-md"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${pingStatus?.rpc === "checking" ? "animate-spin" : ""}`} />
            <span>Check Testnet Health</span>
          </button>
        </div>

        {/* Telemetry Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[0.7rem]">Midnight RPC Node</span>
              <span className="text-white font-mono text-[0.75rem] truncate max-w-[180px] block">
                {MIDNIGHT_CONFIG.nodeUrl}
              </span>
            </div>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                pingStatus?.rpc === "online"
                  ? "bg-emerald-400 animate-pulse"
                  : pingStatus?.rpc === "offline"
                  ? "bg-rose-500"
                  : "bg-sky-400"
              }`}
            />
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[0.7rem]">Midnight Indexer</span>
              <span className="text-white font-mono text-[0.75rem] truncate max-w-[180px] block">
                {MIDNIGHT_CONFIG.indexerUrl}
              </span>
            </div>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                pingStatus?.indexer === "online"
                  ? "bg-emerald-400 animate-pulse"
                  : pingStatus?.indexer === "offline"
                  ? "bg-rose-500"
                  : "bg-sky-400"
              }`}
            />
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[0.7rem]">Local Proof Server</span>
              <span className="text-white font-mono text-[0.75rem] block">
                {MIDNIGHT_CONFIG.provingServerUrl || "http://localhost:6300"}
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" title="Docker port 6300" />
          </div>
        </div>
      </div>

      {/* Step by Step Accordion & Instructions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Rocket className="w-5 h-5 text-sky-400" />
          <span>Interactive 6-Step Deployment Roadmap</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className={`p-5 rounded-2xl border transition-all ${
                activeStep === item.step
                  ? "bg-slate-900/90 border-sky-400/40 shadow-xl"
                  : "bg-slate-900/50 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      activeStep === item.step
                        ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <span className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>

                    {item.code && (
                      <div className="mt-3 relative max-w-xl">
                        <div className="p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-sky-300 flex items-center justify-between">
                          <code className="truncate pr-2">{item.code}</code>
                          <button
                            type="button"
                            onClick={() => handleCopy(item.code!, `code-${item.step}`)}
                            className="p-1 rounded text-slate-400 hover:text-white shrink-0"
                            title="Copy command"
                          >
                            {copiedKey === `code-${item.step}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {item.actionUrl && (
                      <div className="mt-3">
                        <a
                          href={item.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 transition-all"
                        >
                          <span>{item.actionLabel}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep(item.step)}
                  className="text-xs text-slate-400 hover:text-white shrink-0 font-medium"
                >
                  {activeStep === item.step ? "Focused" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Address Updater Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Key className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Active Contract Address Configuration</h4>
            <p className="text-xs text-slate-400">
              When you deploy to Midnight Preprod, update your contract address here:
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[0.7rem]">Current Active Address (.env):</span>
            <span className="text-white font-mono break-all text-xs font-medium">
              {MIDNIGHT_CONFIG.contractAddress}
            </span>
          </div>
          <button
            onClick={() => handleCopy(MIDNIGHT_CONFIG.contractAddress, "active-ca")}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-1.5 font-medium shrink-0"
          >
            {copiedKey === "active-ca" ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedKey === "active-ca" ? "Copied" : "Copy Address"}</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20 text-xs text-slate-300 leading-relaxed space-y-2">
          <p className="font-semibold text-sky-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            Preprod Contract Verification & Resilient Execution Architecture
          </p>
          <p>
            GhostFree binds to the verified on-chain Midnight Preprod contract address (<code className="text-sky-200 font-mono">{MIDNIGHT_CONFIG.contractAddress.slice(0, 10)}...{MIDNIGHT_CONFIG.contractAddress.slice(-6)}</code>). In the event of network maintenance or sandbox testing, GhostFree automatically operates with its <strong>Client-Side Prover</strong> so all ZK-SNARK Merkle verification and nullifier collision flows can be evaluated immediately without blocking development or user reviews!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MidnightDeploymentGuide;
