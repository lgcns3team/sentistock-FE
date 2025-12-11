"use client"

import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  type CandlestickData,
  type HistogramData,
  type LineData,
} from "lightweight-charts"
import { useEffect, useRef } from "react"

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

    // 캔들 + MA 오른쪽 기본 스케일
    const candleSeries = chart.addSeries(CandlestickSeries, {
      priceScaleId: "right",
      upColor: "#16a34a",
      downColor: "#ef4444",
      borderUpColor: "#16a34a",
      borderDownColor: "#ef4444",
      wickUpColor: "#16a34a",
      wickDownColor: "#ef4444",
    })

    const maSeries = chart.addSeries(LineSeries, {
      priceScaleId: "right",
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false,
      color: "#0ea5e9",
    })

    // 거래량 커스텀 스케일
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceScaleId: "volume",
      priceFormat: {
        type: "volume",
      },
    })

    // ----- 스케일 옵션 설정 -----
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
        top: 0.8, // 위 80% price 영역, 아래 20% volume 영역
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
      color: c.close >= c.open ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)",
    }))

    candleSeries.setData(candleData)
    if (maData.length > 0) {
      maSeries.setData(maData)
    }
    volumeSeries.setData(volumeData)

    chart.timeScale().fitContent()

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth,
      height: container.clientHeight || 320 })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [candles])

  // ========== 감정 추세 선 차트 ==========
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

    const lineSeries = chart.addSeries(LineSeries, {
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: true,
    })

    const lineData: LineData[] = sentimentHistory.map((p) => ({
      time: toChartTime(p.time) as any,
      value: p.score,
    }))

    lineSeries.setData(lineData)
    chart.timeScale().fitContent()

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth,
      height: container.clientHeight || 320 })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [sentimentHistory])

  return (
    <div className="space-y-6">
      {/* Candlestick + Volume */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          캔들 차트 & 거래량
        </h3>

        <div
          ref={candleVolumeContainerRef}
          className="h-80 w-full rounded bg-gradient-to-b from-blue-50 to-gray-50"
        />
      </div>

      {/* Sentiment Trend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          감정 추세 히스토리
        </h3>
        <div
          ref={sentimentContainerRef}
          className="h-64 w-full rounded bg-gradient-to-b from-purple-50 to-gray-50"
        />
      </div>
    </div>
  )
}