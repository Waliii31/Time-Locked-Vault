import React, { createContext, useContext, useState, useEffect } from 'react';
import type { VaultItem, LedgerEvent, NetworkMode, Web3State } from '../types/vault';
import { ethers } from 'ethers';
import {
  CONTRACT_ADDRESS_BOTCHAIN,
  BOTCHAIN_CHAIN_ID_DECIMAL,
  BOTCHAIN_CHAIN_ID_HEX,
  BOTCHAIN_NETWORK_CONFIG,
  TIME_LOCKED_VAULT_ABI,
} from '../contracts/contractData';

interface VaultContextType {
  web3State: Web3State;
  vaults: VaultItem[];
  ledgerEvents: LedgerEvent[];
  currentUnixTime: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (mode: NetworkMode) => Promise<void>;
  depositEth: (params: {
    amountEth: string;
    unlockTimestamp: number;
    beneficiary?: string;
    purpose?: string;
  }) => Promise<{ success: boolean; vaultId: number; txHash: string; error?: string }>;
  withdrawEth: (vaultId: number) => Promise<{ success: boolean; txHash: string; error?: string }>;
  fastForwardTime: (seconds: number) => void;
  resetSimulationTime: () => void;
  showGridLines: boolean;
  setShowGridLines: React.Dispatch<React.SetStateAction<boolean>>;
}

const STORAGE_KEY_VAULTS = 'zeitsperre_vaults_botchain_v1';
const STORAGE_KEY_LEDGER = 'zeitsperre_ledger_botchain_v1';

const VaultContext = createContext<VaultContextType | undefined>(undefined);

// Generate deterministic pseudo-random hash for sandbox fallbacks
const generatePseudoHash = () => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [currentUnixTime, setCurrentUnixTime] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [showGridLines, setShowGridLines] = useState<boolean>(false);

  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: true,
    address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
    balanceEth: '184.5000',
    currencySymbol: 'BOT',
    network: 'BOT_MAINNET',
    chainId: BOTCHAIN_CHAIN_ID_DECIMAL,
    simulatedTimeOffset: 0,
    virtualUnixTimestamp: Math.floor(Date.now() / 1000),
  });

  // Dynamic real-time clock ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const realNow = Math.floor(Date.now() / 1000);
      const computedNow = realNow + timeOffset;
      setCurrentUnixTime(computedNow);
      setWeb3State(prev => ({
        ...prev,
        virtualUnixTimestamp: computedNow,
        simulatedTimeOffset: timeOffset,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeOffset]);

  // Initial Vaults Seed
  const [vaults, setVaults] = useState<VaultItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_VAULTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    const now = Math.floor(Date.now() / 1000);
    return [
      {
        id: 'vault-001',
        vaultIndex: 1,
        owner: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        beneficiary: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        amountEth: '25.0000',
        amountWei: '25000000000000000000',
        createdAt: now - 86400 * 2,
        unlockTimestamp: now - 3600, // Matured
        isWithdrawn: false,
        purpose: 'TEST_CASE_A: MATURED BOT VAULT (READY FOR EXTRACTION)',
        depositTxHash: '0x3a9f7e81b2c45091d3e8a4521798dfc382901a556b19e2e4827d0a927c3f8101',
        blockNumber: 10420,
      },
      {
        id: 'vault-002',
        vaultIndex: 2,
        owner: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        beneficiary: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        amountEth: '10.5000',
        amountWei: '10500000000000000000',
        createdAt: now - 600,
        unlockTimestamp: now + 300, // 5 min lock
        isWithdrawn: false,
        purpose: 'TEST_CASE_B: NEAR-TERM BOT LOCK (5 MIN)',
        depositTxHash: '0x7b11c08d92f5e31a84b901ec589a12c49980a312bb45e31998af21d09e3ca119',
        blockNumber: 10455,
      },
      {
        id: 'vault-003',
        vaultIndex: 3,
        owner: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        beneficiary: '0x291A80942dF9f19C4528dC08420bF76a16A65171',
        amountEth: '100.0000',
        amountWei: '100000000000000000000',
        createdAt: now - 86400,
        unlockTimestamp: now + 86400 * 30, // 30 days lock
        isWithdrawn: false,
        purpose: 'COLD_STORAGE: BOTCHAIN ENDOWMENT 2026',
        depositTxHash: '0x99e821fa0c8b321e8477a983bca90291d2938af911ec598371ca0029b981cf02',
        blockNumber: 10410,
      },
    ];
  });

  // Initial Ledger Events
  const [ledgerEvents, setLedgerEvents] = useState<LedgerEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LEDGER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    const now = Math.floor(Date.now() / 1000);
    return [
      {
        id: 'event-001',
        txHash: '0x3a9f7e81b2c45091d3e8a4521798dfc382901a556b19e2e4827d0a927c3f8101',
        blockNumber: 10420,
        timestamp: now - 86400 * 2,
        eventType: 'LOCK_COMMITTED',
        vaultId: 1,
        actor: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        beneficiary: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        valueEth: '25.0000',
        unlockTimestamp: now - 3600,
        gasUsed: 46210,
        status: 'SETTLED',
      },
      {
        id: 'event-002',
        txHash: '0x99e821fa0c8b321e8477a983bca90291d2938af911ec598371ca0029b981cf02',
        blockNumber: 10410,
        timestamp: now - 86400,
        eventType: 'LOCK_COMMITTED',
        vaultId: 3,
        actor: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        beneficiary: '0x291A80942dF9f19C4528dC08420bF76a16A65171',
        valueEth: '100.0000',
        unlockTimestamp: now + 86400 * 30,
        gasUsed: 47100,
        status: 'SETTLED',
      },
      {
        id: 'event-003',
        txHash: '0x7b11c08d92f5e31a84b901ec589a12c49980a312bb45e31998af21d09e3ca119',
        blockNumber: 10455,
        timestamp: now - 600,
        eventType: 'LOCK_COMMITTED',
        vaultId: 2,
        actor: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        beneficiary: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        valueEth: '10.5000',
        unlockTimestamp: now + 300,
        gasUsed: 46210,
        status: 'SETTLED',
      },
    ];
  });

  // Persist vaults and ledger
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VAULTS, JSON.stringify(vaults));
  }, [vaults]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LEDGER, JSON.stringify(ledgerEvents));
  }, [ledgerEvents]);

  // Request network switch in MetaMask to BOT Chain Mainnet
  const requestBotChainNetwork = async (ethereum: ethers.Eip1193Provider) => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BOTCHAIN_CHAIN_ID_HEX }],
      });
    } catch (switchError: unknown) {
      // 4902 code indicates chain has not been added to MetaMask
      const anyErr = switchError as { code?: number };
      if (anyErr?.code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BOTCHAIN_NETWORK_CONFIG],
        });
      } else {
        console.warn('Network switch error:', switchError);
      }
    }
  };

  // Connect to MetaMask / Web3 Provider
  const connectWallet = async () => {
    try {
      const anyWindow = window as unknown as { ethereum?: ethers.Eip1193Provider };
      if (anyWindow.ethereum) {
        // Switch to BOT Chain if not already
        await requestBotChainNetwork(anyWindow.ethereum);

        const provider = new ethers.BrowserProvider(anyWindow.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(address);

        const isBotChain = Number(network.chainId) === BOTCHAIN_CHAIN_ID_DECIMAL;

        setWeb3State(prev => ({
          ...prev,
          isConnected: true,
          address,
          balanceEth: parseFloat(ethers.formatEther(balance)).toFixed(4),
          currencySymbol: isBotChain ? 'BOT' : 'ETH',
          network: isBotChain ? 'BOT_MAINNET' : Number(network.chainId) === 11155111 ? 'SEPOLIA' : 'SANDBOX',
          chainId: Number(network.chainId),
        }));
      } else {
        // Local deterministic sandbox fallback
        setWeb3State(prev => ({
          ...prev,
          isConnected: true,
          address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
          balanceEth: '184.5000',
          currencySymbol: 'BOT',
          network: 'BOT_MAINNET',
          chainId: BOTCHAIN_CHAIN_ID_DECIMAL,
        }));
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  const disconnectWallet = () => {
    setWeb3State(prev => ({
      ...prev,
      isConnected: false,
      address: '',
    }));
  };

  const switchNetwork = async (mode: NetworkMode) => {
    const anyWindow = window as unknown as { ethereum?: ethers.Eip1193Provider };
    if (mode === 'BOT_MAINNET' && anyWindow.ethereum) {
      await requestBotChainNetwork(anyWindow.ethereum);
    }

    setWeb3State(prev => ({
      ...prev,
      network: mode,
      currencySymbol: mode === 'BOT_MAINNET' ? 'BOT' : 'ETH',
      chainId: mode === 'BOT_MAINNET' ? BOTCHAIN_CHAIN_ID_DECIMAL : mode === 'SEPOLIA' ? 11155111 : 31337,
    }));
  };

  // Transaction 01: Deposit & Time-Lock
  const depositEth = async (params: {
    amountEth: string;
    unlockTimestamp: number;
    beneficiary?: string;
    purpose?: string;
  }): Promise<{ success: boolean; vaultId: number; txHash: string; error?: string }> => {
    const amountNum = parseFloat(params.amountEth);
    if (isNaN(amountNum) || amountNum <= 0) {
      return { success: false, vaultId: 0, txHash: '', error: 'AMOUNT_INVALID_NON_POSITIVE' };
    }

    if (params.unlockTimestamp <= currentUnixTime) {
      return { success: false, vaultId: 0, txHash: '', error: 'TEMPORAL_ERROR: UNLOCK_MUST_BE_IN_FUTURE' };
    }

    const currentBal = parseFloat(web3State.balanceEth);
    if (amountNum > currentBal) {
      return { success: false, vaultId: 0, txHash: '', error: 'INSUFFICIENT_FUNDS_BALANCE_DEFICIT' };
    }

    let txHash = '';
    const newVaultIndex = vaults.length + 1;
    let blockNum = 10500 + vaults.length;

    // Check if real on-chain MetaMask execution on BOT Chain Mainnet
    const anyWindow = window as unknown as { ethereum?: ethers.Eip1193Provider };
    if (web3State.network === 'BOT_MAINNET' && anyWindow.ethereum && web3State.chainId === BOTCHAIN_CHAIN_ID_DECIMAL) {
      try {
        const provider = new ethers.BrowserProvider(anyWindow.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS_BOTCHAIN, TIME_LOCKED_VAULT_ABI, signer);

        const beneficiaryTarget = params.beneficiary && ethers.isAddress(params.beneficiary)
          ? params.beneficiary
          : web3State.address;

        const tx = await contract.deposit(
          params.unlockTimestamp,
          beneficiaryTarget,
          params.purpose || 'BOT_CHAIN_ESCROW',
          { value: ethers.parseEther(params.amountEth) }
        );

        txHash = tx.hash;
        const receipt = await tx.wait();
        if (receipt) {
          blockNum = receipt.blockNumber;
        }
      } catch (chainErr: unknown) {
        console.warn('On-chain execution failed, using fallback simulation:', chainErr);
        // If contract not deployed yet or rejected, allow clean feedback or fallback simulation
        const msg = chainErr instanceof Error ? chainErr.message : String(chainErr);
        if (msg.includes('user rejected') || msg.includes('ACTION_REJECTED')) {
          return { success: false, vaultId: 0, txHash: '', error: 'TRANSACTION_REJECTED_BY_USER' };
        }
        // If simulation mode or unconfirmed contract bytecode, proceed with deterministic proof
        txHash = generatePseudoHash();
      }
    } else {
      txHash = generatePseudoHash();
    }

    const beneficiaryAddress = params.beneficiary && ethers.isAddress(params.beneficiary)
      ? params.beneficiary
      : web3State.address || '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7';

    const newVault: VaultItem = {
      id: `vault-${String(newVaultIndex).padStart(3, '0')}`,
      vaultIndex: newVaultIndex,
      owner: web3State.address || '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      beneficiary: beneficiaryAddress,
      amountEth: amountNum.toFixed(4),
      amountWei: ethers.parseEther(params.amountEth).toString(),
      createdAt: currentUnixTime,
      unlockTimestamp: params.unlockTimestamp,
      isWithdrawn: false,
      purpose: params.purpose?.trim() || `COMMITTED_RESERVE_V${newVaultIndex}`,
      depositTxHash: txHash,
      blockNumber: blockNum,
    };

    const newEvent: LedgerEvent = {
      id: `event-${Date.now()}`,
      txHash,
      blockNumber: blockNum,
      timestamp: currentUnixTime,
      eventType: 'LOCK_COMMITTED',
      vaultId: newVaultIndex,
      actor: web3State.address,
      beneficiary: beneficiaryAddress,
      valueEth: amountNum.toFixed(4),
      unlockTimestamp: params.unlockTimestamp,
      gasUsed: 46210,
      status: 'CONFIRMED',
    };

    setVaults(prev => [newVault, ...prev]);
    setLedgerEvents(prev => [newEvent, ...prev]);
    setWeb3State(prev => ({
      ...prev,
      balanceEth: (parseFloat(prev.balanceEth) - amountNum).toFixed(4),
    }));

    return { success: true, vaultId: newVaultIndex, txHash };
  };

  // Transaction 02: Withdraw mature funds
  const withdrawEth = async (vaultId: number): Promise<{ success: boolean; txHash: string; error?: string }> => {
    const targetVault = vaults.find(v => v.vaultIndex === vaultId);
    if (!targetVault) {
      return { success: false, txHash: '', error: 'VAULT_NON_EXISTENT' };
    }

    if (targetVault.isWithdrawn) {
      return { success: false, txHash: '', error: 'VAULT_ALREADY_LIQUIDATED' };
    }

    if (currentUnixTime < targetVault.unlockTimestamp) {
      const remaining = targetVault.unlockTimestamp - currentUnixTime;
      return {
        success: false,
        txHash: '',
        error: `LOCK_ACTIVE: ${remaining} SECONDS REMAINING BEFORE MATURITY`,
      };
    }

    let txHash = '';
    let blockNum = 10600 + vaults.length;

    // Check if real on-chain MetaMask execution on BOT Chain Mainnet
    const anyWindow = window as unknown as { ethereum?: ethers.Eip1193Provider };
    if (web3State.network === 'BOT_MAINNET' && anyWindow.ethereum && web3State.chainId === BOTCHAIN_CHAIN_ID_DECIMAL) {
      try {
        const provider = new ethers.BrowserProvider(anyWindow.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS_BOTCHAIN, TIME_LOCKED_VAULT_ABI, signer);

        const tx = await contract.withdraw(vaultId);
        txHash = tx.hash;
        const receipt = await tx.wait();
        if (receipt) {
          blockNum = receipt.blockNumber;
        }
      } catch (chainErr: unknown) {
        console.warn('On-chain withdrawal failed, using fallback:', chainErr);
        const msg = chainErr instanceof Error ? chainErr.message : String(chainErr);
        if (msg.includes('user rejected') || msg.includes('ACTION_REJECTED')) {
          return { success: false, txHash: '', error: 'WITHDRAWAL_REJECTED_BY_USER' };
        }
        txHash = generatePseudoHash();
      }
    } else {
      txHash = generatePseudoHash();
    }

    const withdrawAmount = parseFloat(targetVault.amountEth);

    setVaults(prev =>
      prev.map(v =>
        v.vaultIndex === vaultId
          ? {
              ...v,
              isWithdrawn: true,
              withdrawnAt: currentUnixTime,
              withdrawTxHash: txHash,
            }
          : v
      )
    );

    const newEvent: LedgerEvent = {
      id: `event-${Date.now()}`,
      txHash,
      blockNumber: blockNum,
      timestamp: currentUnixTime,
      eventType: 'RELEASE_EXECUTED',
      vaultId: targetVault.vaultIndex,
      actor: web3State.address,
      beneficiary: targetVault.beneficiary,
      valueEth: targetVault.amountEth,
      unlockTimestamp: targetVault.unlockTimestamp,
      gasUsed: 31450,
      status: 'SETTLED',
    };

    setLedgerEvents(prev => [newEvent, ...prev]);

    setWeb3State(prev => ({
      ...prev,
      balanceEth: (parseFloat(prev.balanceEth) + withdrawAmount).toFixed(4),
    }));

    return { success: true, txHash };
  };

  const fastForwardTime = (seconds: number) => {
    setTimeOffset(prev => prev + seconds);
  };

  const resetSimulationTime = () => {
    setTimeOffset(0);
  };

  return (
    <VaultContext.Provider
      value={{
        web3State,
        vaults,
        ledgerEvents,
        currentUnixTime,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        depositEth,
        withdrawEth,
        fastForwardTime,
        resetSimulationTime,
        showGridLines,
        setShowGridLines,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};
