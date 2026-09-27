'use client'

import { CourseLink } from '@/components/couse-link'
import { Header } from '@/components/header'
import { Line } from '@/components/title'
import { COURSES_DATA } from '@/data/courses'
import { CalendarDays, Search, Star, UtensilsCrossed, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = COURSES_DATA.filter((course) => {
    const query = searchQuery.toLowerCase()
    return course.name.toLowerCase().includes(query) && course.isActive
  })

  return (
    <main className="flex min-h-dvh w-full justify-center-safe px-6 pt-12 pb-24">
      <section className="flex w-full max-w-4xl flex-col gap-12">
        <Header />

        <article className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full items-center gap-6">
            <Line />
            <h1 className="font-clash text-foreground text-2xl font-semibold text-nowrap uppercase md:text-3xl">
              Escolha um curso
            </h1>
            <Line />
          </div>
          <div className="flex w-full items-center justify-start gap-1.5">
            <Star className="text-foreground size-5" />
            <span>Grade Vigente</span>
          </div>
          <div className="grid w-full grid-flow-row grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredCourses.map((course) => (
              <CourseLink icon={course.icon} key={course.id} course={course} />
            ))}
          </div>
        </article>
      </section>

      <div className="fixed bottom-8 left-0 z-50 flex w-full justify-center gap-1.5 px-4">
        <Link
          className="border-border bg-accent/70 hover:bg-accent flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-lg backdrop-blur-md transition-all active:scale-95"
          href="/restaurante"
          title="Cardápio do RU"
        >
          <button
            type="button"
            className="text-foreground/90 relative flex size-12 shrink-0 items-center justify-center transition-all"
            aria-label="Cardápio do Restaurante Universitário"
          >
            <UtensilsCrossed className="size-5" />
          </button>
        </Link>
        <Link
          className="border-border bg-accent/70 hover:bg-accent flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-lg backdrop-blur-md transition-all active:scale-95"
          href="/calendario"
          title="Calendário Acadêmico"
        >
          <button
            type="button"
            className="text-foreground/90 relative flex size-12 shrink-0 items-center justify-center transition-all"
            aria-label="Calendário Acadêmico"
          >
            <CalendarDays className="size-5" />
          </button>
        </Link>
        <div className="border-border bg-accent/70 relative flex h-12 w-full max-w-96 items-center justify-center gap-2 overflow-hidden rounded-full border px-3 shadow-lg backdrop-blur-md transition-all">
          <Search className="text-muted-foreground size-6 shrink-0" />

          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
            type="text"
            className="h-full w-full border-0 bg-transparent text-sm outline-0 transition-all"
            placeholder="Pesquisar curso"
          />
          {searchQuery.length > 0 && (
            <>
              <div className="bg-muted-foreground/50 h-4 w-px" />
              <button
                type="button"
                className="transition-all ease-in-out active:scale-90"
                onClick={() => setSearchQuery('')}
              >
                <X />
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
