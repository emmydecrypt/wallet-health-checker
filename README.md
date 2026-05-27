# Wallet Health Checker

A Pharos Agent Skill that checks the health of any wallet on the Pharos Pacific Mainnet.

## What It Does
- Fetches live PHRS balance from the blockchain
- Returns a health status: Healthy, Low, or Empty
- Gives simple advice based on the balance

## How To Use

### 1. Install dependencies
```bash
npm install
```

### 2. Run the skill
```bash
node scripts/check.js <wallet-address>
```

### 3. Example
```bash
node scripts/check.js 0x000000000000000000000000000000000000dEaD
```

### Output