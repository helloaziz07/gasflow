"use client";

import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useUGFModal } from "@tychilabs/react-ugf";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

interface MintState {
  status: "idle" | "pending" | "success" | "error";
  txHash: string | null;
  error: string | null;
  tokenId: number | null;
}

/**
 * Custom hook for minting certificates via UGF (gasless).
 *
 * Instead of sending a direct wallet transaction (which charges the user gas),
 * we encode the transaction data and hand it to UGF's openUGF() method.
 * UGF opens a payment modal where the user pays with Mock USD (testnet),
 * then UGF's relayer submits the transaction and pays the gas on behalf of the user.
 */
export function useMintCertificate() {
  const { address, isConnected } = useAccount();
  const { openUGF } = useUGFModal();
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
        // Get the signer from the connected wallet
        const provider = new ethers.BrowserProvider(
          (window as unknown as { ethereum: ethers.Eip1193Provider }).ethereum
        );
        const signer = await provider.getSigner();

        // Encode the mintCertificate function call into raw transaction data
        const iface = new ethers.Interface(CONTRACT_ABI);
        const data = iface.encodeFunctionData("mintCertificate", [
          address,
          recipientName,
          title,
          achievement,
        ]);

        // Hand the transaction to UGF — it opens a payment modal
        // where the user pays gas in Mock USD instead of ETH.
        // UGF's relayer then submits the transaction on-chain.
        await openUGF({
          signer,
          tx: {
            to: CONTRACT_ADDRESS,
            data,
            value: 0n,
          },
          destChainId: "84532", // Base Sepolia
        });

        // If openUGF resolves without throwing, the transaction was submitted.
        // Note: UGF handles the execution, so we may not get a direct txHash back
        // in the same way as a standard ethers transaction.
        setState({
          status: "success",
          txHash: null,
          error: null,
          tokenId: null,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Minting failed";
        setState({
          status: "error",
          txHash: null,
          error: message.includes("user rejected") || message.includes("cancelled")
            ? "Transaction was cancelled"
            : message,
          tokenId: null,
        });
      }
    },
    [address, isConnected, openUGF]
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
