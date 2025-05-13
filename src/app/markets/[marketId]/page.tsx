import TradingPanel from "@/components/TradingPanel";

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ marketId: string }>;
}) {
  const { marketId } = await params;

  const marketData = getMarketData(marketId);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{marketData.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="border rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2">Market Info</h2>
            <p className="text-sm mb-4">{marketData.description}</p>
            <div className="flex justify-between text-sm">
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
        </div>

        <div className="lg:col-span-1">
          <TradingPanel
            marketId={marketId}
            yesPrice={marketData.yesPrice}
            noPrice={marketData.noPrice}
          />
        </div>
      </div>
    </div>
  );
}

function getMarketData(marketId: string) {
  return {
    title: "Will BTC exceed $100k by end of 2025?",
    id: marketId,
    description:
      "This market resolves to YES if the price of Bitcoin exceeds $100,000 USD at any point before December 31, 2025, 11:59 PM UTC according to CoinGecko.",
    volume: "$24,532",
    liquidity: "$15,750",
    endDate: "Dec 31, 2025",
    yesPrice: "0.65",
    noPrice: "0.35",
  };
}
