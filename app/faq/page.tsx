"use client"

import  Header from "@/components/header"
import { FAQItem } from "@/components/faq-item"
import { Search } from "lucide-react"
import { useState, useMemo } from "react"

const faqData = [
  {
    id: 1,
    question: "밸류체인이 뭐가요?",
    answer:
      "밸류체인은 기업이 제품이나 서비스를 만들고 고객에게 전달하는 과정에서 발생하는 모든 활동을 단계별로 분석한 모델입니다.각 단계가 어떤 가치를 만들어내는지 파악함으로써 기업은 비용 효율을 높이고 경쟁력을 강화할 수 있습니다.",
  },
  {
    id: 2,
    question: "감정분석은 어떻게 진행되나요?",
    answer:
      "감정분석은 머신러닝 알고리즘을 사용하여 텍스트, 이미지, 음성 등에서 긍정적, 부정적, 중립적 감정을 분석합니다.",
  },
  {
    id: 3,
    question: "뉴스 분석은 어느 주기로 진행되나요?",
    answer: "뉴스 분석은 실시간으로 진행되며, 주요 뉴스와 시장 이슈를 24시간 모니터링합니다.",
  },
  {
    id: 4,
    question: "투자 성향 종류는 어떤 기준으로 분류되나요?",
    answer: "투자 성향은 위험도, 수익 기대율, 투자 기간 등을 고려하여 보수적, 안정적, 공격적으로 분류됩니다.",
  },
  {
    id: 5,
    question: "매수 타이밍은 어떻게 잡나요?",
    answer: "매수 타이밍은 기술적 분석, 펀더멘탈 분석, 시장 심리 등 여러 요소를 종합적으로 고려하여 결정됩니다.",
  },
  {
    id: 6,
    question: "매도 타이밍은 어떻게 잡나요?",
    answer:
      "매도 타이밍은 목표 수익률 달성, 손절매 기준, 기술적 신호 등을 바탕으로 결정되며, 개인의 투자 전략에 따라 다릅니다.",
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredFAQ = useMemo(() => {
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const totalPages = Math.ceil(filteredFAQ.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedFAQ = filteredFAQ.slice(startIdx, startIdx + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main>
      <Header />

      <div className="min-h-screen px-4 py-12" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: "#004996" }}>
            자주 묻는 질문
          </h1>

          {/* Search Bar with Real Search */}
          <div className="mb-10">
            <div
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-white border-2"
              style={{ borderColor: "#98C9EA" }}
            >
              <Search className="w-5 h-5" style={{ color: "#5CB4E4" }} />
              <input
                type="text"
                placeholder="무엇이든 찾아보세요"
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {paginatedFAQ.length > 0 ? (
              paginatedFAQ.map((item) => <FAQItem key={item.id} question={item.question} answer={item.answer} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded font-medium transition-all ${
                    page === currentPage ? "font-bold text-lg" : "text-gray-600 hover:text-gray-900"
                  }`}
                  style={{
                    color: page === currentPage ? "#004996" : undefined,
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
