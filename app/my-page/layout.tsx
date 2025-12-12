// app/my-page/layout.tsx
import type { ReactNode } from "react"
import Header from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 🔹 전체를 가운데 정렬 */}
      <main className="flex justify-center">
        <div className="flex w-full max-w-6xl py-10">
          {/* 왼쪽: 사이드바 영역 + 오른쪽과 구분되는 세로선 */}
          <aside className="w-64 pr-8 border-r border-gray-200">
            <Sidebar />
          </aside>

          {/* 오른쪽: 실제 내용 들어가는 카드 영역 */}
          <section className="flex-1 pl-8">
            <div className="rounded-xl border border-gray-200 bg-white px-10 py-8 shadow-sm">
              {children}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
