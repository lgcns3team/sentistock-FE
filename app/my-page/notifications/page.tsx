// app/my-page/notifications/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function NotificationSettingsPage() {
  const [savedOpen, setSavedOpen] = useState(false)

  const closeModal = () => setSavedOpen(false)

  // ESC로 닫기
  useEffect(() => {
    if (!savedOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [savedOpen])

  const handleSave = () => {
    // TODO: 나중에 여기서 실제 저장 API 호출
    // await fetch("/api/notifications", { method: "POST", body: ... })

    setSavedOpen(true)
  }

  return (
    <div className="flex-1 px-10 py-8">
      <h2 className="mb-2 text-xl font-semibold">알림 설정</h2>
      <p className="mb-8 text-sm text-gray-500">
        SentiStock에서 받을 알림 옵션을 설정할 수 있어요.
      </p>

      <div className="max-w-4xl space-y-12">
        {/* Section 1: 일반 알림 */}
        <section className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-8">
          {/* 이메일 알림 */}
          <div>
            <Label className="text-sm font-medium">이메일 알림</Label>
            <p className="text-sm text-gray-500">
              서비스 업데이트 및 공지사항을 이메일로 받아요.
            </p>
          </div>
          <div className="flex h-full items-center justify-end">
            <Switch />
          </div>

          {/* 웹 푸시 알림 */}
          <div>
            <Label className="text-sm font-medium">웹 푸시 알림</Label>
            <p className="text-sm text-gray-500">
              브라우저를 통해 중요한 알림을 받아요.
            </p>
          </div>
          <div className="flex h-full items-center justify-end">
            <Switch />
          </div>
        </section>

        {/* 수익률 알림 */}
        <section className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-8">
          <div>
            <Label className="text-sm font-medium">수익률 알림</Label>
            <p className="text-sm text-gray-500">
              평단가 기준 수익률이 임계값에 도달하면 알림을 보내요.
            </p>

            <div className="mt-3 max-w-xs">
              <Label className="mb-1 block text-sm font-medium">임계값 (%)</Label>
              <Input type="number" defaultValue="5" />
            </div>
          </div>
          <div className="flex h-full items-start justify-end pt-1">
            <Switch />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-6">
          <Button variant="outline" className="border-gray-300 bg-transparent">
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

      {/* 저장 완료 모달 */}
      {savedOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={closeModal}
          />

          {/* modal */}
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
