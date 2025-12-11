// app/my-page/page.tsx
"use client"

import { useRouter } from "next/navigation"
import InvestorProfileCard from "@/components/investor-profile-card"
import SubscriptionCard from "@/components/mypage/subscription-card"
import SubscriptionCardOn from "@/components/mypage/subscription-card-on"

type SubscriptionStatus = "ACTIVE" | "NONE"

interface SubscriptionInfo {
  status: SubscriptionStatus
  planName: string
  price: number
  currency?: string
  billingCycleLabel: string
  nextBillingDate: string
  paymentMethodLabel: string
}

export default function MyPageInfoPage() {
  const router = useRouter()

  // TODO: 실제 API 데이터로 교체
  const subscription: SubscriptionInfo | null = {
    status: "ACTIVE",
    planName: "SentiStock 프리미엄",
    price: 1900,
    currency: "원",
    billingCycleLabel: "1개월 자동 결제",
    nextBillingDate: "2025-01-15",
    paymentMethodLabel: "국민카드 *****-1234",
  }

  const hasSubscription =
    subscription !== null && subscription.status === "ACTIVE"

  return (
    // 🔹 레이아웃에서 이미 Sidebar 왼쪽에 있으니까,
    // 여기서는 “오른쪽 내용”만 flex-1로 채워주면 됨
    <div className="flex-1 px-10 py-8 flex gap-8">
      {/* 왼쪽: 회원 정보 + 투자 성향 */}
      <div className="flex-1 max-w-3xl space-y-10">
        <h2 className="mb-8 text-xl font-semibold">회원정보 조회</h2>

        {/* 기본 회원 정보 */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="w-24 text-sm text-gray-700">이름</label>
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

        {/* 투자 성향 결과 카드 */}
        <InvestorProfileCard />
      </div>

      {/* 오른쪽: 구독 카드 */}
      <div className="">
        {hasSubscription && subscription ? (
          <SubscriptionCardOn
            subscription={subscription}
            onClickManage={() => router.push("/my-page/subscription")}
          />
        ) : (
          <SubscriptionCard />
        )}
      </div>
    </div>
  )
}
