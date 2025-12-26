"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, User, Menu, X } from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="relative bg-white border-b border-gray-200">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative z-50">
        {/* Logo */}
        <Link href="/main-page">
          <Image
            src="/logo.png"
            alt="SentiStock Logo"
            width={150}
            height={150}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          <Link href="/service-info" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            회사소개
          </Link>
          <Link href="/notice" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            공지사항
          </Link>
          <Link href="/customer-center" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            고객센터
          </Link>
          <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            자주 묻는 질문
          </Link>
          <Link href="/main-page" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            커뮤니티
          </Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4 ml-6">
          {/* 모바일 햄버거 */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* 알림 */}
          <button
            onClick={() => {
              setShowNotifications(true)
              setHasUnread(false)
            }}
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <Bell className="w-6 h-6" />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* 유저 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 text-sm font-medium border-b">
                admin 님
              </div>
              <DropdownMenuItem asChild>
                <Link href="/my-page">마이페이지</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/favorites">즐겨찾기 목록</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>로그아웃</DropdownMenuItem>
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
          </nav>
        </div>
      )}

      {/* 알림 모달 */}
      <NotificationModal
        open={showNotifications}
        onOpenChange={setShowNotifications}
        onMarkAllRead={() => setHasUnread(false)}
      />
    </header>
  )
}
