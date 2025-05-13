import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <section className="py-12 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Predict the Future on SUI
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Trade on the outcomes of real-world events with the power of SUI blockchain.
          Create markets, buy and sell shares, and earn rewards for accurate predictions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/markets"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium text-lg"
          >
            Explore Markets
          </a>
          <a
            href="/create-market"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium text-lg"
          >
            Create a Market
          </a>
        </div>
      </section>

      <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🔮</div>
          <h2 className="text-2xl font-bold mb-3">Predict</h2>
          <p>Buy shares in outcomes you believe will happen. The more likely an outcome, the higher the price of its shares.</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">💰</div>
          <h2 className="text-2xl font-bold mb-3">Profit</h2>
          <p>If your prediction is correct, you'll earn $1 for each share. Sell your position anytime before the market resolves.</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold mb-3">Create</h2>
          <p>Launch your own prediction market on any verifiable future event and earn fees from all trades.</p>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Markets</h2>
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
        <div className="text-center mt-8">
          <a href="/markets" className="text-blue-600 font-medium hover:underline">
            View all markets →
          </a>
        </div>
      </section>
    </div>
  );
}

function MarketCard({ title, volume, yesPrice, id }: { 
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

