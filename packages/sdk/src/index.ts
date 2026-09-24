/**
 * @stellarwatch/sdk
 *
 * TypeScript client wrappers for the StellarWatch Soroban contracts.
 */

export * from './types';
export { ContractRegistryClient } from './contract-registry';
export { HealthRegistryClient } from './health-registry';
export { AlertRulesClient } from './alert-rules';

export const VERSION = '0.1.0';

export const TESTNET_CONTRACT_IDS = {
  contractRegistry: 'CDT3J5O5XQBCFQQWY2SMPWG522QVPXZK7RIHLDLSMFWW7ZQWZN76URNC',
  healthRegistry: 'CB53FGQVY5YFSMZP4DHETWIRKOTPLKWYA3SK4Q3PFUFTJU25NZK6WTYC',
  alertRules: 'CB7WLFECVP5DOAM3362Q55DSLC5KOKIFJDADNHT47LH4SRUT5MEGMC4W',
} as const;
