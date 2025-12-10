"use client"

interface MarketHeatmapProps {
  category: string
  onSelectStock: (stock: { name: string; score: number }) => void
}

interface HeatmapItem {
  name: string
  change: number
  score: number // 각 종목에 감정분석 점수 추가
}

export default function MarketHeatmap({ category, onSelectStock }: MarketHeatmapProps) {
  const heatmapData: Record<string, HeatmapItem[]> = {
    반도체: [
      { name: "삼성전자", change: 1.63, score: 72 },
      { name: "SK하이닉스", change: 1.63, score: 68 },
      { name: "NAVER", change: 1.63, score: 75 },
      { name: "카카오", change: 1.63, score: 62 },
      { name: "LG디스플레이", change: -2.42, score: 55 },
      { name: "넥스트칩", change: 1.63, score: 71 },
      { name: "삼성SDI", change: 1.63, score: 69 },
      { name: "DBX홀딩스", change: 1.63, score: 64 },
      { name: "실트론", change: 1.63, score: 73 },
      { name: "POSCO", change: 1.63, score: 66 },
      { name: "셀프로텍", change: 1.63, score: 70 },
      { name: "원익반도체", change: 1.63, score: 67 },
      { name: "에프이씨", change: 1.63, score: 74 },
      { name: "맥스칩", change: 1.63, score: 61 },
      { name: "새로지", change: 1.63, score: 76 },
      { name: "티원", change: 1.63, score: 65 },
    ],
    모빌리티: [
      { name: "현대자동차", change: 2.1, score: 65 },
      { name: "기아", change: 1.5, score: 70 },
      { name: "현대모비스", change: -1.2, score: 58 },
      { name: "LG화학", change: 1.63, score: 72 },
      { name: "삼성SDI", change: 0.0, score: 60 },
      { name: "SK이노베이션", change: 2.5, score: 78 },
      { name: "HD현대", change: -0.8, score: 63 },
      { name: "한온시스템", change: 1.1, score: 68 },
      { name: "만도", change: 0.5, score: 66 },
      { name: "Naver", change: -1.3, score: 55 },
      { name: "Kakao", change: 0.7, score: 59 },
      { name: "Coupang", change: 1.2, score: 75 },
      { name: "NCSoft", change: 0.0, score: 62 },
      { name: "Nexon", change: 1.8, score: 77 },
      { name: "Shift", change: -0.5, score: 56 },
      { name: "CJ LogEn", change: 1.1, score: 71 },
    ],
    "2차전지": [
      { name: "CATL", change: 2.3, score: 85 },
      { name: "BYD", change: 1.5, score: 80 },
      { name: "Panasonic", change: 0.8, score: 72 },
      { name: "LG에너지", change: 1.63, score: 88 },
      { name: "SK이노", change: 2.1, score: 85 },
      { name: "삼성SDI", change: 0.0, score: 70 },
      { name: "포스코PM", change: 1.9, score: 82 },
      { name: "EBL", change: -1.2, score: 58 },
      { name: "Northvolt", change: 0.5, score: 65 },
      { name: "Tesla", change: 2.5, score: 89 },
      { name: "VW", change: -0.8, score: 68 },
      { name: "BMW", change: 0.6, score: 74 },
      { name: "Daimler", change: 1.1, score: 76 },
      { name: "Ford", change: -1.5, score: 52 },
      { name: "GM", change: 0.4, score: 64 },
      { name: "Nio", change: 1.7, score: 79 },
    ],
    재생에너지: [
      { name: "NextEra", change: 1.2, score: 58 },
      { name: "Orsted", change: 0.9, score: 61 },
      { name: "Duke Energy", change: 0.5, score: 55 },
      { name: "First Solar", change: 1.63, score: 67 },
      { name: "한화Q셀", change: 2.1, score: 70 },
      { name: "현대건설", change: 1.5, score: 68 },
      { name: "GS에너지", change: 0.0, score: 59 },
      { name: "SK E&S", change: 0.7, score: 65 },
      { name: "한진", change: -1.2, score: 52 },
      { name: "Siemens", change: 0.85, score: 72 },
      { name: "Vestas", change: 1.1, score: 75 },
      { name: "Ørsted", change: 0.6, score: 64 },
      { name: "Brookfield", change: 1.4, score: 73 },
      { name: "Canadian Solar", change: -0.3, score: 56 },
      { name: "Enphase", change: 2.2, score: 81 },
      { name: "Solartech", change: 1.8, score: 78 },
    ],
    원자력에너지: [
      { name: "NRG Energy", change: 1.3, score: 75 },
      { name: "Constellation", change: 0.8, score: 72 },
      { name: "Duke Energy", change: 0.5, score: 68 },
      { name: "한전", change: 1.63, score: 76 },
      { name: "KEPCO", change: 1.2, score: 74 },
      { name: "한수원", change: 0.7, score: 71 },
      { name: "한전기술", change: 0.0, score: 65 },
      { name: "두산중공업", change: 1.5, score: 79 },
      { name: "EDF", change: -0.8, score: 62 },
      { name: "Rolls-Royce", change: 1.1, score: 77 },
      { name: "BWX Technologies", change: 0.9, score: 73 },
      { name: "Cameco", change: 2.3, score: 82 },
      { name: "Kazatomprom", change: 1.7, score: 80 },
      { name: "Sprott", change: -1.1, score: 58 },
      { name: "Uranium Energy", change: 2.5, score: 84 },
      { name: "Denarius", change: 1.8, score: 81 },
    ],
  }

  const data = heatmapData[category] || []

  const getColor = (change: number) => {
    if (change > 0) return "bg-red-400"
    if (change < 0) return "bg-blue-400"
    return "bg-gray-300"
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-950 p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">시장 변동 히트맵</h2>

      <div className="grid grid-cols-4 gap-2 flex-1">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`${getColor(item.change)} rounded-[20px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
            title={`${item.name}: ${item.change > 0 ? "+" : ""}${item.change.toFixed(2)}%`}
            onClick={() => onSelectStock({ name: item.name, score: item.score })}
          >
            <div className="te xt-center">
              <p className="text-xs font-semibold text-white line-clamp-2">{item.name}</p>
              <p className="text-xs text-white opacity-80">
                {item.change > 0 ? "+" : ""}
                {item.change.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
