"use client";

import { useState } from "react";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { CONTRACT_CONFIG } from "@/utils/contractConfig";

export default function CreateMarketPage() {
  const { connected, executeTransaction } = useSuiWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    endDate: "",
    category: "crypto",
    initialLiquidity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);

      const txb = new TransactionBlock();

      const endTimestamp = new Date(formData.endDate).getTime();

      const liquidityAmount = Math.floor(parseFloat(formData.initialLiquidity) * 1_000_000_000);

      if (liquidityAmount > 1_000_000_000_000) {
        throw new Error("Initial liquidity amount is too high");
      }

      const coin = txb.splitCoins(txb.gas, [txb.pure(liquidityAmount)]);

      console.log("Transaction parameters:", {
        packageId: CONTRACT_CONFIG.PACKAGE_ID,
        module: CONTRACT_CONFIG.MARKET_MODULE,
        function: CONTRACT_CONFIG.MARKET_CREATE_FUNCTION,
        question: formData.question,
        description: formData.description,
        category: formData.category,
        endTimestamp,
        liquidityAmount,
      });

      txb.moveCall({
        target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MARKET_MODULE}::${CONTRACT_CONFIG.MARKET_CREATE_FUNCTION}`,
        arguments: [
          txb.pure(formData.question),
          txb.pure(formData.description),
          txb.pure(formData.category),
          txb.pure(endTimestamp),
          coin,
          txb.object("0x6")
        ],
      });

      txb.setGasBudget(50000000);

      const result = await executeTransaction(txb);
      console.log("Full transaction result:", result);

    } catch (error) {
      console.error("Market creation failed:", error);
      // More detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      alert(`Failed to create market: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create a New Market</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Will BTC exceed $100k by end of 2025?"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Provide detailed resolution criteria..."
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          >
            <option value="crypto">Crypto</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="science">Science & Tech</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Initial Liquidity (SUI)
          </label>
          <input
            type="number"
            name="initialLiquidity"
            value={formData.initialLiquidity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="0.00"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md font-medium"
          disabled={isLoading || !connected}
        >
          {isLoading ? "Creating Market..." : "Create Market"}
        </button>

        {!connected && (
          <p className="text-sm text-center mt-2 text-gray-500">
            Connect your wallet to create a market
          </p>
        )}
      </form>
    </div>
  );
}


