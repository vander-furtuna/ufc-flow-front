import { Glow } from '@/components/glow'
import { cn } from '@/lib/utils'
import type { CategoryHeaderProps } from './types'

export function CategoryHeader({
  title,
  meta,
  isVegetarian = false,
  variant = 'hero',
}: CategoryHeaderProps) {
  const Icon = meta.icon
  const isHero = variant === 'hero'

  return (
    <div
      className={cn(
        'mb-3 flex items-center justify-between gap-2',
        !isHero && 'justify-start',
      )}
    >
      <div className="flex items-center gap-2.5">
        {/* Caixa de ícone unificada com Glow */}
        <div
          className={cn(
            'bg-accent border-border relative flex shrink-0 items-center justify-center overflow-hidden border shadow-xs',
            isHero ? 'size-8 rounded-lg' : 'size-7 rounded-md',
          )}
        >
          <Icon
            weight="bold"
            className={cn(
              'text-foreground/90 relative z-10',
              isHero ? 'size-4' : 'size-3.5',
            )}
          />
          <Glow
            colors={meta.glowColor}
            className={cn(
              'pointer-events-none absolute -left-2 opacity-90 blur-xs',
              isHero ? 'size-8' : 'size-7',
            )}
          />
        </div>

        {isHero ? (
          <h4 className="text-foreground text-sm font-semibold sm:text-base">
            {title}
          </h4>
        ) : (
          <h5 className="text-foreground text-xs font-semibold sm:text-sm">
            {title}
          </h5>
        )}
      </div>

      {isHero && isVegetarian && (
        <span className="bg-accent border-border text-foreground/90 relative inline-flex items-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase shadow-2xs">
          <Glow
            colors="#10b981"
            className="pointer-events-none absolute -left-2 size-6 opacity-90 blur-xs"
          />
          <span className="relative z-10">Opção Verde</span>
        </span>
      )}
    </div>
  )
}
