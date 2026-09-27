'use client'

import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DayNavigatorProps {
  currentDate: string // YYYY-MM-DD
  currentLabel?: string // e.g. "Sexta (25/09)"
  prevDate: string | null
  prevLabel: string | null
  nextDate: string | null
  nextLabel: string | null
  onNavigate: (date: string) => void
  onResetToday: () => void
  isToday: boolean
  isLoading?: boolean
}

export function DayNavigator({
  currentDate,
  currentLabel,
  prevDate,
  prevLabel,
  nextDate,
  nextLabel,
  onNavigate,
  onResetToday,
  isToday,
  isLoading = false,
}: DayNavigatorProps) {
  // Se não houver prevDate da API, calcula um dia antes (pulando domingo se necessário)
  const fallbackPrev = () => {
    if (prevDate) {
      onNavigate(prevDate)
      return
    }
    const d = new Date(currentDate + 'T12:00:00')
    d.setDate(d.getDate() - 1)
    if (d.getDay() === 0) d.setDate(d.getDate() - 2) // se domingo, vai pra sexta
    onNavigate(d.toISOString().split('T')[0])
  }

  // Se não houver nextDate da API, calcula um dia depois
  const fallbackNext = () => {
    if (nextDate) {
      onNavigate(nextDate)
      return
    }
    const d = new Date(currentDate + 'T12:00:00')
    d.setDate(d.getDate() + 1)
    if (d.getDay() === 0) d.setDate(d.getDate() + 1) // se domingo, vai pra segunda
    onNavigate(d.toISOString().split('T')[0])
  }

  // Formatação amigável se o currentLabel não vier
  const displayLabel = () => {
    if (currentLabel) return currentLabel
    try {
      const d = new Date(currentDate + 'T12:00:00')
      return d.toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
      })
    } catch {
      return currentDate
    }
  }

  return (
    <div className="bg-accent/40 border-border/70 flex w-full items-center justify-between gap-2 rounded-2xl border p-2 shadow-xs backdrop-blur-md">
      {/* Botão Anterior */}
      <button
        type="button"
        onClick={fallbackPrev}
        disabled={isLoading}
        title={prevLabel ? `Dia anterior: ${prevLabel}` : 'Dia anterior'}
        className={cn(
          'text-foreground hover:bg-accent/80 flex items-center gap-1 rounded-xl p-2 text-xs font-medium transition-all active:scale-95 sm:px-3 sm:py-2',
          isLoading && 'cursor-not-allowed opacity-50',
        )}
      >
        <ChevronLeft className="size-4 shrink-0" />
        <span className="hidden max-w-[110px] truncate sm:inline">
          {prevLabel || 'Anterior'}
        </span>
      </button>

      {/* Centro: Data Atual e Botão Hoje */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5">
            <span className="text-foreground text-sm font-semibold tracking-tight capitalize sm:text-base">
              {displayLabel()}
            </span>
            {isToday && (
              <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                Hoje
              </span>
            )}
          </div>
        </div>

        {!isToday && (
          <button
            type="button"
            onClick={onResetToday}
            disabled={isLoading}
            title="Voltar para o cardápio de hoje"
            className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-1 rounded-lg border border-transparent px-2 py-1 text-xs font-medium transition-all"
          >
            <RotateCcw className="size-3 shrink-0" />
            <span className="hidden md:inline">Hoje</span>
          </button>
        )}
      </div>

      {/* Botão Próximo */}
      <button
        type="button"
        onClick={fallbackNext}
        disabled={isLoading}
        title={nextLabel ? `Próximo dia: ${nextLabel}` : 'Próximo dia'}
        className={cn(
          'text-foreground hover:bg-accent/80 flex items-center gap-1 rounded-xl p-2 text-xs font-medium transition-all active:scale-95 sm:px-3 sm:py-2',
          isLoading && 'cursor-not-allowed opacity-50',
        )}
      >
        <span className="hidden max-w-[110px] truncate sm:inline">
          {nextLabel || 'Próximo'}
        </span>
        <ChevronRight className="size-4 shrink-0" />
      </button>
    </div>
  )
}
