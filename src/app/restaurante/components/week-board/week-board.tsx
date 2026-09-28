'use client'

import { useHorizontalScrollWithOverlay } from '@/hooks/use-horizontal-scroll-with-overlay'
import { cn } from '@/lib/utils'
import { getFortalezaTodayDate } from '@/lib/ru-scraper'
import { WeekDayColumn } from './week-day-column'
import type { RUMenuWeek, WeekMealFilter } from '@/types/ru'

interface WeekBoardProps {
  week: RUMenuWeek
  activeMealFilter: WeekMealFilter
  searchQuery?: string
  onlyVegetarian?: boolean
  glutenFree?: boolean
  lactoseFree?: boolean
  onSelectDay: (date: string) => void
  todayDate?: string
}

export function WeekBoard({
  week,
  activeMealFilter,
  searchQuery = '',
  onlyVegetarian = false,
  glutenFree = false,
  lactoseFree = false,
  onSelectDay,
  todayDate = getFortalezaTodayDate(),
}: WeekBoardProps) {
  const { scrollRef, showLeftShadow, showRightShadow } =
    useHorizontalScrollWithOverlay<HTMLDivElement>()

  return (
    <div className="relative w-full">
      {/* Sombra de overflow à esquerda para mobile */}
      <div
        className={cn(
          'from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent transition-opacity duration-300 lg:hidden',
          showLeftShadow ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Sombra de overflow à direita para mobile */}
      <div
        className={cn(
          'from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l to-transparent transition-opacity duration-300 lg:hidden',
          showRightShadow ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Grid de 5 colunas no Desktop e Carrossel Snap no Mobile */}
      <div
        ref={scrollRef}
        className="flex w-full snap-x gap-3 overflow-x-auto pt-1 pb-4 lg:grid lg:grid-cols-5 lg:gap-3.5 lg:overflow-visible"
      >
        {week.days.map((day) => {
          const isToday = day.date === todayDate

          return (
            <div key={day.id} className="snap-start">
              <WeekDayColumn
                day={day}
                activeMealFilter={activeMealFilter}
                searchQuery={searchQuery}
                onlyVegetarian={onlyVegetarian}
                glutenFree={glutenFree}
                lactoseFree={lactoseFree}
                onSelectDay={onSelectDay}
                isToday={isToday}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
