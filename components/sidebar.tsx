"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { DeleteAccountModal } from "@/components/delete-account-modal" // 모달 import
import Image from "next/image"


const myPageItems = [
  { label: "회원정보 조회", href: "/my-page" },
  { label: "회원정보 수정", href: "/my-page/edit" },
  { label: "알림 설정", href: "/my-page/notifications" },
  { label: "계정 보안", href: "/my-page/security" },
  { label: "구독 관리", href: "/my-page/subscription" }
  
]

const assetItems = [
  { label: "즐겨찾기 목록", href: "/favorites" },
  { label: "매수 종목 리스트", href: "/stock-list" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openDeleteModal, setOpenDeleteModal] = useState(false) // 회원탈퇴 모달 상태

  const allItems = [...myPageItems, ...assetItems]

  const activeHref =
    allItems
      .filter((item) => {
        if (pathname === item.href) return true
        return pathname.startsWith(item.href + "/")
      })
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null

  const isActive = (href: string) => href === activeHref

  return (
    <>
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col">
        {/* 프로필 영역 */}
       <div className="flex flex-col items-center py-10 border-b border-gray-200">
  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
    <Image
      src="/placeholder-user.jpg" // 실제 이미지 경로로 
      alt="프로필 이미지"
      width={80}
      height={80}
      className="w-full h-full object-cover"
    />
  </div>
  <span className="mt-4 text-sm text-gray-700 font-medium">admin 님</span>
</div>
        {/* 메뉴 영역 */}
        <nav className="flex-1 px-4 py-6 space-y-6 text-sm">
          {/* 마이페이지 그룹 */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-semibold text-gray-400 tracking-wide">
              마이페이지
            </div>
            <ul className="space-y-1">
              {myPageItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "block px-3 py-2 rounded-md",
                      "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      isActive(item.href) && "bg-gray-100 font-semibold text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 자산 / 관심 그룹 */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-semibold text-gray-400 tracking-wide">
              자산 / 관심
            </div>
            <ul className="space-y-1">
              {assetItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "block px-3 py-2 rounded-md",
                      "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      isActive(item.href) && "bg-gray-100 font-semibold text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* 회원탈퇴 모달 열기  */}
        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={() => setOpenDeleteModal(true)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            회원탈퇴
          </button>
        </div>
      </aside>

      {/* 회원탈퇴 모달 */}
      <DeleteAccountModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
      />
    </>
  )
}
