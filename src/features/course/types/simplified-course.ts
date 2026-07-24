export interface SimplifiedCurriculumStructure {
  id: string
  period: string
  slug: string
  isCurrent?: boolean
}

export interface SimplifiedCourse {
  id: string
  slug: string
  name: string
  icon: string
  color?: string
  isActive?: boolean
  curriculumStructures: SimplifiedCurriculumStructure[]
}
