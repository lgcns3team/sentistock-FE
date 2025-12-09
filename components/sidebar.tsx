"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteAccountModal } from "@/components/delete-account-modal"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <>
      <aside className="w-64 border-r border-gray-200 p-6">
        {/* User Profile */}
        <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <span className="text-sm text-gray-900 font-medium">admin 님</span>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          <Link
            href="/my-page"
            className={`block px-4 py-2 text-sm rounded transition-colors ${
              pathname === "/my-page" ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            회원정보 조회
          </Link>
          <Link
            href="/my-page/edit"
            className={`block px-4 py-2 text-sm rounded transition-colors ${
              pathname === "/my-page/edit" ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            회원정보 수정
          </Link>
          <Link
            href="/favorites"
            className={`block px-4 py-2 text-sm rounded transition-colors ${
              pathname === "/favorites" ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            즐겨찾기 목록
          </Link>
          <Link
            href="/stock-list"
            className={`block px-4 py-2 text-sm rounded transition-colors ${
              pathname === "/stock-list" ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            매수 종목 리스트
          </Link>
        </nav>

        {/* Delete Account Button */}
        <div className="mt-auto pt-8">
          <Button
            variant="ghost"
            onClick={() => setShowDeleteModal(true)}
            className="w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            회원탈퇴
          </Button>
        </div>
      </aside>

      <DeleteAccountModal open={showDeleteModal} onOpenChange={setShowDeleteModal} />
    </>
  )
}
