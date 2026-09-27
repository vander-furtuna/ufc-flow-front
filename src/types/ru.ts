export type CampusId = 1 | 3 | 4 | 5 | 6 | 7

export interface CampusOption {
  id: CampusId
  name: string
  fullName: string
  city: string
  units?: string[]
}

export const UFC_CAMPUSES: CampusOption[] = [
  {
    id: 1,
    name: 'Fortaleza',
    fullName: 'Restaurante Universitário de Fortaleza',
    city: 'Fortaleza',
    units: ['Pici 1', 'Pici 2', 'Benfica', 'Porangabussu', 'Labomar'],
  },
  {
    id: 4,
    name: 'Sobral',
    fullName: 'Restaurante Universitário de Sobral',
    city: 'Sobral',
    units: ['Campus Mucambinho', 'Campus CIDAO'],
  },
  {
    id: 5,
    name: 'Quixadá',
    fullName: 'Restaurante Universitário de Quixadá',
    city: 'Quixadá',
  },
  {
    id: 3,
    name: 'Russas',
    fullName: 'Restaurante Universitário de Russas',
    city: 'Russas',
  },
  {
    id: 6,
    name: 'Crateús',
    fullName: 'Restaurante Universitário de Crateús',
    city: 'Crateús',
  },
  {
    id: 7,
    name: 'Itapajé',
    fullName: 'Restaurante Universitário de Itapajé',
    city: 'Itapajé',
  },
]

export type MealType = 'desjejum' | 'almoco' | 'jantar'

export interface MenuItem {
  id: string
  name: string
  hasGluten: boolean
  hasLactose: boolean
}

export interface MealCategory {
  category: string
  items: MenuItem[]
}

export interface Meal {
  type: MealType
  title: string
  isEmpty: boolean
  categories: MealCategory[]
}

export interface RUMenuDay {
  id: string // `${campusId}-${date}`
  campusId: CampusId
  campusName: string
  date: string // YYYY-MM-DD
  currentLabel: string // e.g. "Sexta (25/09)"
  prevDate: string | null // YYYY-MM-DD
  prevLabel: string | null
  nextDate: string | null // YYYY-MM-DD
  nextLabel: string | null
  isClosedOrEmpty: boolean
  emptyMessage: string | null
  meals: {
    desjejum: Meal | null
    almoco: Meal | null
    jantar: Meal | null
  }
  updatedAt?: string
}

export interface RUMenuFilter {
  searchQuery?: string
  onlyVegetarian?: boolean
  glutenFree?: boolean
  lactoseFree?: boolean
}

export interface RUMenuWeek {
  id: string // `${campusId}-week-${weekStartDate}`
  campusId: CampusId
  campusName: string
  weekStartDate: string // YYYY-MM-DD (Monday)
  weekEndDate: string // YYYY-MM-DD (Friday)
  label: string // e.g. "Semana de 28/09 a 02/10"
  prevWeekDate: string // YYYY-MM-DD
  nextWeekDate: string // YYYY-MM-DD
  days: RUMenuDay[]
  updatedAt?: string
}

export type RUViewMode = 'day' | 'week'
export type WeekMealFilter = 'all' | 'almoco' | 'jantar' | 'desjejum'
