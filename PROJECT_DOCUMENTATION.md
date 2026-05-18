# Gasflow — Complete Project Documentation

> **Project:** Gasless NFT Certificate Platform on Base Sepolia  
> **Status:** Smart Contract Deployed ✅ | Frontend Running ✅ | Minting Functional ✅  
> **Last Updated:** May 18, 2026  
> **Built For:** HackWithMumbai

---

## 📌 What Is Gasflow?

Gasflow is a **gasless NFT certificate platform** that allows users to mint blockchain-based achievement certificates on the **Base Sepolia testnet** without needing to pay ETH gas fees. It uses the **Universal Gas Framework (UGF)** by TychiLabs to sponsor gas, making Web3 accessible to non-crypto users.

### Core Value Proposition
- **Zero gas fees** — Users mint NFTs without holding ETH
- **Fully on-chain** — Certificate metadata and SVG images are stored entirely on the blockchain (no IPFS, no external storage)
- **Real ERC-721 NFTs** — Each certificate is a standard NFT viewable on BaseScan and any NFT marketplace
- **One-click minting** — Connect wallet → fill form → mint. No crypto experience needed

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                      │
│  Next.js 14 (App Router) + Tailwind CSS         │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Navbar   │ │ Hero     │ │ HowItWorks       │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────────────┐ ┌──────────────────────┐  │
│  │ MintForm         │ │ CertificatePreview   │  │
│  └──────────────────┘ └──────────────────────┘  │
│  ┌──────────┐                                   │
│  │ Footer   │                                   │
│  └──────────┘                                   │
│                                                 │
│  Wallet: RainbowKit + Wagmi v2                  │
│  Contract Interaction: ethers.js v6             │
│  Gas Sponsorship: @tychilabs/react-ugf          │
└────────────────────┬────────────────────────────┘
                     │
                     │ JSON-RPC (via wallet provider)
                     ▼
┌─────────────────────────────────────────────────┐
│              BLOCKCHAIN LAYER                   │
│  Network: Base Sepolia (Chain ID: 84532)        │
│  Contract: GasflowCertificate (ERC-721)         │
│  Solidity: ^0.8.24 | Compiler: viaIR + Cancun  │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project File Structure

```
gasflow/
├── .env.local                         # Secrets (private key, WalletConnect ID, contract address)
├── .eslintrc.json                     # ESLint config
├── .gitignore                         # Protects secrets from Git
├── next.config.js                     # Next.js config + webpack fallbacks
├── package.json                       # Frontend dependencies
├── postcss.config.js                  # PostCSS config
├── tailwind.config.ts                 # Tailwind design system (colors, fonts, animations)
├── tsconfig.json                      # TypeScript config
├── PROGRESS.md                        # Original progress tracker
├── CHAT_HISTORY.md                    # Debugging session log
├── PROJECT_DOCUMENTATION.md           # This file
│
├── contracts/                         # ─── BLOCKCHAIN LAYER ───
│   ├── contracts/
│   │   └── GasflowCertificate.sol     # ERC-721 NFT contract (fully on-chain metadata)
│   ├── scripts/
│   │   └── deploy.js                  # Hardhat deployment script
│   ├── test/
│   │   └── GasflowCertificate.test.js # 9 unit tests (all passing ✅)
│   ├── hardhat.config.js              # Hardhat config (Solidity 0.8.24, Cancun EVM, viaIR)
│   └── package.json                   # Hardhat + OpenZeppelin dependencies
│
└── src/                               # ─── FRONTEND LAYER ───
    ├── app/
    │   ├── globals.css                # Global styles + design system
    │   ├── layout.tsx                 # Root layout (metadata, providers, dark mode)
    │   ├── page.tsx                   # Main page (assembles all sections)
    │   └── providers.tsx              # WagmiProvider + RainbowKitProvider + React Query
    ├── components/
    │   ├── Navbar.tsx                 # Fixed navbar with logo, nav links, ConnectButton
    │   ├── HeroSection.tsx            # Hero with gradient glows, stats, CTA buttons
    │   ├── HowItWorks.tsx             # 3-step visual guide (Connect → Details → Mint)
    │   ├── MintForm.tsx               # Certificate form with validation + success states
    │   ├── CertificatePreview.tsx     # Live real-time certificate preview
    │   └── Footer.tsx                 # Brand info, resource links, tech badges
    ├── hooks/
    │   └── useMintCertificate.ts      # Custom hook: minting logic + state management
    └── lib/
        ├── contract.ts                # Contract address + ABI (4 functions + 1 event)
        └── wagmi.ts                   # Wagmi chain config (Base Sepolia + RainbowKit)
```

---

## 🔗 Smart Contract — `GasflowCertificate.sol`

### Contract Details
| Property | Value |
|---|---|
| **Standard** | ERC-721 (OpenZeppelin v5) |
| **Name** | Gasflow Certificate |
| **Symbol** | GFCERT |
| **Network** | Base Sepolia (Chain ID: 84532) |
| **Solidity** | ^0.8.24 |
| **Compiler Flags** | `viaIR: true`, `evmVersion: "cancun"` |
| **Metadata Storage** | Fully on-chain (Base64 JSON + SVG) |

### Contract Functions

| Function | Visibility | Description |
|---|---|---|
| `mintCertificate(address, string, string, string)` | `public` | Mints an NFT certificate with recipient name, title, and achievement |
| `getCertificate(uint256)` | `external view` | Returns certificate data (name, title, achievement, timestamp) |
| `tokenURI(uint256)` | `public view` | Returns fully on-chain Base64-encoded JSON metadata with embedded SVG |
| `totalMinted()` | `public view` | Returns total number of certificates minted |

### Event
```solidity
event CertificateMinted(
    uint256 indexed tokenId,
    address indexed recipient,
    string recipientName,
    string title,
    string achievement
);
```

### On-Chain SVG Certificate
The contract generates a beautiful SVG certificate image entirely on-chain:
- Deep indigo gradient background (`#1e1b4b` → `#312e81`)
- Certificate title, recipient name, and achievement text
- Decorative border and divider lines
- Token ID, network name, and "Powered by UGF" footer

### Hardhat Configuration
```javascript
solidity: {
  version: "0.8.24",
  settings: {
    viaIR: true,          // Required: fixes "Stack too deep" for SVG generation
    evmVersion: "cancun", // Required: supports `mcopy` opcode
    optimizer: { enabled: true, runs: 200 }
  }
}
```

### Test Results (9/9 Passing ✅)
```
GasflowCertificate
  Deployment
    ✔ should set the correct name and symbol
    ✔ should start with 0 total minted
  Minting
    ✔ should mint a certificate with correct data
    ✔ should assign the NFT to the recipient
    ✔ should increment totalMinted
    ✔ should emit CertificateMinted event
    ✔ should auto-increment token IDs
  Token URI
    ✔ should return a valid data URI
    ✔ should revert for non-existent token

9 passing (623ms)
```

---

## 🎨 Frontend — Design System

### Design Theme: "Deep Space"
A premium dark-mode UI with glassmorphism, gradient glows, and micro-animations.

### Color Palette
| Token | Color | Hex |
|---|---|---|
| Primary 500 | Indigo | `#6366f1` |
| Primary 950 | Deep Indigo | `#1e1b4b` |
| Surface | Near Black | `#0a0a1a` |
| Surface Card | Dark Navy | `#111127` |
| Accent Cyan | Cyan | `#22d3ee` |
| Accent Purple | Purple | `#a855f7` |
| Accent Pink | Pink | `#ec4899` |
| Accent Emerald | Emerald | `#34d399` |

### Typography
| Role | Font | Weight Range |
|---|---|---|
| Body | Inter | 300–800 |
| Display (headings) | Outfit | 400–800 |
| Monospace (code) | JetBrains Mono | 400–500 |

### Animations
| Name | Effect |
|---|---|
| `float` | Gentle 6s vertical bob |
| `pulse-glow` | 2s opacity pulse |
| `slide-up` | 0.5s entry from below |
| `fade-in` | 0.6s opacity fade |
| `shimmer` | Loading shimmer sweep |

### Reusable CSS Components
| Class | Description |
|---|---|
| `.glass-card` | Glassmorphism card with blur backdrop and border |
| `.glow-border` | Gradient glowing border effect |
| `.btn-primary` | Primary button with gradient, glow shadow, hover scale |
| `.input-field` | Styled input with focus ring and transition |
| `.gradient-text` | Gradient text (indigo → purple → cyan) |
| `.section-container` | Max-width centered container with padding |
| `.shimmer` | Loading shimmer animation |

---

## 🧩 Frontend Components

### `Navbar.tsx`
- Fixed position with backdrop blur (`bg-surface/80 backdrop-blur-xl`)
- Logo with gradient icon (lightning bolt)
- Navigation links: How It Works, Mint, Explorer
- RainbowKit `ConnectButton` (shows chain icon + address)

### `HeroSection.tsx`
- Background: Radial gradient glows + grid pattern overlay
- Animated badge: "Live on Base Sepolia Testnet" with pulsing dot
- Title: "Mint NFTs **Without Gas Fees**" with gradient text
- Subtitle explaining Gasflow + UGF
- CTA buttons: "Start Minting" (primary) + "Learn How It Works" (outline)
- Stats row: Gas Fees ($0), Network (Base), Powered By (UGF)

### `HowItWorks.tsx`
Three glassmorphism cards with step numbers:
1. **Connect Wallet** — Link MetaMask, auto-switch to Base Sepolia
2. **Enter Details** — Fill form, preview certificate in real-time
3. **Mint Gaslessly** — UGF handles gas, pay with Mock USD

### `MintForm.tsx`
- Three input fields: Recipient Name, Certificate Title, Achievement
- Generic placeholder examples (e.g., "John Doe", "Certificate of Excellence")
- Validation: all fields required, character limits (50/60/120)
- States: idle → pending (spinner) → success (green card with TX link) → error (red card)
- Disabled during minting, "Mint Another Certificate" button on success
- Two-column layout: form (left) + live preview (right)

### `CertificatePreview.tsx`
- Real-time preview updating as user types
- Gradient border glow (indigo → purple → cyan) with hover effect
- Certificate layout: header, title, "Awarded to" + name, achievement, footer
- Empty state overlay: "Fill in the form to preview your certificate"
- Footer: Base Sepolia | Powered by UGF | Current date

### `Footer.tsx`
- Three-column grid: Brand, Resources, Built With
- Resource links: BaseScan Explorer, UGF Docs, GitHub
- Tech badges: Next.js, Solidity, Base, UGF, Wagmi, RainbowKit
- Copyright: "© 2026 Gasflow. Built for HackWithMumbai."

---

## 🔌 Wallet Integration

### Stack
| Library | Version | Purpose |
|---|---|---|
| `wagmi` | v2.12+ | React hooks for Ethereum |
| `@rainbow-me/rainbowkit` | v2.1+ | Wallet connection modal |
| `@tanstack/react-query` | v5.50+ | Async state management |
| `viem` | v2.17+ | Low-level Ethereum client |
| `ethers` | v6.13+ | Contract interaction + ABI encoding |

### Configuration (`wagmi.ts`)
- App name: "Gasflow"
- Chain: Base Sepolia only
- Transport: Public HTTP RPC (`https://sepolia.base.org`)
- SSR: enabled
- WalletConnect Project ID from `.env.local`

### Minting Hook (`useMintCertificate.ts`)
- Uses `ethers.BrowserProvider` to get signer from connected wallet
- Creates contract instance with ABI and address
- Calls `mintCertificate()` with form data
- Parses `CertificateMinted` event to extract `tokenId`
- State machine: `idle` → `pending` → `success` | `error`
- User-friendly error for rejected transactions

---

## ⚙️ Configuration Files

### `next.config.js`
```javascript
webpack: (config) => {
  // Node module stubs for browser
  config.resolve.fallback = { fs: false, net: false, tls: false };
  // WalletConnect/RainbowKit externals
  config.externals.push("pino-pretty", "lokijs", "encoding");
  // MetaMask SDK React Native stub
  config.resolve.alias = {
    ...config.resolve.alias,
    '@react-native-async-storage/async-storage': false,
  };
  return config;
}
```

### `layout.tsx` — Hydration Fix
```tsx
<html lang="en" className="dark" suppressHydrationWarning>
  <body ... suppressHydrationWarning>
```

### `providers.tsx` — Client-Only Rendering
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
// Renders children only after client mount to avoid hydration mismatch
{mounted ? children : null}
```

---

## 🔑 Environment Variables (`.env.local`)

| Variable | Purpose | How to Get |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect authentication | [cloud.walletconnect.com](https://cloud.walletconnect.com) → Create Project |
| `DEPLOYER_PRIVATE_KEY` | Smart contract deployment | Wallet → Settings → Export Private Key |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Points frontend to deployed contract | Output of `npx hardhat run scripts/deploy.js --network baseSepolia` |

---

## 🐛 Issues Encountered & Fixes

| # | Error | Root Cause | Fix |
|---|---|---|---|
| 1 | `ECONNRESET` during `npm install` | Network connection dropped mid-download | Cleared npm cache + retried install |
| 2 | `charenc.js` parse error (Unexpected token) | File corrupted (truncated to 763 bytes) from network failure | Deleted `node_modules`, clean `npm install` |
| 3 | `Can't resolve 'pony-cause'` | Missing transitive dependency of `@metamask/utils` | `npm install pony-cause` |
| 4 | `Can't resolve '@react-native-async-storage/async-storage'` | MetaMask SDK imports React Native module in browser | Webpack alias → `false` in `next.config.js` |
| 5 | `HH606: pragma mismatch` | OpenZeppelin v5 requires `^0.8.24`, config had `0.8.20` | Changed Solidity version to `0.8.24` |
| 6 | `mcopy not found` | `mcopy` is Cancun EVM opcode, Hardhat defaulted to older EVM | Added `evmVersion: "cancun"` |
| 7 | `Stack too deep` | On-chain SVG generation uses too many local variables | Added `viaIR: true` to compiler settings |
| 8 | Hydration mismatch | RainbowKit ConnectButton renders differently on server vs client | `suppressHydrationWarning` + mounted state check in providers |
| 9 | WebSocket `Unauthorized: invalid key` | Missing WalletConnect Project ID (fallback was `"demo"`) | Set valid Project ID in `.env.local` |
| 10 | Specific placeholder text | Form had personal names ("Lakshay Vig", "MIT ADT AI Grand Challenge") | Changed to generic examples |

---

## 🚀 How to Run

### Prerequisites
- Node.js v20+
- npm v10+
- MetaMask or Coinbase Wallet browser extension

### Quick Start
```bash
# 1. Install frontend dependencies
npm install

# 2. Install contract dependencies
cd contracts && npm install && cd ..

# 3. Set up environment
cp .env.local.example .env.local
# Fill in DEPLOYER_PRIVATE_KEY and NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

# 4. Run contract tests
cd contracts && npx hardhat test && cd ..

# 5. Deploy contract (needs Base Sepolia ETH)
cd contracts && npx hardhat run scripts/deploy.js --network baseSepolia && cd ..
# Copy the output address into .env.local as NEXT_PUBLIC_CONTRACT_ADDRESS

# 6. Start frontend
npm run dev
# Open http://localhost:3000
```

### Getting Base Sepolia ETH
| Faucet | URL |
|---|---|
| Coinbase Developer | [portal.cdp.coinbase.com/products/faucet](https://portal.cdp.coinbase.com/products/faucet) |
| Google Cloud Web3 | [cloud.google.com/application/web3/faucet](https://cloud.google.com/application/web3/faucet) |
| Alchemy | [alchemy.com/faucets/base-sepolia](https://www.alchemy.com/faucets/base-sepolia) |

---

## 📦 Dependencies

### Frontend (`package.json`)
| Package | Version | Purpose |
|---|---|---|
| `next` | ^14.2.0 | React framework (App Router) |
| `react` / `react-dom` | ^18.3.0 | UI library |
| `@rainbow-me/rainbowkit` | ^2.1.0 | Wallet connection UI |
| `wagmi` | ^2.12.0 | React hooks for Ethereum |
| `@tanstack/react-query` | ^5.50.0 | Async state management |
| `viem` | ^2.17.0 | TypeScript Ethereum client |
| `ethers` | ^6.13.0 | Contract interaction |
| `@tychilabs/react-ugf` | latest | Universal Gas Framework |
| `pony-cause` | latest | Error cause chain (MetaMask dep) |
| `tailwindcss` | ^3.4.0 | Utility-first CSS |
| `typescript` | ^5.5.0 | Type safety |

### Contracts (`contracts/package.json`)
| Package | Version | Purpose |
|---|---|---|
| `hardhat` | ^2.22.0 | Smart contract dev framework |
| `@nomicfoundation/hardhat-toolbox` | ^5.0.0 | Testing, deployment, verification |
| `@openzeppelin/contracts` | ^5.0.0 | ERC-721, Ownable, Base64, Strings |
| `dotenv` | ^16.4.0 | Environment variable loading |

---

## 📋 Tech Stack Summary

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS 3.4, Custom Design System |
| **Wallet** | RainbowKit v2, Wagmi v2, ethers.js v6 |
| **Blockchain** | Base Sepolia (L2), Solidity 0.8.24 |
| **Smart Contract** | ERC-721 (OpenZeppelin v5), Fully On-Chain Metadata |
| **Gas Sponsorship** | UGF (Universal Gas Framework) by TychiLabs |
| **Dev Tools** | Hardhat, ESLint, PostCSS |
| **Testing** | Chai + Hardhat (9 tests) |
