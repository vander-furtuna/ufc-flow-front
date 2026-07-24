import { Nature } from './nature'
import { SubjectType } from './subject-type'

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
