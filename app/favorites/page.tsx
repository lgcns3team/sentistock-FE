"use client"

import Header from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Star } from "lucide-react"

const favoriteStocks = [
  {
    name: "삼성전자",
    price: 106900,
    change: 1.71,
    score: 72,
  },
  {
    name: "HL만도",
    price: 59800,
    change: 10.35,
    score: 81,
  },
  {
    name: "한화솔루션",
    price: 27650,
    change: -0.54,
    score: 45,
  },
]

export default function FavoritesPage() {
  return (
    <div className="">
      {/* 상단 공통 헤더 */}
      <Header />

      {/* 메인 레이아웃: 보안 페이지와 동일한 구조 */}
      <div className="mx-auto flex max-w-6xl gap-8 py-10">
        {/* 왼쪽: 사이드바 카드 */}
        <aside className="w-64 shrink-0">
          <Sidebar />
        </aside>

        {/* 오른쪽: 내용 영역 */}
        <main className="flex-1">
          {/* 보안 페이지에서 보이는 중앙 큰 카드 */}
          <div className="rounded-2xl border border-gray-200 bg-white px-10 py-8 shadow-sm">
            {/* 제목 영역 */}
            <header>
              <h2 className="mb-2 text-xl font-semibold">즐겨찾기 목록</h2>
              <p className="mb-8 text-sm text-gray-500">
                자주 보는 종목을 한 번에 모아서, 가격 변화와 감정 점수를 함께 볼 수 있어요.
              </p>
            </header>

            {/* 실제 리스트: 가운데 너비 제한 */}
            <div className="max-w-4xl space-y-4">
              {favoriteStocks.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  {/* 왼쪽: 즐겨찾기 아이콘 + 종목명 */}
                  <div className="flex flex-1 items-center gap-3">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {stock.name}
                    </span>
                  </div>

                  {/* 오른쪽: 미니 차트 + 현재가/변동률 + 점수 */}
                  <div className="flex items-center gap-8">
                    {/* Mini Chart */}
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
                      <div
                        className={`text-xs ${
                          stock.change >= 0 ? "text-red-500" : "text-blue-500"
                        }`}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change}%
                      </div>
                    </div>

                    <div className="min-w-[60px] text-right text-xs font-medium text-gray-600">
                      {stock.score}점
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
