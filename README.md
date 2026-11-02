# ZEITSPERRE — The Time-Locked Vault (Protocol 02)

> **A Dual-Transaction Chrono-Cryptographic Escrow Smart Contract on BOT Chain Mainnet, built in the Swiss International Typographic Style.**

[![Network](https://img.shields.io/badge/Network-BOT%20Chain%20Mainnet%20(677)-black?style=flat-square&logo=ethereum)](https://scan.botchain.ai)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-black?style=flat-square&logo=solidity)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-19-black?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Design](https://img.shields.io/badge/Design-12--Column%20Swiss%20Grid-red?style=flat-square)](#)

---

## Network & Contract Specifications

| Parameter | Mainnet Value |
| :--- | :--- |
| **Network Name** | **BOT Chain Mainnet** |
| **RPC URL** | [`https://rpc.botchain.ai`](https://rpc.botchain.ai) |
| **Chain ID** | **677** (`0x2a5`) |
| **Currency Symbol** | **BOT** |
| **Currency Decimals** | **18** |
| **Block Explorer URL** | [`https://scan.botchain.ai`](https://scan.botchain.ai) |
| **Contract Address** | [`0xFD51797C48f75aF10761F92Bdd639e4518358324`](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324) |
| **Contract Scan Link** | [View on BOT Chain Explorer](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324) |
| **Ecosystem** | [Powered by Botchain (botchain.ai)](https://botchain.ai) |
| **Social / X** | [@site_proof__ on X](https://x.com/site_proof__) |

---

## Overview & Aesthetic Philosophy

**ZEITSPERRE** is a single-page decentralized application (dApp) designed to lock native assets until a specified future UNIX timestamp has elapsed. Built strictly under the principles of the **1960s Swiss International Typographic Style** (Die Neue Graphik / Josef Müller-Brockmann / Emil Ruder tradition), it intentionally rejects standard Web3 SaaS clichés:
- **No purple gradients, soft card shadows, or glassmorphism.**
- **No 3D floating coins, cartoon avatars, or gamified badges.**
- **Strict 12-column mathematical grid** with razor-sharp 1px and 2px borders.
- **Stark `#FFFFFF` white canvas** with massive high-contrast black typography (Inter / Helvetica Neue).
- **A single accent color**: Pure Red (`#FF0000`, Pantone 485C / Swiss Red) reserved exclusively for critical status markers, the Swiss cross, and matured escrow beacons.

---

## 1. Features of the Web App (What Can It Do?)

### A. Dual-Transaction Blockchain Escrow Engine
1. **Transaction 01: Deposit & Time-Lock (`deposit`)**
   - **Commit Native BOT into Escrow**: Locks native BOT tokens into the immutable smart contract until `block.timestamp >= unlockTimestamp`.
   - **Quick Amount Chips**: One-click inputs for `1.0 BOT`, `5.0 BOT`, `10.0 BOT`, `25.0 BOT`, `50.0 BOT`, or `MAX BALANCE`.
   - **Dynamic Duration Presets**:
     - `+2 MIN` (Instant verification)
     - `+5 MIN` (Short lock)
     - `+1 HOUR` (60 minutes)
     - `+24 HOURS` (1 day)
     - `+7 DAYS` (1 week)
     - `+30 DAYS` (1 month)
     - `+365 DAYS` (1 year)
   - **Custom Epoch & ISO Timestamp Synchronization**: Enter raw UNIX epochs or select exact dates with real-time human-readable countdown previews (`DD:HH:MM:SS`).
   - **Beneficiary Delegation**: Lock funds for yourself or designate a third-party recipient address (for gifts, trust funds, or cold inheritance).
   - **Commitment Classification (Memo)**: Attach a custom purpose memo to each vault (e.g. `BOTCHAIN_COLD_LOCK`, `DAO_VESTING_2027`).
   - **Pre-Flight Cryptographic Assurance**: Real-time pre-flight inspection panel calculating gas estimates, current vs target block epoch, and non-cancellability guarantees.

2. **Transaction 02: Active Escrows & Withdrawal Engine (`withdraw`)**
   - **Directory of All Vaults**: Displays sequential Vault IDs (`#001`, `#002`, ...), Principal amount in BOT, Beneficiary address, Creation Epoch, and Target Epoch.
   - **Real-Time Dynamic Countdowns**: Ticking countdowns calculate remaining lock time second-by-second.
   - **Linear Progress Bars**: Minimalist progress rules fill as time approaches the unlock epoch.
   - **State Machine Badges**:
     - `TEMPORALLY LOCKED` — Button disabled with unlock time display.
     - `● READY TO UNLOCK (TX-02)` — Flashes in Pure Red with pulsing beacon when $T_{\text{block}} \ge T_{\text{unlock}}$.
     - `WITHDRAWN / ARCHIVED` — Shows settlement timestamp and liquidation confirmation.
   - **One-Click Settlement**: When mature, clicking `EXECUTE WITHDRAWAL (TX 02)` transfers the BOT principal back to the beneficiary and credits wallet balance.

### B. Testnet Clock Accelerator (Time Warp Simulation)
- Built-in deterministic time-machine toolbar (`+1 MIN`, `+5 MIN`, `+1 HOUR`, `+24 HOURS`, `RESET CLOCK`).
- Allows developers, testers, and auditors to fast-forward the simulated blockchain clock immediately to verify Transaction 02 without having to wait hours or days in real life.

### C. Live Chrono-Status Bar & Header
- **Live UTC Clock & UNIX Timestamp Ticker**: Continuously ticks every second with millisecond accuracy.
- **Network Mode Switcher**: Seamlessly toggle between `BOT (677)` (BOT Chain Mainnet) and `LOCAL (Sandbox)`.
- **Wallet Connection Console**: Supports browser-injected wallets (MetaMask, Rabby, Coinbase Wallet) with live BOT balance display and address truncation.
- **Interactive 12-Column Blueprint Grid Overlay**: Click `GRID ON/OFF` to view the red/black modular guide lines and column indices (Cols 01 to 12) across the viewport.

### D. Mathematical & Code Specification (Section 03)
- **Formal Invariant Axioms**:
  - *Axiom I: Monotonic Time* ($T_{\text{block}} > T_{\text{prev}}$ enforced by deterministic consensus).
  - *Axiom II: Complete Solvency* ($\sum V_i \equiv \text{Balance}$, zero fractional reserves).
  - *Axiom III: CEI Pattern* (Checks-Effects-Interactions mutex preventing recursive callback exploits).
- **Tabbed Solidity Code Inspector**:
  - `TimeLockedVault.sol` (Production smart contract code)
  - `ITimeLockedVault.sol` (Contract interface)
  - `Formal_Invariants.spec` (Mathematical constraints)
- **One-Click Code Copy**: Copies raw clean Solidity code to your clipboard.
- **Contract Verification Link**: Direct link to the contract on [BOT Chain Scan](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324).

### E. Public Audit & Real-Time Event Ledger (Section 04)
- **Append-Only Blockchain Log**: Displays every deposit (`LOCK_COMMITTED`) and withdrawal (`RELEASE_EXECUTED`) with Block #, Principal, Target Epoch, Tx Hash (linked to BOT Chain Scan), Gas Used, and Settlement Status.
- **Interactive Filtering**: Filter by `ALL EVENTS`, `TX-01 DEPOSITS`, or `TX-02 WITHDRAWALS`.
- **Real-Time Search Bar**: Instant search by transaction hash, actor address, or vault ID.
- **Export Cryptographic Proof (.JSON)**: One-click export of the entire ledger for off-chain cold storage records and archival verification.

### F. Curatorial Essay & Canonical Use-Cases (Section 05)
- Typographic monograph exploring why Swiss modernist design principles align with Satoshi Nakamoto's deterministic state machines.
- Four concrete applications: Anti-Panic Emotional Escrow, DAO Treasury Vesting, Crypto Inheritance, and Dispute-Free Commercial Milestone Locks.

### G. Exhibition Colophon & Specification Index (Section 06)
- Typographic specimen details (Inter 900 / Space Mono 700 / Paper White `#FFFFFF` / Pure Red `#FF0000`).
- **Footer Links Included**:
  - **Twitter / X Link**: [`https://x.com/site_proof__`](https://x.com/site_proof__)
  - **Powered by Botchain Link**: [`https://botchain.ai`](https://botchain.ai)
  - **Contract Scan Link**: [`https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324`](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324)

---

## 2. Local Setup & Testing with MetaMask

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- Google Chrome, Brave, Firefox, or Edge with the [MetaMask extension](https://metamask.io/) installed.

### Step 1: Clone & Install Dependencies
Open a terminal in the project directory:
```bash
# Navigate to the project root
cd "e:\D'APPS\Time-Locked Vault"

# Install all dependencies (React, Vite, Ethers, Tailwind v4, Lucide)
npm install
```

### Step 2: Launch the Development Server
```bash
npm run dev
```
Open **`http://localhost:5174/`** in your browser.

---

### Step 3: Connecting Your MetaMask Wallet to BOT Chain Mainnet

1. Open your browser where MetaMask is installed.
2. In the top-right corner of the **Header**, click the **`CONNECT`** button.
3. If MetaMask is detected:
   - The application automatically calls `wallet_switchEthereumChain` / `wallet_addEthereumChain` to add **BOT Chain Mainnet (Chain ID: 677)** to MetaMask with RPC `https://rpc.botchain.ai` and symbol `BOT`.
   - In the MetaMask popup, click **Approve** and **Switch network**.
   - Your account address (e.g. `0x71C8...A21F`) and your current BOT balance will appear directly in the Swiss navigation bar.
4. **Manual Network Addition in MetaMask (if needed)**:
   - **Network Name**: `BOT Chain Mainnet`
   - **New RPC URL**: `https://rpc.botchain.ai`
   - **Chain ID**: `677`
   - **Currency Symbol**: `BOT`
   - **Block Explorer URL**: `https://scan.botchain.ai`

---

## 3. Manual Testing Walkthrough (Testing Every Feature)

Follow this step-by-step checklist to test 100% of the application's capabilities:

### Test 1: Inspect the Swiss 12-Column Blueprint Grid
- Click the **`GRID ON`** button in the top navigation bar (or in the footer).
- **Expected Result**: A red/black mathematical 12-column layout overlay appears over the entire screen, displaying column indices `COL 01` through `COL 12` with column width percentage (`8.33%`).
- Click **`GRID OFF`** to hide the overlay.

---

### Test 2: Execute Transaction 02 on a Matured Vault (Immediate Withdrawal)
- Scroll down to **Section 02: Dual-Transaction Engine**.
- Click the **`02. ACTIVE VAULTS & WITHDRAWAL`** tab.
- Look at **Vault #001** (pre-seeded as matured):
  - Notice the badge says `● READY TO UNLOCK (TX-02)` in Pure Red with an active pulse.
  - Notice the countdown shows `MATURED (00:00:00)`.
- Click the **`EXECUTE WITHDRAWAL (TX 02) →`** button.
- **Expected Result**:
  1. A red transaction notification banner appears confirming: `TRANSACTION 02 EXECUTED: Released 25.0000 BOT from Vault #001`.
  2. The status of Vault #001 flips to `WITHDRAWN / CLOSED`.
  3. Your wallet balance in the header increases by `+25.0000 BOT`.
  4. Scroll to **Section 04 (Ledger)**: A new `RELEASE_EXECUTED` event is appended with a clickable link to view on BOT Chain Scan.

---

### Test 3: Execute Transaction 01 (Deposit & Time-Lock)
- Click the **`01. DEPOSIT & TIME-LOCK`** tab.
- Fill out the form:
  1. **Commit Amount**: Click the **`5.0 BOT`** quick chip (or type any amount).
  2. **Lock Period**: Click the **`+2 MIN`** preset button (or select `+5 MIN`).
     - Notice the *Target Unlock Epoch* and *Calculated Expiration* calculate in real time.
     - Check the **Pre-Flight State Inspection** panel on the right side: it displays the lock value, current block epoch, target unlock epoch, and estimated gas units (~46,210).
  3. **Beneficiary**: Leave blank to default to your wallet, or enter an alternate Ethereum address.
  4. **Commitment Memo**: Type `BOTCHAIN_VERIFICATION_TEST`.
- Click the large black button: **`TRANSMIT TRANSACTION 01: LOCK BOT →`**.
- **Expected Result**:
  1. A notification banner displays: `TRANSACTION 01 COMMITTED: Vault #004 initialized with 5.0 BOT until UNIX...`.
  2. The view automatically switches to the **Active Vaults** directory.
  3. Your newly created vault is now listed with an active countdown timer (`T - 01:59`), an animated linear progress bar, and status `TEMPORALLY LOCKED`.
  4. The withdrawal button is disabled with label `LOCKED UNTIL [TIME]`.
  5. Your wallet balance is deducted by `5.0 BOT`.

---

### Test 4: Use the Temporal Accelerator (Time Warp)
- Look at your newly created locked vault (or Vault #002 which unlocks in 5 minutes).
- In the grey **TESTNET CLOCK ACCELERATOR** toolbar above the tabs:
  - Click **`+5 MIN`** (or **`+1 HOUR`**).
- **Expected Result**:
  1. The simulated clock offset increases.
  2. The vault countdown instantly completes.
  3. The vault status badge immediately transitions from `TEMPORALLY LOCKED` to pure red **`● READY TO UNLOCK (TX-02)`**.
  4. The button transforms into an active red button: **`EXECUTE WITHDRAWAL (TX 02) →`**.
  5. Click **`EXECUTE WITHDRAWAL (TX 02)`** to claim your locked funds and see them returned to your wallet balance!
  6. Click **`RESET CLOCK`** to restore the clock back to real-time.

---

### Test 5: Verify Contract Protection (Early Withdrawal Constraint)
- Create a vault with a longer duration (e.g. click **`+24 HOURS`** or **`+30 DAYS`**).
- Go to the **Active Vaults** tab.
- **Expected Result**: The smart contract UI strictly locks the action button, rendering it disabled with a gray border and the exact lock expiration time. Early withdrawal is mathematically prohibited.

---

### Test 6: Verify Footer & Scan Links
- Scroll to **Section 06: Footer / Colophon**:
  - Click **`VIEW CONTRACT ON BOTCHAIN SCAN ↗`**: Opens [`https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324`](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324).
  - Click **`POWERED BY BOTCHAIN (BOTCHAIN.AI) ↗`**: Opens [`https://botchain.ai`](https://botchain.ai).
  - Click **`X (TWITTER): @SITE_PROOF__ ↗`**: Opens [`https://x.com/site_proof__`](https://x.com/site_proof__).

---

### Test 7: Filter and Export Public Audit Ledger Proof
- Scroll to **Section 04: Public Audit Ledger**.
- Test the filter buttons:
  - Click **`TX-01 DEPOSITS`**: Displays only `LOCK_COMMITTED` events.
  - Click **`TX-02 WITHDRAWALS`**: Displays only `RELEASE_EXECUTED` events.
  - Click **`ALL EVENTS`**: Restores the complete transaction history.
- Test the search bar:
  - Type `001` or paste part of a transaction hash into the search box.
- Click **`EXPORT AUDIT PROOF (.JSON)`**.
- **Expected Result**: Your browser immediately downloads a file named `BOTCHAIN_ZEITSPERRE_AUDIT_[timestamp].json` containing the complete cryptographic record of all transactions with timestamps and block numbers.

---

## 4. Smart Contract Architecture

The underlying Solidity smart contract ([`TimeLockedVault.sol`](file:///e:/D'APPS/Time-Locked%20Vault/src/contracts/TimeLockedVault.sol)) is implemented with strict safety mechanisms:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TimeLockedVault {
    struct Vault {
        uint256 id;
        address owner;
        address payable beneficiary;
        uint256 amount;
        uint256 createdAt;
        uint256 unlockTimestamp;
        bool isWithdrawn;
        string purpose;
    }

    // TX 01: Deposit & Time-Lock
    function deposit(uint256 unlockTimestamp, address payable beneficiary, string calldata purpose) 
        external payable returns (uint256 vaultId);

    // TX 02: Withdraw upon maturity
    function withdraw(uint256 vaultId) external nonReentrant;
}
```

- **Reentrancy Protection**: Employs a mutex lock modifier and adheres strictly to the **CEI (Checks-Effects-Interactions)** pattern—the vault state is marked `isWithdrawn = true` and `amount = 0` before any external token transfer occurs.
- **Strict Monotonicity**: Reverts with `ERROR: TEMPORAL_LOCK_ACTIVE` if `block.timestamp < unlockTimestamp`.
- **Zero Fractional Reserves**: The contract balance strictly equals the sum of all active deposits.

---

## License

MIT License. Open access, non-custodial, and deterministic. Powered by [Botchain](https://botchain.ai). Designed in tribute to the 1960s Swiss Graphic Design masters (Josef Müller-Brockmann, Armin Hofmann, Max Bill, Emil Ruder).
