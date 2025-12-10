"use client"

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
        <div
          key={notice.id}
          className={`flex items-center justify-between p-4 hover:bg-[rgb(245,250,255)] transition cursor-pointer ${
            index !== notices.length - 1 ? "border-b border-[rgb(225,231,240)]" : ""
          }`}
        >
          <div className="flex items-center gap-4 flex-1">
            <span className="text-[#5CB4E4] text-sm font-medium flex-shrink-0">{notice.category}</span>
            <h3 className="text-[rgb(6,31,91)] font-medium text-sm md:text-base">{notice.title}</h3>
          </div>
          <span className="text-[rgb(150,160,180)] text-sm whitespace-nowrap ml-4">{notice.date}</span>
        </div>
      ))}
    </div>
  )
}
