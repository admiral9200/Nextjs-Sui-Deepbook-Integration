'use client'

import TradingPanel from "@/components/TradingPanel";
import { useMarketData } from "@/hooks/useMarketData";
import { useParams } from "next/navigation";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { CONTRACT_CONFIG } from "@/utils/contractConfig";
import { useState } from "react";

export default function MarketDetailPage() {
  const params = useParams();
  const marketId = params.marketId as string;
  const { marketData, isLoading, error } = useMarketData(marketId);
  const { connected, account, executeTransaction } = useSuiWallet();
  const [isResolving, setIsResolving] = useState(false);

  const handleResolveMarket = async (outcome: boolean) => {
    if (!connected || !marketData) return;
    
    try {
      setIsResolving(true);
      
      const txb = new TransactionBlock();
      
      txb.moveCall({
        target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MARKET_MODULE}::${CONTRACT_CONFIG.MARKET_RESOLVE_FUNCTION}`,
        arguments: [
          txb.object(marketId),
          txb.pure(outcome),
        ],
      });
      
      await executeTransaction(txb);
      
      alert(`Market resolved as ${outcome ? 'YES' : 'NO'}`);
      window.location.reload();
    } catch (error) {
      console.error("Failed to resolve market:", error);
      alert(`Failed to resolve market: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsResolving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-6 bg-red-50 text-red-600 rounded-lg">
          <p>Error loading market: {error?.message || "Market not found"}</p>
          <p className="mt-2">Please try again later or check your connection.</p>
        </div>
      </div>
    );
  }

  const isCreator = connected && account && account.address === marketData.creator;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{marketData.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="border rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2">Market Info</h2>
            <p className="text-sm mb-4">{marketData.description}</p>
            <div className="flex flex-wrap justify-between text-sm">
              <span>Volume: {marketData.volume}</span>
              <span>Liquidity: {marketData.liquidity}</span>
              <span>Ends: {marketData.endDate}</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Price Chart</h2>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <p>Price chart placeholder</p>
            </div>
          </div>
          
          {/* Resolution panel for market creator */}
          {isCreator && !marketData.resolved && (
            <div className="border rounded-lg p-4 mt-6">
              <h2 className="font-semibold mb-4">Resolve Market</h2>
              <p className="text-sm mb-4">
                As the creator of this market, you can resolve it when the outcome is known.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleResolveMarket(true)}
                  disabled={isResolving}
                  className="flex-1 py-2 bg-green-500 text-white rounded-md font-medium"
                >
                  {isResolving ? "Processing..." : "Resolve as YES"}
                </button>
                <button
                  onClick={() => handleResolveMarket(false)}
                  disabled={isResolving}
                  className="flex-1 py-2 bg-red-500 text-white rounded-md font-medium"
                >
                  {isResolving ? "Processing..." : "Resolve as NO"}
                </button>
              </div>
            </div>
          )}
          
          {/* Show resolution for resolved markets */}
          {marketData.resolved && (
            <div className="border rounded-lg p-4 mt-6">
              <h2 className="font-semibold mb-4">Market Resolution</h2>
              <div className={`text-center p-4 rounded-md ${
                marketData.outcome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <p className="text-lg font-bold">
                  This market has resolved as {marketData.outcome ? 'YES' : 'NO'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {!marketData.resolved ? (
            <TradingPanel
              marketId={marketId}
              yesPrice={marketData.yesPrice}
              noPrice={marketData.noPrice}
            />
          ) : (
            <div className="border rounded-lg p-4 sticky top-6">
              <h2 className="font-semibold mb-4">Market Closed</h2>
              <p className="text-sm">
                This market has been resolved and is no longer accepting trades.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

