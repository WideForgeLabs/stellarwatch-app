import { Contract, rpc, xdr, scValToNative, TransactionBuilder } from '@stellar/stellar-sdk';
import { HealthRecord } from './types';

const RPC_URL = 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
const SOURCE_ACCOUNT = 'GAFHZ5DNMEVFKISURDFHUGE5BJ5PAF6ZS2TBO6NKL2GO42IPDQIWHHYJ';

export class HealthRegistryClient {
  private contract: Contract;
  private server: rpc.Server;

  constructor(contractId: string) {
    this.contract = new Contract(contractId);
    this.server = new rpc.Server(RPC_URL);
  }

  async getOwner(): Promise<string> {
    return this.read<string>('get_owner');
  }

  async getRegistry(): Promise<string> {
    return this.read<string>('get_registry');
  }

  async isPaused(): Promise<boolean> {
    return false;
  }

  async getLatestHealth(contractId: Buffer): Promise<HealthRecord | null> {
    const idScVal = xdr.ScVal.scvBytes(contractId);
    return this.read<HealthRecord | null>('get_latest_health', [idScVal]);
  }

  async getHealthHistory(contractId: Buffer, limit: number): Promise<HealthRecord[]> {
    const idScVal = xdr.ScVal.scvBytes(contractId);
    const limitScVal = xdr.ScVal.scvU32(limit);
    return this.read<HealthRecord[]>('get_health_history', [idScVal, limitScVal]);
  }

  private async read<T>(method: string, args: xdr.ScVal[] = []): Promise<T> {
    const account = await this.server.getAccount(SOURCE_ACCOUNT);
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(this.contract.call(method, ...args))
      .setTimeout(30)
      .build();

    const result = await this.server.simulateTransaction(tx);

    if (rpc.Api.isSimulationError(result)) {
      throw new Error(`Simulation failed: ${result.error}`);
    }

    if (!rpc.Api.isSimulationSuccess(result) || !result.result) {
      throw new Error('No result from simulation');
    }

    return scValToNative(result.result.retval) as T;
  }
}
