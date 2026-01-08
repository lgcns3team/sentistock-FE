"use client"

import { useEffect, useState } from "react"
import SubscriptionCard from "@/components/mypage/subscription-card"
import { getMySubscription, cancelSubscription } from "@/lib/api"

type UiSubscription = {
  status: "ACTIVE" | "NONE"
  planName: string
  price: number
  firstMonthPrice: number
  renewInterval: string
  nextBillingDate: string
  startedAt: string | null
}

function normalizeSubscription(data: any) {
  const subscribed =
    data?.subscribed ?? data?.subscribe ?? data?.isSubscribe ?? false

  const subscribeAt = data?.subscribeAt ?? data?.subscribedAt ?? null
  const nextBillingDate = data?.nextBillingDate ?? data?.nextPayDate ?? "-"

  return { subscribed, subscribeAt, nextBillingDate }
}

export default function SubscriptionManagementPage() {
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [subscription, setSubscription] = useState<UiSubscription>({
    status: "NONE",
    planName: "SentiStock 프리미엄",
    price: 2990,
    firstMonthPrice: 100,
    renewInterval: "1개월",
    nextBillingDate: "-",
    startedAt: null,
  })

  const isSubscribed = subscription.status === "ACTIVE"
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const loadSubscription = async (showLoading = true) => {
    if (showLoading) setLoading(true)
    try {
      setErrorMsg(null)
      const data = await getMySubscription()
      const { subscribed, subscribeAt, nextBillingDate } =
        normalizeSubscription(data)

      setSubscription((prev) => ({
        ...prev,
        status: subscribed ? "ACTIVE" : "NONE",
        startedAt: subscribeAt,
        nextBillingDate,
      }))
    } catch (e: any) {
      setErrorMsg(e?.message ?? "구독 정보 조회 실패")
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  useEffect(() => {
    loadSubscription(true)
  }, [])

  const onCancel = async () => {
    try {
      setErrorMsg(null)
      const data = await cancelSubscription()
      const { subscribed, subscribeAt, nextBillingDate } =
        normalizeSubscription(data)

      setSubscription((prev) => ({
        ...prev,
        status: subscribed ? "ACTIVE" : "NONE",
        startedAt: subscribeAt,
        nextBillingDate,
      }))

      alert("구독 해지 완료")
    } catch (e: any) {
      setErrorMsg(e?.message ?? "구독 해지 실패")
    }
  }

  if (loading) {
    return (
      <div className="flex-1 px-10 py-8">
        <h2 className="mb-2 text-xl font-semibold">구독 관리</h2>
        <p className="text-sm text-gray-500">불러오는 중...</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 px-10 py-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">구독 관리</h2>
          <p className="mb-2 text-sm text-gray-500">
            SentiStock 프리미엄 구독 상태와 결제 정보를 관리할 수 있어요.
          </p>
          {errorMsg && <p className="mb-6 text-sm text-red-600">{errorMsg}</p>}
        </header>

        <div className="max-w-2xl space-y-12">
          {isSubscribed ? (
            // 구독 후: 왼쪽 카드만 (오른쪽 카드 제거)
            <section>
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      구독 중
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">
                      {subscription.planName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      감정 기반 투자 인사이트를 <br />
                      풀로 활용할 수 있는 월 구독 상품이에요.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-end gap-2">
                  <p className="text-2xl font-bold">
                    월 {subscription.price.toLocaleString()}원
                  </p>
                  <p className="mb-1 text-xs text-gray-500">
                    첫 달 {subscription.firstMonthPrice.toLocaleString()}원 체험
                  </p>
                </div>

                <dl className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-gray-500">구독 시작일</dt>
                    <dd>{subscription.startedAt ?? "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">다음 결제 예정일</dt>
                    <dd>{subscription.nextBillingDate}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">갱신 주기</dt>
                    <dd>{subscription.renewInterval} 자동 결제</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">결제 상태</dt>
                    <dd>정상</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    결제 수단 관리
                  </button>

                  <button
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    type="button"
                    onClick={onCancel}
                  >
                    구독 해지하기
                  </button>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-gray-400">
                  첫 달 이후 해지하지 않으면 매월{" "}
                  {subscription.price.toLocaleString()}원이 자동 결제돼요.
                  <br />
                  결제 예정일 1주 전에 알림을 드릴 예정입니다.
                </p>
              </div>
            </section>
          ) : (
            // 구독 전: 2개 카드 유지(왼쪽 안내 + 오른쪽 시작카드)
            <section>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
                <div className="flex flex-col justify-center rounded-xl border bg-white p-8 shadow-sm">
                  <div className="mb-4">
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                      구독 없음
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">
                      아직 활성화된 구독이 없어요
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      SentiStock 프리미엄을 구독하면 감정 추세 히스토리와
                      즐겨찾기 확장, 매수 알림 기능을 모두 사용할 수 있어요.
                    </p>
                  </div>

                  <p className="mb-4 text-xs text-gray-400">
                    구독은 언제든 해지할 수 있고, 해지하더라도 남은 기간 동안은
                    <br />
                    프리미엄기능을 계속 이용할 수 있어요.
                  </p>

                  <p className="text-xs text-gray-400">
                    지금 프리미엄 구독을 시작해 보세요.
                  </p>
                </div>

                <aside className="self-start">
                  <SubscriptionCard onSubscribed={() => loadSubscription(false)} />
                </aside>
              </div>
            </section>
          )}
        </div>
      </div>

      {isPaymentModalOpen && isSubscribed && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsPaymentModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">결제 수단 관리</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    구독에 사용될 결제 수단을 선택하거나 변경할 수 있어요.
                  </p>
                </div>
                <button
                  className="text-xl leading-none text-gray-400 hover:text-gray-600"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  ×
                </button>
              </div>

              <p className="text-xs text-gray-400">
                결제 시스템은 추후 연동 예정입니다.
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
