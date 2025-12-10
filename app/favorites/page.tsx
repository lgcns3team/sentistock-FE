import { Sidebar } from "@/components/sidebar"
import { Star } from "lucide-react"
import Header from "@/components/header"

const favoriteStocks = [
  {
    name: "삼성전자",
    price: 106900,
    change: 1.71,
    score: 72,
    chartColor: "text-red-500",
  },
  {
    name: "HL만도",
    price: 59800,
    change: 10.35,
    score: 81,
    chartColor: "text-red-500",
  },
  {
    name: "한화솔루션",
    price: 27650,
    change: -0.54,
    score: 45,
    chartColor: "text-blue-500",
  },
]

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
     

      {/* Main Content */}
      <div className="flex">
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">즐겨찾기 목록</h2>
          </div>

          <div className="space-y-4">
            {favoriteStocks.map((stock, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{stock.name}</span>
                </div>

                <div className="flex items-center gap-8">
                  {/* Mini Chart */}
                  <div className="w-20 h-8">
                    <svg viewBox="0 0 80 32" className="w-full h-full">
                      <polyline
                        points="0,28 20,24 40,18 60,22 80,8"
                        fill="none"
                        stroke={stock.change >= 0 ? "#ef4444" : "#3b82f6"}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{stock.price.toLocaleString()}</div>
                    <div className={`text-sm ${stock.change >= 0 ? "text-red-500" : "text-blue-500"}`}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </div>
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
