import { Sidebar } from "@/components/sidebar"
import Header from "@/components/header"
import InvestorProfileCard from "@/components/investor-profile-card" // 투자 성향 카드
import SubscriptionCard from "@/components/mypage/subscription-card"

export default function MyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex">
        <Sidebar />

        {/* Content Area: 좌측 정보 + 우측 구독 카드 */}
        <div className="flex-1 p-8 flex gap-8">
          {/* 왼쪽: 회원 정보 + 투자 성향 */}
          <div className="flex-1 max-w-3xl space-y-10">
            <h2 className="text-xl font-semibold mb-8">회원정보 조회</h2>

            {/* 기본 회원 정보 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">이름</label>
                <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">
                  admin
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">닉네임</label>
                <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">
                  nickname
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">이메일</label>
                <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">
                  admin@gmail.com
                </div>
              </div>
            </div>

            {/* 투자 성향 결과 카드 */}
            <InvestorProfileCard />
          </div>

          {/* 오른쪽: 구독 안내 카드 */}
          <div className="w-[280px] sticky top-24 self-start">
            <SubscriptionCard />
          </div>
        </div>
      </div>
    </div>
  )
}
