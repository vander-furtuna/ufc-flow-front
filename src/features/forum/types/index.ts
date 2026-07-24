export interface ForumMessage {
  id: string
  content: string
  createdAt: Date
  reportsCount: number
  courseId: string
  authorId: string
  parentId?: string | null
}

export interface CreateForumMessageDto {
  content: string
  courseId: string
  authorId: string
  parentId?: string
}

export interface UpdateForumMessageDto {
  content?: string
  reportsCount?: number
}
