"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Star } from "lucide-react"

type PricePoint = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  avgPrice: number
}

type ChangeInfo = {
  currentPrice: number
  changeRate: number
  volume: number
}

type FavoriteCompany = {
  id: string
  name: string
  price: PricePoint[]
  change: ChangeInfo
  sentiScore: number
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteCompany[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/favorites/companies`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
            },
            cache: "no-store",
          }
        )

        if (!res.ok) throw new Error(String(res.status))

        const data = (await res.json()) as FavoriteCompany[]
        setFavorites(data)
      } catch {
        setFavorites([])
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 px-10 py-8">
        <h2 className="mb-2 text-xl font-semibold">즐겨찾기 목록</h2>
        <p className="text-sm text-gray-500">불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 px-10 py-8">
      <header>
        <h2 className="mb-2 text-xl font-semibold">즐겨찾기 목록</h2>
        <p className="mb-8 text-sm text-gray-500">
          자주 보는 종목을 한 번에 모아서, 가격 변화와 감정 점수를 함께 볼 수 있어요.
        </p>
      </header>

      <div className="max-w-4xl space-y-3 md:space-y-4">
        {favorites.map((stock) => {
          const latestClose =
            stock.price?.length ? stock.price[stock.price.length - 1].close : 0

          const changeRate = stock.change?.changeRate ?? 0
          const changeRateText = `${changeRate >= 0 ? "+" : ""}${changeRate.toFixed(
            2
          )}%`

          return (
            <Link key={stock.id} href={`/stock/${stock.id}`} className="block">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40 sm:px-6 sm:py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {stock.name}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-8">
                    <div className="h-8 w-20">
                      <svg viewBox="0 0 80 32" className="h-full w-full">
                        <g transform={changeRate < 0 ? "translate(0 32) scale(1 -1)" : undefined}>
                          <polyline
                            points="0,28 20,24 40,18 60,22 80,8"
                            fill="none"
                            stroke={changeRate >= 0 ? "#ef4444" : "#3b82f6"}
                            strokeWidth={2}
                          />
                        </g>
                      </svg>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {latestClose.toLocaleString()}
                      </div>
                      <div
                        className={`text-xs ${
                          changeRate >= 0 ? "text-red-500" : "text-blue-500"
                        }`}
                      >
                        {changeRateText}
                      </div>
                    </div>

                    <div className="min-w-[60px] text-right text-xs font-medium text-gray-600">
                      {stock.sentiScore}점
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

        {favorites.length === 0 && (
          <p className="text-sm text-gray-500">즐겨찾기한 종목이 없어요.</p>
        )}
      </div>
    </div>
  )
}
