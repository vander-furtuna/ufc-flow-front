import { Glow } from '@/components/glow'
import { cn } from '@/lib/utils'
import { getCategoryMeta, isVegetarianCategory } from './category-meta'
import { CategoryHeader } from './category-header'
import { MealItemRow } from './meal-item-row'
import type { CategoryCardProps } from './types'

export function HeroCategoryCard({ category, className }: CategoryCardProps) {
  const meta = getCategoryMeta(category.category)
  const isVeg = isVegetarianCategory(category.category)

  return (
    <div
      className={cn(
        'bg-card border-border/80 hover:border-border relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-xs backdrop-blur-md transition-all',
        className,
      )}
    >
      {/* Glow ambiental no canto do card */}
      <Glow
        colors={meta.glowColor}
        className="pointer-events-none absolute -top-16 -left-16 size-40 opacity-40 blur-2xl"
      />

      <div className="relative z-10">
        <CategoryHeader
          title={category.category}
          meta={meta}
          isVegetarian={isVeg}
          variant="hero"
        />

        <ul className="my-2 flex flex-col gap-2.5">
          {category.items.map((item) => (
            <MealItemRow key={item.id} item={item} variant="hero" />
          ))}
        </ul>
      </div>
    </div>
  )
}
