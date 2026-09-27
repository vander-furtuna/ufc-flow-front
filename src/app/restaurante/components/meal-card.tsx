'use client'

import type { Meal, MealCategory } from '@/types/ru'
import { DietaryBadge } from './dietary-badge'
import { Glow } from '@/components/glow'
import {
  Utensils,
  Leaf,
  Salad,
  Soup,
  Apple,
  CupSoda,
  Cookie,
  Flame,
  Coffee,
} from 'lucide-react'

interface MealCardProps {
  meal: Meal | null
  searchQuery?: string
  onlyVegetarian?: boolean
  glutenFree?: boolean
  lactoseFree?: boolean
}

// Mapeia ícones e cores de Glow semânticos para cada categoria
function getCategoryMeta(categoryName: string) {
  const norm = categoryName.toLowerCase()

  if (norm.includes('principal')) {
    return {
      icon: Flame,
      glowColor: '#f97316',
      isHero: true,
    }
  }
  if (norm.includes('vegetariano')) {
    return {
      icon: Leaf,
      glowColor: '#10b981',
      isHero: true,
    }
  }
  if (norm.includes('salada')) {
    return {
      icon: Salad,
      glowColor: '#22c55e',
      isHero: false,
    }
  }
  if (norm.includes('guarni')) {
    return {
      icon: Soup,
      glowColor: '#f59e0b',
      isHero: false,
    }
  }
  if (norm.includes('acompanhamento')) {
    return {
      icon: Utensils,
      glowColor: '#3b82f6',
      isHero: false,
    }
  }
  if (norm.includes('suco') || norm.includes('bebida')) {
    return {
      icon: CupSoda,
      glowColor: '#ec4899',
      isHero: false,
    }
  }
  if (norm.includes('sobremesa') || norm.includes('fruta')) {
    return {
      icon: Apple,
      glowColor: '#ef4444',
      isHero: false,
    }
  }
  if (norm.includes('pães') || norm.includes('especial')) {
    return {
      icon: Cookie,
      glowColor: '#d97706',
      isHero: false,
    }
  }

  return {
    icon: Coffee,
    glowColor: '#22d3ee',
    isHero: false,
  }
}

export function MealCard({
  meal,
  searchQuery = '',
  onlyVegetarian = false,
  glutenFree = false,
  lactoseFree = false,
}: MealCardProps) {
  if (!meal || meal.isEmpty || !meal.categories.length) {
    return (
      <div className="bg-card/40 border-border/60 flex flex-col items-center justify-center rounded-2xl border p-12 text-center shadow-xs backdrop-blur-sm">
        <Coffee className="text-muted-foreground/60 mb-3 size-10" />
        <h3 className="text-foreground text-base font-semibold">
          Nenhum item cadastrado para esta refeição
        </h3>
        <p className="text-muted-foreground mt-1 max-w-md text-xs sm:text-sm">
          Este cardápio pode não estar disponível para este horário ou este
          campus não oferece este serviço.
        </p>
      </div>
    )
  }

  // Filtragem
  const query = searchQuery.toLowerCase().trim()

  const filteredCategories = meal.categories
    .map((cat) => {
      const isVegetarianCategory = cat.category
        .toLowerCase()
        .includes('vegetariano')

      if (
        onlyVegetarian &&
        cat.category.toLowerCase().includes('principal') &&
        !isVegetarianCategory
      ) {
        return null
      }

      const filteredItems = cat.items.filter((item) => {
        if (query && !item.name.toLowerCase().includes(query)) {
          return false
        }
        if (glutenFree && item.hasGluten) {
          return false
        }
        if (lactoseFree && item.hasLactose) {
          return false
        }
        return true
      })

      if (!filteredItems.length) return null

      return {
        ...cat,
        items: filteredItems,
      } as MealCategory
    })
    .filter(Boolean) as MealCategory[]

  if (!filteredCategories.length) {
    return (
      <div className="bg-card/40 border-border/60 flex flex-col items-center justify-center rounded-2xl border p-10 text-center shadow-xs backdrop-blur-sm">
        <Utensils className="text-muted-foreground/60 mb-3 size-8" />
        <h4 className="text-foreground text-sm font-semibold">
          Nenhum prato corresponde aos filtros selecionados
        </h4>
        <p className="text-muted-foreground mt-1 text-xs">
          Tente limpar a pesquisa ou os filtros de alérgenos.
        </p>
      </div>
    )
  }

  // Separa pratos de destaque (Principal e Vegetariano) dos demais acompanhamentos
  const heroCategories = filteredCategories.filter(
    (c) =>
      c.category.toLowerCase().includes('principal') ||
      c.category.toLowerCase().includes('vegetariano'),
  )
  const otherCategories = filteredCategories.filter(
    (c) =>
      !c.category.toLowerCase().includes('principal') &&
      !c.category.toLowerCase().includes('vegetariano'),
  )

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Seção de Pratos Principais em Destaque */}
      {heroCategories.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {heroCategories.map((cat) => {
            const meta = getCategoryMeta(cat.category)
            const Icon = meta.icon
            const isVeg = cat.category.toLowerCase().includes('vegetariano')

            return (
              <div
                key={cat.category}
                className="bg-card border-border/80 hover:border-border relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-xs backdrop-blur-md transition-all"
              >
                {/* Glow ambiental no canto do card */}
                <Glow
                  colors={meta.glowColor}
                  className="pointer-events-none absolute -top-16 -left-16 size-40 opacity-40 blur-2xl"
                />

                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {/* Caixa de ícone unificada com Glow */}
                      <div className="bg-accent border-border relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border shadow-xs">
                        <Icon className="text-foreground/90 relative z-10 size-4" />
                        <Glow
                          colors={meta.glowColor}
                          className="pointer-events-none absolute -left-2 size-8 opacity-90 blur-xs"
                        />
                      </div>
                      <h4 className="text-foreground text-sm font-semibold sm:text-base">
                        {cat.category}
                      </h4>
                    </div>

                    {isVeg && (
                      <span className="bg-accent border-border text-foreground/90 relative inline-flex items-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase shadow-2xs">
                        <Glow
                          colors="#10b981"
                          className="pointer-events-none absolute -left-2 size-6 opacity-90 blur-xs"
                        />
                        <span className="relative z-10">Opção Verde</span>
                      </span>
                    )}
                  </div>

                  <ul className="my-2 flex flex-col gap-2.5">
                    {cat.items.map((item) => (
                      <li
                        key={item.id}
                        className="bg-background/50 border-border/40 flex flex-col justify-between gap-1.5 rounded-lg border p-2.5 sm:flex-row sm:items-center"
                      >
                        <span className="text-foreground text-sm leading-snug font-medium">
                          {item.name}
                        </span>

                        <div className="flex shrink-0 items-center gap-1">
                          {item.hasGluten && <DietaryBadge type="gluten" />}
                          {item.hasLactose && <DietaryBadge type="lactose" />}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Grid de Outras Categorias (Guarnição, Acompanhamento, Salada, Sobremesa, Suco) */}
      {otherCategories.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherCategories.map((cat) => {
            const meta = getCategoryMeta(cat.category)
            const Icon = meta.icon

            return (
              <div
                key={cat.category}
                className="bg-card/40 border-border/60 hover:border-border/90 relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 shadow-xs backdrop-blur-sm transition-all"
              >
                {/* Glow sutil no canto */}
                <Glow
                  colors={meta.glowColor}
                  className="pointer-events-none absolute -top-12 -left-12 size-28 opacity-30 blur-xl"
                />

                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2">
                    {/* Caixa de ícone unificada com Glow */}
                    <div className="bg-accent border-border relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border shadow-xs">
                      <Icon className="text-foreground/90 relative z-10 size-3.5" />
                      <Glow
                        colors={meta.glowColor}
                        className="pointer-events-none absolute -left-2 size-7 opacity-90 blur-xs"
                      />
                    </div>
                    <h5 className="text-foreground text-xs font-semibold sm:text-sm">
                      {cat.category}
                    </h5>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {cat.items.map((item) => (
                      <li
                        key={item.id}
                        className="border-border/30 flex items-center justify-between gap-2 border-b py-1 text-xs last:border-b-0"
                      >
                        <span className="text-foreground/90 font-medium">
                          {item.name}
                        </span>

                        <div className="flex shrink-0 items-center gap-1">
                          {item.hasGluten && (
                            <DietaryBadge type="gluten" compact />
                          )}
                          {item.hasLactose && (
                            <DietaryBadge type="lactose" compact />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
