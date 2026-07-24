export type PostType = 'NEWS' | 'EVENT' | 'SCHOLARSHIP' | 'PROJECT' | 'OTHER'

export interface HubPost {
  id: string
  type: PostType
  title: string
  description?: string | null
  content: string
  courseId: string
  authorId: string
}

export interface CreateHubPostDto {
  type: PostType
  title: string
  description?: string
  content: string
  courseId: string
  authorId: string
}

export interface UpdateHubPostDto {
  type?: PostType
  title?: string
  description?: string
  content?: string
  courseId?: string
  authorId?: string
}
