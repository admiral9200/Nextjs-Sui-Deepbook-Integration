"use client";

import { useState } from "react";

export default function CreateMarketPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Market creation data:", formData);
    alert("Market creation submitted!");
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
            placeholder="Will BTC exceed $100k by end of 2024?"
            required
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
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md font-medium"
        >
          Create Market
        </button>
      </form>
    </div>
  );
}
