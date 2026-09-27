import {
  CalendarClock,
  CalendarDays,
  GraduationCap,
  LayoutGrid,
  UtensilsCrossed,
} from 'lucide-react'
import type { JSX } from 'react'

export function mountHref(path: string, baseHref?: string) {
  return baseHref ? `${baseHref}${path}` : path
}

export type NavItem = {
  id: string
  label: string
  icon: JSX.Element
  href: (baseHref?: string) => string
}

export const navItems: NavItem[] = [
  {
    id: 'cursos',
    label: 'Cursos',
    icon: <GraduationCap className="size-6 text-inherit" />,
    href: () => '/cursos',
  },
  {
    id: 'grade',
    label: 'Grade Curricular',
    icon: <LayoutGrid className="size-6 text-inherit" />,
    href: (baseHref?: string) => mountHref('', baseHref) || '/',
  },
  {
    id: 'agenda',
    label: 'Simular Agenda',
    icon: <CalendarClock className="size-6 text-inherit" />,
    href: (baseHref?: string) => (baseHref ? `${baseHref}/agenda` : '/'),
  },
  {
    id: 'calendario',
    label: 'Calendário Acadêmico',
    icon: <CalendarDays className="size-6 text-inherit" />,
    href: () => '/calendario',
  },
  {
    id: 'restaurante',
    label: 'Cardápio do RU',
    icon: <UtensilsCrossed className="size-6 text-inherit" />,
    href: () => '/restaurante',
  },
]
