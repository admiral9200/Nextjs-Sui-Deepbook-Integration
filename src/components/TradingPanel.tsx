"use client";

import { useState } from "react";

type Position = "YES" | "NO";

interface TradingPanelProps {
  marketId: string;
  yesPrice: string;
  noPrice: string;
}

export default function TradingPanel({
  marketId,
  yesPrice,
  noPrice,
}: TradingPanelProps) {
  const [position, setPosition] = useState<Position>("YES");
  const [amount, setAmount] = useState("");
  const [shares, setShares] = useState("0.00");

  const handlePositionChange = (newPosition: Position) => {
    setPosition(newPosition);
    calculateShares(amount, newPosition);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    calculateShares(value, position);
  };

  const calculateShares = (amountStr: string, pos: Position) => {
    const amountNum = parseFloat(amountStr) || 0;
    const price = pos === "YES" ? parseFloat(yesPrice) : parseFloat(noPrice);

    if (price > 0) {
      const sharesCalculated = (amountNum / price).toFixed(2);
      setShares(sharesCalculated);
    } else {
      setShares("0.00");
    }
  };

  const handleTrade = () => {
    alert(
      `Order placed: ${position} position, ${amount} SUI for ${shares} shares`
    );
  };

  return (
    <div className="border rounded-lg p-4 sticky top-6">
      <h2 className="font-semibold mb-4">Trade</h2>

      <div className="flex justify-between mb-4">
        <button
          className={`w-1/2 py-2 rounded-l-md font-medium ${
            position === "YES"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handlePositionChange("YES")}
        >
          YES
        </button>
        <button
          className={`w-1/2 py-2 rounded-r-md font-medium ${
            position === "NO"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handlePositionChange("NO")}
        >
          NO
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Amount (SUI)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      <div className="mb-4">
        <p className="text-sm flex justify-between">
          <span>You'll receive:</span>
          <span>{shares} Shares</span>
        </p>
        <p className="text-sm flex justify-between">
          <span>Price per share:</span>
          <span>${position === "YES" ? yesPrice : noPrice}</span>
        </p>
      </div>

      <button
        className="w-full py-2 bg-blue-600 text-white rounded-md font-medium"
        onClick={handleTrade}
        disabled={!amount || parseFloat(amount) <= 0}
      >
        Buy {position} Shares
      </button>
    </div>
  );
}
