'use client'

import { useWalletKit } from '@mysten/wallet-kit';
import { useState } from 'react';

export default function WalletConnect() {
  const walletKit = useWalletKit();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleConnect = async (walletName: string) => {
    await walletKit.connect(walletName);
    setIsDropdownOpen(false);
  };
  
  const handleDisconnect = async () => {
    await walletKit.disconnect();
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  return (
    <div className="relative">
      {walletKit.isConnected && walletKit.currentAccount ? (
        <div className="flex items-center">
          <span className="mr-2 text-sm hidden md:inline">
            {formatAddress(walletKit.currentAccount.address)}
          </span>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={walletKit.isConnecting}
          >
            {walletKit.isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border">
              <div className="py-1">
                {walletKit.wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.name)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      {wallet.icon && (
                        <img 
                          src={wallet.icon} 
                          alt={`${wallet.name} icon`} 
                          className="w-5 h-5 mr-2" 
                        />
                      )}
                      {wallet.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}





