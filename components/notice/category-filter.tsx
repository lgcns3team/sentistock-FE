"use client"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = ["공지", "정점"]

  return (
    <div className="w-20 flex flex-col gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category
              ? "bg-[rgb(80,185,228)] text-white border border-[rgb(80,185,228)]"
              : "bg-white text-[rgb(80,185,228)] border border-[rgb(80,185,228)]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
