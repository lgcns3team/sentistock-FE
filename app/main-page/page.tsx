"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/main-page/sidebar"
import RealtimeChart from "@/components/main-page/realtime-chart"
import MarketHeatmap from "@/components/main-page/market-heatmap"
import SentimentGauge from "@/components/main-page/sentiment-gauge"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("반도체")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedStock, setSelectedStock] = useState<{ name: string; score: number } | null>(null)

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Header />
      <img src="../slogan_light.png" alt="slogan"/>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        {/* Divider */}
        <div className="w-px bg-gray-200 dark:bg-gray-800" />

        {/* Realtime Chart */}
        <RealtimeChart category={selectedCategory} sortOrder={sortOrder} onSortChange={setSortOrder} />

        {/* Divider */}
        <div className="w-px bg-gray-200 dark:bg-gray-800" />

        {/* Market Heatmap */}
        <MarketHeatmap category={selectedCategory} onSelectStock={setSelectedStock} />

        {/* Divider */}
        <div className="w-px bg-gray-200 dark:bg-gray-800" />

        {/* Sentiment Gauge */}
        <SentimentGauge category={selectedCategory} selectedStock={selectedStock} />
      </div>
    </main>
  )
}
