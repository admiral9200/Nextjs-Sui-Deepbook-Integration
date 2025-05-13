"use client";

import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";

export default function WalletConnect() {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      {currentAccount ? (
        <div className="flex items-center">
          <span className="mr-2 text-sm hidden md:inline">
            {formatAddress(currentAccount.address)}
          </span>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <ConnectButton className="px-4 py-2 bg-blue-600 text-white rounded-md" />
      )}
    </div>
  );
}

