import type { ComponentType, HTMLAttributes } from 'react'
import {
  DropIcon,
  GrainsIcon,
  LeafIcon,
  type IconProps,
} from '@phosphor-icons/react'
import { Glow } from '@/components/glow'
import { cn } from '@/lib/utils'

export type DietaryType = 'gluten' | 'lactose' | 'vegetarian'

export interface DietaryItemConfig {
  type: DietaryType
  title: string
  label: string
  filterLabel?: string
  icon: ComponentType<IconProps>
  color: string
}

export const DIETARY_ITEMS: DietaryItemConfig[] = [
  {
    type: 'vegetarian',
    title: 'Opção Vegetariana',
    label: 'Vegetariano',
    filterLabel: 'Vegetariano',
    icon: LeafIcon,
    color: '#10b981',
  },
  {
    type: 'gluten',
    title: 'Contém Glúten',
    label: 'Glúten',
    filterLabel: 'Sem Glúten',
    icon: GrainsIcon,
    color: '#f59e0b',
  },
  {
    type: 'lactose',
    title: 'Contém Lactose',
    label: 'Lactose',
    filterLabel: 'Sem Lactose',
    icon: DropIcon,
    color: '#06b6d4',
  },
]

export const DIETARY_ITEMS_MAP: Record<DietaryType, DietaryItemConfig> =
  DIETARY_ITEMS.reduce(
    (acc, item) => {
      acc[item.type] = item
      return acc
    },
    {} as Record<DietaryType, DietaryItemConfig>,
  )

export function getDietaryItem(
  type: DietaryType,
): DietaryItemConfig | undefined {
  return DIETARY_ITEMS_MAP[type]
}

export interface DietaryBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tipo pré-configurado da badge */
  type?: DietaryType
  /** Ou objeto de configuração completo */
  item?: DietaryItemConfig
  /** Sobrescrita do título/tooltip */
  title?: string
  /** Sobrescrita do label textual visível */
  label?: string
  /** Sobrescrita do ícone */
  icon?: ComponentType<IconProps>
  /** Sobrescrita da cor do Glow */
  color?: string
  /** Oculta o label de texto, exibindo apenas o ícone com Glow e tooltip */
  compact?: boolean
  /** Classes CSS adicionais */
  className?: string
}

export function DietaryBadge({
  type,
  item: itemProp,
  title: titleProp,
  label: labelProp,
  icon: IconProp,
  color: colorProp,
  compact: _compact = false,
  className,
  ...props
}: DietaryBadgeProps) {
  const resolvedItem = itemProp ?? (type ? DIETARY_ITEMS_MAP[type] : undefined)

  const Icon = IconProp ?? resolvedItem?.icon
  if (!Icon) return null

  const title = titleProp ?? resolvedItem?.title
  const label = labelProp ?? resolvedItem?.label
  const color = colorProp ?? resolvedItem?.color

  return (
    <span
      title={title}
      className={cn(
        'bg-accent border-border text-foreground/90 relative inline-flex items-center gap-1 overflow-hidden rounded-md border px-1.5 py-0.5 text-[11px] font-medium shadow-2xs transition-all select-none',
        className,
      )}
      {...props}
    >
      {color && (
        <Glow
          colors={color}
          className="pointer-events-none absolute -left-2.5 size-8 opacity-90 blur-md"
        />
      )}
      <Icon
        weight="bold"
        className="text-foreground/90 relative z-10 size-4 shrink-0"
      />
      {label && <span className="relative z-10 font-medium">{label}</span>}
    </span>
  )
}
