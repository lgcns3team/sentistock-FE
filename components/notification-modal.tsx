"use client"

import { useEffect, useMemo, useState } from "react"

interface NotificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMarkAllRead: () => void
  onUnreadChange: (hasUnread: boolean) => void
}

type ApiNotification = {
  id: number
  content: string
  type: string
  companyId: string
  date: string
  check: boolean
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d)
}

function typeToTab(type: string) {
  const t = (type ?? "").toUpperCase()
  //if (t === "BUY") return "매수"
  if (t === "SELL") return "매도"
  if (t === "WARNING") return "경고"
  if (t === "INTEREST") return "즐겨찾기" // 이름 변경 가능
  return "전체"
}

export function NotificationModal({ 
  open, onOpenChange, onMarkAllRead, onUnreadChange
 }: NotificationModalProps) {
  const [activeTab, setActiveTab] = useState<"전체" | "매수" | "매도" | "경고" | "즐겨찾기">("전체")
  const [notifications, setNotifications] = useState<ApiNotification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    
    if (!open) return

    let ignore = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${BASE_URL}/notifications`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`GET /api/notifications failed: ${res.status}`)

        const data: ApiNotification[] = await res.json()
        if (ignore) return

        setNotifications(
          [...data].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
        )
      } catch (e: any) {
        if (!ignore) setError(e?.message ?? "알림을 불러오지 못했어요.")
      } finally {
        if (!ignore) setLoading(false)
      }
    })()

    return () => {
      ignore = true
    }
  }, [open])

  useEffect(() => {
    const hasUnread = notifications.some((n) => !n.check)
    onUnreadChange(hasUnread)
  }, [notifications, onUnreadChange])

  const filtered = useMemo(() => {
    if (activeTab === "전체") return notifications
    return notifications.filter((n) => typeToTab(n.type) === activeTab)
  }, [notifications, activeTab])
  if (!open) return null


  const patchCheck = async (id: number) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/notifications/${id}/check`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(`PATCH check failed: ${res.status}`)
  }

  const handleClickNotification = async (id: number) => {
    const target = notifications.find((n) => n.id === id)
    if (!target || target.check) return
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, check: true } : n)))

    try {
      await patchCheck(id)
    } catch (e) {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, check: false } : n)))
    }
  }

  const handleMarkAllRead = async () => {
    const unreadIds = notifications.filter((n) => !n.check).map((n) => n.id)
    if (unreadIds.length === 0) {
      onMarkAllRead()
      return
    }

    setNotifications((prev) => prev.map((n) => ({ ...n, check: true })))
    onMarkAllRead()

    try {
      await Promise.all(unreadIds.map((id) => patchCheck(id)))
    } catch (e) {
      try {
        const res = await fetch("/api/notifications", { cache: "no-store" })
        if (res.ok) {
          const data: ApiNotification[] = await res.json()
          setNotifications([...data].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)))
        }
      } catch {}
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={() => onOpenChange(false)} />

      <div className="fixed top-16 right-6 w-97 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">알림</h3>
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
            disabled={loading}
          >
            모두 읽음 처리
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {(["전체", "매수", "매도", "경고", "즐겨찾기"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-[13px] ${
                activeTab === tab
                  ? "text-red-500 border-b-2 border-red-500 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading && <div className="p-4 text-sm text-gray-500">불러오는 중…</div>}
          {error && <div className="p-4 text-sm text-red-500">{error}</div>}

          {!loading && !error && filtered.length === 0 && (
            <div className="p-4 text-sm text-gray-500">알림이 없어요.</div>
          )}

          {filtered.map((n) => {
            const isNew = !n.check
            return (
              <div
                key={n.id}
                onClick={() => handleClickNotification(n.id)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  isNew ? "bg-red-50" : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={
                      "mt-1 text-xs font-semibold w-2 text-center " +
                      (isNew ? "text-red-500" : "text-transparent")
                    }
                  >
                    •
                  </span>

                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">{n.type}</div>
                    <div className="text-sm text-gray-600 mb-2">{n.content}</div>
                    <div className="text-xs text-gray-400">{formatDate(n.date)}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}