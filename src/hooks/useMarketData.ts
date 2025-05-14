import { formatPrice, formatSui } from "@/app/helpers";
import MarketData from "@/types/MarketData";
import { CONTRACT_CONFIG } from "@/utils/contractConfig";
import { useSuiClient } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

// Define types for the parsed JSON from events
interface MarketCreatedEvent {
  market_id?: string;
  marketId?: string;
  [key: string]: unknown;
}

// Define types for the content fields
interface MarketFields {
  title?: number[];
  description?: number[];
  creator?: string;
  resolution_date?: string;
  category?: number[];
  volume?: string;
  liquidity?: string;
  yes_price?: string;
  no_price?: string;
  status?: string;
  resolution?: {
    fields?: {
      final_outcome?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface MoveObjectContent {
  dataType: string;
  fields?: MarketFields;
  [key: string]: unknown;
}

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

        const packageId = CONTRACT_CONFIG.PACKAGE_ID;

        let marketObjects = [];

        const events = await suiClient.queryEvents({
          query: {
            MoveEventType: `${packageId}::sui_market::MarketCreated`
          },
          limit: 50,
        });

        if (!events || !events.data || events.data.length === 0) {
          setMarkets([]);
          return;
        }

        const marketIds = events.data.map(event => {
          const parsedJson = event.parsedJson as MarketCreatedEvent | null;
          return parsedJson?.market_id || parsedJson?.marketId;
        }).filter(Boolean);

        const marketPromises = marketIds.map(id =>
          suiClient.getObject({
            id: id as string,
            options: {
              showContent: true,
              showType: true,
            },
          })
        );

        const marketResponses = await Promise.all(marketPromises);
        marketObjects = marketResponses.map(resp => resp.data).filter(Boolean);

        const marketList: MarketData[] = [];

        for (const obj of marketObjects) {
          if (obj && obj.content) {
            try {
              const content = obj.content as MoveObjectContent;

              if (content.dataType === 'moveObject' && content.fields) {
                const fields = content.fields;

                marketList.push({
                  id: obj.objectId,
                  title: fields.title ? new TextDecoder().decode(Uint8Array.from(fields.title)) : 'Unknown Market',
                  description: fields.description ? new TextDecoder().decode(Uint8Array.from(fields.description)) : '',
                  creator: fields.creator || '',
                  endDate: new Date(parseInt(fields.resolution_date || '0')).toLocaleDateString(),
                  category: fields.category ? new TextDecoder().decode(Uint8Array.from(fields.category)) : 'Unknown',
                  volume: formatSui(fields.volume || '0'),
                  liquidity: formatSui(fields.liquidity || '0'),
                  yesPrice: formatPrice(fields.yes_price || '500000000'),
                  noPrice: formatPrice(fields.no_price || '500000000'),
                  resolved: fields.status === '1',
                  outcome: fields.resolution?.fields?.final_outcome === '0' ? 'YES' : 'NO',
                });
              } else {
                console.log("Skipping non-moveObject or object without fields:", obj);
              }
            } catch (err) {
              console.error("Error parsing market data:", err, obj);
            }
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



  return { markets, isLoading, error };
}

export function useMarketData(marketId: string) {
  const suiClient = useSuiClient();
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMarketData() {
      if (!marketId) {
        setError(new Error("Market ID is required"));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const response = await suiClient.getObject({
          id: marketId,
          options: {
            showContent: true,
            showType: true,
          },
        });

        if (!response.data || !response.data.content) {
          throw new Error("Market not found or invalid response");
        }

        const content = response.data.content as MoveObjectContent;

        if (content.dataType !== 'moveObject' || !content.fields) {
          throw new Error("Invalid market data format");
        }

        const fields = content.fields;

        const market: MarketData = {
          id: response.data.objectId,
          title: fields.title ? new TextDecoder().decode(Uint8Array.from(fields.title)) : 'Unknown Market',
          description: fields.description ? new TextDecoder().decode(Uint8Array.from(fields.description)) : '',
          creator: fields.creator || '',
          endDate: new Date(parseInt(fields.resolution_date || '0')).toLocaleDateString(),
          category: fields.category ? new TextDecoder().decode(Uint8Array.from(fields.category)) : 'Unknown',
          volume: formatSui(fields.volume || '0'),
          liquidity: formatSui(fields.liquidity || '0'),
          yesPrice: formatPrice(fields.yes_price || '500000000'),
          noPrice: formatPrice(fields.no_price || '500000000'),
          resolved: fields.status === '1',
          outcome: fields.resolution?.fields?.final_outcome === '0' ? 'Yes' : 'No',
        };

        setMarketData(market);
        setError(null);
      } catch (err) {
        console.error(`Failed to fetch market data for ID ${marketId}:`, err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setMarketData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarketData();
  }, [marketId, suiClient]);

  return { marketData, isLoading, error };
}
