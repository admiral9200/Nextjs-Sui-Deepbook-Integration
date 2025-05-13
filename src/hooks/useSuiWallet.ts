'use client'

import { 
  useCurrentAccount, 
  useSignAndExecuteTransaction,
  useDisconnectWallet,
  useConnectWallet,
  useSuiClient
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useCallback } from 'react';

export function useSuiWallet() {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect, isPending: isConnecting } = useConnectWallet();
  const suiClient = useSuiClient();
  
  const formatAddress = (address?: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getBalance = async () => {
    if (!currentAccount) {
      return '0';
    }
    
    try {
      const balance = await suiClient.getBalance({
        owner: currentAccount.address,
      });
      
      return balance.totalBalance;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  };

  const executeTransaction = useCallback(async (txb: TransactionBlock) => {
    if (!currentAccount) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await signAndExecuteTransaction({
        transaction: txb.serialize(),
      });

      return result;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }, [currentAccount, signAndExecuteTransaction]);

  return {
    connected: !!currentAccount,
    connecting: isConnecting,
    account: currentAccount,
    wallets: [],
    select: connect,
    disconnect,
    formatAddress,
    getBalance,
    executeTransaction,
  };
}









