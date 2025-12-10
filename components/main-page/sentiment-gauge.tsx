"use client"

interface SentimentGaugeProps {
  category: string
  selectedStock: { name: string; score: number } | null
}

export default function SentimentGauge({
  category,
  selectedStock,
}: SentimentGaugeProps) {
  const sentimentData: Record<
    string,
    { score: number; name: string; description: string }
  > = {
    반도체: { score: 72, name: "삼성전자", description: "긍정 강한 매수 심리" },
    모빌리티: { score: 65, name: "현대자동차", description: "약세 관망 심리" },
    "2차전지": {
      score: 85,
      name: "SK이노베이션",
      description: "강한 매수 심리",
    },
    재생에너지: { score: 58, name: "한화Q셀", description: "혼조 심리" },
    원자력에너지: {
      score: 75,
      name: "한국수력원자력",
      description: "긍정 강한 매수 심리",
    },
  }

  const getDescription = (score: number): string => {
    if (score >= 80) return "강한 매수 심리"
    if (score >= 70) return "긍정 강한 매수 심리"
    if (score >= 60) return "약세 관망 심리"
    if (score >= 50) return "혼조 심리"
    return "약세 심리"
  }

  const displayData = selectedStock
    ? {
        score: selectedStock.score,
        name: selectedStock.name,
        description: getDescription(selectedStock.score),
      }
    : sentimentData[category] || {
        score: 50,
        name: "미정",
        description: "분석 대기 중",
      }

  const total = 100 // or 999, 또는 props로 전달 가능
  const percentage = displayData.score / total
  const needleAngle = percentage * 180 - 90

  return (
    <div className="flex-1 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col items-center justify-start">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        감정분석 게이지
      </h2>

      <div className="relative w-72 h-40 mb-6">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Background Arc */}
          <path
            d="M 10 110 A 90 90 0 0 1 190 110"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Filled Arc */}
          <path
            d="M 10 110 A 90 90 0 0 1 190 110"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 282} 282`}
            style={{ transition: "stroke-dasharray 0.6s ease-in-out" }}
          />

          {/* Needle */}
          {/* <g transform={`translate(100 110) rotate(${needleAngle})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-70"
              stroke="#1f2937"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="6" fill="#1f2937" />
          </g> */}
        </svg>

        {/* Center Content: 큰 점수 + 작은 전체 */}
        <div className="absolute left-0 right-0 top-20 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-7xl font-bold text-gray-900 dark:text-gray-100 leading-none">
            {displayData.score}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            OF {total}
          </p>
        </div>
      </div>

      <div className="text-center w-full">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-5">
          {displayData.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {displayData.description}
        </p>
      </div>
    </div>
  )
}
