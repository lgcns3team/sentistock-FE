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

// ====== 타입 정의 ======
export type CandlePoint = {
  time: string // string
  open: number // int
  high: number // int
  low: number // int
  close: number // int
  volume: number // int
  ma?: number // int 
}

export type SentimentPoint = {
  time: string // string
  score: number // int
}

type ChartsSectionProps = {
  candles?: CandlePoint[]
  sentimentHistory?: SentimentPoint[]
}

// 문자열 시간 -> 차트용 UTC 타임스탬프(초 단위)
const toChartTime = (time: string) =>
  Math.floor(new Date(time).getTime() / 1000)

// 데모용 기본 데이터
const demoCandles: CandlePoint[] = [
  {
    time: "2024-12-10T10:00:00",
    open: 95000,
    high: 96000,
    low: 94000,
    close: 95500,
    volume: 120000,
    ma: 95200,
  },
  {
    time: "2024-12-10T11:00:00",
    open: 95500,
    high: 97000,
    low: 95000,
    close: 96800,
    volume: 150000,
    ma: 96000,
  },
  {
    time: "2024-12-10T12:00:00",
    open: 96800,
    high: 97500,
    low: 96000,
    close: 96200,
    volume: 110000,
    ma: 96100,
  },
  {
    time: "2024-12-10T13:00:00",
    open: 96200,
    high: 96500,
    low: 95000,
    close: 95200,
    volume: 130000,
    ma: 95700,
  },
  {
    time: "2024-12-10T14:00:00",
    open: 95200,
    high: 96000,
    low: 94800,
    close: 95900,
    volume: 90000,
    ma: 95800,
  },
]

const demoSentiment: SentimentPoint[] = [
  { time: "2024-12-10T10:00:00", score: 65 },
  { time: "2024-12-10T11:00:00", score: 72 },
  { time: "2024-12-10T12:00:00", score: 60 },
  { time: "2024-12-10T13:00:00", score: 55 },
  { time: "2024-12-10T14:00:00", score: 70 },
]

export default function ChartsSection({
  candles = demoCandles,
  sentimentHistory = demoSentiment,
}: ChartsSectionProps) {
  // 캔들 + 거래량 + MA
  const candleVolumeContainerRef = useRef<HTMLDivElement | null>(null)
  // 감정 추세 차트
  const sentimentContainerRef = useRef<HTMLDivElement | null>(null)
  // 도움말 모달
  const [showChartHelp, setShowChartHelp] = useState(false)

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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          감정 추세 히스토리
        </h3>
        <div
          ref={sentimentContainerRef}
          className="h-64 w-full rounded bg-gradient-to-b from-purple-50 to-gray-50"
        />
      </div>
      {/* Help Modal */}
      {showChartHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[430px] p-4 sm:p-6 relative">
            <button
              onClick={() => setShowChartHelp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              도움말
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              해당 차트는 TradingView Charting Library의 기술을<br/>기반으로 시각화되었습니다.
            </p>

            <button
              onClick={() => setShowChartHelp(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 text-sm"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}