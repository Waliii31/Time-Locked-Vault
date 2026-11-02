export interface VaultItem {
  id: string;
  vaultIndex: number;
  owner: string;
  beneficiary: string;
  amountEth: string; // amount in primary currency (BOT/ETH)
  amountWei: string;
  createdAt: number; // UNIX seconds
  unlockTimestamp: number; // UNIX seconds
  isWithdrawn: boolean;
  withdrawnAt?: number;
  purpose: string;
  depositTxHash: string;
  withdrawTxHash?: string;
  blockNumber: number;
}

export interface LedgerEvent {
  id: string;
  txHash: string;
  blockNumber: number;
  timestamp: number;
  eventType: 'LOCK_COMMITTED' | 'RELEASE_EXECUTED' | 'TRANSFER_INITIATED';
  vaultId: number;
  actor: string;
  beneficiary: string;
  valueEth: string;
  unlockTimestamp: number;
  gasUsed: number;
  status: 'CONFIRMED' | 'SETTLED';
}

export type NetworkMode = 'BOT_MAINNET' | 'SANDBOX' | 'SEPOLIA';

export interface Web3State {
  isConnected: boolean;
  address: string;
  balanceEth: string;
  currencySymbol: string;
  network: NetworkMode;
  chainId: number;
  simulatedTimeOffset: number; // seconds shifted forward
  virtualUnixTimestamp: number;
}
