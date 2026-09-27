'use client'

import { FunnelSimpleIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Glow } from './glow'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { navItems } from '@/config/nav-items'
import { cn } from '@/lib/utils'

export type AppSearchBarProps = {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  baseHref?: string
  currentNavId?: string
  isFilterActive?: boolean
  filterIcon?: ReactNode
  filterToolbar?: ReactNode
  onFilterClick?: () => void
  className?: string
  glowColor?: string
}

function ToolBar({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
      className="bg-accent/40 shadow-foreground/5 border-border absolute bottom-14 flex h-fit w-full items-center gap-1.5 rounded-full border px-3 py-2 backdrop-blur-md"
    >
      {children}
    </motion.div>
  )
}

export function AppSearchBar({
  placeholder = 'Pesquisar',
  value,
  onChange,
  onClear,
  baseHref,
  currentNavId,
  isFilterActive = false,
  filterIcon,
  filterToolbar,
  onFilterClick,
  className,
  glowColor = '#22d3ee',
}: AppSearchBarProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  const [optionsMode, setOptionsMode] = useState<'filters' | 'nav' | 'closed'>(
    'closed',
  )

  const handleSelectMode = (mode: 'filters' | 'nav' | 'closed') => {
    setOptionsMode((prev) => (prev === mode ? 'closed' : mode))
  }

  // Fecha menus ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOptionsMode('closed')
      }
    }

    if (optionsMode !== 'closed') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [optionsMode])

  // Identifica o navItem ativo (por id explícito ou por correspondência de rota)
  const currentNavItem =
    (currentNavId && navItems.find((item) => item.id === currentNavId)) ||
    navItems.find((item) => {
      const href = item.href(baseHref || pathname)
      return href === pathname || (href !== '/' && pathname.startsWith(href))
    }) ||
    navItems[0]

  const othersNavItems = navItems.filter(
    (item) => item.id !== currentNavItem?.id,
  )

  const hasFilter = Boolean(filterToolbar || onFilterClick)

  const handleFilterButtonClick = () => {
    if (onFilterClick && !filterToolbar) {
      onFilterClick()
    } else {
      handleSelectMode('filters')
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-2 sm:w-md',
        className,
      )}
    >
      {/* Toolbar Flutuante de Filtros */}
      <AnimatePresence>
        {optionsMode === 'filters' && filterToolbar && (
          <ToolBar>{filterToolbar}</ToolBar>
        )}
      </AnimatePresence>

      {/* Menu Popup de Navegação */}
      <AnimatePresence>
        {optionsMode === 'nav' && (
          <div className="absolute bottom-16 left-0 z-50 flex flex-col gap-2">
            {othersNavItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href(baseHref)}
                onClick={() => setOptionsMode('closed')}
              >
                <motion.div className="flex cursor-pointer items-center gap-1">
                  <motion.div
                    className="border-border bg-accent/70 text-foreground/90 hover:text-foreground group/nav relative flex size-12 items-center justify-center gap-2 overflow-hidden rounded-full border px-3 shadow-lg backdrop-blur-md transition-colors"
                    initial={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
                    transition={{
                      duration: 0.15,
                      delay: (othersNavItems.length - index) * 0.08,
                    }}
                  >
                    {item.icon}
                    <Glow
                      className="absolute -left-8 -z-1 size-16 opacity-0 blur-lg transition-all group-hover/nav:-left-4 group-hover/nav:opacity-50"
                      colors="#22d3ee"
                    />
                  </motion.div>
                  <motion.span
                    className="bg-accent/50 text-foreground rounded-full border px-2 py-0.5 text-xs font-medium text-nowrap shadow-xs backdrop-blur-md sm:text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      duration: 0.2,
                      delay: (othersNavItems.length - index) * 0.08 + 0.05,
                    }}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Barra Principal: Botão de Navegação + Barra de Pesquisa */}
      <div className="flex w-full gap-1">
        {/* Botão de Navegação Circular à Esquerda */}
        <div className="border-border bg-accent/70 flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-lg backdrop-blur-md">
          <button
            type="button"
            className="text-foreground/90 relative flex size-12 shrink-0 cursor-pointer items-center justify-center transition-all"
            onClick={() => handleSelectMode('nav')}
            data-state={optionsMode === 'nav' ? 'active' : 'default'}
            aria-label="Abrir menu de navegação"
          >
            {currentNavItem && currentNavItem.icon}
            <Glow
              data-state={optionsMode === 'nav' ? 'active' : 'default'}
              className="absolute -left-8 -z-1 size-16 opacity-0 blur-lg transition-all data-[state=active]:-left-4 data-[state=active]:opacity-100"
              colors="#22d3ee"
            />
          </button>
        </div>

        {/* Pílula de Pesquisa */}
        <div className="border-border bg-accent/70 relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full border px-3 shadow-lg backdrop-blur-md transition-all">
          <MagnifyingGlassIcon
            weight="bold"
            className="text-muted-foreground size-5 shrink-0 sm:size-6"
          />

          <input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            type="text"
            className="placeholder:text-muted-foreground/70 h-full w-full border-0 bg-transparent text-sm outline-hidden transition-all"
            placeholder={placeholder}
          />

          {value.length > 0 && onClear && (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground cursor-pointer transition-all active:scale-90"
              onClick={onClear}
              aria-label="Limpar pesquisa"
            >
              <XIcon weight="bold" className="size-4" />
            </button>
          )}

          {hasFilter && (
            <>
              <div className="bg-muted-foreground/50 h-4 w-px shrink-0" />
              <button
                type="button"
                onClick={handleFilterButtonClick}
                className="text-accent-foreground/80 hover:text-accent-foreground cursor-pointer transition-all ease-in-out active:scale-90"
                aria-label="Opções de filtro"
              >
                {filterIcon || (
                  <FunnelSimpleIcon
                    weight="bold"
                    data-state={
                      isFilterActive || optionsMode === 'filters'
                        ? 'active'
                        : 'default'
                    }
                    className="data-[state=active]:text-foreground size-5 sm:size-6"
                  />
                )}
              </button>

              <Glow
                data-state={isFilterActive ? 'active' : 'inactive'}
                className="absolute -right-8 -z-1 size-16 opacity-0 blur-lg transition-all data-[state=active]:-right-4 data-[state=active]:opacity-100"
                colors={glowColor}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
