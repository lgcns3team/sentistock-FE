// app/my-page/notifications/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

export default function NotificationSettingsPage() {
  return (
    // Header/Sidebar는 레이아웃에서 이미 렌더링 중
    // 여기서는 오른쪽 컨텐츠 영역만 그리면 됨
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

        {/* Section 2: 감정 점수 알림 */}
        <section className="space-y-6">
          <h3 className="text-sm font-semibold">
            관심 종목의 감정 점수 변화 알림
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox id="score-up" />
              <span>감정 점수 급등 시 알림</span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox id="score-down" />
              <span>감정 점수 급락 시 알림</span>
            </label>
          </div>

          <div className="max-w-xs space-y-1">
            <Label className="block text-sm font-medium">변동 임계값 (%)</Label>
            <Input type="number" defaultValue="10" />
            <p className="text-xs text-gray-500">
              설정한 만큼 감정 점수가 변하면 알림을 보내요.
            </p>
          </div>
        </section>

        {/* Section 3: 가격 변화 + 뉴스 알림 */}
        <section className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-8">
          {/* 가격 변동 알림 */}
          <div>
            <Label className="text-sm font-medium">가격 변동 알림</Label>
            <p className="text-sm text-gray-500">
              일일 변동률이 임계값을 넘으면 알려줘요.
            </p>

            <div className="mt-3 max-w-xs">
              <Label className="mb-1 block text-sm font-medium">
                일일 변동률 임계값 (%)
              </Label>
              <Input type="number" defaultValue="5" />
            </div>
          </div>
          <div className="flex h-full items-start justify-end pt-1">
            <Switch />
          </div>

          {/* 뉴스 요약 알림 */}
          <div>
            <Label className="text-sm font-medium">뉴스 요약 알림</Label>
            <p className="text-sm text-gray-500">
              새로운 뉴스 요약이 추가되면 알려줘요.
            </p>
          </div>
          <div className="flex h-full items-center justify-end">
            <Switch />
          </div>
        </section>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-3 pt-6">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            초기화
          </Button>
          <Button className="bg-[#172B4D] text-white hover:bg-[#0f1f35]">
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
