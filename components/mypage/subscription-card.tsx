"use client"

import { useState } from "react"
import { TermsDialog } from "@/components/mypage/terms-dialog"

type Step = 1 | 2 | 3 | null
type PaymentMethod = "CARD"

type CardField = "cardNumber" | "cardExpiry" | "cardBirth" | "cardPassword"
type CardErrors = Partial<Record<CardField, string>>

// --------------------
// 유효성 검사 함수들
// --------------------
const isValidCardNumber = (value: string) => {
  const onlyDigits = value.replace(/\s/g, "")
  return /^\d{16}$/.test(onlyDigits)
}

const isValidExpiry = (value: string) => {
  // MM/YY, 월은 01~12
  return /^((0[1-9])|(1[0-2]))\/\d{2}$/.test(value)
}

const isValidBirth = (value: string) => {
  // YYMMDD 6자리 숫자
  return /^\d{6}$/.test(value)
}

const isValidPassword = (value: string) => {
  // 앞 2자리 숫자
  return /^\d{2}$/.test(value)
}

// --------------------
// 유효기간 입력 포맷 (자동 "/" + 월 01~12 제한)
// --------------------
const formatExpiryInput = (raw: string, prev: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 4)

  // 사용자가 "09/" 상태에서 "/"만 백스페이스로 지우려는 경우
  // (안 막아주면 다시 "/"가 붙어서 UX 빡침)
  if (prev.length === 3 && prev.endsWith("/") && raw.length === 2 && digits.length === 2) {
    return digits // "09"
  }

  if (digits.length === 0) return ""
  if (digits.length === 1) return digits

  // 월 2자리 확보되면: 01~12로 강제 보정
  let mm = digits.slice(0, 2)
  const mmNum = Number(mm)

  if (!Number.isFinite(mmNum)) return ""

  // 00 -> 01, 13~99 -> 12
  if (mmNum === 0) mm = "01"
  else if (mmNum > 12) mm = "12"

  // 2자리면 자동 "/"
  if (digits.length === 2) return `${mm}/`

  // 3~4자리면 MM/YY
  const yy = digits.slice(2)
  return `${mm}/${yy}`
}

export default function SubscriptionCard() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>(null)

  // 약관 동의 상태(자동 체크 대상)
  const [agree, setAgree] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  // 에러 상태들
  const [agreeError, setAgreeError] = useState<string | null>(null)
  const [cardErrors, setCardErrors] = useState<CardErrors>({})

  // 카드만 사용
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardBirth, setCardBirth] = useState("")
  const [cardPassword, setCardPassword] = useState("")

  const resetPaymentInputs = () => {
    setPaymentMethod("CARD")
    setCardNumber("")
    setCardExpiry("")
    setCardBirth("")
    setCardPassword("")
    setCardErrors({})
  }

  const handleOpen = () => {
    setOpen(true)
    setStep(1)
    setAgree(false)
    setTermsOpen(false)
    setAgreeError(null)
    resetPaymentInputs()
  }

  const handleClose = () => {
    setOpen(false)
    setStep(null)
    setAgree(false)
    setTermsOpen(false)
    setAgreeError(null)
    resetPaymentInputs()
  }

  const inputBase =
    "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-0"
  const inputClass = (hasError: boolean) =>
    hasError
      ? `${inputBase} border-red-400 focus:border-red-500`
      : `${inputBase} border-gray-200 focus:border-blue-500`

  const clearCardError = (key: CardField) => {
    setCardErrors(prev => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  // Step2 카드 유효성 검증(에러 객체 반환)
  const validateCard = (): CardErrors => {
    const errors: CardErrors = {}

    if (!cardNumber) errors.cardNumber = "카드 번호를 입력해주세요."
    else if (!isValidCardNumber(cardNumber))
      errors.cardNumber = "카드 번호는 16자리 숫자여야 해요."

    if (!cardExpiry) errors.cardExpiry = "유효기간을 입력해주세요."
    else if (!isValidExpiry(cardExpiry))
      errors.cardExpiry = "유효기간은 MM/YY 형식이어야 해요. (예: 09/27)"

    if (!cardBirth) errors.cardBirth = "생년월일 6자리를 입력해주세요."
    else if (!isValidBirth(cardBirth))
      errors.cardBirth = "생년월일은 6자리 숫자여야 해요. (예: 990101)"

    if (!cardPassword) errors.cardPassword = "비밀번호 앞 2자리를 입력해주세요."
    else if (!isValidPassword(cardPassword))
      errors.cardPassword = "비밀번호 앞 2자리는 숫자 2자리여야 해요."

    return errors
  }

  // STEP1 → STEP2
  const handleNextFromStep1 = () => {
    if (!agree) {
      setAgreeError("이용약관을 끝까지 확인하고 동의해주세요.")
      return
    }
    setAgreeError(null)
    setStep(2)
  }

  // STEP2 → STEP3
  const handleNextFromStep2 = () => {
    const errors = validateCard()
    if (Object.keys(errors).length > 0) {
      setCardErrors(errors)
      return
    }

    setCardErrors({})
    setStep(3)
  }

  // 최종 구독 시작
  const handleConfirm = () => {
    alert("구독 신청이 완료되었다고 가정하는 자리입니다. 나중에 PG 연동!")
    handleClose()
  }

  return (
    <>
      {/* 오른쪽에 보이는 구독 카드 */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="mb-1 text-lg font-semibold">SentiStock 프리미엄</h3>
        <p className="mb-4 text-xs font-medium text-blue-600">
          감정 기반 투자 인사이트를 풀로 활용해보세요.
        </p>

        <div className="mb-4">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">월 1,900원</span>
            <span className="mb-1 text-xs text-gray-500">첫 달 100원 체험</span>
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
            <li>• 감정 추세 히스토리 전체 열람</li>
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
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          onClick={handleOpen}
        >
          첫 달 100원으로 시작하기
        </button>

        <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
          첫 달 이후 해지하지 않으면 매월 1,900원이
          <br />
          자동 결제돼요.
          <br />
          결제 예정일 1주 전에 알림을 보내드릴 예정입니다.
        </p>
      </div>

      {/* 약관 모달 */}
      <TermsDialog
        open={termsOpen}
        onOpenChange={setTermsOpen}
        onAgree={() => {
          setAgree(true)
          setAgreeError(null)
        }}
      />

      {/* 구독 모달 */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={handleClose} />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
                <span>
                  {step === 1 && "1/3 요금제 및 약관"}
                  {step === 2 && "2/3 결제 수단 입력"}
                  {step === 3 && "3/3 신청 내용 확인"}
                </span>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">프리미엄 구독 시작</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        첫 달 100원으로 SentiStock 프리미엄을 이용해보세요.
                      </p>
                    </div>
                    <button
                      className="text-xl leading-none text-gray-400 hover:text-gray-600"
                      onClick={handleClose}
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4 space-y-1 rounded-lg bg-gray-50 p-4 text-sm text-gray-800">
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
                    <div className="flex items-start gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-blue-600"
                        checked={agree}
                        readOnly
                      />
                      <div>
                        <div>
                          자동 결제 및{" "}
                          <button
                            type="button"
                            className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
                            onClick={() => setTermsOpen(true)}
                          >
                            이용약관
                          </button>
                          에 동의합니다.
                        </div>

                        {agreeError && (
                          <p className="mt-1 text-[11px] text-red-500">{agreeError}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 rounded-lg border py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={handleClose}
                    >
                      취소
                    </button>
                    <button
                      className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                      onClick={handleNextFromStep1}
                    >
                      다음
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">결제 수단 입력</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        프리미엄 구독에 사용할 결제 수단을 등록해주세요.
                      </p>
                    </div>
                    <button
                      className="text-xl leading-none text-gray-400 hover:text-gray-600"
                      onClick={handleClose}
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4 flex justify-start text-xs">
                    <div className="inline-flex w-fit justify-start rounded-full border border-blue-500 bg-blue-50 px-4 py-2 font-medium text-blue-700">
                      신용/체크카드
                    </div>
                  </div>

                  <div className="mb-4 space-y-3 text-sm">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">카드 번호</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => {
                          setCardNumber(e.target.value)
                          clearCardError("cardNumber")
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        inputMode="numeric"
                        className={inputClass(!!cardErrors.cardNumber)}
                      />
                      {cardErrors.cardNumber && (
                        <p className="mt-1 text-[11px] text-red-500">
                          {cardErrors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-500">
                          유효기간 (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => {
                            const next = formatExpiryInput(e.target.value, cardExpiry)
                            setCardExpiry(next)
                            clearCardError("cardExpiry")
                          }}
                          placeholder="09/27"
                          maxLength={5}
                          inputMode="numeric"
                          className={inputClass(!!cardErrors.cardExpiry)}
                        />
                        {cardErrors.cardExpiry && (
                          <p className="mt-1 text-[11px] text-red-500">
                            {cardErrors.cardExpiry}
                          </p>
                        )}
                      </div>

                      <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-500">
                          생년월일 6자리
                        </label>
                        <input
                          type="text"
                          value={cardBirth}
                          onChange={e => {
                            setCardBirth(e.target.value)
                            clearCardError("cardBirth")
                          }}
                          placeholder="990101"
                          maxLength={6}
                          inputMode="numeric"
                          className={inputClass(!!cardErrors.cardBirth)}
                        />
                        {cardErrors.cardBirth && (
                          <p className="mt-1 text-[11px] text-red-500">
                            {cardErrors.cardBirth}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-1/2">
                      <label className="mb-1 block text-xs text-gray-500">
                        카드 비밀번호 앞 2자리
                      </label>
                      <input
                        type="password"
                        value={cardPassword}
                        onChange={e => {
                          setCardPassword(e.target.value)
                          clearCardError("cardPassword")
                        }}
                        placeholder="**"
                        maxLength={2}
                        inputMode="numeric"
                        className={inputClass(!!cardErrors.cardPassword)}
                      />
                      {cardErrors.cardPassword && (
                        <p className="mt-1 text-[11px] text-red-500">
                          {cardErrors.cardPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 rounded-lg border py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setStep(1)}
                    >
                      이전
                    </button>
                    <button
                      className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                      onClick={handleNextFromStep2}
                    >
                      다음
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">신청 내용 확인</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        아래 내용을 확인한 뒤 구독을 시작할 수 있어요.
                      </p>
                    </div>
                    <button
                      className="text-xl leading-none text-gray-400 hover:text-gray-600"
                      onClick={handleClose}
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4 space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                    <p>
                      <span className="font-semibold">요금제:</span> SentiStock 프리미엄
                      (월 1,900원, 첫 달 100원)
                    </p>
                    <p>
                      <span className="font-semibold">결제 수단:</span>{" "}
                      {paymentMethod === "CARD" ? "신용/체크카드" : "기타"}
                    </p>
                    <p className="text-xs text-gray-600">카드 번호: {cardNumber}</p>
                    <p className="text-xs text-gray-500">
                      첫 달은 100원으로 결제되며, 이후 매월 1,900원이 자동 결제됩니다.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 rounded-lg border py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setStep(2)}
                    >
                      이전
                    </button>
                    <button
                      className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
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
