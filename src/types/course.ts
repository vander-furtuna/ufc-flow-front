import type { IconName } from 'lucide-react/dynamic'

export type Nature =
  | 'OBRIGATÓRIA'
  | 'OPTATIVA'
  | 'ATIVIDADE COMPLEMENTAR'
  | 'EXTENSÃO'
  | 'ESTÁGIO'
  | 'TCC'
  | 'MÓDULO'
  | 'TÓPICO ESPECIAL'
  | 'OUTRO'

export type SubjectType =
  | 'DISCIPLINA'
  | 'ATIVIDADE COMPLEMENTAR'
  | 'TRABALHO DE CONCLUSÃO DE CURSO'
  | 'ESTÁGIO'
  | 'UNIDADE CURRICULAR ESPECIAL DE EXTENSÃO'
  | 'MÓDULO'
  | 'TÓPICO AVANÇADO'
  | 'SEMINÁRIO'
  | 'TUTORIA'
  | 'OUTRO'

export type BranchType = 'EMPHASIS' | 'SPECIFIC_GROUP' | 'SLOPE'

export type Branch = {
  id: string
  name: string
  color: string
  type?: BranchType
  parentBranchId?: string
  minHours?: number
  minComponents?: number
}

export type Subject = {
  id: string
  code: string
  name: string
  slug: string
  semester: number
  duration: number
  nature: Nature
  type: SubjectType
  aula?: number
  lab?: number
  ead?: number
  ext?: number
  cr?: number
  subjectId?: string
  structureId?: string
  subject?: {
    id: string
    code: string
    name: string
    slug: string
  }
  branchIds?: string[]
  prerequisiteCodes?: string[]
  equivalenceCodes?: string[]
  corequisiteCodes?: string[]
  branchRelations?: {
    branchId: string
    nature: Nature
  }[]
  // Legacy aliases
  branch?: string[]
  prerequisites?: string[]
  equivalences?: string[]
  corequisites?: string[]
  details?: {
    aula: number
    lab: number
    ead: number
    ext: number
    cr: number
  }
}

export type CurriculumStructure = {
  id: string
  period: string
  slug: string
  city: string
  isCurrent?: boolean
  minTotalHours: number
  maxTotalHours?: number
  mandatoryHours?: number
  optativeHours?: number
  extensionHours?: number
  mandatoryAcademicActivityHours?: number
  maxOptativeFreeHours?: number
  minPeriods?: number
  avgPeriods?: number
  maxPeriods?: number
  periodHours?: {
    min: number
    avg: number
    max: number
  }
  branches?: Branch[]
  /** @deprecated use branches */
  branchs?: Branch[]
  subjects: Subject[]
}

export type Course = {
  id: string
  slug: string
  name: string
  icon: IconName
  color?: string
  isActive?: boolean
  curriculumStructures: CurriculumStructure[]
}
