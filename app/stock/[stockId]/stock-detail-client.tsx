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

type ValueChainItem = {
  toCompanyId: string
  toCompanyName: string
  relationship: string
  currentPrice: number
  changeRate: number
}

type CompaniesMap = Record<string, string>

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

    Promise.all([
      apiFetch(`/companies/${companyId}/snapshot`),
      apiFetch(`/stock/candle/hourly/${companyId}`),
      apiFetch(`/sentiment/score/${companyId}`),
      apiFetch(`/sentiment/ratio/${companyId}`),
      apiFetch(`/news/recent-score/${companyId}`),
      apiFetch(`/valuechains/${companyId}`),
    ]).then(async ([s, c, sc, r, n, v]) => {
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
      if (v.ok) {
        const d: ValueChainItem[] = await v.json()
        setValueChain(
          d.map((x, i) => ({
            id: i,
            code: x.toCompanyId,
            name: x.toCompanyName,
            price: x.currentPrice.toLocaleString(),
            change: `${x.changeRate.toFixed(2)}%`,
            isUp: x.changeRate >= 0,
            relation: x.relationship,
          }))
        )
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