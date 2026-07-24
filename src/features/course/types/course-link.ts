import { LinkType } from './link-type'

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
