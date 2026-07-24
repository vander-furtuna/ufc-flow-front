export interface Subject {
  id: string
  code: string
  name: string
  slug: string
}

export interface CreateSubjectDto {
  code: string
  name: string
  slug: string
}
