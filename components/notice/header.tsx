"use client"

import { Bell, User } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-[rgb(225,231,240)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[rgb(0,73,150)] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-bold text-xl text-[rgb(0,73,150)]">sentistock</span>
          </div>

          {/* 네비게이션 */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-[rgb(6,31,91)]">
            <a href="#" className="hover:text-[rgb(80,185,228)] transition">
              회사소개
            </a>
            <a href="#" className="hover:text-[rgb(80,185,228)] transition">
              공지사항
            </a>
            <a href="#" className="hover:text-[rgb(80,185,228)] transition">
              고객센터
            </a>
            <a href="#" className="hover:text-[rgb(80,185,228)] transition">
              자주 묻는 질문
            </a>
          </nav>

          {/* 아이콘 */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell size={24} className="text-[rgb(80,185,228)] cursor-pointer" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
            </div>
            <User size={24} className="text-[rgb(6,31,91)] cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  )
}
