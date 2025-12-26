"use client"

import { Star } from "lucide-react"

const favoriteStocks = [
  { name: "삼성전자", price: 106900, change: 1.71, score: 72 },
  { name: "HL만도", price: 59800, change: 10.35, score: 81 },
  { name: "한화솔루션", price: 27650, change: -0.54, score: 45 },
]

export default function FavoritesPage() {
  return (
    <div className="flex-1 px-10 py-8">
      <header>
        <h2 className="mb-2 text-xl font-semibold">즐겨찾기 목록</h2>
        <p className="mb-8 text-sm text-gray-500">
          자주 보는 종목을 한 번에 모아서, 가격 변화와 감정 점수를 함께 볼 수 있어요.
        </p>
      </header>

      <div className="max-w-4xl space-y-3 md:space-y-4">
        {favoriteStocks.map((stock, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40 sm:px-6 sm:py-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{stock.name}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-8">
                <div className="h-8 w-20">
                  <svg viewBox="0 0 80 32" className="h-full w-full">
                    <polyline
                      points="0,28 20,24 40,18 60,22 80,8"
                      fill="none"
                      stroke={stock.change >= 0 ? "#ef4444" : "#3b82f6"}
                      strokeWidth={2}
                    />
                  </svg>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {stock.price.toLocaleString()}
                  </div>
                  <div className={`text-xs ${stock.change >= 0 ? "text-red-500" : "text-blue-500"}`}>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </div>

                <div className="min-w-[60px] text-right text-xs font-medium text-gray-600">
                  {stock.score}점
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
