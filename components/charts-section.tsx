"use client"

export default function ChartsSection() {
  return (
    <div className="space-y-6">
      {/* Candlestick Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">캔들 차트 & 거래량</h3>
        <div className="h-80 bg-gradient-to-b from-blue-50 to-gray-50 rounded flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-sm">실시간 캔들 차트</p>
            <p className="text-xs text-gray-400 mt-1">(1시간 단위)</p>
          </div>
        </div>
      </div>

      {/* Sentiment Trend History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">감정 추세 히스토리</h3>
        <div className="h-64 bg-gradient-to-b from-purple-50 to-gray-50 rounded flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-sm">감정 추세 라인 차트</p>
            <p className="text-xs text-gray-400 mt-1">(1시간 단위)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
