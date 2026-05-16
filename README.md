# ⚡ Gasflow — Gasless NFT Certificate Platform

> Mint NFT certificates on Base Sepolia **without ETH gas fees**, powered by the Universal Gas Framework (UGF).

![Base Sepolia](https://img.shields.io/badge/Network-Base%20Sepolia-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Problem

Traditional Web3 apps force users to hold ETH just to pay gas fees. This is confusing for beginners and creates a massive barrier to entry.

## 💡 Solution

**Gasflow** removes that friction. Users mint NFT certificates by paying with **Mock USD** (testnet) instead of ETH. The Universal Gas Framework (UGF) handles gas abstraction behind the scenes — making blockchain feel as simple as Web2.

## ✨ Features

- 🔗 **One-click wallet connection** via RainbowKit + MetaMask
- 🎨 **On-chain SVG certificates** — images generated entirely by the smart contract
- ⛽ **Gasless minting** — no ETH required, pay with Mock USD via UGF
- 📜 **Fully on-chain metadata** — certificate data lives forever on the blockchain
- 🌙 **Premium dark-mode UI** — glassmorphism, gradient glows, micro-animations
- 🔍 **Live certificate preview** — see your NFT before minting
- 🔗 **BaseScan integration** — verify every transaction on-chain

---

## 🏗️ Architecture

```text
[ User ]
    │  Clicks "Mint Certificate"
    ▼
[ Frontend (Next.js + React) ]
    │  Packages certificate data
    ▼
[ Wallet (MetaMask via Wagmi/RainbowKit) ]
    │  Signs the transaction
    ▼
[ UGF (Universal Gas Framework) ]
    │  Pays gas in Mock USD, relays TX
    ▼
[ Base Sepolia Blockchain ]
    │  Executes smart contract
    ▼
[ GasflowCertificate.sol (ERC-721) ]
    │  Mints NFT + generates on-chain SVG
    ▼
[ ✅ NFT appears in user's wallet ]
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS, custom glassmorphism design system |
| **Wallet** | Wagmi v2, RainbowKit, ethers.js |
| **Gas Abstraction** | UGF (`@tychilabs/react-ugf`) |
| **Smart Contract** | Solidity 0.8.24, OpenZeppelin v5 (ERC-721) |
| **Tooling** | Hardhat, Hardhat Toolbox |
| **Network** | Base Sepolia (Chain ID: 84532) |

---

## 📁 Project Structure

```
gasflow/
├── contracts/                         # Smart Contract Layer
│   ├── contracts/
│   │   └── GasflowCertificate.sol     # ERC-721 NFT contract (on-chain SVG)
│   ├── scripts/
│   │   └── deploy.js                  # Base Sepolia deployment script
│   ├── test/
│   │   └── GasflowCertificate.test.js # 9 unit tests (all passing)
│   ├── hardhat.config.js              # Hardhat config
│   └── package.json
│
├── src/                               # Frontend Layer
│   ├── app/
│   │   ├── globals.css                # Design system + animations
│   │   ├── layout.tsx                 # Root layout + providers
│   │   ├── page.tsx                   # Main page
│   │   └── providers.tsx              # Wagmi + RainbowKit + React Query
│   ├── components/
│   │   ├── Navbar.tsx                 # Navigation + ConnectButton
│   │   ├── HeroSection.tsx            # Animated hero section
│   │   ├── HowItWorks.tsx             # 3-step guide
│   │   ├── MintForm.tsx               # Certificate minting form
│   │   ├── CertificatePreview.tsx     # Live NFT preview
│   │   └── Footer.tsx                 # Footer
│   ├── hooks/
│   │   └── useMintCertificate.ts      # Minting logic hook
│   └── lib/
│       ├── contract.ts                # Contract address + ABI
│       └── wagmi.ts                   # Chain configuration
│
├── .env.local                         # Environment variables (not committed)
├── .gitignore
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MetaMask](https://metamask.io/) browser extension
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/helloaziz07/gasflow.git
cd gasflow
```

### 2. Install Dependencies

```bash
# Frontend dependencies
npm install

# Smart contract dependencies
cd contracts
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=<your_deployed_contract_address>
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your_walletconnect_project_id>
DEPLOYER_PRIVATE_KEY=<your_metamask_private_key>
```

- Get a WalletConnect Project ID at [cloud.walletconnect.com](https://cloud.walletconnect.com/)
- Get your private key from MetaMask (Account Details → Show Private Key)

### 4. Run Smart Contract Tests

```bash
cd contracts
npx hardhat test
```

Expected output:
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

### 5. Deploy Smart Contract

Get free Base Sepolia ETH from a [faucet](https://www.alchemy.com/faucets/base-sepolia), then:

```bash
cd contracts
npx hardhat run scripts/deploy.js --network baseSepolia
```

Copy the deployed contract address and add it to `.env.local`.

### 6. Start the Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 User Flow

1. **Visit** — User opens the website
2. **Connect** — Clicks "Connect Wallet" → MetaMask popup → approves connection
3. **Fill Form** — Enters recipient name, certificate title, and achievement
4. **Preview** — Sees a live preview of the certificate updating in real-time
5. **Mint** — Clicks "Mint Certificate" → UGF handles gas via Mock USD
6. **Success** — Gets transaction hash + link to verify on BaseScan

---

## 📜 Smart Contract

**`GasflowCertificate.sol`** is an ERC-721 NFT contract that:
- Stores certificate data (name, title, achievement, timestamp) on-chain
- Generates SVG certificate images dynamically using Solidity
- Returns fully on-chain Base64-encoded JSON metadata via `tokenURI()`
- Emits `CertificateMinted` events for frontend tracking
- Uses OpenZeppelin v5 for battle-tested security

---

## 🧪 Testing

All 9 unit tests pass across 3 test suites:

| Suite | Tests | Status |
|---|---|---|
| Deployment | Name, symbol, initial state | ✅ |
| Minting | Data, ownership, counter, events, IDs | ✅ |
| Token URI | Valid data URI, revert on non-existent | ✅ |

---

## 🌐 Deployment

| Component | Platform | URL |
|---|---|---|
| Smart Contract | Base Sepolia | [BaseScan](https://sepolia.basescan.org) |
| Frontend | Vercel | Coming soon |

---

## 🤝 Built For

**HackWithMumbai** — A hackathon focused on building innovative Web3 solutions.

---

## 📄 License

This project is licensed under the MIT License.
