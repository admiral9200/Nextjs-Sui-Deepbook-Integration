export default function MarketsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prediction Markets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MarketCard
          title="Will BTC exceed $100k by end of 2024?"
          volume="$24,532"
          yesPrice="0.65"
          id="btc-100k-2024"
        />
        <MarketCard
          title="Will Ethereum complete the Surge upgrade in 2024?"
          volume="$12,845"
          yesPrice="0.42"
          id="eth-surge-2024"
        />
        <MarketCard
          title="Will SUI reach top 10 by market cap in 2024?"
          volume="$8,721"
          yesPrice="0.28"
          id="sui-top10-2024"
        />
      </div>
    </div>
  );
}

function MarketCard({
  title,
  volume,
  yesPrice,
  id,
}: {
  title: string;
  volume: string;
  yesPrice: string;
  id: string;
}) {
  return (
    <a href={`/markets/${id}`} className="block">
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <div className="flex justify-between text-sm">
          <span>Volume: {volume}</span>
          <span className="font-medium">YES: ${yesPrice}</span>
        </div>
      </div>
    </a>
  );
}
