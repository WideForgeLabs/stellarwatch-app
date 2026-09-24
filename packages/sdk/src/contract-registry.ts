import { Contract, rpc, xdr, scValToNative, TransactionBuilder } from '@stellar/stellar-sdk';

const RPC_URL = 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
const SOURCE_ACCOUNT = 'GAFHZ5DNMEVFKISURDFHUGE5BJ5PAF6ZS2TBO6NKL2GO42IPDQIWHHYJ';

export class ContractRegistryClient {
  private contract: Contract;
  private server: rpc.Server;

  constructor(contractId: string) {
    this.contract = new Contract(contractId);
    this.server = new rpc.Server(RPC_URL);
  }

  async getOwner(): Promise<string> {
    return this.read<string>('get_owner');
  }

  async isPaused(): Promise<boolean> {
    return this.read<boolean>('is_paused');
  }

  async isRegistered(contractId: Buffer): Promise<boolean> {
    const idScVal = xdr.ScVal.scvBytes(contractId);
    return this.read<boolean>('is_registered', [idScVal]);
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
