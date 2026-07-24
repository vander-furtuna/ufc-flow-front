import { BranchType } from './branch-type'
import { LinkType } from './link-type'
import { Nature } from './nature'
import { SubjectType } from './subject-type'

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
