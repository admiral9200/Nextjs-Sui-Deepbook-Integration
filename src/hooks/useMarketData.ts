import MarketData from "@/types/MarketData";
import { CONTRACT_CONFIG } from "@/utils/contractConfig";
import { useSuiClient } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

// Hook to fetch multiple markets
export function useMarkets() {
  const suiClient = useSuiClient();
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMarkets() {
      try {
        setIsLoading(true);
        
        // Query for all market objects by type
        const marketType = `0xda180c71c987d841977c74544619889b7e751a40d9235278f7dfcfd575f331b0::sui_market::Market`;
        
        // Use getOwnedObjects to get all markets
        const response = await suiClient.getOwnedObjects({
          owner: "0xda180c71c987d841977c74544619889b7e751a40d9235278f7dfcfd575f331b0",
          options: {
            showContent: true,
            showType: true,
          },
          limit: 50,
        });
        
        if (!response || !response.data) {
          throw new Error('Failed to fetch markets');
        }
        
        // Filter for market objects
        const marketObjects = response.data.filter(obj => 
          obj.data?.type?.includes(marketType)
        );

        console.log("market objects: ", marketObjects);
        
        // Process the objects into market data
        const marketList: MarketData[] = [];
        
        for (const obj of marketObjects) {
          if (obj.data && obj.data.content) {
            const content = obj.data.content;
            const fields = content.fields;
            
            // Parse the market data from the object
            // Adjust field names based on your actual contract structure
            marketList.push({
              id: obj.data.objectId,
              title: fields.question || 'Unknown Market',
              description: fields.description || '',
              creator: fields.creator || '',
              endDate: new Date(parseInt(fields.end_time || '0')).toLocaleDateString(),
              category: fields.category || 'Unknown',
              volume: formatSui(fields.volume || '0'),
              liquidity: formatSui(fields.liquidity || '0'),
              yesPrice: formatPrice(fields.yes_price || '500000000'), // Default to 0.5
              noPrice: formatPrice(fields.no_price || '500000000'),   // Default to 0.5
              resolved: fields.resolved || false,
              outcome: fields.outcome,
            });
          }
        }
        
        setMarkets(marketList);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch markets:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setMarkets([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarkets();
  }, [suiClient]);

  // Helper function to format SUI amounts
  function formatSui(amount: string): string {
    const amountNum = parseInt(amount) / 1_000_000_000;
    return `$${amountNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  // Helper function to format price (0-1 range)
  function formatPrice(price: string): string {
    const priceNum = parseInt(price) / 1_000_000_000;
    return priceNum.toFixed(2);
  }

  return { markets, isLoading, error };
}
