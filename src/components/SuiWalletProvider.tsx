'use client'

import { WalletKitProvider } from '@mysten/wallet-kit';
import { ReactNode } from 'react';

export default function SuiWalletProvider({ children }: { children: ReactNode }) {
  return (
    <WalletKitProvider>
      {children}
    </WalletKitProvider>
  );
}

