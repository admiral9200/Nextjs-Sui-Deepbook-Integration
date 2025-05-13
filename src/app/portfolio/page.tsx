export default function PortfolioPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Wallet</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Connect Wallet
          </button>
        </div>
        <div className="border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">SUI Balance</p>
              <p className="text-xl font-medium">25.45 SUI</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-xl font-medium">$254.50</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Unrealized P&L</p>
              <p className="text-xl font-medium text-green-500">+$45.20</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">My Positions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Market</th>
                <th className="py-3 px-4 text-left">Position</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Avg. Price</th>
                <th className="py-3 px-4 text-left">Current Price</th>
                <th className="py-3 px-4 text-left">P&L</th>
              </tr>
            </thead>
            <tbody>
              <PositionRow
                market="Will BTC exceed $100k by end of 2025?"
                marketId="btc-100k-2025"
                position="YES"
                quantity="100"
                avgPrice="0.58"
                currentPrice="0.65"
                pnl="+$7.00"
                pnlPositive={true}
              />
              <PositionRow
                market="Will Ethereum complete the Surge upgrade in 2025?"
                marketId="eth-surge-2025"
                position="NO"
                quantity="50"
                avgPrice="0.62"
                currentPrice="0.58"
                pnl="+$2.00"
                pnlPositive={true}
              />
              <PositionRow
                market="Will SUI reach top 10 by market cap in 2025?"
                marketId="sui-top10-2025"
                position="YES"
                quantity="200"
                avgPrice="0.32"
                currentPrice="0.28"
                pnl="-$8.00"
                pnlPositive={false}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PositionRow({
  market,
  marketId,
  position,
  quantity,
  avgPrice,
  currentPrice,
  pnl,
  pnlPositive,
}: {
  market: string;
  marketId: string;
  position: string;
  quantity: string;
  avgPrice: string;
  currentPrice: string;
  pnl: string;
  pnlPositive: boolean;
}) {
  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="py-3 px-4">
        <a
          href={`/markets/${marketId}`}
          className="text-blue-600 hover:underline"
        >
          {market}
        </a>
      </td>
      <td className="py-3 px-4">
        <span
          className={position === "YES" ? "text-green-500" : "text-red-500"}
        >
          {position}
        </span>
      </td>
      <td className="py-3 px-4">{quantity}</td>
      <td className="py-3 px-4">${avgPrice}</td>
      <td className="py-3 px-4">${currentPrice}</td>
      <td
        className={`py-3 px-4 ${
          pnlPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {pnl}
      </td>
    </tr>
  );
}
