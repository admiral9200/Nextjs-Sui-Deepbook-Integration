"use client";

import Link from "next/link";
import { useMarkets } from "@/hooks/useMarketData";
import MarketCard from "@/components/MarketCard";

export default function Home() {
  const { markets, isLoading } = useMarkets();

  // Get top 3 markets by volume
  const topMarkets = markets
    ? markets
        .sort((a, b) => {
          // Extract numeric value from volume string (e.g. "$24,532" -> 24532)
          const volumeA = parseFloat(a.volume.replace(/[^0-9.]/g, ""));
          const volumeB = parseFloat(b.volume.replace(/[^0-9.]/g, ""));
          return volumeB - volumeA;
        })
        .slice(0, 3)
    : [];

  return (
    <div className="container mx-auto p-6">
      <section className="py-12 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Predict the Future on SUI
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Trade on the outcomes of real-world events with the power of SUI
          blockchain. Create markets, buy and sell shares, and earn rewards for
          accurate predictions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/markets"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium text-lg"
          >
            Explore Markets
          </Link>
          <Link
            href="/create-market"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium text-lg"
          >
            Create a Market
          </Link>
        </div>
      </section>

      <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🔮</div>
          <h2 className="text-2xl font-bold mb-3">Predict</h2>
          <p>
            Buy shares in outcomes you believe will happen. The more likely an
            outcome, the higher the price of its shares.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">💰</div>
          <h2 className="text-2xl font-bold mb-3">Profit</h2>
          <p>
            If your prediction is correct, you&apos;ll earn $1 for each share.
            Sell your position anytime before the market resolves.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold mb-3">Create</h2>
          <p>
            Launch your own prediction market on any verifiable future event and
            earn fees from all trades.
          </p>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Markets</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : topMarkets.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              No markets available yet. Be the first to create one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMarkets.map((market) => (
              <MarketCard
                key={market.id}
                title={market.title}
                volume={market.volume}
                yesPrice={market.yesPrice}
                id={market.id}
                endDate={market.endDate}
                resolved={market.resolved}
                outcome={market.outcome === 'Yes' ? true : false}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/markets"
            className="text-blue-600 font-medium hover:underline"
          >
            View all markets →
          </Link>
        </div>
      </section>
    </div>
  );
}
