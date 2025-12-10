"use client"

import Link from "next/link"

interface RelatedStock {
  id: number
  code: string
  name: string
  price: string
  change: string
  isUp: boolean
  relation: string
}

interface ValueChainProps {
  relatedStocks: RelatedStock[]
}

export default function ValueChain({ relatedStocks }: ValueChainProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4">밸류체인</h3>
      <div className="space-y-3">
        {relatedStocks.map((stock) => (
          <div
            key={stock.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-gray-200 last:border-b-0 gap-2"
          >
            <div className="flex-1">
              <Link
                href={`/stock/${stock.code}`}
                className="text-xs sm:text-sm font-medium text-gray-900 hover:underline"
              >
                {stock.name}
              </Link>

              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs sm:text-sm font-semibold ${stock.isUp ? "text-red-500" : "text-blue-500"}`}>
                  {stock.price}
                </span>
                <span className={`text-xs font-medium ${stock.isUp ? "text-red-500" : "text-blue-500"}`}>
                  {stock.change}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 whitespace-nowrap">{stock.relation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
