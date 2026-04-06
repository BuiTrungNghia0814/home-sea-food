import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export function Rating({ value, max = 5, size = 'md', showValue = false }: RatingProps) {
  const sizes = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${sizes[size]} ${i < value ? 'fill-sand-500 text-sand-500' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
      {showValue && <span className="ml-1 text-sm text-gray-600">({value})</span>}
    </div>
  )
}
