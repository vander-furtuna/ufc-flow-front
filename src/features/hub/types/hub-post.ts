import { PostType } from './post-type'

export interface HubPost {
  id: string
  type: PostType
  title: string
  description?: string | null
  content: string
  courseId: string
  authorId: string
}
