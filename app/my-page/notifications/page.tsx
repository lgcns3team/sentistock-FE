// app/my-page/notifications/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function NotificationSettingsPage() {
  const router = useRouter()
  const SUBSCRIBE_PATH = "/my-page/subscription"

  // TODO: 나중에 API/세션에서 구독 여부 받아오기
  const isSubscriber = false // 잠그려면 false , 열려면 true
  const profitLocked = !isSubscriber

  const [emailOn, setEmailOn] = useState(false)
  const [webPushOn, setWebPushOn] = useState(false)
  const [profitOn, setProfitOn] = useState(false)
  const [threshold, setThreshold] = useState("3")

  const [savedOpen, setSavedOpen] = useState(false)
  const closeModal = () => setSavedOpen(false)

  useEffect(() => {
    if (!savedOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [savedOpen])

  const handleSave = () => {
    setSavedOpen(true)
  }

  const handleReset = () => {
    setEmailOn(false)
    setWebPushOn(false)
    setProfitOn(false)
    setThreshold("3")
  }

  const goSubscribe = () => {
    router.push(SUBSCRIBE_PATH)
  }

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value

    // 지우는 입력은 허용
    if (raw === "") {
      setThreshold("")
      return
    }

    const num = Number(raw)
    if (Number.isNaN(num)) return

    // 음수 방지
    setThreshold(String(Math.max(0, num)))
  }

  const handleThresholdBlur = () => {
    if (threshold === "") setThreshold("5")
  }

  return (
    <div className="flex-1 px-10 py-8">
      <h2 className="mb-2 text-xl font-semibold">알림 설정</h2>
      <p className="mb-8 text-sm text-gray-500">
        SentiStock에서 받을 알림 옵션을 설정할 수 있어요.
      </p>

      <div className="max-w-4xl space-y-12">
        <section className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-8">
          <div>
            <Label className="text-sm font-medium">이메일 알림</Label>
            <p className="text-sm text-gray-500">
              서비스 업데이트 및 공지사항을 이메일로 받아요.
            </p>
          </div>
          <div className="flex h-full items-center justify-end">
            <Switch checked={emailOn} onCheckedChange={setEmailOn} />
          </div>

          <div>
            <Label className="text-sm font-medium">웹 푸시 알림</Label>
            <p className="text-sm text-gray-500">
              브라우저를 통해 중요한 알림을 받아요.
            </p>
          </div>
          <div className="flex h-full items-center justify-end">
            <Switch checked={webPushOn} onCheckedChange={setWebPushOn} />
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-8">
          <div>
            <div className={profitLocked ? "opacity-60" : ""}>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">손익률 알림</Label>
                {profitLocked && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    프리미엄 전용
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">
                평단가 기준 손익률이 임계값에 도달하면 알림을 보내요.
              </p>

              <div className="mt-3 max-w-xs">
                <Label className="mb-1 block text-sm font-medium">임계값 (%)</Label>
                <Input
                  type="number"
                  min={0}
                  value={threshold}
                  onChange={handleThresholdChange}
                  onBlur={handleThresholdBlur}
                  disabled={profitLocked}
                />
              </div>
            </div>

            {profitLocked && (
              <div className="mt-2 text-sm text-gray-500">
                프리미엄 구독자만 설정할 수 있어요.{" "}
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center rounded-md px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  onClick={goSubscribe}
                >
                  구독하러 가기
                </button>
              </div>
            )}
          </div>

          <div className="flex h-full items-start justify-end pt-1">
            <Switch
              checked={profitOn}
              onCheckedChange={setProfitOn}
              disabled={profitLocked}
            />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="outline"
            className="border-gray-300 bg-transparent"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            className="bg-[#172B4D] text-white hover:bg-[#0f1f35]"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </div>

      {savedOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={closeModal} />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold">저장되었습니다!</h3>
              <p className="mt-2 text-sm text-gray-500">
                알림 설정이 정상적으로 반영됐어요.
              </p>

              <div className="mt-5 flex justify-end">
                <Button
                  className="bg-[#172B4D] text-white hover:bg-[#0f1f35]"
                  onClick={closeModal}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
