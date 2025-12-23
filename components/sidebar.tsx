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
  { label: "즐겨찾기 목록", href: "/favorites" },
  { label: "매수 종목 리스트", href: "/stock-list" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  // 모든 메뉴 모아서 가장 긴 prefix 매칭되는 걸 active로
  const allItems = [...myPageItems, ...assetItems]

  const activeHref =
    allItems
      .filter(item => {
        if (pathname === item.href) return true
        return pathname.startsWith(item.href + "/")
      })
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null

  const isActive = (href: string) => href === activeHref

  // 공통 링크 스타일 함수
  const itemClass = (href: string) =>
    clsx(
      "block w-full rounded-lg px-3 py-2 text-sm text-center transition-colors",
      isActive(href)
        ? "bg-gray-900 text-white font-medium"
        : "text-gray-700 hover:bg-gray-50"
    )

  return (
    <>
     
      <aside className="">
        <div className="flex w-64 flex-col items-center rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
          {/* 프로필 영역 */}
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              <Image
                src="/placeholder-user.jpg" // 실제 프로필 이미지 경로로 교체 가능
                alt="프로필 이미지"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="mt-4 text-sm font-medium text-gray-800">
              admin 님
            </span>
          </div>

          {/* 마이페이지 메뉴 */}
          <nav className="w-full space-y-6 text-sm">
            <div>
              <div className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400">
                마이페이지
              </div>
              <div className="space-y-1">
                {myPageItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={itemClass(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 자산 / 관심 메뉴 */}
            <div className="border-t border-gray-200 pt-4">
              <div className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400">
                자산 / 관심
              </div>
              <div className="space-y-1">
                {assetItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={itemClass(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* 회원탈퇴 버튼 (맨 아래 쪽 배치) */}
          <button
            onClick={() => setOpenDeleteModal(true)}
            className="mt-10 text-xs text-gray-400 hover:text-red-500"
            type="button"
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
