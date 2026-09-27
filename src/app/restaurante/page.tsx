'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/theme-toggle'
import { CampusSelector } from './components/campus-selector'
import { DayNavigator } from './components/day-navigator'
import { MealTabs } from './components/meal-tabs'
import { MealCard } from './components/meal-card'
import { RuEmptyState } from './components/ru-empty-state'
import { RuSkeleton } from './components/ru-skeleton'
import { useRuMenu } from '@/hooks/use-ru-menu'
import { UFC_CAMPUSES, type CampusId, type MealType } from '@/types/ru'
import {
  CalendarDays,
  GraduationCap,
  Leaf,
  Search,
  Wheat,
  Milk,
  X,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function getDefaultMealType(): MealType {
  const now = new Date()
  const hour = now.getHours()
  const minutes = now.getMinutes()
  const time = hour + minutes / 60

  if (time < 9.0) return 'desjejum'
  if (time <= 14.5) return 'almoco'
  return 'jantar'
}

export default function RestaurantePage() {
  const [selectedCampusId, setSelectedCampusId] = useState<CampusId>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ufc_flow_ru_campus')
        if (saved) {
          const id = Number(saved) as CampusId
          if (UFC_CAMPUSES.some((c) => c.id === id)) {
            return id
          }
        }
      } catch {
        // Ignora erro se localStorage inacessível
      }
    }
    return 4 // Sobral como padrão inicial
  })

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  )
  const [userSelectedMeal, setUserSelectedMeal] = useState<MealType | null>(
    null,
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [onlyVegetarian, setOnlyVegetarian] = useState(false)
  const [glutenFree, setGlutenFree] = useState(false)
  const [lactoseFree, setLactoseFree] = useState(false)

  // Persiste campus selecionado
  const handleSelectCampus = (id: CampusId) => {
    setSelectedCampusId(id)
    try {
      localStorage.setItem('ufc_flow_ru_campus', String(id))
    } catch {
      // Ignora erro
    }
  }

  // Hook de busca do cardápio via TanStack Query e IndexedDB
  const { data, isLoading, isError, error, refetch, isFetching } = useRuMenu({
    campusId: selectedCampusId,
    date: selectedDate,
  })

  // Refeição ativa calculada de forma pura e reativa (sem setState em effect)
  const activeMeal: MealType = useMemo(() => {
    if (userSelectedMeal) return userSelectedMeal

    const defaultMeal = getDefaultMealType()
    if (!data?.meals || data.isClosedOrEmpty) return defaultMeal

    const currentMealData = data.meals[defaultMeal]
    if (currentMealData && !currentMealData.isEmpty) return defaultMeal

    if (data.meals.almoco && !data.meals.almoco.isEmpty) return 'almoco'
    if (data.meals.jantar && !data.meals.jantar.isEmpty) return 'jantar'
    if (data.meals.desjejum && !data.meals.desjejum.isEmpty) return 'desjejum'

    return defaultMeal
  }, [userSelectedMeal, data])

  const currentCampusInfo = useMemo(
    () =>
      UFC_CAMPUSES.find((c) => c.id === selectedCampusId) || UFC_CAMPUSES[0],
    [selectedCampusId],
  )

  const isToday =
    !selectedDate || selectedDate === new Date().toISOString().split('T')[0]

  const activeMealData = data?.meals ? data.meals[activeMeal] : null

  return (
    <div className="flex min-h-dvh w-full justify-center px-3 pt-4 pb-28 sm:px-6 sm:pt-6">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        {/* Header do UFC Flow */}
        <header className="bg-accent/40 border-border/60 flex h-16 w-full shrink-0 items-center justify-between rounded-2xl border px-3 shadow-xs backdrop-blur-md sm:px-5">
          <Link href="/" aria-label="Retornar para o início">
            <Logo className="h-9 sm:h-10" />
          </Link>

          <div className="flex items-center gap-2">
            <CampusSelector
              selectedCampusId={selectedCampusId}
              onSelectCampus={handleSelectCampus}
              disabled={isLoading || isFetching}
            />
            <ModeToggle />
          </div>
        </header>

        {/* Título & Navegador de Datas */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                Cardápio do RU
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Restaurante Universitário • {currentCampusInfo.name}
                {currentCampusInfo.units &&
                  ` (${currentCampusInfo.units.join(', ')})`}
              </p>
            </div>

            {isFetching && !isLoading && (
              <div className="text-muted-foreground flex animate-pulse items-center gap-1.5 text-xs">
                <RefreshCw className="size-3.5 animate-spin" />
                <span>Atualizando cardápio...</span>
              </div>
            )}
          </div>

          <DayNavigator
            currentDate={
              data?.date ||
              selectedDate ||
              new Date().toISOString().split('T')[0]
            }
            currentLabel={data?.currentLabel}
            prevDate={data?.prevDate || null}
            prevLabel={data?.prevLabel || null}
            nextDate={data?.nextDate || null}
            nextLabel={data?.nextLabel || null}
            onNavigate={(newDate) => setSelectedDate(newDate)}
            onResetToday={() => setSelectedDate(undefined)}
            isToday={isToday}
            isLoading={isLoading}
          />
        </div>

        {/* Abas de Refeições (Desjejum, Almoço, Jantar) */}
        {!isLoading && !data?.isClosedOrEmpty && (
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <MealTabs
              activeMeal={activeMeal}
              onSelectMeal={(m) => setUserSelectedMeal(m)}
              hasDesjejum={Boolean(
                data?.meals.desjejum && !data.meals.desjejum.isEmpty,
              )}
              hasAlmoco={Boolean(
                data?.meals.almoco && !data.meals.almoco.isEmpty,
              )}
              hasJantar={Boolean(
                data?.meals.jantar && !data.meals.jantar.isEmpty,
              )}
            />

            {/* Chips de filtro rápido */}
            <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-2xs transition-all',
                  onlyVegetarian
                    ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-700 shadow-xs dark:text-emerald-300'
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-accent/70',
                )}
              >
                <Leaf className="size-3 shrink-0" />
                <span>Vegetariano</span>
              </button>

              <button
                type="button"
                onClick={() => setGlutenFree(!glutenFree)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-2xs transition-all',
                  glutenFree
                    ? 'border-amber-500/40 bg-amber-500/20 text-amber-700 shadow-xs dark:text-amber-300'
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-accent/70',
                )}
              >
                <Wheat className="size-3 shrink-0" />
                <span>Sem Glúten</span>
              </button>

              <button
                type="button"
                onClick={() => setLactoseFree(!lactoseFree)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-2xs transition-all',
                  lactoseFree
                    ? 'border-sky-500/40 bg-sky-500/20 text-sky-700 shadow-xs dark:text-sky-300'
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-accent/70',
                )}
              >
                <Milk className="size-3 shrink-0" />
                <span>Sem Lactose</span>
              </button>
            </div>
          </div>
        )}

        {/* Conteúdo Principal do Cardápio */}
        <main className="w-full">
          {isLoading ? (
            <RuSkeleton />
          ) : isError ? (
            <div className="bg-destructive/10 border-destructive/30 flex flex-col items-center justify-center rounded-2xl border p-8 text-center">
              <AlertCircle className="text-destructive mb-2 size-8" />
              <h3 className="text-foreground text-base font-semibold">
                Falha ao carregar o cardápio
              </h3>
              <p className="text-muted-foreground mt-1 max-w-md text-xs">
                {error?.message ||
                  'O servidor da UFC pode estar temporariamente indisponível.'}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-xl px-4 py-2 text-xs font-medium transition-all"
              >
                Tentar novamente
              </button>
            </div>
          ) : data?.isClosedOrEmpty ? (
            <RuEmptyState
              message={data.emptyMessage}
              nextDate={data.nextDate}
              nextLabel={data.nextLabel}
              onNavigateNext={() =>
                data.nextDate && setSelectedDate(data.nextDate)
              }
              onResetToday={() => setSelectedDate(undefined)}
              isToday={isToday}
            />
          ) : (
            <MealCard
              meal={activeMealData}
              searchQuery={searchQuery}
              onlyVegetarian={onlyVegetarian}
              glutenFree={glutenFree}
              lactoseFree={lactoseFree}
            />
          )}
        </main>
      </div>

      {/* Dock Inferior Flutuante (Seguindo o padrão do UFC Flow) */}
      <div className="pointer-events-none fixed bottom-6 left-0 z-50 flex w-full justify-center gap-1.5 px-4">
        <div className="pointer-events-auto flex items-center gap-1.5">
          {/* Atalho para Cursos */}
          <Link
            className="border-border/80 bg-accent/80 hover:bg-accent flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-lg backdrop-blur-md transition-all active:scale-95"
            href="/cursos"
            title="Ver cursos"
          >
            <div className="text-foreground/90 relative flex size-12 shrink-0 items-center justify-center">
              <GraduationCap className="size-5" />
            </div>
          </Link>

          {/* Atalho para Calendário */}
          <Link
            className="border-border/80 bg-accent/80 hover:bg-accent flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-lg backdrop-blur-md transition-all active:scale-95"
            href="/calendario"
            title="Ver calendário acadêmico"
          >
            <div className="text-foreground/90 relative flex size-12 shrink-0 items-center justify-center">
              <CalendarDays className="size-5" />
            </div>
          </Link>

          {/* Barra de Pesquisa de Pratos */}
          <div className="border-border/80 bg-accent/80 relative flex h-12 w-full max-w-80 items-center justify-center gap-2 overflow-hidden rounded-full border px-3 shadow-lg backdrop-blur-md transition-all">
            <Search className="text-muted-foreground size-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar no cardápio..."
              className="placeholder:text-muted-foreground/70 h-full w-full border-0 bg-transparent text-xs outline-hidden sm:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-muted-foreground hover:text-foreground transition-all active:scale-90"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
