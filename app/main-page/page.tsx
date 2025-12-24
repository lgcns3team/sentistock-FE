"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/main-page/sidebar"
import RealtimeChart from "@/components/main-page/realtime-chart"
import MarketHeatmap from "@/components/main-page/market-heatmap"
import SentimentGauge from "@/components/main-page/sentiment-gauge"
import { AuthWarningDialog } from "@/components/main-page/token-exp"
import { isTokenExpired, getTokenFromStorage } from "@/lib/api/token"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("반도체")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedStock, setSelectedStock] = useState<{
    companyId: string
    name: string
  } | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = getTokenFromStorage()

    if (!token || isTokenExpired(token)) {
      setShowAuthDialog(true)
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Header />

      {isAuthenticated ? (
        <>
          {/* 슬로건 */}
          <div className="flex justify-center items-center mb-2">
            <img src="../slogan_light.png" alt="slogan" />
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

            {/* Divider */}
            <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-800" />

            {/* Realtime Chart */}
            <RealtimeChart category={selectedCategory} sortOrder={sortOrder} onSortChange={setSortOrder} />

            <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-800" />

            {/* Heatmap */}
            <MarketHeatmap category={selectedCategory} onSelectStock={setSelectedStock} />

            <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-800" />

            {/* Sentiment Gauge */}
            <SentimentGauge category={selectedCategory} selectedStock={selectedStock} />
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>로그인이 필요합니다</p>
          </div>
        </div>
      )}

      <AuthWarningDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </main>
  )
}
