"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
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

export default function StockDetailPage() {
  const params = useParams()
  const stockId = params.stockId as string

  const companyId = stockId

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
  }, [companies, stockId])

  const [candles, setCandles] = useState<CandlePoint[]>([])
  const [sentimentHistory, setSentimentHistory] = useState<SentimentPoint[]>([])
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)


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

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const apiFetch = async (path: string, init: RequestInit = {}) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    const headers = new Headers(init.headers || {})

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)

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
          <p className="text-gray-600 mt-2">
            종목 코드(6자리) 또는 종목명을 다시 확인해 주세요.
          </p>
        </div>
      </main>
    )
  }

  // 사용자 구독여부 조회
  useEffect(() => {
    if (!companyId) return

    const run = async () => {

      try {
        const res = await apiFetch(`/subscriptions/me`, { method: "GET" })
        if (res.status === 200) {
          const data: SubscriptionMeRes = await res.json()
          setIsSubscribed(Boolean(data.subscribed))
          return
        }
        setIsSubscribed(false)
      } catch {
        setIsSubscribed(false)
      }
    }

    run()
  }, [companyId])

  useEffect(() => {
    if (!companyId) return

    const run = async () => {
      try {
        const [snapRes, candleRes, scoreRes, ratioRes, newsRes, vcRes] =
          await Promise.all([
            apiFetch(`/companies/${companyId}/snapshot`, { method: "GET" }),
            apiFetch(`/stock/candle/hourly/${companyId}`, { method: "GET" }),
            apiFetch(`/sentiment/score/${companyId}`, { method: "GET" }),
            apiFetch(`/sentiment/ratio/${companyId}`, { method: "GET" }),
            apiFetch(`/news/recent-score/${companyId}`, { method: "GET" }),
            apiFetch(`/valuechains/${companyId}`, { method: "GET" }),
          ])

        // snapshot
        if (snapRes.status === 200) setSnapshot(await snapRes.json())
        else setSnapshot(null)

        // candles
        if (candleRes.status === 200) {
          const data: CandleHourlyResItem[] = await candleRes.json()
          setCandles(
            data.map((c) => ({
              time: c.date,
              open: c.open,
              high: c.high,
              low: c.low,
              close: c.close,
              volume: c.volume,
              ma: c.avgPrice,
            }))
          )
        } else {
          setCandles([])
        }

        // sentiment avg score
        if (scoreRes.status === 200) {
          const data: number = await scoreRes.json()
          setScoreAvg(data)
        } else {
          setScoreAvg(null)
        }

        //  sentiment ratio
        if (ratioRes.status === 200) {
          const data: SentimentRatioRes = await ratioRes.json()
          setRatio(data)
        } else {
          setRatio(null)
        }


        // news
        if (newsRes.status === 200) {
          const data: NewsRecentScoreItem[] = await newsRes.json()
          setArticles(
            data.map((n) => ({
              id: n.newsId,
              title: n.title,
              url: n.url,
              score: n.score,
            }))
          )
        } else {
          setArticles([])
        }

        // valuechains
        if (vcRes.status === 200) {
          const data: ValueChainItem[] = await vcRes.json()
          setValueChain(
            data.map((v, idx) => {
              const isUp = v.changeRate >= 0
              return {
                id: idx,
                code: v.toCompanyId,
                name: v.toCompanyName,
                price: String(v.currentPrice ?? ""),
                change: `${v.changeRate ?? 0}%`,
                isUp,
                relation: v.relationship,
              }
            })
          )
        } else {
          setValueChain([])
        }
      } catch {
        setSnapshot(null)
        setCandles([])
        setScoreAvg(null)
        setRatio(null)
        setArticles([])
        setValueChain([])
      }
    }

    run()
  }, [companyId])

  useEffect(() => {
    if (!companyId) return

    if (!isSubscribed) {
      setSentimentHistory([])
      return
    }

    const run = async () => {
      try {
        const res = await apiFetch(`/sentiment/history/${companyId}`, {
          method: "GET",
        })
        if (res.status === 200) {
          const data: SentimentHistoryResItem[] = await res.json()
          setSentimentHistory(
            data.map((p) => ({
              time: p.date,
              score: p.score,
            }))
          )
          return
        }
        setSentimentHistory([])
      } catch {
        setSentimentHistory([])
      }
    }

    run()
  }, [companyId, isSubscribed])


  const displayName = snapshot?.name ?? companies?.[companyId] ?? companyId
  const displayPrice = snapshot?.currentPrice ?? 0
  const displayChange = snapshot?.changeRate ?? 0

  const sentimentProps = {
    score: scoreAvg ?? 0,
    positive: ratio?.positiveRatio ?? 0,
    neutral: ratio?.neutralRatio ?? 0,
    negative: ratio?.negativeRatio ?? 0,
  }

  const articlesProps = articles
  const valueChainProps = valueChain

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StockSearch />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Charts and info */}
          <div className="lg:col-span-2 space-y-6">
            <StockInfoContainer
              stockName={displayName}
              stockCode={companyId}
              price={displayPrice}
              change={displayChange}
              subscribe={isSubscribed}
            />

            <ChartsSection
              candles={candles}
              sentimentHistory={sentimentHistory}
              isSubscribed={isSubscribed}
            />
          </div>

          {/* Right side - Sentiment and articles */}
          <div className="space-y-6">
            <SentimentScore sentiment={sentimentProps} />
            <RelatedArticles articles={articlesProps} />
            <ValueChain relatedStocks={valueChainProps} />
          </div>
        </div>
      </div>
    </main>
  )
}