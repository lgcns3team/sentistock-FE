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
      category: "점검",
      title: "서버 점검 안내",
      date: "2025.12.10."
    },
    {
      id: 2,
      category: "공지",
      title: "SentiStock 서비스 베타 오픈 안내",
      date: "2025.12.08."
    },
    {
      id: 3,
      category: "공지",
      title: "감정 분석 알고리즘 고도화 적용 안내",
      date: "2025.12.07.",
    },
    {
      id: 4,
      category: "점검",
      title: "실시간 지표 데이터 지연 현상 안내",
      date: "2025.12.03.",
    },
    {
      id: 5,
      category: "공지",
      title: "모바일 환경 UI/UX 개선 적용 안내",
      date: "2025.12.01",
    },
    {
      id: 6,
      category: "정책",
      title: "서비스 이용약관 개정 사전 안내",
      date: "2025.11.28.",
    },
    {
      id: 7,
      category: "정책",
      title: "개인정보 처리방침 변경 안내",
      date: "2025.11.20.",
    },
    {
      id: 8,
      category: "공지",
      title: "대시보드 레이아웃 개편 및 메뉴 구성 변경 안내",
      date: "2025.11.17.",
    },
    {
      id: 9,
      category: "공지",
      title: "데이터 제공사 변경에 따른 지표 산출 기준 안내",
      date: "2025.11.13.",
    },
    {
      id: 10,
      category: "안내",
      title: "서비스 이용 중 오류(버그) 신고 채널 안내",
      date: "2025.11.09.",
    },
    {
      id: 11,
      category: "공지",
      title: "서비스 모니터링 및 로그 수집에 대한 안내",
      date: "2025.11.04.",
    },
    {
      id: 12,
      category: "점검",
      title: "실시간 지표 데이터 지연 현상 해소 및 정상화 보고",
      date: "2025.11.02",
    },
    {
      id: 13,
      category: "정책",
      title: "알림(Notification) 기능 정책 변경 안내",
      date: "2025.10.27.",
    },
    {
      id: 14,
      category: "정책",
      title: "회원 계정 보안 강화를 위한 비밀번호 정책 안내",
      date: "2025.10.25.",
    },
    {
      id: 15,
      category: "안내",
      title: "고객 의견 수렴을 위한 설문조사 시행 안내",
      date: "2025.10.20.",
    },
    {
      id: 16,
      category: "정책",
      title: "투자 참고용 정보 제공 및 면책 사항 안내",
      date: "2025.10.13.",
    },
    {
      id: 17,
      category: "공지",
      title: "섹터별 감정지수 신규 제공(2차전지·재생에너지 등) 안내",
      date: "2025.10.08.",
    },
    {
      id: 18,
      category: "정책",
      title: "서비스 이용 제한 및 계정 정지 정책 안내",
      date: "2025.09.26",
    },
    {
      id: 19,
      category: "안내",
      title: "정식 서비스 전환 및 향후 서비스 운영 계획 안내",
      date: "2025.09.24.",
    }
  ]

  const itemsPerPage = 8
  const totalPages = Math.ceil(notices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotices = notices.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-10">
        {/* 제목 */}
        <div className="mb-8">
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
