'use client'

import {
  useState,
  useRef,
  useEffect,
  type ComponentType,
  type HTMLAttributes,
} from 'react'
import {
  DropIcon,
  GrainsIcon,
  LeafIcon,
  type IconProps,
} from '@phosphor-icons/react'
import { Glow } from '@/components/glow'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
  compact = false,
  className,
  ...props
}: DietaryBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const resolvedItem = itemProp ?? (type ? DIETARY_ITEMS_MAP[type] : undefined)
  const Icon = IconProp ?? resolvedItem?.icon

  const title = titleProp ?? resolvedItem?.title
  const label = labelProp ?? resolvedItem?.label
  const color = colorProp ?? resolvedItem?.color

  // Fecha o tooltip quando o usuário clica fora ou pressiona Escape
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (e: PointerEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!Icon) return null

  const tooltipText = title || label || ''

  // Quando compact: exibe apenas o ícone e surge o tooltip ao clicar (ou passar o mouse)
  if (compact) {
    return (
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <button
            ref={triggerRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen((prev) => !prev)
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
            }}
            aria-label={tooltipText}
            className={cn(
              'bg-accent border-border text-foreground/90 hover:bg-accent/90 hover:border-foreground/30 relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md border p-1 text-[11px] font-medium shadow-2xs transition-all select-none active:scale-90',
              isOpen && 'ring-primary/40 ring-1',
              className,
            )}
          >
            {color && (
              <Glow
                colors={color}
                className="pointer-events-none absolute -left-2.5 size-7 opacity-90 blur-xs"
              />
            )}
            <Icon
              weight="bold"
              className="text-foreground/90 relative z-10 size-3.5 shrink-0"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          sideOffset={6}
          className="bg-popover/95 border-border/80 text-foreground flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold shadow-md backdrop-blur-md"
        >
          {color && (
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
          <span>{tooltipText}</span>
        </TooltipContent>
      </Tooltip>
    )
  }

  // Versão padrão expandida com ícone e texto
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
