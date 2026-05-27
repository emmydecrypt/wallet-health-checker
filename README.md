# Wallet Health Checker

A Pharos Agent Skill that checks the health of any wallet on the Pharos Pacific Mainnet.

## What It Does
- Fetches live PHRS balance from the blockchain
- Returns a health status: Healthy, Low, or Empty
- Gives simple advice based on the balance

## How To Use

### 1. Install dependencies
\ash
npm install
\\n
### 2. Run the skill
\ash
node scripts/check.js <wallet-address>
\\n
### 3. Example
\ash
node scripts/check.js 0x000000000000000000000000000000000000dEaD
\\n
### Output
\\nChecking wallet: 0x000000000000000000000000000000000000dEaD

Wallet  : 0x000000000000000000000000000000000000dEaD
Balance : 1.3584 PHRS
Status  : Healthy
Advice  : Wallet has sufficient balance.
\\n
## Health Status Levels

| Status | Condition | Advice |
|--------|-----------|--------|
| Healthy | Balance > 0.01 PHRS | Sufficient balance |
| Low | Balance < 0.01 PHRS | May not cover gas fees |
| Empty | Balance = 0 | No funds |

## Dependencies
- Node.js v18+
- pharos-agent-kit

## Network
- Pharos Pacific Mainnet (Chain ID: 688688)
