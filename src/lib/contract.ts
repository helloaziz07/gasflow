// Contract address — set after deployment
export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

// ABI — only the functions we need from GasflowCertificate
export const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "string", name: "recipientName", type: "string" },
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "achievement", type: "string" },
    ],
    name: "mintCertificate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getCertificate",
    outputs: [
      { internalType: "string", name: "recipientName", type: "string" },
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "achievement", type: "string" },
      { internalType: "uint256", name: "mintedAt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalMinted",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "string", name: "recipientName", type: "string" },
      { indexed: false, internalType: "string", name: "title", type: "string" },
      { indexed: false, internalType: "string", name: "achievement", type: "string" },
    ],
    name: "CertificateMinted",
    type: "event",
  },
] as const;
