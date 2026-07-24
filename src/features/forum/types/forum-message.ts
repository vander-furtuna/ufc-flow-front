export interface ForumMessage {
  id: string
  content: string
  createdAt: Date
  reportsCount: number
  courseId: string
  authorId: string
  parentId?: string | null
}
