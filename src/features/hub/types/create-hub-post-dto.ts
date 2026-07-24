import { PostType } from './post-type'

export interface CreateHubPostDto {
  type: PostType
  title: string
  description?: string
  content: string
  courseId: string
  authorId: string
}
