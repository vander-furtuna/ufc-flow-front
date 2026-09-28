'use client'

import { CalendarBlankIcon, ColumnsIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { RUViewMode } from '@/types/ru'

interface ViewModeToggleProps {
  viewMode: RUViewMode
  onChangeViewMode: (mode: RUViewMode) => void
  disabled?: boolean
}

export function ViewModeToggle({
  viewMode,
  onChangeViewMode,
  disabled = false,
}: ViewModeToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Modo de visualização do cardápio"
      className="bg-muted/70 border-border/60 flex items-center rounded-xl border p-1 backdrop-blur-sm"
    >
      <button
        type="button"
        role="tab"
        aria-selected={viewMode === 'day'}
        disabled={disabled}
        onClick={() => onChangeViewMode('day')}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all select-none sm:px-3 sm:text-sm',
          viewMode === 'day'
            ? 'bg-background text-foreground font-semibold shadow-xs'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/40',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        title="Visualizar cardápio do dia"
      >
        <CalendarBlankIcon weight="bold" className="size-3.5 sm:size-4" />
        <span>Dia</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={viewMode === 'week'}
        disabled={disabled}
        onClick={() => onChangeViewMode('week')}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all select-none sm:px-3 sm:text-sm',
          viewMode === 'week'
            ? 'bg-background text-foreground font-semibold shadow-xs'
            : 'text-muted-foreground hover:text-foreground hover:bg-background/40',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        title="Visualizar cardápio da semana em colunas"
      >
        <ColumnsIcon weight="bold" className="size-3.5 sm:size-4" />
        <span>Semana</span>
      </button>
    </div>
  )
}
