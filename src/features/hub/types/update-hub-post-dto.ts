import { PostType } from './post-type'

export interface UpdateHubPostDto {
  type?: PostType
  title?: string
  description?: string
  content?: string
  courseId?: string
  authorId?: string
}
