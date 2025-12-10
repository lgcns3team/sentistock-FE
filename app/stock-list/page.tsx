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
      {/* Header */}
     <Header />

      {/* Main Content */}
      <div className="flex">
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold mb-8">매수 종목 리스트</h2>

          <div className="space-y-4">
            {purchasedStocks.map((stock, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-semibold text-gray-900 min-w-[100px]">{stock.name}</span>

                  <div className="bg-gray-200 px-4 py-1 rounded text-sm text-gray-700">
                    {stock.purchasePrice.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  {/* Mini Chart */}
                  <div className="w-20 h-8">
                    <svg viewBox="0 0 80 32" className="w-full h-full">
                      <polyline points="0,28 20,24 40,18 60,22 80,8" fill="none" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{stock.currentPrice.toLocaleString()}</div>
                    <div className="text-sm text-red-500">+{stock.change}%</div>
                  </div>

                  <div className="text-gray-600 font-medium min-w-[60px] text-right">{stock.score}점</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
