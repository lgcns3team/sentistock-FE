"use client"

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center gap-3 mt-8">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition ${
            currentPage === page
              ? "bg-[rgb(6,31,91)] text-white"
              : "text-[rgb(6,31,91)] hover:bg-[rgb(80,185,228)] hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
