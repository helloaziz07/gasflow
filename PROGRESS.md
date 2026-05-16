# Gasflow — Project Progress & Setup Guide

> **Last Updated:** May 16, 2026  
> **Status:** Smart Contract tested ✅ | Frontend running ✅ | Deployment pending (needs Base Sepolia ETH)

---

## 📋 What We've Built So Far

### Phase 1 — Project Scaffolding ✅
- Initialized Next.js 14 project with App Router
- Configured Tailwind CSS with a premium dark-space design system (indigo/violet theme)
- Set up PostCSS, TypeScript, and ESLint
- Created `.env.local` template for secrets
- Created `.gitignore` to protect private keys
- Installed all frontend dependencies (877 packages)
- Installed all contract dependencies (595 packages)

### Phase 2 — Smart Contract ✅
- **`GasflowCertificate.sol`** — Full ERC-721 NFT contract with:
  - On-chain SVG certificate image generation (no external storage needed!)
  - Base64-encoded JSON metadata (fully on-chain)
  - Open minting function for UGF compatibility
  - Certificate data: recipient name, title, achievement, timestamp
  - `CertificateMinted` event for frontend tracking
- **`deploy.js`** — Hardhat deployment script targeting Base Sepolia
- **`GasflowCertificate.test.js`** — 9 automated tests (all passing ✅)
  - Deployment: name, symbol, initial state
  - Minting: data storage, ownership, counter, events, auto-increment IDs
  - Token URI: valid data URI, revert on non-existent token
- **`hardhat.config.js`** — Configured with:
  - Solidity `0.8.24`
  - `viaIR: true` (fixes stack-too-deep for SVG generation)
  - `evmVersion: "cancun"` (supports latest EVM opcodes like `mcopy`)
  - Base Sepolia network (chain ID 84532)

### Phase 3 — Wallet Integration ✅
- **`wagmi.ts`** — Wagmi v2 config with Base Sepolia chain and public RPC
- **`providers.tsx`** — Client-side provider wrapping Wagmi, TanStack Query, and RainbowKit
- **`layout.tsx`** — Root layout with metadata, providers, dark mode

### Phase 4 — Minting Logic ✅
- **`contract.ts`** — Contract address + minimal ABI (only functions the frontend needs)
- **`useMintCertificate.ts`** — Custom React hook with:
  - ethers.js contract interaction
  - Status tracking (idle → pending → success/error)
  - Transaction hash + token ID extraction from events
  - User-friendly error messages

### Phase 5 — Frontend UI ✅
- **`Navbar.tsx`** — Glassmorphism navbar with logo, nav links, RainbowKit ConnectButton
- **`HeroSection.tsx`** — Animated hero with gradient glows, stats row, CTA buttons
- **`HowItWorks.tsx`** — 3-step visual guide with gradient icon cards
- **`MintForm.tsx`** — Full form with inputs, validation, loading spinner, success/error states
- **`CertificatePreview.tsx`** — Live certificate preview with gradient border glow
- **`Footer.tsx`** — Brand, resource links, tech badges, copyright
- **`page.tsx`** — Main page assembling all sections
- **`globals.css`** — Complete design system (glassmorphism, animations, gradients)

### Phase 6 — Deployment ⏳ (In Progress)
- [ ] Get Base Sepolia ETH into deployer wallet
- [ ] Deploy contract to Base Sepolia
- [ ] Update `.env.local` with contract address
- [ ] Deploy frontend to Vercel

---

## 🔧 Compiler Issues We Fixed

| Error | Root Cause | Fix |
|---|---|---|
| `HH606: pragma mismatch` | OpenZeppelin v5 requires Solidity `^0.8.24` but config had `0.8.20` | Changed `version` to `"0.8.24"` in `hardhat.config.js` |
| `mcopy not found` | `mcopy` is a Cancun EVM opcode, but Hardhat defaulted to an older EVM | Added `evmVersion: "cancun"` to compiler settings |
| `Stack too deep` | On-chain SVG generation uses too many local variables for the default compiler | Added `viaIR: true` to enable the IR-based compilation pipeline |

---

## 🦊 How to Set Up MetaMask for This Project

### Step 1: Install MetaMask
1. Go to [https://metamask.io/download/](https://metamask.io/download/)
2. Click "Install MetaMask for Chrome" (or your browser)
3. Follow the setup wizard to create a new wallet
4. **Write down your 12-word Secret Recovery Phrase** on paper. Never share it!

### Step 2: Add Base Sepolia Network to MetaMask
MetaMask only shows Ethereum Mainnet by default. We need to add our testnet:

**Method A — Automatic (Recommended):**
1. Go to [https://chainlist.org/chain/84532](https://chainlist.org/chain/84532)
2. Click "Connect Wallet" and approve in MetaMask
3. Click "Add to MetaMask"
4. Approve the network addition

**Method B — Manual:**
1. Open MetaMask → Click the network dropdown (top left)
2. Click "Add a network" → "Add a network manually"
3. Fill in these details:

| Field | Value |
|---|---|
| Network Name | `Base Sepolia` |
| New RPC URL | `https://sepolia.base.org` |
| Chain ID | `84532` |
| Currency Symbol | `ETH` |
| Block Explorer URL | `https://sepolia.basescan.org` |

4. Click "Save"

### Step 3: Switch to Base Sepolia
1. Click the network dropdown in MetaMask (top left corner)
2. Turn ON "Show test networks" if you haven't already
3. Select **"Base Sepolia"**

### Step 4: Export Your Private Key (for deployment only)
1. In MetaMask, click the three dots (⋮) next to your account name
2. Click "Account Details" → "Show Private Key"
3. Enter your MetaMask password to reveal it
4. Copy the key and paste it into `.env.local` next to `DEPLOYER_PRIVATE_KEY=`

> ⚠️ **WARNING:** Your private key is like a master password. NEVER share it publicly, NEVER commit it to GitHub. Our `.gitignore` file protects it from being uploaded.

---

## 💰 How to Get Free Base Sepolia ETH

You need a tiny amount of fake ETH on the Base Sepolia network to deploy the smart contract. Here are the methods:

### Method 1: Direct Faucets (Easiest)
These websites give you free Base Sepolia ETH directly:

| Faucet | URL | Requirements |
|---|---|---|
| **Coinbase Developer** | [portal.cdp.coinbase.com/products/faucet](https://portal.cdp.coinbase.com/products/faucet) | Free Coinbase account |
| **Bware Labs** | [bwarelabs.com/faucets/base-sepolia](https://bwarelabs.com/faucets/base-sepolia) | No registration |
| **LearnWeb3** | [learnweb3.io/faucets/base_sepolia](https://learnweb3.io/faucets/base_sepolia) | Free account |
| **Alchemy** | [alchemy.com/faucets/base-sepolia](https://www.alchemy.com/faucets/base-sepolia) | Free Alchemy account |

**Steps:**
1. Copy your wallet address from MetaMask (starts with `0x...`)
2. Go to any faucet above
3. Paste your wallet address
4. Click "Send" or "Get ETH"
5. Wait 10-30 seconds for the ETH to arrive in your wallet

### Method 2: Bridge from Ethereum Sepolia
If you already have Ethereum Sepolia ETH (from the Google Faucet), you can bridge it:

1. Go to [https://testnets.superbridge.app/base-sepolia](https://testnets.superbridge.app/base-sepolia)
   - ⚠️ Make sure the URL starts with `testnets.` — NOT `superbridge.app` (that's mainnet!)
2. Connect your MetaMask wallet
3. Set "From: Ethereum Sepolia" → "To: Base Sepolia"
4. Enter amount (e.g., `0.01`)
5. Click "Deposit" / "Bridge"
6. Confirm in MetaMask
7. Wait 1-2 minutes for the bridge to complete

### Method 3: Google Cloud Web3 Faucet
1. Go to [https://cloud.google.com/application/web3/faucet](https://cloud.google.com/application/web3/faucet)
2. In the "Select network" dropdown, scroll down and pick **"Base Sepolia"**
   - ⚠️ Don't pick "Ethereum Sepolia" — that's a different network!
3. Paste your wallet address
4. Click "Get ETH"

### How to Verify You Have ETH
1. Open MetaMask
2. Switch to **Base Sepolia** network (top left dropdown)
3. You should see a balance like `0.05 ETH` or `0.01 ETH`
4. The dollar value will show $0.00 — **this is normal** because testnet ETH has no real value

---

## 🚀 Once You Have Base Sepolia ETH — Deploy!

Run this in your terminal (from the `gasflow/contracts` folder):
```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

On success, you'll see:
```
✅ GasflowCertificate deployed to: 0x1234...abcd
🔗 View on BaseScan: https://sepolia.basescan.org/address/0x1234...abcd

📋 Add this to your .env.local:
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234...abcd
```

Copy that address and paste it into your `.env.local` file. Then restart the dev server (`npm run dev`) and your app will be fully functional!

---

## 📁 Current File Structure

```
gasflow/
├── .env.local                    # Secrets (private key, WalletConnect ID)
├── .eslintrc.json                # ESLint config
├── .gitignore                    # Protects secrets from Git
├── next.config.js                # Next.js + webpack fallbacks
├── package.json                  # Frontend dependencies
├── postcss.config.js             # PostCSS config
├── tailwind.config.ts            # Tailwind design system
├── tsconfig.json                 # TypeScript config
│
├── contracts/                    # BLOCKCHAIN LAYER
│   ├── contracts/
│   │   └── GasflowCertificate.sol   # ERC-721 NFT contract (9/9 tests passing)
│   ├── scripts/
│   │   └── deploy.js                # Deployment script
│   ├── test/
│   │   └── GasflowCertificate.test.js  # Unit tests
│   ├── hardhat.config.js            # Hardhat config (v0.8.24, cancun, viaIR)
│   └── package.json                 # Hardhat dependencies
│
└── src/                          # FRONTEND LAYER
    ├── app/
    │   ├── globals.css              # Design system
    │   ├── layout.tsx               # Root layout + providers
    │   ├── page.tsx                 # Main page
    │   └── providers.tsx            # Wagmi + RainbowKit + React Query
    ├── components/
    │   ├── Navbar.tsx               # Navigation bar
    │   ├── HeroSection.tsx          # Hero section
    │   ├── HowItWorks.tsx           # 3-step guide
    │   ├── MintForm.tsx             # Minting form + validation
    │   ├── CertificatePreview.tsx   # Live certificate preview
    │   └── Footer.tsx               # Footer
    ├── hooks/
    │   └── useMintCertificate.ts    # Minting logic hook
    └── lib/
        ├── contract.ts              # Contract address + ABI
        └── wagmi.ts                 # Wagmi chain config
```

---

## ✅ Test Results

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
