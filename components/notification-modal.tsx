"use client"

import { useState } from "react"

interface NotificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMarkAllRead: () => void
}

type Notification = {
  type: string
  message: string
  date: string
  isNew: boolean
}

export function NotificationModal({
  open,
  onOpenChange,
  onMarkAllRead,
}: NotificationModalProps) {
  const [activeTab, setActiveTab] = useState<"전체" | "매수" | "매도">("전체")


  const initialNotifications: Notification[] = [
    {
      type: "알림1",
      message: "종목 삼성 매수하세요.....................",
      date: "2025.12.11 14:23",
      isNew: true,
    },
    {
      type: "알림2",
      message: "종목 삼성 매수하세요.....................",
      date: "2025.12.11 14:23",
      isNew: false,
    },
  ]


  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications)

  if (!open) return null


  const handleClickNotification = (index: number) => {
    setNotifications((prev) =>
      prev.map((n, i) => (i === index ? { ...n, isNew: false } : n)),
    )
  }


  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed top-16 right-6 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">알림</h3>
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            모두 읽음 처리
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {(["전체", "매수", "매도"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm ${
                activeTab === tab
                  ? "text-red-500 border-b-2 border-red-500 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div
              key={index}
              onClick={() => handleClickNotification(index)} 
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                notification.isNew ? "bg-red-50" : ""
              }`}
            >
              <div className="flex items-start gap-2">
                {/* 새 알림일 때만 빨간 점, 아니면 투명 */}
                <span
                  className={
                    "mt-1 text-xs font-semibold w-2 text-center " +
                    (notification.isNew ? "text-red-500" : "text-transparent")
                  }
                >
                  •
                </span>

                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {notification.type}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </div>
                  <div className="text-xs text-gray-400">
                    {notification.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )

