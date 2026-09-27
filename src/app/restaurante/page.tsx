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
  ArrowsClockwiseIcon,
  BroomIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import { AppSearchBar } from '@/components/app-search-bar'
import { Glow } from '@/components/glow'
import { DIETARY_ITEMS, type DietaryType } from './components/dietary-badge'

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

  const isDietaryActive = (type: DietaryType) => {
    if (type === 'vegetarian') return onlyVegetarian
    if (type === 'gluten') return glutenFree
    if (type === 'lactose') return lactoseFree
    return false
  }

  const toggleDietaryFilter = (type: DietaryType) => {
    if (type === 'vegetarian') setOnlyVegetarian((v) => !v)
    else if (type === 'gluten') setGlutenFree((v) => !v)
    else if (type === 'lactose') setLactoseFree((v) => !v)
  }

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
                <ArrowsClockwiseIcon
                  weight="bold"
                  className="size-3.5 animate-spin"
                />
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
              {DIETARY_ITEMS.map((item) => {
                const isActive = isDietaryActive(item.type)
                const Icon = item.icon

                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => toggleDietaryFilter(item.type)}
                    data-state={isActive ? 'active' : 'inactive'}
                    className="bg-accent border-border text-foreground/90 group/filter relative flex shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-1 text-xs font-medium shadow-2xs transition-all select-none"
                  >
                    <Glow
                      colors={item.color}
                      data-state={isActive ? 'active' : 'inactive'}
                      className="pointer-events-none absolute -left-2 size-8 opacity-0 blur-xs transition-all data-[state=active]:opacity-90"
                    />
                    <Icon className="relative z-10 size-3 shrink-0" />
                    <span className="relative z-10">
                      {item.filterLabel || item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Conteúdo Principal do Cardápio */}
        <main className="w-full">
          {isLoading ? (
            <RuSkeleton />
          ) : isError ? (
            <div className="bg-destructive/10 border-destructive/30 flex flex-col items-center justify-center rounded-2xl border p-8 text-center">
              <WarningCircleIcon
                weight="bold"
                className="text-destructive mb-2 size-8"
              />
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

      {/* Dock Inferior Flutuante Padrão UFC Flow */}
      <div className="fixed bottom-8 left-0 z-50 flex w-full justify-center px-4">
        <AppSearchBar
          placeholder="Buscar no cardápio..."
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          currentNavId="restaurante"
          isFilterActive={onlyVegetarian || glutenFree || lactoseFree}
          filterToolbar={
            <>
              <div className="no-scrollbar relative flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto py-0.5">
                {DIETARY_ITEMS.map((item) => {
                  const isActive = isDietaryActive(item.type)
                  const Icon = item.icon

                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => toggleDietaryFilter(item.type)}
                      data-state={isActive ? 'active' : 'inactive'}
                      className="bg-accent border-border text-foreground/90 group/filter relative flex shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-1 text-xs font-medium text-nowrap shadow-2xs transition-all select-none"
                    >
                      <Glow
                        colors={item.color}
                        data-state={isActive ? 'active' : 'inactive'}
                        className="pointer-events-none absolute -left-2 size-8 opacity-0 blur-xs transition-all data-[state=active]:opacity-90"
                      />
                      <Icon
                        weight="bold"
                        className="relative z-10 size-3 shrink-0"
                      />
                      <span className="relative z-10">
                        {item.filterLabel || item.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <div className="bg-muted-foreground/50 h-4 w-px" />
                <button
                  type="button"
                  onClick={() => {
                    setOnlyVegetarian(false)
                    setGlutenFree(false)
                    setLactoseFree(false)
                  }}
                  className="text-foreground/90 hover:text-foreground transition-all ease-in-out not-disabled:active:scale-90 disabled:opacity-40"
                  disabled={!onlyVegetarian && !glutenFree && !lactoseFree}
                  title="Limpar filtros"
                  aria-label="Limpar filtros de dieta"
                >
                  <BroomIcon weight="bold" className="size-4 sm:size-5" />
                </button>
              </div>
            </>
          }
        />
      </div>
      <div className="to-background pointer-events-none fixed bottom-0 z-49 h-12 w-full bg-linear-to-b from-transparent" />
    </div>
  )
}
