"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, User } from "lucide-react"
import { NotificationModal } from "./notification-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="SentiStock Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            회사소개
          </Link>
          <Link href="/notice" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            공지사항
          </Link>
          <Link href="/customer-center" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            고객센터
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            자주 묻는 질문
          </Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-4 ml-7">
          {/* 알림 버튼 */}
          <button
            onClick={() => {
              console.log("[header] notification bell clicked")
              setShowNotifications(true)   // 모달 열기
              setHasUnread(false)          // 클릭과 동시에 읽음 처리 → 빨간 점 제거
            }}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6 text-gray-900" />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* 유저 드롭다운 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-6 h-6 text-gray-900" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b">OOO 님</div>

              <DropdownMenuItem asChild>
                <Link href="/my-page" className="cursor-pointer">
                  마이페이지
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/favorites" className="cursor-pointer">
                  즐겨찾기 목록
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 알림 모달 */}
      <NotificationModal
        open={showNotifications}
        onOpenChange={setShowNotifications}
        onMarkAllRead={() => setHasUnread(false)}   // 모달 안 "모두 읽음 처리"도 dot 제거
      />
    </header>
  )
}