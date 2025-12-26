"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import Image from "next/image"
import { DeleteAccountModal } from "@/components/mypage/delete-account-modal"

const myPageItems = [
  { label: "회원정보 조회", href: "/my-page" },
  { label: "회원정보 수정", href: "/my-page/edit" },
  { label: "알림 설정", href: "/my-page/notifications" },
  { label: "계정 보안", href: "/my-page/security" },
  { label: "구독 관리", href: "/my-page/subscription" },
]

const assetItems = [
  { label: "즐겨찾기 목록", href: "/my-page/favorites" },
  { label: "매수 종목 리스트", href: "/my-page/stock-list" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const allItems = [...myPageItems, ...assetItems]

  const activeHref =
    allItems
      .filter(item => {
        if (pathname === item.href) return true
        return pathname.startsWith(item.href + "/")
      })
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null

  const isActive = (href: string) => href === activeHref

  const itemClass = (href: string) =>
    clsx(
      "block w-full rounded-lg px-3 py-2 text-sm text-center transition-colors",
      isActive(href)
        ? "bg-gray-900 text-white font-medium"
        : "text-gray-700 hover:bg-gray-50"
    )

  return (
    <>
      {/* 여기서 aside 태그 제거: 폭은 바깥 레이아웃(asid)에서만 컨트롤 */}
      <div
        className={clsx(
          "h-full w-full",
          "rounded-2xl border border-gray-200 bg-white shadow-sm",
          "px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10",
          "overflow-y-auto"
        )}
      >
        {/* 프로필 영역 */}
        <div className="mb-6 flex flex-col items-center sm:mb-8">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100 sm:h-20 sm:w-20">
            <Image
              src="/placeholder-user.jpg"
              alt="프로필 이미지"
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="mt-3 text-sm font-medium text-gray-800 sm:mt-4">
            admin 님
          </span>
        </div>

        {/* 메뉴 */}
        <nav className="w-full space-y-5 text-sm sm:space-y-6">
          <div>
            <div className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400">
              마이페이지
            </div>
            <div className="space-y-1">
              {myPageItems.map(item => (
                <Link key={item.href} href={item.href} className={itemClass(item.href)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400">
              자산 / 관심
            </div>
            <div className="space-y-1">
              {assetItems.map(item => (
                <Link key={item.href} href={item.href} className={itemClass(item.href)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* 하단 */}
        <div className="mt-auto w-full pt-6">
          <button
            onClick={() => setOpenDeleteModal(true)}
            className="w-full text-center text-xs text-gray-400 hover:text-red-500"
            type="button"
          >
            회원탈퇴
          </button>
        </div>
      </div>

      <DeleteAccountModal open={openDeleteModal} onOpenChange={setOpenDeleteModal} />
    </>
  )
}
