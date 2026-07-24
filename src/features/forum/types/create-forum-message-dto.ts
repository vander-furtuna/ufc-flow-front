export interface CreateForumMessageDto {
  content: string
  courseId: string
  authorId: string
  parentId?: string
}
