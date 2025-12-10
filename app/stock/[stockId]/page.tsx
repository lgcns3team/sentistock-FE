import Header from "@/components/header"
import StockInfo from "@/components/stock-info"
import ChartsSection from "@/components/charts-section"
import SentimentScore from "@/components/sentiment-score"
import RelatedArticles from "@/components/related-articles"
import ValueChain from "@/components/value-chain"
import StockSearch from "@/components/stock-search"

import { stocksData } from "@/lib/stocks"


type StockId = keyof typeof stocksData

type StockDetailPageProps = {
  params: Promise<{ stockId: StockId }>
}

export default async function StockDetailPage({ params }: StockDetailPageProps) {
  const { stockId } = await params

  const stock = stocksData[stockId]


  if (!stock) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <StockSearch />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">종목을 찾을 수 없습니다.</h1>
        </div>
      </main>
    )
  }


  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StockSearch />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Charts and info */}
          <div className="lg:col-span-2 space-y-6">
            <StockInfo
              stockName={stock.name}
              stockCode={stock.code}
              price={stock.price}
              change={stock.change}
            />
            <ChartsSection />
          </div>

          {/* Right side - Sentiment and articles */}
          <div className="space-y-6">
            <SentimentScore sentiment={stock.sentiment} />
            <RelatedArticles articles={stock.articles} />
            <ValueChain relatedStocks={stock.valueChain} />
          </div>
        </div>
      </div>
    </main>
  )
}