"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import CertificatePreview from "./CertificatePreview";
import { useMintCertificate } from "@/hooks/useMintCertificate";

export default function MintForm() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { mint, reset, status, txHash, error, tokenId } = useMintCertificate();

  const [recipientName, setRecipientName] = useState("");
  const [title, setTitle] = useState("");
  const [achievement, setAchievement] = useState("");

  const isFormValid = recipientName.trim() && title.trim() && achievement.trim();

  const handleMint = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    if (!isFormValid) return;
    await mint(recipientName.trim(), title.trim(), achievement.trim());
  };

  const handleReset = () => {
    reset();
    setRecipientName("");
    setTitle("");
    setAchievement("");
  };

  return (
    <section id="mint" className="relative">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/10 blur-[120px]" />
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-400">
            Create Your Certificate
          </p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Mint Your NFT
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-300/70">
            Fill in your details and mint a permanent, on-chain certificate — completely gasless.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — Form */}
          <div className="glass-card p-8">
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="recipientName"
                  className="mb-2 block text-sm font-medium text-primary-300"
                >
                  Recipient Name
                </label>
                <input
                  id="recipientName"
                  type="text"
                  className="input-field"
                  placeholder="e.g., John Doe"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  disabled={status === "pending"}
                  maxLength={50}
                />
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-primary-300"
                >
                  Certificate Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="input-field"
                  placeholder="e.g., Certificate of Excellence"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={status === "pending"}
                  maxLength={60}
                />
              </div>

              {/* Achievement */}
              <div>
                <label
                  htmlFor="achievement"
                  className="mb-2 block text-sm font-medium text-primary-300"
                >
                  Achievement
                </label>
                <textarea
                  id="achievement"
                  className="input-field min-h-[80px] resize-none"
                  placeholder="e.g., Successfully completed the Web3 Development Program"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  disabled={status === "pending"}
                  maxLength={120}
                  rows={3}
                />
              </div>

              {/* Mint Button */}
              {status === "success" ? (
                <div className="space-y-4">
                  {/* Success Message */}
                  <div className="rounded-xl border border-accent-emerald/20 bg-accent-emerald/10 p-4">
                    <div className="flex items-center gap-2 text-accent-emerald">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">Certificate Minted!</span>
                    </div>
                    {tokenId !== null && (
                      <p className="mt-1 text-sm text-accent-emerald/70">
                        Token ID: #{tokenId}
                      </p>
                    )}
                  </div>

                  {/* TX Link */}
                  {txHash && (
                    <a
                      href={`https://sepolia.basescan.org/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary-400 transition-colors hover:text-primary-300"
                    >
                      View on BaseScan ↗
                      <span className="font-mono text-xs text-primary-500">
                        {txHash.slice(0, 10)}...{txHash.slice(-8)}
                      </span>
                    </a>
                  )}

                  {/* Mint Another */}
                  <button
                    onClick={handleReset}
                    className="btn-primary w-full"
                  >
                    Mint Another Certificate
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleMint}
                  disabled={status === "pending" || (isConnected && !isFormValid)}
                  className="btn-primary w-full"
                >
                  {status === "pending" ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Minting...
                    </span>
                  ) : !isConnected ? (
                    "Connect Wallet to Mint"
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      Mint Certificate
                    </>
                  )}
                </button>
              )}

              {/* Error */}
              {status === "error" && error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right — Preview */}
          <div className="flex items-center">
            <CertificatePreview
              recipientName={recipientName}
              title={title}
              achievement={achievement}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
