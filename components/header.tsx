"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, User, Menu, X } from "lucide-react"
import { NotificationModal } from "./notification-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function safeDecodeJwtPayload(token: string): any | null {
  try {
    const base64Url = token.split(".")[1]
    if (!base64Url) return null

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )

    return JSON.parse(jsonPayload)
  } catch (err) {
    console.error("토큰 파싱 실패", err)
    return null
  }
}

export default function Header() {
  const router = useRouter()

  const [showNotifications, setShowNotifications] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [nickname, setNickname] = useState("")

  const syncNickname = () => {
    if (typeof window === "undefined") return

    const saved = localStorage.getItem("profileNickname")
    if (saved && saved.trim()) {
      setNickname(saved)
      return
    }

    const token = localStorage.getItem("accessToken")
    if (!token) {
      setNickname("")
      return
    }

    const payload = safeDecodeJwtPayload(token)
    const nick =
      payload?.nickname ??
      payload?.nickName ??
      payload?.name ??
      payload?.username ??
      payload?.userName ??
      ""

    setNickname(nick)
  }

  useEffect(() => {
    syncNickname()
    window.addEventListener("profile-updated", syncNickname)
    window.addEventListener("storage", syncNickname)

    return () => {
      window.removeEventListener("profile-updated", syncNickname)
      window.removeEventListener("storage", syncNickname)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("profileNickname")
    window.dispatchEvent(new Event("profile-updated"))

    alert("로그아웃되었습니다.")
    router.replace("/") // 첫번째 페이지로 이동
  }

  return (
    <header className="relative bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative z-50">
        <Link href="/main-page">
          <Image
            src="/logo.png"
            alt="SentiStock Logo"
            width={150}
            height={150}
            className="object-contain cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 ml-auto">
          <Link
            href="/service-info"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            회사소개
          </Link>
          <Link
            href="/notice"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            공지사항
          </Link>
          <Link
            href="/customer-center"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            고객센터
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            자주 묻는 질문
          </Link>
          <Link
            href="/community"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            커뮤니티
          </Link>
        </nav>

        <div className="flex items-center gap-4 ml-6">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            type="button"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowNotifications((prev) => !prev)
            }}
            className="relative p-2 hover:bg-gray-100 rounded-full"
            type="button"
          >
            <Bell className="w-6 h-6" />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full" type="button">
                <User className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 text-sm font-medium border-b">
                {nickname ? `${nickname} 님` : "사용자 님"}
              </div>

              <DropdownMenuItem asChild>
                <Link href="/my-page">마이페이지</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/my-page/favorites">즐겨찾기 목록</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 w-full h-screen bg-black/40 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-screen bg-white shadow-lg z-50">
          <nav className="flex flex-col divide-y">
            <Link
              href="/service-info"
              className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              회사소개
            </Link>
            <Link
              href="/notice"
              className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              공지사항
            </Link>
            <Link
              href="/customer-center"
              className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              고객센터
            </Link>
            <Link
              href="/faq"
              className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              자주 묻는 질문
            </Link>
            <Link
              href="/community"
              className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              커뮤니티
            </Link>
          </nav>
        </div>
      )}

      <NotificationModal
        open={showNotifications}
        onOpenChange={setShowNotifications}
        onMarkAllRead={() => setHasUnread(false)}
        onUnreadChange={setHasUnread}
      />
    </header>
  )
}
