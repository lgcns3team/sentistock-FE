"use client"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

interface RealtimeChartProps {
  category: string
  sortOrder: "asc" | "desc"
  onSortChange: (order: "asc" | "desc") => void
}

interface Stock {
  name: string
  price: number
  change: number
}

export default function RealtimeChart({ category, sortOrder, onSortChange }: RealtimeChartProps) {
  const stockData: Record<string, Stock[]> = {
    반도체: [
      { name: "웨스턴디지털", price: 183.38, change: 2.11 },
      { name: "타이세미컨덕터", price: 454.53, change: 1.74 },
      { name: "TTM테크놀러지", price: 177.92, change: 1.04 },
      { name: "헤라라이닝", price: 317.62, change: -0.63 },
      { name: "킬포트시스템즈USA", price: 215.98, change: -0.74 },
    ],
    모빌리티: [
      { name: "HD현대", price: 320.5, change: 1.5 },
      { name: "LG에너지솔루션", price: 410.2, change: -0.8 },
      { name: "현대모비스", price: 285.3, change: 2.1 },
    ],
    "2차전지": [
      { name: "SK이노베이션", price: 240.5, change: 3.2 },
      { name: "삼성SDI", price: 560.0, change: -1.5 },
      { name: "포스코퓨처엠", price: 380.4, change: 1.8 },
    ],
    재생에너지: [
      { name: "HyREX", price: 185.0, change: 2.5 },
      { name: "한화에큐에이", price: 125.5, change: 0.9 },
    ],
    원자력에너지: [
      { name: "한국수력원자력", price: 28500, change: 1.2 },
      { name: "한전기술", price: 89200, change: -0.4 },
    ],
  }

  const data = stockData[category] || []
  const sortedData = [...data].sort((a, b) => (sortOrder === "desc" ? b.change - a.change : a.change - b.change))

  return (
    <div className="flex-1 bg-white dark:bg-gray-950 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">실시간 종목 모니터링</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sortOrder === "desc" ? "default" : "outline"}
            onClick={() => onSortChange("desc")}
            className={`text-xs ${
              sortOrder === "desc"
                ? "bg-[#061F5B] text-white hover:bg-[#061F5B]/90"
                : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 hover:text-[#061F5B]"
            }`}
          >
            상승순
          </Button>
          <Button
            size="sm"
            variant={sortOrder === "asc" ? "default" : "outline"}
            onClick={() => onSortChange("asc")}
            className={`text-xs ${
              sortOrder === "asc"
                ? "bg-[#061F5B] text-white hover:bg-[#061F5B]/90"
                : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 hover:text-[#061F5B]"
            }`}
          >
            하락순
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedData.map((stock, idx) => (
          <Link key={idx} href={`/stock/${encodeURIComponent(stock.name)}`}>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{stock.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">${stock.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${stock.change > 0 ? "text-red-500" : "text-blue-500"}`}>
                  {stock.change > 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </span>
                {stock.change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
