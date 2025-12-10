"use client"

import { useState, useEffect } from "react"
import { HelpCircle, X } from "lucide-react"

interface SentimentData {
  score: number
  positive: number
  neutral: number
  negative: number
}

interface SentimentScoreProps {
  sentiment: SentimentData
}

export default function SentimentScore({ sentiment }: SentimentScoreProps) {
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    if (showHelp) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [showHelp])

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900">감정 점수</h3>
          <button onClick={() => setShowHelp(true)} className="text-gray-400 hover:text-gray-600">
            <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        <div className="text-center py-6 sm:py-8">
          <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">{sentiment.score}</div>
          <div className="text-gray-500 text-xs sm:text-sm">/100</div>
        </div>

        {/* Score breakdown */}
        <div className="mt-4 sm:mt-6 space-y-3 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600">긍정적</span>
            <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sentiment.positive}%` }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600">중립적</span>
            <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${sentiment.neutral}%` }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600">부정적</span>
            <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${sentiment.negative}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[470px] p-4 sm:p-6 relative">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">도움말</h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              해당 감정 점수는 KR-FinBERT 금융 감정 분석 모델을 기반으로 뉴스 <br/>본문을 분석해 산출되었습니다.<br/> 
              모델의 긍정, 부정, 중립 값(-1 부터 +1 까지)을 백분율로 환산하였습니다.
            </p>

            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 text-sm"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  )
}