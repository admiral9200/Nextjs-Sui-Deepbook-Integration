"use client";

import { useState } from "react";

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = () => {
    setIsConnected(true);
    setWalletAddress("0x" + Math.random().toString(16).slice(2, 12));
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  return (
    <>
      {isConnected ? (
        <div className="flex items-center">
          <span className="mr-2 text-sm hidden md:inline">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}
