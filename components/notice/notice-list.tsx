"use client"

import Link from "next/link"

interface Notice {
  id: number
  category: string
  title: string
  date: string
}

interface NoticeListProps {
  notices: Notice[]
}

export default function NoticeList({ notices }: NoticeListProps) {
  return (
    <div className="space-y-0 border border-[rgb(225,231,240)] rounded-lg overflow-hidden">
      {notices.map((notice, index) => (
        <Link key={notice.id} href={`/notice/${notice.id}`}>
          <div
            className={`flex items-center justify-between p-4 hover:bg-[rgb(245,250,255)] transition cursor-pointer ${
              index !== notices.length - 1 ? "border-b border-[rgb(225,231,240)]" : ""
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-[rgb(80,185,228)] text-sm font-medium shrink-0">{notice.category}</span>
              <h3 className="text-[rgb(6,31,91)] font-medium text-sm md:text-base">{notice.title}</h3>
            </div>
            <span className="text-[rgb(150,160,180)] text-sm whitespace-nowrap ml-4">{notice.date}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
