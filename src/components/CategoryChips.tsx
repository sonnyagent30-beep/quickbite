'use client'

interface CategoryChipsProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export const CategoryChips = ({ 
  categories, 
  selectedCategory, 
  onSelect 
}: CategoryChipsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
      {categories.map((category) => {
        const isSelected = category === selectedCategory
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected 
                ? 'bg-[#E85D04] text-white shadow-sm' 
                : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryChips