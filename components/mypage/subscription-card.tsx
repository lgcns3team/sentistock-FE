"use client"

import { useState } from "react"

type Step = 1 | 2 | 3 | null
type PaymentMethod = "CARD" | "KAKAOPAY" | "NAVERPAY"

export default function SubscriptionCard() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>(null)

  const [agree, setAgree] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardBirth, setCardBirth] = useState("")
  const [cardPassword, setCardPassword] = useState("")

  const handleOpen = () => {
    setOpen(true)
    setStep(1)
    setAgree(false)
  }

  const handleClose = () => {
    setOpen(false)
    setStep(null)
    setAgree(false)
    setPaymentMethod("CARD")
    setCardNumber("")
    setCardExpiry("")
    setCardBirth("")
    setCardPassword("")
  }

  // STEP1 → STEP2
  const handleNextFromStep1 = () => {
    if (!agree) {
      alert("자동 결제 및 이용 약관에 동의해주세요.")
      return
    }
    setStep(2)
  }

  // STEP2 → STEP3
  const handleNextFromStep2 = () => {
    if (paymentMethod === "CARD") {
      if (!cardNumber || !cardExpiry || !cardBirth || !cardPassword) {
        alert("카드 정보를 모두 입력해주세요.")
        return
      }
    }
    // 간편결제는 아직 더미라서 바로 넘어가도 됨
    setStep(3)
  }

  // 최종 구독 시작
  const handleConfirm = () => {
    // TODO: 실제 구독/결제 API 호출 위치
    alert("구독 신청이 완료되었다고 가정하는 자리입니다. 나중에 PG 연동!")

    handleClose()
  }

  return (
    <>
      {/* 오른쪽에 보이는 구독 카드 */}
      <div className="border rounded-xl p-5 shadow-sm bg-white">
        <h3 className="text-lg font-semibold mb-1">SentiStock 프리미엄</h3>
        <p className="text-xs text-blue-600 font-medium mb-4">
          감정 기반 투자 인사이트를 풀로 활용해보세요.
        </p>

        <div className="mb-4">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">월 1,900원</span>
            <span className="text-xs text-gray-500 mb-1">첫 달 100원 체험</span>
          </div>
          <div className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1">
            <span className="text-xs font-semibold text-blue-600">
              첫 달 100원으로 시작하기
            </span>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-xs font-semibold text-gray-500">구독 시 제공 기능</p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• 감정 추세 히스토리 전체 열람 </li>
            <li>• 즐겨찾기 종목 수 무제한</li>
            <li>• 즐겨찾기 종목 매수 알림 기능</li>
          </ul>
        </div>

        <div className="mb-4 rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-600">
            갱신 주기: <span className="font-semibold">1개월 자동 결제</span>
          </p>
        </div>

        <button
          className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          onClick={handleOpen}
        >
          첫 달 100원으로 시작하기
        </button>

        <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
          첫 달 이후 해지하지 않으면 매월 1,900원이 자동 결제돼요.
          <br />
          결제 예정일 1주 전에 알림을 보내드릴 예정입니다.
        </p>
      </div>

      {/* 모달 영역 */}
      {open && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              {/* STEP 표시 (작게) */}
              <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
                <span>
                  {step === 1 && "1/3 요금제 및 약관"}
                  {step === 2 && "2/3 결제 수단 입력"}
                  {step === 3 && "3/3 신청 내용 확인"}
                </span>
              </div>

              {/* STEP 1 – 요금제 & 약관 */}
              {step === 1 && (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">프리미엄 구독 시작</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        첫 달 100원으로 SentiStock 프리미엄을 이용해보세요.
                      </p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                      onClick={handleClose}
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-800 space-y-1">
                    <p>
                      <span className="font-semibold">요금제:</span> 월 1,900원{" "}
                      <span className="text-gray-500">(첫 달 100원)</span>
                    </p>
                    <p>
                      <span className="font-semibold">갱신 주기:</span> 1개월 자동 결제
                    </p>
                    <p className="text-xs text-gray-500">
                      첫 달 이후 해지하지 않으면 매월 1,900원이 자동 결제됩니다.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        className="mt-0.5"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                      <span>
                        자동 결제 및 이용 약관에 동의합니다.{" "}
                        <span className="text-gray-400">
                          (추후 약관 페이지로 연결 예정)
                        </span>
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-lg border text-sm text-gray-700 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      취소
                    </button>
                    <button
                      className="flex-1 py-2.5 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                      onClick={handleNextFromStep1}
                    >
                      다음
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2 – 결제 수단 입력 */}
              {step === 2 && (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">결제 수단 입력</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        프리미엄 구독에 사용할 결제 수단을 등록해주세요.
                      </p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                      onClick={handleClose}
                    >
                      ×
                    </button>
                  </div>

                  {/* 결제 수단 토글 */}
                  <div className="mb-4 flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("CARD")}
                      className={
                        "flex-1 rounded-full border px-3 py-2 " +
                        (paymentMethod === "CARD"
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50")
                      }
                    >
                      신용/체크카드
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("KAKAOPAY")}
                      className={
                        "flex-1 rounded-full border px-3 py-2 " +
                        (paymentMethod === "KAKAOPAY"
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50")
                      }
                    >
                      카카오페이
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("NAVERPAY")}
                      className={
                        "flex-1 rounded-full border px-3 py-2 " +
                        (paymentMethod === "NAVERPAY"
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50")
                      }
                    >
                      네이버페이
                    </button>
                  </div>

                  {/* 카드 정보 폼 (CARD 선택 시만) */}
                  {paymentMethod === "CARD" && (
                    <div className="space-y-3 mb-4 text-sm">
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          카드 번호
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="mb-1 block text-xs text-gray-500">
                            유효기간 (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="09/27"
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="mb-1 block text-xs text-gray-500">
                            생년월일 6자리
                          </label>
                          <input
                            type="text"
                            value={cardBirth}
                            onChange={(e) => setCardBirth(e.target.value)}
                            placeholder="990101"
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="w-1/2">
                        <label className="mb-1 block text-xs text-gray-500">
                          카드 비밀번호 앞 2자리
                        </label>
                        <input
                          type="password"
                          value={cardPassword}
                          onChange={(e) => setCardPassword(e.target.value)}
                          placeholder="**"
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* 간편결제 선택 시 안내 */}
                  {paymentMethod !== "CARD" && (
                    <p className="mb-4 text-xs text-gray-500">
                      실제 간편결제 연동은 추후 PG사 연동 시 구현될 예정입니다. 현재는 UI
                      데모 단계예요.
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-lg border text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setStep(1)}
                    >
                      이전
                    </button>
                    <button
                      className="flex-1 py-2.5 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                      onClick={handleNextFromStep2}
                    >
                      다음
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3 – 최종 확인 */}
              {step === 3 && (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">신청 내용 확인</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        아래 내용을 확인한 뒤 구독을 시작할 수 있어요.
                      </p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                      onClick={handleClose}
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4 rounded-lg bg-gray-50 p-4 text-sm space-y-2">
                    <p>
                      <span className="font-semibold">요금제:</span>{" "}
                      SentiStock 프리미엄 (월 1,900원, 첫 달 100원)
                    </p>
                    <p>
                      <span className="font-semibold">결제 수단:</span>{" "}
                      {paymentMethod === "CARD" && "신용/체크카드"}
                      {paymentMethod === "KAKAOPAY" && "카카오페이 (더미)"}
                      {paymentMethod === "NAVERPAY" && "네이버페이 (더미)"}
                    </p>
                    {paymentMethod === "CARD" && (
                      <p className="text-xs text-gray-600">
                        카드 번호: {cardNumber || "입력된 번호 사용"} (실제 결제는
                        연결되지 않습니다)
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      첫 달은 100원으로 결제되며, 이후 매월 1,900원이 자동 결제됩니다.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-lg border text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setStep(2)}
                    >
                      이전
                    </button>
                    <button
                      className="flex-1 py-2.5 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                      onClick={handleConfirm}
                    >
                      구독 시작하기
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

