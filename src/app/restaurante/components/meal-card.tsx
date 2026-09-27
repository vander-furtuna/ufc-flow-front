'use client'

import type { Meal, MealCategory } from '@/types/ru'
import { DietaryBadge } from './dietary-badge'
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
import { cn } from '@/lib/utils'

interface MealCardProps {
  meal: Meal | null
  searchQuery?: string
  onlyVegetarian?: boolean
  glutenFree?: boolean
  lactoseFree?: boolean
}

// Mapeia ícones e estilos semânticos para cada categoria
function getCategoryMeta(categoryName: string) {
  const norm = categoryName.toLowerCase()

  if (norm.includes('principal')) {
    return {
      icon: Flame,
      color: 'text-orange-500',
      badgeBg:
        'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400',
      isHero: true,
    }
  }
  if (norm.includes('vegetariano')) {
    return {
      icon: Leaf,
      color: 'text-emerald-500',
      badgeBg:
        'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      isHero: true,
    }
  }
  if (norm.includes('salada')) {
    return {
      icon: Salad,
      color: 'text-green-500',
      badgeBg:
        'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
      isHero: false,
    }
  }
  if (norm.includes('guarni')) {
    return {
      icon: Soup,
      color: 'text-amber-500',
      badgeBg:
        'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
      isHero: false,
    }
  }
  if (norm.includes('acompanhamento')) {
    return {
      icon: Utensils,
      color: 'text-blue-500',
      badgeBg:
        'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
      isHero: false,
    }
  }
  if (norm.includes('suco') || norm.includes('bebida')) {
    return {
      icon: CupSoda,
      color: 'text-pink-500',
      badgeBg:
        'bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400',
      isHero: false,
    }
  }
  if (norm.includes('sobremesa') || norm.includes('fruta')) {
    return {
      icon: Apple,
      color: 'text-red-500',
      badgeBg: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400',
      isHero: false,
    }
  }
  if (norm.includes('pães') || norm.includes('especial')) {
    return {
      icon: Cookie,
      color: 'text-amber-600',
      badgeBg:
        'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300',
      isHero: false,
    }
  }

  return {
    icon: Coffee,
    color: 'text-primary',
    badgeBg: 'bg-primary/10 border-primary/20 text-primary',
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

      // Se usuário ativou apenas vegetariano e for categoria de carne ("Principal"), filtra se necessário
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
                className={cn(
                  'relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-xs backdrop-blur-md transition-all',
                  isVeg
                    ? 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20'
                    : 'bg-card/60 border-border/80',
                )}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'flex size-8 items-center justify-center rounded-lg border',
                          meta.badgeBg,
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <h4 className="text-foreground text-sm font-semibold sm:text-base">
                        {cat.category}
                      </h4>
                    </div>

                    {isVeg && (
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                        Opção Verde
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
                className="bg-card/40 border-border/60 hover:border-border/90 flex flex-col justify-between rounded-xl border p-4 shadow-xs backdrop-blur-sm transition-all"
              >
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className={cn(
                        'flex size-7 items-center justify-center rounded-md border',
                        meta.badgeBg,
                      )}
                    >
                      <Icon className="size-3.5" />
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
