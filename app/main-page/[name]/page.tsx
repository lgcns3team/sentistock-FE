"use client"

import Header from "@/components/header"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"

export default function StockDetail() {
  const params = useParams()
  const stockName = decodeURIComponent(params.name as string)

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 px-8 py-6 max-w-6xl mx-auto w-full">
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>메인 페이지로 돌아가기</span>
        </Link>

        {/* Stock Detail Header */}
        <div className="bg-white dark:bg-gray-950 rounded-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stockName}</h1>
          <p className="text-gray-600 dark:text-gray-400">상세 분석 페이지</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Section */}
          <div className="bg-white dark:bg-gray-950 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">가격 추이 차트</h2>
            <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">차트 데이터 로딩 중...</p>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="bg-white dark:bg-gray-950 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">감정분석 결과</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">현재 감정점수</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">72/100</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">심리 상태</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">강한 매수 심리</p>
              </div>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-white dark:bg-gray-950 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">관련 뉴스</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <p className="font-medium text-gray-900 dark:text-gray-100">뉴스 제목 {i}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">관련 뉴스 요약 내용이 표시됩니다.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
