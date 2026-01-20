"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { authFetch } from "@/lib/fetcher"

interface RealtimeChartProps {
  category: string
  sortOrder: "asc" | "desc"
  onSortChange: (order: "asc" | "desc") => void
}

interface Stock {
  id: string
  name: string
  price: number
  change: number
}

export default function RealtimeChart({
  category,
  sortOrder,
  onSortChange,
}: RealtimeChartProps) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(false)

  // 카테고리 → sectorId 매핑
  const sectorMap: Record<string, number> = {
    반도체: 1,
    모빌리티: 2,
    "2차전지": 3,
    재생에너지: 4,
    원자력에너지: 5,
  }

  useEffect(() => {
    const fetchStocks = async () => {
      const sectorId = sectorMap[category]
      if (!sectorId) return

      try {
        const res = await authFetch(`/stock/${sectorId}/monitor`)

        if (!res.ok) {
          throw new Error("실시간 종목 조회 실패")
        }

        const data = await res.json()

        const mapped = data.map((item: any) => ({
          id: item.companyId,
          name: item.companyName,
          price: item.currentPrice,
          change: item.changeRate,
        }))

        setStocks(mapped)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStocks()
  }, [category])

  const sortedData = [...stocks].sort((a, b) =>
    sortOrder === "desc" ? b.change - a.change : a.change - b.change
  )

  return (
    <div className="flex-1 bg-white dark:bg-gray-950 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          실시간 종목 모니터링
        </h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sortOrder === "desc" ? "default" : "outline"}
            onClick={() => onSortChange("desc")}
            className={`text-xs ${
              sortOrder === "desc"
                ? "bg-[#061F5B] text-white"
                : "border border-gray-300 hover:bg-gray-100"
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
                ? "bg-[#061F5B] text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            하락순
          </Button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        종목을 클릭하면 해당 종목의 상세페이지로 이동합니다.
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">로딩 중...</p>
      ) : (
        <div className="space-y-3">
          {sortedData.map((stock) => (
            <Link key={stock.id} href={`/stock/${stock.id}`}>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div>
                  <p className="font-medium text-sm">{stock.name}</p>
                  <p className="text-xs text-gray-500">
                    {stock.price.toLocaleString()}원
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      stock.change > 0 ? "text-red-500" : "text-blue-500"
                    }`}
                  >
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
      )}
    </div>
  )
}
