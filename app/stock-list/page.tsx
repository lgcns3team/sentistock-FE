import { Sidebar } from "@/components/sidebar"
import Header from "@/components/header"

const purchasedStocks = [
  {
    name: "삼성전자",
    purchasePrice: 72000,
    currentPrice: 106900,
    change: 48.47,
    score: 72,
  },
  {
    name: "HL만도",
    purchasePrice: 49500,
    currentPrice: 59800,
    change: 17.22,
    score: 81,
  },
]

export default function StockListPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 상단 공통 헤더 */}
      <Header />

      {/* 메인 레이아웃: 사이드바 + 내용 카드 (즐겨찾기/보안이랑 동일) */}
      <div className="mx-auto flex max-w-6xl gap-8 py-10">
        {/* 왼쪽: 마이페이지 사이드바 */}
        <aside className="w-64 shrink-0">
          <Sidebar />
        </aside>

        {/* 오른쪽: 내용 카드 */}
        <main className="flex-1">
          <div className="rounded-2xl border border-gray-200 bg-white px-10 py-8 shadow-sm">
            {/* 제목 영역 */}
            <header>
              <h2 className="mb-2 text-xl font-semibold">매수 종목 리스트</h2>
              <p className="mb-8 text-sm text-gray-500">
                보유 중인 종목의 평단가, 현재가, 감정 점수를 한 번에 확인할 수 있어요.
              </p>
            </header>

            {/* 내용 너비 고정 + 카드 목록 */}
            <div className="max-w-4xl space-y-4">
              {purchasedStocks.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-6 py-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  {/* 왼쪽: 종목명 + 평단 */}
                  <div className="flex flex-1 items-center gap-4">
                    <span className="min-w-[100px] text-sm font-medium text-gray-900">
                      {stock.name}
                    </span>

                    <div className="rounded-full bg-gray-100 px-4 py-1 text-xs text-gray-700">
                      평단 {stock.purchasePrice.toLocaleString()}원
                    </div>
                  </div>

                  {/* 오른쪽: 미니 차트 + 현재가 + 점수 */}
                  <div className="flex items-center gap-8">
                    {/* Mini Chart */}
                    <div className="h-8 w-20">
                      <svg viewBox="0 0 80 32" className="h-full w-full">
                        <polyline
                          points="0,28 20,24 40,18 60,22 80,8"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {stock.currentPrice.toLocaleString()}
                      </div>
                      <div className="text-xs text-red-500">
                        {stock.change > 0 && "+"}
                        {stock.change}%
                      </div>
                    </div>

                    <div className="min-w-[60px] text-right text-xs font-medium text-gray-500">
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
