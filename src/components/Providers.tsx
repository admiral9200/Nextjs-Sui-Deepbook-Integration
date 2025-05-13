'use client'

import { WalletKitProvider } from '@mysten/wallet-kit';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletKitProvider>
      {children}
    </WalletKitProvider>
  );
}