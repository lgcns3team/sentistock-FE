// app/my-page/page.tsx
"use client"

import InvestorProfileCard from "@/components/investor-profile-card"

export default function MyPageInfoPage() {
  return (
    <div className="flex-1 px-10 py-8">
      {/* 가운데 큰 카드 하나 */}
      <div className="">
        {/* 위: 회원정보 조회 */}
        <section className="mb-10">
          <h2 className="mb-8 text-xl font-semibold">회원정보 조회</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">아이디</label>
              <div className="flex-1 rounded border border-gray-300 bg-gray-50 px-4 py-2">
                admin
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">닉네임</label>
              <div className="flex-1 rounded border border-gray-300 bg-gray-50 px-4 py-2">
                nickname
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이메일</label>
              <div className="flex-1 rounded border border-gray-300 bg-gray-50 px-4 py-2">
                admin@gmail.com
              </div>
            </div>
          </div>
        </section>

        {/* 아래: 투자 성향 정보 (가로 전체 사용) */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-gray-800">
            
          </h3>

          {/* InvestorProfileCard를 카드 폭에 맞게 꽉 채우도록 강제 */}
          <div className="[&>div]:w-full [&>div]:max-w-none [&>div]:mx-0">
            <InvestorProfileCard />
          </div>
        </section>
      </div>
    </div>
  )
}
