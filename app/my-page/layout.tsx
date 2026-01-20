// app/my-page/layout.tsx
import type { ReactNode } from "react"
import Header from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MyPageMobileBar } from "@/components/mypage/mobile-bar"

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex justify-center">
        <div className="flex w-full max-w-6xl flex-col md:flex-row md:py-10">
          {/* 모바일용 상단 바 (햄버거 + 드로어) */}
          <div className="md:hidden">
            <MyPageMobileBar />
          </div>

          {/* 데스크탑 사이드바 */}
          <aside className="hidden md:block md:w-72 md:shrink-0 md:pr-8">
            <Sidebar />
          </aside>

          {/* 컨텐츠 영역 */}
          <section className="flex-1 md:pl-8">
            <div className="bg-white md:rounded-xl md:border md:border-gray-200 md:shadow-sm px-4 py-6 md:px-10 md:py-8">
              {children}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
