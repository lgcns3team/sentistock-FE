"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface SectorMonitorStock {
  companyId: string
  companyName: string
  currentPrice: number
  changeRate: number
  volume: number
}

interface Props {
  sectorId: number
  type: "up" | "down"
}

export default function SectorMonitor({ sectorId, type }: Props) {
  const [stocks, setStocks] = useState<SectorMonitorStock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sectorId) return

    setLoading(true)

    fetch(`http://localhost:8080/api/stock/${sectorId}/monitor`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sector monitor")
        return res.json()
      })
      .then((data: SectorMonitorStock[]) => {
        const sorted = [...data].sort((a, b) =>
          type === "up"
            ? b.changeRate - a.changeRate // 상승률
            : a.changeRate - b.changeRate // 하락률
        )

        setStocks(sorted.slice(0, 5))
      })
      .catch((err) => {
        console.error(err)
        setStocks([])
      })
      .finally(() => setLoading(false))
  }, [sectorId, type])

  return (
    <div
      className={`rounded-xl border p-5 ${
        type === "up"
          ? "border-red-200 bg-red-50"
          : "border-blue-200 bg-blue-50"
      }`}
    >

      <div className="mb-3 flex items-center justify-between">
        <h2
          className={`text-sm font-bold ${
            type === "up" ? "text-red-600" : "text-blue-600"
          }`}
        >
          {type === "up" ? "📈 상승률 TOP 5" : "📉 하락률 TOP 5"}
        </h2>
      </div>


      {loading ? (
        <div className="text-sm text-muted-foreground">불러오는 중…</div>
      ) : stocks.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          데이터가 없습니다
        </div>
      ) : (
        <ul className="space-y-2">
          {stocks.map((stock, index) => (
            <li key={stock.companyId}>
              <Link
                href={`/stock/${stock.companyId}`}
                className="flex items-center justify-between rounded-md px-4 py-1 transition-colors hover:bg-white/70"
              >

                <div className="flex items-center gap-2">
                  <span className="w-6 text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">
                    {stock.companyName}
                  </span>
                </div>

                <div className="flex flex-col items-end text-xs">
                  <span className="font-semibold">
                    {stock.currentPrice.toLocaleString()}원
                  </span>
                  <span
                    className={`font-medium ${
                      stock.changeRate > 0
                        ? "text-red-600"
                        : stock.changeRate < 0
                        ? "text-blue-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stock.changeRate > 0 ? "+" : ""}
                    {stock.changeRate.toFixed(2)}%
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}