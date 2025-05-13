'use client'

import { useWalletKit } from '@mysten/wallet-kit';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useCallback } from 'react';

export function useSuiWallet() {
  const walletKit = useWalletKit();

  const formatAddress = (address?: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getBalance = async () => {
    // In a real app, you would fetch the balance from the Sui blockchain
    // This is just a placeholder
    return '25.45';
  };

  const executeTransaction = useCallback(async (txb: TransactionBlock) => {
    if (!walletKit.isConnected || !walletKit.currentAccount) {
      throw new Error('Wallet not connected');
    }

    try {
      // Add a dummy transaction to demonstrate the structure
      txb.moveCall({
        target: '0x2::transfer::transfer',
        arguments: [
          txb.object('0x6'),
          txb.pure('1000000'),
        ],
      });

      const result = await walletKit.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });

      return result;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }, [walletKit]);

  return {
    connected: walletKit.isConnected,
    connecting: walletKit.isConnecting,
    account: walletKit.currentAccount,
    wallets: walletKit.wallets,
    select: walletKit.connect,
    disconnect: walletKit.disconnect,
    formatAddress,
    getBalance,
    executeTransaction,
  };
}


