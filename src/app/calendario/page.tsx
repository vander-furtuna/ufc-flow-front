'use client'

import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { ListView } from './components/list-view'
import { useState } from 'react'
import { CalendarView } from './components/calendar-view'
import {
  CalendarBlankIcon,
  ListIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { COLORS } from '@/data/colors'
import { AppSearchBar } from '@/components/app-search-bar'

export default function AcademicCalendarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showImportantEvents, setShowImportantEvents] = useState(false)
  const [view, setView] = useState<'list' | 'calendar'>('list')

  return (
    <div className="flex h-dvh w-full max-w-7xl flex-col items-center justify-start overflow-hidden">
      <div
        className={cn(
          'flex h-full min-h-0 w-full flex-col gap-4 p-2 transition-all lg:p-6',
          view === 'list' && 'px-4 pt-4 pb-0 lg:pb-0!',
        )}
      >
        <header className="bg-accent/30 border-border/50 flex h-18 w-full shrink-0 items-center justify-between rounded-lg border px-3 py-4 sm:px-4">
          <Link href="/" aria-label="Home">
            <Logo className="h-10" id="tour-return" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-muted flex rounded-lg p-1">
              <button
                onClick={() => setView('list')}
                className={cn(
                  'text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-all duration-200',
                  view === 'list' && 'bg-background text-primary border-border',
                )}
              >
                <ListIcon weight="bold" className="h-4 w-4" />
                <span className="hidden sm:inline">Lista</span>
              </button>
              <button
                onClick={() => setView('calendar')}
                className={cn(
                  'text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-all duration-200',
                  view === 'calendar' &&
                    'bg-background text-primary border-border',
                )}
              >
                <CalendarBlankIcon weight="bold" className="h-4 w-4" />
                <span className="hidden sm:inline">Calendário</span>
              </button>
            </div>
            <ModeToggle />
          </div>
        </header>
        {view === 'list' ? (
          <ListView
            search={searchQuery}
            showImportantEvents={showImportantEvents}
          />
        ) : (
          <CalendarView />
        )}
        {view === 'list' && (
          <div className="fixed bottom-8 left-0 z-50 flex w-full justify-center px-4">
            <AppSearchBar
              placeholder="Pesquisar evento"
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              currentNavId="calendario"
              isFilterActive={showImportantEvents}
              filterIcon={
                <WarningCircleIcon
                  weight="bold"
                  data-state={showImportantEvents ? 'active' : 'default'}
                  className="data-[state=active]:text-foreground size-5 sm:size-6"
                />
              }
              onFilterClick={() => setShowImportantEvents(!showImportantEvents)}
              glowColor={COLORS.COMPULSORY}
            />
          </div>
        )}
        <div className="to-background pointer-events-none fixed bottom-0 z-49 h-12 w-full bg-linear-to-b from-transparent" />
      </div>
    </div>
  )
}
