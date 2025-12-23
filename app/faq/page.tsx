"use client"

import  Header from "@/components/header"
import { FAQItem } from "@/components/faq/faq-item"
import { Search } from "lucide-react"
import { useState, useMemo } from "react"

const faqData = [
  {
    id: 1,
    question: "밸류체인이 뭐가요?",
    answer:
      "밸류체인은 <b>제품이나 서비스가 기획부터 생산, 유통, 판매, 사후관리까지 이어지는 전 과정을 단계별로 정리한 개념</b>입니다.기업이 어떤 활동을 통해 가치를 만들고 있는지, 그리고 경쟁력이 어디에서 나오는지를 분석하는 데 활용됩니다. 이를 통해 비용 절감이나 차별화가 가능한 지점을 파악할 수 있습니다.",
  },
  {
    id: 2,
    question: "감정분석은 어떻게 진행되나요?",
    answer:
      "우리 서비스의 감정 분석은 <b>네이버 뉴스 크롤링 → GPT 기반 뉴스 요약 → KR-FinBERT 금융 감정 분석</b> 순서로 진행됩니다. KR-FinBERT 모델이 뉴스 본문을 분석해 긍정·부정·중립 확률 값을 산출하며, 이 값을 기반으로 감정 점수를 계산합니다. 최종 감정 점수는 모델의 감정 결과를 -1부터 +1 범위로 환산한 뒤 백분율로 변환하여 산출식에 적용한 값입니다.",
  },
  {
    id: 3,
    question: "뉴스 분석은 어느 주기로 진행되나요?",
    answer: "뉴스 분석은 실시간으로 진행되며, 주요 뉴스와 시장 이슈를 주식 장이 열리는 오전 9시부터 오후 4시까지 모니터링합니다.",
  },
  {
    id: 4,
    question: "투자 성향 종류는 어떤 기준으로 분류되나요?",
    answer: "투자 성향은 <b>위험도, 수익 기대율, 투자 기간 등</b>을 고려하여 <b>안정형, 안정추구형, 위험중립형, 적극투자형, 공격투자형</b> 5단계로 분류됩니다.",
  },
  {
    id: 5,
    question: "매수 타이밍은 어떻게 잡나요?",
    answer: "<b>매수 타이밍은 뉴스 기반 감정 점수의 변화 흐름과 사용자의 투자 성향을 함께 고려해 판단</b>합니다. 감정 점수가 부정·중립 구간에서 긍정 구간으로 전환되며 일정 폭 이상 상승할 경우 매수 알림이 발생하며, 안정형일수록 작은 변화에도, 공격형일수록 더 큰 변화에 반응하도록 설계되어 있습니다. 이를 통해 과열 구간의 추격 매수를 줄이고, 심리 개선 초입을 포착하는 것을 목표로 합니다.",
  },
  {
    id: 6,
    question: "매도 타이밍은 어떻게 잡나요?",
    answer:
      "<b>매도 타이밍은 감정 점수 변화, 개인 수익률(평단가 기준), 거래량을 종합해 판단</b>합니다. 일정 수익 구간에 도달한 상태에서 감정 점수가 하락 전환되거나 부정 감정이 급증하고, 거래량 변화가 함께 나타나면 매도 신호가 발생합니다. 투자 성향에 따라 수익 실현·손절 기준이 다르게 적용되어 과도한 손실이나 감정적 매도를 줄이도록 돕습니다.",
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
