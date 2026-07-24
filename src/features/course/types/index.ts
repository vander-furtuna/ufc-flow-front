export type LinkType = 'SITE' | 'DOCUMENTO' | 'VIDEO' | 'ARQUIVO_GERAL' | 'OUTRO'
export type BranchType = 'EMPHASIS' | 'SPECIFIC_GROUP' | 'SLOPE'
export type Nature =
  | 'OBRIGATÓRIA'
  | 'OPTATIVA'
  | 'ATIVIDADE_COMPLEMENTAR'
  | 'EXTENSÃO'
  | 'ESTÁGIO'
  | 'TCC'
  | 'MÓDULO'
  | 'TÓPICO_ESPECIAL'
  | 'OUTRO'

export type SubjectType =
  | 'DISCIPLINA'
  | 'ATIVIDADE_COMPLEMENTAR'
  | 'TRABALHO_DE_CONCLUSÃO_DE_CURSO'
  | 'ESTÁGIO'
  | 'UNIDADE_CURRICULAR_ESPECIAL_DE_EXTENSÃO'
  | 'MÓDULO'
  | 'TÓPICO_AVANÇADO'
  | 'SEMINÁRIO'
  | 'TUTORIA'
  | 'OUTRO'

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

export interface CourseLink {
  id: string
  title: string
  url: string
  description?: string | null
  iconName?: string | null
  type: LinkType
  createdAt: Date
  courseId: string
}

export interface CreateCourseLinkDto {
  title: string
  url: string
  description?: string
  iconName?: string
  type: LinkType
  courseId: string
}

export interface UpdateCourseLinkDto {
  title?: string
  url?: string
  description?: string
  iconName?: string
  type?: LinkType
  courseId?: string
}

export interface CurricularStructure {
  id: string
  period: string
  slug: string
  city: string
  isCurrent: boolean
  minTotalHours: number
  courseId: string
}

export interface Branch {
  id: string
  name: string
  color: string
  type: BranchType
  parentBranchId?: string | null
  structureId: string
}

export interface Subject {
  id: string
  code: string
  name: string
  slug: string
}

export interface CreateSubjectDto {
  code: string
  name: string
  slug: string
}

export interface StructureSubject {
  id: string
  semester: number
  duration: number
  nature: Nature
  type: SubjectType
  aula: number
  lab: number
  ead: number
  ext: number
  cr: number
  subjectId: string
  structureId: string
}

export interface RegisterCoursePayloadDto {
  slug: string
  name: string
  icon: string
  color?: string
  structure: {
    period: string
    slug: string
    city: string
    isCurrent: boolean
    minTotalHours: number
  }
  branches?: Array<{
    name: string
    color: string
    type: BranchType
  }>
  subjects?: Array<{
    code: string
    name: string
    slug: string
    semester: number
    duration: number
    nature: Nature
    type: SubjectType
    aula: number
    lab: number
    ead: number
    ext: number
    cr: number
  }>
  links?: Array<{
    title: string
    url: string
    description?: string
    iconName?: string
    type: LinkType
  }>
}
