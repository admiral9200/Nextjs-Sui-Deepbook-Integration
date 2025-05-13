'use client'

import { useSuiWallet } from '@/hooks/useSuiWallet';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useState } from 'react';

type Position = 'YES' | 'NO';

interface TradingPanelProps {
  marketId: string;
  yesPrice: string;
  noPrice: string;
}

export default function TradingPanel({ marketId, yesPrice, noPrice }: TradingPanelProps) {
  const { connected, executeTransaction } = useSuiWallet();
  const [position, setPosition] = useState<Position>('YES');
  const [amount, setAmount] = useState('');
  const [shares, setShares] = useState('0.00');
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePositionChange = (newPosition: Position) => {
    setPosition(newPosition);
    calculateShares(amount, newPosition);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    calculateShares(value, position);
  };
  
  const calculateShares = (amountStr: string, pos: Position) => {
    const amountNum = parseFloat(amountStr) || 0;
    const price = pos === 'YES' ? parseFloat(yesPrice) : parseFloat(noPrice);
    
    if (price > 0) {
      const sharesCalculated = (amountNum / price).toFixed(2);
      setShares(sharesCalculated);
    } else {
      setShares('0.00');
    }
  };
  
  const handleTrade = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create a new transaction block
      const txb = new TransactionBlock();
      
      // In a real app, you would call your smart contract here
      // This is just a placeholder to demonstrate the structure
      
      await executeTransaction(txb);
      
      alert(`Order placed: ${position} position, ${amount} SUI for ${shares} shares`);
    } catch (error) {
      console.error('Trade failed:', error);
      alert(`Trade failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 sticky top-6">
      <h2 className="font-semibold mb-4">Trade</h2>
      
      <div className="flex justify-between mb-4">
        <button 
          className={`w-1/2 py-2 rounded-l-md font-medium ${
            position === 'YES' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handlePositionChange('YES')}
          disabled={isLoading}
        >
          YES
        </button>
        <button 
          className={`w-1/2 py-2 rounded-r-md font-medium ${
            position === 'NO' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handlePositionChange('NO')}
          disabled={isLoading}
        >
          NO
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">Amount (SUI)</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded" 
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          disabled={isLoading}
        />
      </div>
      
      <div className="mb-4">
        <p className="text-sm flex justify-between">
          <span>You'll receive:</span>
          <span>{shares} Shares</span>
        </p>
        <p className="text-sm flex justify-between">
          <span>Price per share:</span>
          <span>${position === 'YES' ? yesPrice : noPrice}</span>
        </p>
      </div>
      
      <button 
        className="w-full py-2 bg-blue-600 text-white rounded-md font-medium"
        onClick={handleTrade}
        disabled={!amount || parseFloat(amount) <= 0 || isLoading || !connected}
      >
        {isLoading ? 'Processing...' : `Buy ${position} Shares`}
      </button>
      
      {!connected && (
        <p className="text-sm text-center mt-2 text-gray-500">
          Connect your wallet to trade
        </p>
      )}
    </div>
  );
}

