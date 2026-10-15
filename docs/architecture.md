# StellarWatch App Architecture

## Overview

The application layer reads from three Soroban contracts on Stellar testnet and surfaces the data through a Next.js dashboard.

## Monorepo Layout

    stellarwatch-app/
    ├── packages/sdk/        TypeScript clients for the three contracts
    ├── apps/web/            Next.js 15 dashboard (deployed on Vercel)
    ├── services/indexer/    Event listener (scaffolded, issue #7)
    └── docs/                Architecture and SDK documentation

## Reading Data From the Contracts

    Browser
       |
       v
    Next.js Dashboard (apps/web)
       |
       v
    TypeScript SDK (packages/sdk)
       |
       v
    Soroban RPC (soroban-testnet.stellar.org)
       |
       v
    Deployed Contracts on Stellar Testnet
       ├── contract-registry
       ├── health-registry
       └── alert-rules

## Request Flow

1. The user opens the dashboard in a browser.
2. The dashboard calls a client wrapper from the SDK.
3. The SDK builds a transaction and calls `simulateTransaction` via Soroban RPC.
4. The RPC returns the return value of the contract call.
5. The SDK decodes the XDR and returns a typed value.
6. The dashboard renders the result.

## Future: Indexer

Once the indexer is implemented (issue #7), the flow will extend:

    Soroban RPC (events)
       |
       v
    Indexer (services/indexer)
       |
       v
    Database
       |
       v
    Dashboard reads historical data

## Related Repositories

- [stellarwatch-contract](https://github.com/WideForgeLabs/stellarwatch-contract) — the Soroban smart contracts
- [stellarwatch-app](https://github.com/WideForgeLabs/stellarwatch-app) — this repository
