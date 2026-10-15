# @stellarwatch/sdk

TypeScript client wrappers for the StellarWatch Soroban contracts. Reads from `contract-registry`, `health-registry`, and `alert-rules` on Stellar testnet.

## Installation

    npm install @stellarwatch/sdk

## Quick start

    import {
      ContractRegistryClient,
      HealthRegistryClient,
      AlertRulesClient,
      TESTNET_CONTRACT_IDS,
    } from "@stellarwatch/sdk";

    const registry = new ContractRegistryClient(TESTNET_CONTRACT_IDS.contractRegistry);
    const owner = await registry.getOwner();
    console.log("Registry owner:", owner);

## Available clients

### ContractRegistryClient

Tracks which contracts are being monitored.

    const client = new ContractRegistryClient(TESTNET_CONTRACT_IDS.contractRegistry);
    await client.getOwner();                          // Address
    await client.isPaused();                          // boolean
    await client.isRegistered(contractIdBuffer);      // boolean

### HealthRegistryClient

Records health check results with on-chain timestamps.

    const client = new HealthRegistryClient(TESTNET_CONTRACT_IDS.healthRegistry);
    await client.getOwner();                                       // Address
    await client.getRegistry();                                    // Address
    await client.getLatestHealth(contractIdBuffer);                // HealthRecord | null
    await client.getHealthHistory(contractIdBuffer, 10);           // HealthRecord[]

### AlertRulesClient

Stores configurable threshold rules for automated alerts.

    const client = new AlertRulesClient(TESTNET_CONTRACT_IDS.alertRules);
    await client.getOwner();                          // Address
    await client.isPaused();                          // boolean
    await client.getContractRules(contractIdBuffer);  // bigint[]

## Contract IDs on testnet

    export const TESTNET_CONTRACT_IDS = {
      contractRegistry: "CDT3J5O5XQBCFQQWY2SMPWG522QVPXZK7RIHLDLSMFWW7ZQWZN76URNC",
      healthRegistry: "CB53FGQVY5YFSMZP4DHETWIRKOTPLKWYA3SK4Q3PFUFTJU25NZK6WTYC",
      alertRules: "CB7WLFECVP5DOAM3362Q55DSLC5KOKIFJDADNHT47LH4SRUT5MEGMC4W",
    } as const;

## How it works

Each client wraps a Soroban contract and uses `simulateTransaction` via the Stellar RPC to read state. Write methods (create, update, delete) are on the roadmap — see the [open issues](https://github.com/WideForgeLabs/stellarwatch-app/issues).

## Development

    npm install
    npm run build

## Related repositories

- [stellarwatch-contract](https://github.com/WideForgeLabs/stellarwatch-contract) — the Soroban contracts
- [stellarwatch-app](https://github.com/WideForgeLabs/stellarwatch-app) — the dashboard and monorepo

## License

MIT
