import { Search } from "lucide-react"
import React from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="flex justify-center px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="relative w-full max-w-md"
        >
          {/* 검색 아이콘 */}
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />

          {/* 입력 필드 */}
          <input
            type="text"
            placeholder="종목명 또는 종목코드로 검색"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
            w-full
            pl-10 
            bg-gray-100 dark:bg-gray-800
            border-0
            rounded-lg
            py-3
            outline-none 
            text-gray-700 dark:text-gray-300
            placeholder-gray-400"
          />
        </form>
      </div>
    </div>
  )
}
