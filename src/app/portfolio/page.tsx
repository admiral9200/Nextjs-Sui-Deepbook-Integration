'use client'

import { useSuiWallet } from '@/hooks/useSuiWallet';
import { useEffect, useState } from 'react';

export default function PortfolioPage() {
  const { connected, account, formatAddress, getBalance } = useSuiWallet();
  const [balance, setBalance] = useState('0.00');
  
  useEffect(() => {
    if (connected && account) {
      const fetchBalance = async () => {
        const bal = await getBalance();
        setBalance(bal);
      };
      
      fetchBalance();
    }
  }, [connected, account, getBalance]);
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Wallet</h2>
          {!connected && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Connect Wallet
            </button>
          )}
        </div>
        <div className="border rounded-lg p-4">
          {connected && account ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-xl font-medium">{formatAddress(account.address)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">SUI Balance</p>
                <p className="text-xl font-medium">{balance} SUI</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Value</p>
                <p className="text-xl font-medium">${(parseFloat(balance) * 10).toFixed(2)}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Connect your wallet to view your portfolio</p>
            </div>
          )}
        </div>
      </div>
      
      {connected && account && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
            <div className="border rounded-lg p-4">
              <div className="text-center py-8">
                <p className="text-gray-500">You don&apos;t have any open positions yet</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <div className="border rounded-lg p-4">
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions yet</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

