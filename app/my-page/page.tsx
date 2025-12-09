import { Sidebar } from "@/components/sidebar"
import Header from "@/components/header"

export default function MyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     <Header />

      {/* Main Content */}
      <div className="flex">
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold mb-8">회원정보 조회</h2>

          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이름</label>
              <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">admin</div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">닉네임</label>
              <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">nickname</div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이메일</label>
              <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">admin@gmail.com</div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">비밀번호</label>
              <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">········</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
