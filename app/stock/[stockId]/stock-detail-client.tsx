"use client"

import { useEffect, useMemo, useState } from "react"
import Header from "@/components/header"
import StockInfoContainer from "@/components/detail-page/stock-info-container"
import ChartsSection, {
  type CandlePoint,
  type SentimentPoint,
} from "@/components/detail-page/charts-section"
import SentimentScore from "@/components/detail-page/sentiment-score"
import RelatedArticles from "@/components/detail-page/related-articles"
import ValueChain from "@/components/detail-page/value-chain"
import StockSearch from "@/components/detail-page/stock-search"

type SubscriptionMeRes = {
  subscribed: boolean
  subscribedAt: string
}

type SnapshotRes = {
  companyId: string
  name: string
  currentPrice: number
  changeRate: number
}

type CandleHourlyResItem = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  avgPrice: number
}

type SentimentHistoryResItem = {
  date: string
  score: number
}

type SentimentRatioRes = {
  companyId: string
  totalCount: number
  positiveRatio: number
  negativeRatio: number
  neutralRatio: number
}

type NewsRecentScoreItem = {
  newsId: number
  title: string
  score: number
  url: string
}

type MockValueChainItem = {
  code: string
  name: string
  relation: string
  currentPrice: number
  changeRate: number
}

type CompaniesMap = Record<string, string>

const VALUE_CHAIN_MOCK: Record<string, MockValueChainItem[]> = {
  // 005930 삼성전자
  "005930": [
    { code: "240810", name: "원익IPS", relation: "공급업체", currentPrice: 79100, changeRate: 0.25 },
    { code: "005290", name: "동진쎄미켐", relation: "공급업체", currentPrice: 42350, changeRate: 3.04 },
    { code: "042700", name: "한미반도체", relation: "공급업체", currentPrice: 199100, changeRate: 6.71 },
  ],

  // 005380 현대차
  "005380": [
    { code: "012330", name: "현대모비스", relation: "공급업체", currentPrice: 393500, changeRate: 0.25 },
    { code: "004020", name: "현대제철", relation: "공급업체", currentPrice: 29550, changeRate: 1.37 },
    { code: "307950", name: "현대오토에버", relation: "공급업체", currentPrice: 398500, changeRate: 1.01 },
  ],

  // 373220 LG에너지솔루션
  "373220": [
    { code: "003670", name: "포스코퓨처엠", relation: "공급업체", currentPrice: 178400, changeRate: -0.88 },
    { code: "361610", name: "SK아이이테크놀로지(SKIET)", relation: "공급업체", currentPrice: 23250, changeRate: -3.32 },
    { code: "020150", name: "롯데에너지머티리얼즈", relation: "공급업체", currentPrice: 29100, changeRate: -1.52 },
  ],

  // 034020 두산에너빌리티
  "034020": [
    { code: "052690", name: "한국전력기술", relation: "파트너", currentPrice: 96000, changeRate: 0.52 },
    { code: "083650", name: "비에이치아이", relation: "공급업체", currentPrice: 54700, changeRate: -0.72 },
    { code: "336260", name: "두산퓨얼셀", relation: "파트너", currentPrice: 30500, changeRate: -1.13 },
  ],

  // 009830 한화솔루션
  "009830": [
    { code: "010060", name: "OCI홀딩스", relation: "공급업체", currentPrice: 103500, changeRate: -0.67 },
    { code: "010120", name: "LS ELECTRIC", relation: "공급업체", currentPrice: 480000, changeRate: 0.94 },
    { code: "011930", name: "신성이엔지", relation: "파트너", currentPrice: 1592, changeRate: -1.66 },
  ],
}

export default function StockDetailClient({
  stockId,
}: {
  stockId: string
}) {
  const companyId = stockId

  if (!companyId) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <StockSearch />
      </main>
    )
  }

  const [companies, setCompanies] = useState<CompaniesMap | null>(null)

  useEffect(() => {
    fetch("/companies.json")
      .then((res) => res.json())
      .then(setCompanies)
      .catch(() => setCompanies({}))
  }, [])

  const isValidCompany = useMemo(() => {
    if (!companies) return true
    return Object.prototype.hasOwnProperty.call(companies, companyId)
  }, [companies, companyId])

  const [candles, setCandles] = useState<CandlePoint[]>([])
  const [sentimentHistory, setSentimentHistory] = useState<SentimentPoint[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  const [snapshot, setSnapshot] = useState<SnapshotRes | null>(null)
  const [scoreAvg, setScoreAvg] = useState<number | null>(null)
  const [ratio, setRatio] = useState<SentimentRatioRes | null>(null)

  const [articles, setArticles] = useState<
    { id: number; title: string; url: string; score: number }[]
  >([])
  const [valueChain, setValueChain] = useState<
    {
      id: number
      code: string
      name: string
      price: string
      change: string
      isUp: boolean
      relation: string
    }[]
  >([])

  const apiFetch = async (path: string, init: RequestInit = {}) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    const headers = new Headers(init.headers || {})
    const token = localStorage.getItem("accessToken")
    if (token) headers.set("Authorization", `Bearer ${token}`)
    return fetch(`${base}${path}`, { ...init, headers })
  }

  if (companies && !isValidCompany) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <StockSearch />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            해당 종목을 찾을 수 없습니다.
          </h1>
        </div>
      </main>
    )
  }

  useEffect(() => {
    if (!companyId) return

    apiFetch(`/subscriptions/me`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: SubscriptionMeRes | null) =>
        setIsSubscribed(Boolean(d?.subscribed))
      )
      .catch(() => setIsSubscribed(false))
  }, [companyId])

  useEffect(() => {
    if (!companyId) return

    if (!isSubscribed) {
        setSentimentHistory([])
        return
    }

    apiFetch(`/sentiment/history/${companyId}`)
        .then((res) => (res.ok ? res.json() : []))
        .then((data: SentimentHistoryResItem[]) => {
        setSentimentHistory(
            data.map((p) => ({
            time: p.date,
            score: p.score,
            }))
        )
        })
        .catch(() => setSentimentHistory([]))
    }, [companyId, isSubscribed])

  useEffect(() => {
    const mock = VALUE_CHAIN_MOCK[companyId] ?? []
    setValueChain(
      mock.map((x, i) => ({
        id: i,
        code: x.code,
        name: x.name,
        price: x.currentPrice.toLocaleString(),
        change: `${x.changeRate.toFixed(2)}%`,
        isUp: x.changeRate >= 0,
        relation: x.relation,
      }))
    )
  }, [companyId])

  useEffect(() => {
    if (!companyId) return

    Promise.all([
      apiFetch(`/companies/${companyId}/snapshot`),
      apiFetch(`/stock/candle/hourly/${companyId}`),
      apiFetch(`/sentiment/score/${companyId}`),
      apiFetch(`/sentiment/ratio/${companyId}`),
      apiFetch(`/news/recent-score/${companyId}`),
    ]).then(async ([s, c, sc, r, n]) => {
      if (s.ok) setSnapshot(await s.json())
      if (c.ok) {
        const d: CandleHourlyResItem[] = await c.json()
        setCandles(
          d.map((x) => ({
            time: x.date,
            open: x.open,
            high: x.high,
            low: x.low,
            close: x.close,
            volume: x.volume,
            ma: x.avgPrice,
          }))
        )
      }
      if (sc.ok) setScoreAvg(await sc.json())
      if (r.ok) setRatio(await r.json())
      if (n.ok) {
        const d: NewsRecentScoreItem[] = await n.json()
        setArticles(d.map((x) => ({ id: x.newsId, title: x.title, url: x.url, score: x.score })))
      }
    })
  }, [companyId])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StockSearch />
      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StockInfoContainer
            stockName={snapshot?.name ?? companyId}
            stockCode={companyId}
            price={snapshot?.currentPrice ?? 0}
            change={snapshot?.changeRate ?? 0}
            subscribe={isSubscribed}
          />
          <ChartsSection
            candles={candles}
            sentimentHistory={sentimentHistory}
            isSubscribed={isSubscribed}
          />
        </div>
        <div className="space-y-6">
          <SentimentScore
            sentiment={{
              score: scoreAvg ?? 0,
              positive: ratio?.positiveRatio ?? 0,
              neutral: ratio?.neutralRatio ?? 0,
              negative: ratio?.negativeRatio ?? 0,
            }}
          />
          <RelatedArticles articles={articles} />
          <ValueChain relatedStocks={valueChain} />
        </div>
      </div>
    </main>
  )
}