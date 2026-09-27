import { cn } from '@/lib/utils'
import { Wheat, Milk, Leaf } from 'lucide-react'

interface DietaryBadgeProps {
  type: 'gluten' | 'lactose' | 'vegetarian'
  className?: string
  compact?: boolean
}

export function DietaryBadge({
  type,
  className,
  compact = false,
}: DietaryBadgeProps) {
  if (type === 'gluten') {
    return (
      <span
        title="Contém Glúten"
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium transition-colors',
          'border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400',
          className,
        )}
      >
        <Wheat className="size-3 shrink-0" />
        {!compact && <span>Glúten</span>}
      </span>
    )
  }

  if (type === 'lactose') {
    return (
      <span
        title="Contém Lactose"
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium transition-colors',
          'border border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400',
          className,
        )}
      >
        <Milk className="size-3 shrink-0" />
        {!compact && <span>Lactose</span>}
      </span>
    )
  }

  if (type === 'vegetarian') {
    return (
      <span
        title="Opção Vegetariana"
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium transition-colors',
          'border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
          className,
        )}
      >
        <Leaf className="size-3 shrink-0" />
        {!compact && <span>Vegetariano</span>}
      </span>
    )
  }

  return null
}
