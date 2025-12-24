"use client"

import { useEffect, useState } from "react"
import { authFetch } from "@/lib/fetcher"

interface MarketHeatmapProps {
  category: string
  onSelectStock: (stock: {
    companyId: string
    name: string
  }) => void
}

interface HeatmapItem {
  companyId: string
  name: string
  change: number
}

export default function MarketHeatmap({
  category,
  onSelectStock,
}: MarketHeatmapProps) {
  const [data, setData] = useState<HeatmapItem[]>([])
  const [loading, setLoading] = useState(false)

  const sectorMap: Record<string, number> = {
    반도체: 1,
    모빌리티: 2,
    "2차전지": 3,
    재생에너지: 4,
    원자력에너지: 5,
  }

  const sectorId = sectorMap[category]

  useEffect(() => {
    if (!sectorId) return

    const fetchHeatmap = async () => {
      try {
        setLoading(true)

        const res = await authFetch(`/stock/${sectorId}/heatmap`)
        if (!res.ok) {
          throw new Error("히트맵 조회 실패")
        }

        const rawData = await res.json()

        const mapped: HeatmapItem[] = rawData.map((item: any) => ({
          companyId: item.companyId,
          name: item.companyName,
          change: item.changeRate,
        }))

        console.log("[Heatmap Data]", mapped)

        setData(mapped)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeatmap()
  }, [sectorId])

  const getColor = (change: number) => {
    if (change > 0) return "bg-red-400"
    if (change < 0) return "bg-blue-400"
    return "bg-gray-300"
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-950 p-6 flex flex-col items-center">
      <h2 className="self-start text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        시장 변동 히트맵
      </h2>

      <div className="self-start mb-4">
        <h4 className="text-xs text-gray-500 dark:text-gray-100">
          종목을 클릭하면 해당 종목의 감정 분석 게이지를 확인할 수 있습니다.
        </h4>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">히트맵 불러오는 중...</div>
      ) : (
        <div className="grid grid-cols-4 gap-1 w-[310px] h-[310px] overflow-y-auto">
          {data.map(item => (
            <div
              key={item.companyId}
              className={`${getColor(
                item.change
              )} aspect-square rounded-[5px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
              title={`${item.name}: ${
                item.change > 0 ? "+" : ""
              }${item.change.toFixed(2)}%`}
              onClick={() =>
                onSelectStock({
                  companyId: item.companyId,
                  name: item.name,
                })
              }
            >
              <div className="text-center">
                <p className="text-xs font-semibold text-white line-clamp-2">
                  {item.name}
                </p>
                <p className="text-xs text-white opacity-80">
                  {item.change > 0 ? "+" : ""}
                  {item.change.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
