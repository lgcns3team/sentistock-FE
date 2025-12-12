"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = ["반도체", "모빌리티", "2차전지", "재생에너지", "원자력에너지"]

export default function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div
      className="
        bg-white dark:bg-gray-950 
        border-b lg:border-r border-gray-200 dark:border-gray-800 
        p-4
        flex flex-col gap-6
        w-full lg:w-60
      "
    >
      {/* Search Bar */}
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="상세종목 검색"
          className="pl-10 bg-gray-100 dark:bg-gray-800 border-0"
        />
        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Categories */}
      <div className="flex flex-col space-y-2">
        {/* 모바일에서는 '분야선택' 텍스트 숨김 */}
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase hidden lg:block">
          분야선택
        </p>

        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelectCategory(category)}
            variant={selectedCategory === category ? "default" : "ghost"}
            className={`
              w-full justify-start text-sm 
              ${selectedCategory === category
                ? "bg-[#061F5B] text-white hover:bg-[#061F5B]/90"
                : "hover:text-[#061F5B] hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* SentiStock Logo: 모바일에서는 숨김 */}
      <div className="hidden lg:block mt-auto pt-4">
        <p className="text-gray-300 dark:text-gray-600 text-sm font-semibold text-center">
          SentiStock
        </p>
      </div>
    </div>
  )
}
