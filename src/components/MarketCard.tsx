"use client";

import Link from "next/link";

export default function MarketCard({
  title,
  volume,
  yesPrice,
  id,
  endDate,
  resolved,
  outcome,
}: {
  title: string;
  volume: string;
  yesPrice: string;
  id: string;
  endDate: string;
  resolved: boolean;
  outcome?: boolean;
}) {
  return (
    <Link href={`/markets/${id}`} className="block">
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <div className="flex justify-between text-sm mb-2">
          <span>Volume: {volume}</span>
          <span className="font-medium">YES: ${yesPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Ends: {endDate}</span>
          {resolved && (
            <span
              className={`font-medium ${
                outcome ? "text-green-600" : "text-red-600"
              }`}
            >
              Resolved: {outcome ? "YES" : "NO"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
