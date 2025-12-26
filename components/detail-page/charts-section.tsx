"use client"

import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  AreaSeries,
  type CandlestickData,
  type HistogramData,
  type LineData,
  type AreaData,
} from "lightweight-charts"
import { useEffect, useRef, useState } from "react"
import { HelpCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"

// ====== 타입 정의 ======
export type CandlePoint = {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  ma?: number
}

export type SentimentPoint = {
  time: string
  score: number
}

type ChartsSectionProps = {
  candles?: CandlePoint[]
  sentimentHistory?: SentimentPoint[]
  isSubscribed?: boolean
}

const KST_OFFSET_SEC = 9 * 60 * 60

// 문자열 시간 -> 차트용 타임스탬프(초 단위) + KST 보정
const toChartTime = (time: string) =>
  Math.floor(new Date(time).getTime() / 1000) + KST_OFFSET_SEC



export default function ChartsSection({
  candles,
  sentimentHistory,
  isSubscribed = false,
}: ChartsSectionProps) {

  const router = useRouter()

  // 캔들 + 거래량 + MA
  const candleVolumeContainerRef = useRef<HTMLDivElement | null>(null)
  // 감정 추세 차트
  const sentimentContainerRef = useRef<HTMLDivElement | null>(null)
  // 도움말 모달
  const [showChartHelp, setShowChartHelp] = useState(false)
  const [showSentimentHelp, setShowSentimentHelp] = useState(false)

  // ========== 캔들 + 거래량 + 이동평균선 ==========
  useEffect(() => {
    if (!candleVolumeContainerRef.current || !candles?.length) return

    const container = candleVolumeContainerRef.current

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight || 320,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#4b5563",
      },
      grid: {
        vertLines: { color: "#f3f4f6" },
        horzLines: { color: "#e5e7eb" },
      },
      rightPriceScale: {
        visible: true,
        borderColor: "#e5e7eb",
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        borderColor: "#e5e7eb",
        timeVisible: true,
        secondsVisible: false,
      },
    })

    // 캔들 차트
    const candleSeries = chart.addSeries(CandlestickSeries, {
      priceScaleId: "right",
      upColor: "#ef4444",
      borderUpColor: "#ef4444",
      wickUpColor: "#ef4444",
      downColor: "#3b82f6",
      borderDownColor: "#3b82f6",
      wickDownColor: "#3b82f6",
    })

    // 이동평균선
    const maSeries = chart.addSeries(LineSeries, {
      priceScaleId: "right",
      lineWidth: 2,
      color: "black",
      lastValueVisible: false,
      priceLineVisible: false,
    })

    // 거래량은 커스텀 스케일 "volume"
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceScaleId: "volume",
      priceFormat: { type: "volume" },
    })

    // 위쪽: 캔들 + MA 영역
    chart.priceScale("right").applyOptions({
      visible: true,
      borderColor: "#e5e7eb",
      scaleMargins: {
        top: 0.05,
        bottom: 0.25, // 아래 25%를 volume 영역으로 비움
      },
    })

    // 아래쪽: 거래량 영역
    chart.priceScale("volume").applyOptions({
      visible: true,
      borderColor: "#e5e7eb",
      scaleMargins: {
        top: 0.8, // 위 80% price, 아래 20% volume
        bottom: 0,
      },
    })

    // ----- 데이터 변환 -----
    const candleData: CandlestickData[] = candles.map((c) => ({
      time: toChartTime(c.time) as any,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }))

    const maData: LineData[] = candles
      .filter((c) => typeof c.ma === "number")
      .map((c) => ({
        time: toChartTime(c.time) as any,
        value: c.ma as number,
      }))

    const volumeData: HistogramData[] = candles.map((c) => ({
      time: toChartTime(c.time) as any,
      value: c.volume,
      color:
        c.close >= c.open
          ? "rgba(239,68,68,0.5)"
          : "rgba(59,130,246,0.5)",
    }))

    candleSeries.setData(candleData)
    if (maData.length > 0) {
      maSeries.setData(maData)
    }
    volumeSeries.setData(volumeData)

    chart.timeScale().fitContent()

    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight || 320,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [candles])

  // ========== 감정 추세 차트 ==========
  useEffect(() => {
    if (!sentimentContainerRef.current || !sentimentHistory?.length) return

    const container = sentimentContainerRef.current

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight || 320,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#4b5563",
      },
      grid: {
        vertLines: { color: "#f3f4f6" },
        horzLines: { color: "#e5e7eb" },
      },
      rightPriceScale: {
        visible: true,
        borderColor: "#e5e7eb",
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        borderColor: "#e5e7eb",
        timeVisible: true,
        secondsVisible: false,
      },
    })

    // AreaSeries
    const sentimentSeries = chart.addSeries(AreaSeries, {
      lineWidth: 2,
      lineColor: "#16a34a",
      topColor: "rgba(22,163,74,0.4)",
      bottomColor: "rgba(22,163,74,0.0)",
      lastValueVisible: true,
      priceLineVisible: true,
    })

    const sentimentData: AreaData[] = sentimentHistory.map((p) => ({
      time: toChartTime(p.time) as any,
      value: p.score,
    }))

    sentimentSeries.setData(sentimentData)

    chart.timeScale().fitContent()

    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight || 320,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [sentimentHistory])

  return (
    <div className="space-y-6">
      {/* 캔들차트 + 거래량 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            캔들 차트 & 거래량
          </h3>

          {/* 물음표 아이콘 */}
          <button
            onClick={() => setShowChartHelp(true)}
            className="text-gray-400 hover:text-gray-600"
          >
            <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        <div
          ref={candleVolumeContainerRef}
          className="h-80 w-full rounded bg-gradient-to-b from-blue-50 to-gray-50"
        />
      </div>


      {/* 감정 추세 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 relative overflow-hidden">

        <div className="flex items-center justify-between mb-4 relative z-10">
          <h3 className="text-sm font-semibold text-gray-900">
            감정 추세 히스토리
          </h3>

          <button
            onClick={() => setShowSentimentHelp(true)}
            className="text-gray-400 hover:text-gray-600">
            <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        <div className="relative">
          {/* 차트 영역 */}
          <div
            className={`relative ${!isSubscribed ? "blur-sm pointer-events-none select-none" : ""
              }`}
          >
            {!isSubscribed && (
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 600 240"
                  className="w-full h-full opacity-60"
                  preserveAspectRatio="none"
                >
                  {/* 구독 안했을 때 */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="600" height="240" fill="url(#grid)" />

                  <path
                    d="M0,170 C60,150 120,190 180,160 C240,130 300,170 360,120 C420,80 480,140 540,90 C570,70 585,80 600,65"
                    fill="none"
                    stroke="rgba(99,102,241,0.55)"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            )}

            <div
              ref={sentimentContainerRef}
              className="h-64 w-full rounded bg-gradient-to-b from-purple-50 to-gray-50 relative z-10"
            />
          </div>

          {/* 오버레이 */}
          {!isSubscribed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-20">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                🔒 구독자 전용 콘텐츠
              </p>
              <p className="text-xs text-gray-600 mb-4 text-center">
                감정 추세 히스토리는 구독 후 확인할 수 있어요
              </p>
              <button
                onClick={() => router.push("/my-page/subscription")}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                구독 하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chart Help Modal */}
      {showChartHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[430px] p-4 sm:p-6 relative">
            <button
              onClick={() => setShowChartHelp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              도움말
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              해당 차트는 TradingView Charting Library의 기술을<br />기반으로 시각화되었습니다.
            </p>

            <button
              onClick={() => setShowChartHelp(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 text-sm">
              확인
            </button>
          </div>
        </div>
      )}

      {/* Sentiment Help Modal */}
      {showSentimentHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[430px] p-4 sm:p-6 relative">
            <button
              onClick={() => setShowSentimentHelp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              감정 추세 히스토리란?
            </h2>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              감정 추세 히스토리는 뉴스 데이터를 기반으로<br />
              특정 종목에 대한 시장의 감정 변화를 시간 흐름에 따라<br />
              시각화한 지표입니다.
              <br /><br />
              점수가 높을수록 긍정적인 시장 심리가 우세하며,<br />
              급격한 변화는 투자 심리 전환 신호로 활용할 수 있습니다.
            </p>

            <button
              onClick={() => setShowSentimentHelp(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 text-sm">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}