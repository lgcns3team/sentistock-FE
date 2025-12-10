"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2l3 6h6l-4.5 3.5 1.5 6-5-3.5-5 3.5 1.5-6-4.5-3.5h6l3-6z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-blue-600">sentistock</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            회사소개
          </a>
          <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            공지사항
          </a>
          <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            고객센터
          </a>
          <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            자주 묻는 질문
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
