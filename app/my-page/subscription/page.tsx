"use client"

import { useState } from "react"
import SubscriptionCard from "@/components/mypage/subscription-card"

export default function SubscriptionManagementPage() {
  // TODO: 나중에 API로 실제 구독 정보 가져오기
  const subscription = {
    status: "ACTIVE" as "ACTIVE" | "NONE",
    planName: "SentiStock 프리미엄",
    price: 1900,
    firstMonthPrice: 100,
    renewInterval: "1개월",
    nextBillingDate: "2025-01-15",
    startedAt: "2024-12-15",
  }

  const isSubscribed = subscription.status === "ACTIVE"
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  return (
    <>
      {/* ✅ 알림 설정 / 계정 보안과 동일한 레이아웃 뼈대 */}
      <div className="flex-1 px-10 py-8">
        {/* 제목 영역 */}
        <header>
          <h2 className="mb-2 text-xl font-semibold">구독 관리</h2>
          <p className="mb-8 text-sm text-gray-500">
            SentiStock 프리미엄 구독 상태와 결제 정보를 관리할 수 있어요.
          </p>
        </header>

        {/* ✅ 공통 컨텐츠 래퍼: 너비/간격 통일 */}
        <div className="max-w-4xl space-y-12">
          {isSubscribed ? (
            /* ✅ 구독 중 화면 */
            <section>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                {/* 왼쪽: 구독 상태 카드 */}
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
                        감정 기반 투자 인사이트를 <br/>풀로 활용할 수 있는
                        월 구독 상품이에요.
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
                      <dd>{subscription.startedAt}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-gray-500">
                        다음 결제 예정일
                      </dt>
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

                  {/* 버튼 영역 */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsPaymentModalOpen(true)}
                    >
                      결제 수단 관리{" "}
                      <span className="text-xs text-gray-400"></span>
                    </button>

                    <button
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      type="button"
                      onClick={() => {
                        alert("구독 해지 플로우는 추후 연결 예정입니다.")
                      }}
                    >
                      구독 해지하기
                    </button>
                  </div>

                <p className="mt-4 text-xs leading-relaxed text-gray-400">
                  첫 달 이후 해지하지 않으면 매월{" "}
                   {subscription.price.toLocaleString()}원이 자동 결제돼요. <br/>
                   결제 예정일 1주 전에 알림을 드릴 예정입니다.
                    </p>

                </div>

                {/* 오른쪽에 추가 카드 필요하면 여기 */}
                {/* <div>...</div> */}
              </div>
            </section>
          ) : (
            /* 🚫 구독 안 한 화면 */
            <section>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
                {/* 왼쪽: 설명 섹션 */}
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
                    <br/> 
                    프리미엄기능을 계속 이용할 수 있어요.
                  </p>

                  <p className="text-xs text-gray-400">
                    지금 프리미엄 구독을 시작해 보세요.
                  </p>
                </div>

                {/* 오른쪽: 실제 구독 카드 컴포넌트 */}
                <aside className="self-start">
                  <SubscriptionCard />
                </aside>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* 결제 수단 관리 모달 (구독 중일 때만) */}
      {isPaymentModalOpen && isSubscribed && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsPaymentModalOpen(false)}
          />

          {/* 모달 박스 */}
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

              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="text-sm">
                    <p className="font-medium">신용카드 · 삼성카드</p>
                    <p className="text-xs text-gray-500">
                      **** **** **** 1234 · 09/27
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-600">
                    기본 결제 수단
                  </span>
                </div>

                <button
                  type="button"
                  className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    alert("결제 수단 추가 플로우는 추후 연동 예정입니다.")
                  }}
                >
                  + 새 결제 수단 등록
                </button>
              </div>

              <p className="mb-4 text-xs text-gray-400">
                결제 수단 변경은 다음 결제 시점부터 적용돼요. <br/>이미 결제된 금액은
                환불되지 않습니다.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  닫기
                </button>
                <button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  type="button"
                  onClick={() => {
                    alert("결제 수단 저장 API는 추후 연결 예정입니다.")
                    setIsPaymentModalOpen(false)
                  }}
                >
                  변경 내용 저장
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
