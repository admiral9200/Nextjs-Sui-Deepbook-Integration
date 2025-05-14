'use client'

import { useState, useEffect } from "react";

import { useMarkets } from "@/hooks/useMarketData";
import MarketCard from "@/components/MarketCard";
import MarketData from "@/types/MarketData";

export default function MarketsPage() {
  const { markets, isLoading, error } = useMarkets();
  const [filteredMarkets, setFilteredMarkets] = useState<MarketData[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    if (markets) {
      if (categoryFilter === "all") {
        setFilteredMarkets(markets);
      } else {
        setFilteredMarkets(
          markets.filter((market) => 
            market.category.toLowerCase() === categoryFilter.toLowerCase()
          )
        );
      }
    }
  }, [markets, categoryFilter]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prediction Markets</h1>

      {/* Category filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategoryFilter("crypto")}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "crypto"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Crypto
          </button>
          <button
            onClick={() => setCategoryFilter("politics")}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "politics"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Politics
          </button>
          <button
            onClick={() => setCategoryFilter("sports")}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "sports"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Sports
          </button>
          <button
            onClick={() => setCategoryFilter("entertainment")}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "entertainment"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Entertainment
          </button>
          <button
            onClick={() => setCategoryFilter("science")}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "science"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Science & Tech
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center p-6 bg-red-50 text-red-600 rounded-lg">
          <p>Error loading markets: {error.message}</p>
          <p className="mt-2">Please try again later or check your connection.</p>
        </div>
      ) : filteredMarkets.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No markets found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
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
    </div>
  );
}
