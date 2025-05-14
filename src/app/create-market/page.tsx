"use client";

import { useState } from "react";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useRouter } from "next/navigation";

export default function CreateMarketPage() {
  const router = useRouter();
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
      
      // Create a new transaction block
      const txb = new TransactionBlock();
      
      // Convert date to timestamp (milliseconds since epoch)
      const endTimestamp = new Date(formData.endDate).getTime();
      
      const liquidityAmount = Math.floor(parseFloat(formData.initialLiquidity) * 1_000_000_000);

      const coin = txb.splitCoins(txb.gas, [txb.pure(liquidityAmount)]);

      console.log("form data: ", formData, " endTimeStamp: ", endTimestamp);
      
      txb.moveCall({
        target: "0xda180c71c987d841977c74544619889b7e751a40d9235278f7dfcfd575f331b0::sui_market::create_market_with_pool",
        arguments: [
          txb.pure(formData.question),
          txb.pure(formData.description),
          txb.pure(formData.category),
          txb.pure(endTimestamp),
          coin,
          txb.object("0x6")
        ],
        // If your function needs coins, add them here
        typeArguments: ["0x2::sui::SUI"],
      });
      
      // Set an explicit gas budget to avoid the dry run error
      txb.setGasBudget(30000000); // Set a reasonable gas budget (30M gas units)
      
      // Execute the transaction
      const result = await executeTransaction(txb);
      console.log("Market creation result:", result);
      
      // Navigate to markets page after successful creation
      alert("Market created successfully!");
      router.push("/markets");
      
    } catch (error) {
      console.error("Market creation failed:", error);
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


