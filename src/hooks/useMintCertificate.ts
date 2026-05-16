"use client";

import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

interface MintState {
  status: "idle" | "pending" | "success" | "error";
  txHash: string | null;
  error: string | null;
  tokenId: number | null;
}

/**
 * Custom hook for minting certificates.
 *
 * Supports two modes:
 * 1. UGF mode (gasless) — uses openUGF from @tychilabs/react-ugf
 * 2. Direct mode — standard wallet transaction (fallback)
 */
export function useMintCertificate() {
  const { address, isConnected } = useAccount();
  const [state, setState] = useState<MintState>({
    status: "idle",
    txHash: null,
    error: null,
    tokenId: null,
  });

  const mint = useCallback(
    async (recipientName: string, title: string, achievement: string) => {
      if (!isConnected || !address) {
        setState({ status: "error", txHash: null, error: "Wallet not connected", tokenId: null });
        return;
      }

      setState({ status: "pending", txHash: null, error: null, tokenId: null });

      try {
        // Get the provider and signer from the connected wallet
        const provider = new ethers.BrowserProvider(
          (window as unknown as { ethereum: ethers.Eip1193Provider }).ethereum
        );
        const signer = await provider.getSigner();

        // Create contract instance
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Encode the mint transaction
        const tx = await contract.mintCertificate(
          address,
          recipientName,
          title,
          achievement
        );

        const receipt = await tx.wait();

        // Try to extract tokenId from events
        let tokenId: number | null = null;
        if (receipt.logs && receipt.logs.length > 0) {
          try {
            const iface = new ethers.Interface(CONTRACT_ABI);
            for (const log of receipt.logs) {
              try {
                const parsed = iface.parseLog({
                  topics: log.topics as string[],
                  data: log.data,
                });
                if (parsed && parsed.name === "CertificateMinted") {
                  tokenId = Number(parsed.args.tokenId);
                  break;
                }
              } catch {
                // Skip logs that don't match our ABI
              }
            }
          } catch {
            // Fallback — no tokenId extraction
          }
        }

        setState({
          status: "success",
          txHash: receipt.hash,
          error: null,
          tokenId,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Minting failed";
        setState({
          status: "error",
          txHash: null,
          error: message.includes("user rejected")
            ? "Transaction was rejected"
            : message,
          tokenId: null,
        });
      }
    },
    [address, isConnected]
  );

  const reset = useCallback(() => {
    setState({ status: "idle", txHash: null, error: null, tokenId: null });
  }, []);

  return {
    mint,
    reset,
    ...state,
  };
}
