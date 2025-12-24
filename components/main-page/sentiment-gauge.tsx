"use client"

import { useEffect, useRef, useState } from "react"
import { authFetch } from "@/lib/fetcher"
import { Spinner } from "@/components/ui/spinner"

interface SentimentGaugeProps {
  category: string
  selectedStock: {
    companyId: string
    name: string
  } | null
}

const sentimentData: Record<
  string,
  { name: string; companyId: string }
> = {
  반도체: { name: "삼성전자", companyId: "005930" },
  모빌리티: { name: "현대차", companyId: "005380" },
  "2차전지": { name: "LG에너지솔루션", companyId: "373220" },
  재생에너지: { name: "한화솔루션", companyId: "009830" },
  원자력에너지: { name: "두산에너빌리티", companyId: "034020" },
}

const DEFAULT_COMPANY_IDS = new Set(
  Object.values(sentimentData).map(stock => stock.companyId)
)

const getRandomScore = () => {
  return Math.floor(Math.random() * 61) + 30
}

export default function SentimentGauge({
  category,
  selectedStock,
}: SentimentGaugeProps) {
  const prevCategoryRef = useRef<string | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const [currentStock, setCurrentStock] = useState<{
    companyId: string
    name: string
  } | null>(null)

  useEffect(() => {
    const fetchScore = async (stock: {
      companyId: string
      name: string
    }) => {
      try {
        setLoading(true)

        const res = await authFetch(
          `/sentiment/score/${stock.companyId}`
        )
        if (!res.ok) throw new Error("감정 점수 조회 실패")

        const result = await res.json()
        setScore(Math.round(result))
        setCurrentStock(stock)
      } catch (error) {
        console.error(error)
        setScore(getRandomScore())
        setCurrentStock(stock)
      } finally {
        setLoading(false)
      }
    }

    const defaultStock = sentimentData[category]
    const prevCategory = prevCategoryRef.current

    if (prevCategory !== category) {
      if (defaultStock) {
        fetchScore(defaultStock)
      } else {
        setScore(getRandomScore())
        setCurrentStock(null)
      }

      prevCategoryRef.current = category
      return
    }

    if (selectedStock) {
      if (DEFAULT_COMPANY_IDS.has(selectedStock.companyId)) {
        fetchScore(selectedStock)
      } else {
        setScore(getRandomScore())
        setCurrentStock(selectedStock)
      }
      return
    }

    if (defaultStock) {
      fetchScore(defaultStock)
      return
    }

    setScore(getRandomScore())
    setCurrentStock(null)
  }, [category, selectedStock])

  const sentimentLevels = [
    {
      min: 80,
      label: "과열 / FOMO 경고",
      color: "text-green-600",
      sub: "과열 가능성이 있습니다.",
    },
    {
      min: 60,
      label: "긍정 우세",
      color: "text-green-500",
      sub: "긍정 뉴스·댓글이 우세합니다.",
    },
    {
      min: 40,
      label: "중립",
      color: "text-gray-500",
      sub: "감정 편향이 없습니다.",
    },
    {
      min: 20,
      label: "부정 우세",
      color: "text-red-400",
      sub: "부정 감정이 감지됩니다.",
    },
    {
      min: 0,
      label: "위험 경고",
      color: "text-red-600",
      sub: "감정 리스크 매우 높으므로 주의가 필요합니다.",
    },
  ]

  const getSentimentInfo = (score: number) =>
    sentimentLevels.find(level => score >= level.min)!

  const displayScore = score ?? 50
  const displayName = currentStock?.name ?? "미정"

  const info = getSentimentInfo(displayScore)

  const total = 100
  const percentage = displayScore / total

  return (
    <div className="flex-1 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col items-center justify-start">
      <h2 className="self-start text-lg font-semibold text-gray-900 dark:text-gray-100 mb-8 mt-2">
        감정분석 게이지
      </h2>

      {loading ? (
        <div className="mt-20">
          <Spinner className="h-8 w-8 text-[#061F5B]" />
        </div>
      ) : (
        <>
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

              <path
                d="M 10 110 A 90 90 0 0 1 190 110"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
                strokeLinecap="round"
              />

              <path
                d="M 10 110 A 90 90 0 0 1 190 110"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 282} 282`}
                style={{ transition: "stroke-dasharray 0.6s ease-in-out" }}
              />
            </svg>

            <div className="absolute left-0 right-0 top-20 flex flex-col items-center pointer-events-none">
              <p className="text-7xl font-bold text-gray-900 dark:text-gray-100">
                {displayScore}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                OF {total}
              </p>
            </div>
          </div>

          <div className="text-center w-full">
            <div className="mt-5">
              <div className="inline-block px-5 py-2 bg-[#EBF2FF] dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-100">
                  {displayName}
                </p>
              </div>
            </div>

            <p className={`text-sm font-semibold mt-4 ${info.color}`}>
              {info.label}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {info.sub}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
