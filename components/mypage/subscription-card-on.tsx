"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type SubscriptionStatus = "ACTIVE" | "NONE"

export interface SubscriptionInfo {
  status: SubscriptionStatus
  planName: string
  price: number
  currency?: string
  billingCycleLabel: string
  nextBillingDate: string
  paymentMethodLabel: string
}

interface SubscriptionCardOnProps {
  subscription: SubscriptionInfo
  onClickManage?: () => void
}

export default function SubscriptionCardOn({
  subscription,
  onClickManage,
}: SubscriptionCardOnProps) {
  const router = useRouter()

  const {
    planName,
    price,
    currency = "원",
    billingCycleLabel,
    nextBillingDate,
    paymentMethodLabel,
  } = subscription

  const handleManage = () => {
    if (onClickManage) return onClickManage()
    router.push("/my-page/subscription")
  }

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">SentiStock 프리미엄 이용 중</h2>
      <p className="mt-1 text-xs text-gray-500">
        감정 기반 투자 인사이트를 프리미엄으로 이용하고 있어요.
      </p>

      <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
        구독 활성
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500">현재 플랜</p>
        <p className="mt-1 text-base font-semibold">{planName}</p>

        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-2xl font-bold">
            {price.toLocaleString("ko-KR")}
          </span>
          <span className="text-sm text-gray-600">{currency}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{billingCycleLabel}</p>
      </div>

      <div className="mt-6 space-y-2 rounded-xl bg-gray-50 p-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">다음 결제 예정일</span>
          <span className="font-medium text-gray-900">{nextBillingDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">결제 수단</span>
          <span className="font-medium text-gray-900">{paymentMethodLabel}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full text-sm"
          onClick={handleManage}
        >
          구독 관리로 이동
        </Button>
        <p className="text-[11px] leading-relaxed text-gray-400">
          구독 관리는 &quot;마이페이지 &gt; 구독 관리&quot;에서 자세히 변경할 수
          있어요.
        </p>
      </div>
    </aside>
  )
}
