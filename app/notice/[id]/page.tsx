import Link from "next/link"
import Header from "@/components/header"

const noticesData: Record<
  string,
  {
    id: number
    category: string
    title: string
    date: string
    author: string
    views: number
    content: string
  }
> = {
  "1": {
    id: 1,
    category: "점검",
    title: "서버 점검 안내",
    date: "2025.12.10.",
    author: "관리자",
    views: 120,
    content:
      "현재 홈페이지 오류로 인해 긴급 서버 점검이 진행 중입니다.\n서비스 이용에 불편을 드려 대단히 죄송합니다.\n빠른 시간 내에 복구가 완료될 수 있도록 노력하고 있습니다.\n서비스 이용에 참고 부탁드리며,\n궁금하신 사항은 담당자를 통해 문의해주시기 바랍니다.\n감사합니다.\n홈페이지 이용문의) 02-1234-5678",
  },
}

export function generateStaticParams() {
  return [{ id: "1" }]
}

// (선택) 존재하지 않는 id로 접근하는 경우를 막고 싶다면
export const dynamicParams = false


export default async function NoticeDetailPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params        // ✅ 여기!
    const notice = noticesData[id]     // ✅ 이제 안전


  if (!notice) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
          <p className="text-center text-gray-500">해당 공지사항을 찾을 수 없습니다.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-10 max-w-3xl">
        <div className="text-center mb-12 md:mb-10">
          <h1 className="text-3xl md:text-3xl font-bold text-[rgb(6,31,91)]">공지사항</h1>
        </div>

        <article className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-1xl font-bold text-[rgb(6,31,91)] leading-relaxed">
            [{notice.category}] {notice.title}
          </h2>

          <div className="flex flex-wrap gap-6 text-base md:text-sm text-[rgb(120,135,160)] border-b border-[rgb(225,231,240)] pb-8">
            <div>
              <span className="font-medium">작성일</span>
              <span className="ml-3">{notice.date}</span>
            </div>
            <div>
              <span className="font-medium">조회수</span>
              <span className="ml-3">{notice.views}</span>
            </div>
          </div>

          <div className="text-lg md:text-sm leading-8 md:leading-9 text-[rgb(60,75,100)] whitespace-pre-line border-b border-[rgb(225,231,240)] pb-12">
            {notice.content}
          </div>

          <div className="flex justify-center pt-8 md:pt-3">
            <Link href="/notice">
              <button className="px-12 py-4 md:py-2 bg-[rgb(0,73,150)] hover:bg-[rgb(6,31,91)] text-white font-medium text-lg rounded-md transition">
                목록으로
              </button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}