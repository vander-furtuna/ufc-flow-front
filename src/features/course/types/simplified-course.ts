import type { IconName } from 'lucide-react/dynamic'

export interface SimplifiedCurriculumStructure {
  id: string
  period: string
  slug: string
  city: string
  isCurrent?: boolean
}

export interface SimplifiedCourse {
  id: string
  slug: string
  name: string
  icon: IconName
  color?: string
  isActive?: boolean
  curriculumStructures: SimplifiedCurriculumStructure[]
}
