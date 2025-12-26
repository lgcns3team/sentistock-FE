"use client"

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
    <div className="flex-1 px-10 py-8">
      <header>
        <h2 className="mb-2 text-xl font-semibold">매수 종목 리스트</h2>
        <p className="mb-8 text-sm text-gray-500">
          보유 중인 종목의 평단가, 현재가, 감정 점수를 한 번에 확인할 수 있어요.
        </p>
      </header>

      <div className="max-w-4xl space-y-3 md:space-y-4">
        {purchasedStocks.map((stock, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40 sm:px-6 sm:py-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
                <span className="text-sm font-medium text-gray-900 sm:min-w-[100px]">
                  {stock.name}
                </span>
                <div className="rounded-full bg-gray-100 px-4 py-1 text-xs text-gray-700">
                  평단 {stock.purchasePrice.toLocaleString()}원
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-8">
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
          </div>
        ))}
      </div>
    </div>
  )
}
