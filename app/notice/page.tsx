"use client"

import { useState } from "react"
import Header from "@/components/header"
import NoticeList from "@/components/notice/notice-list"
import Pagination from "@/components/notice/pagination"

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(1)

  const notices = [
    {
      id: 1,
      category: "공지",
      title: "🎁 차트게임 100만 플레이 기념 시드 환인 이벤트 🎁",
      date: "2023.09.11.",
    },
    {
      id: 2,
      category: "공지",
      title: "📰 곤 예정된 업데이트를 미리 확인해보세요!",
      date: "2023.09.08.",
    },
    {
      id: 3,
      category: "공지",
      title: "알파스쿠에이 X 와우넷 콜라보 기념 50%할인 이벤트 🎁",
      date: "2023.08.17.",
    },
    {
      id: 4,
      category: "공지",
      title: "유안타증권 비대면계좌개설 공지",
      date: "2023.07.24.",
    },
    {
      id: 5,
      category: "공지",
      title: "지표분석 프리미엄 플랜 출시 기념 50% 할인 🌟",
      date: "2023.06.30.",
    },
    {
      id: 6,
      category: "공지",
      title: "🎉 6월 유안타증권 이벤트 - 지금 계좌 개설하고 무료 수수료 우대 받자!",
      date: "2023.06.21.",
    },
    {
      id: 7,
      category: "점검",
      title: "긴급점검 안내 (5/30)",
      date: "2023.05.30.",
    },
    {
      id: 8,
      category: "점검",
      title: "서버 점검 안내 (5/27)",
      date: "2023.05.24.",
    },
  ]

  const itemsPerPage = 10
  const totalPages = Math.ceil(notices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotices = notices.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-10">
        {/* 제목 */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[rgb(6,31,91)]">공지사항</h1>
        </div>

        <div>
          <NoticeList notices={paginatedNotices} />

          {/* 페이지네이션 */}
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </main>
    </div>
  )
}
