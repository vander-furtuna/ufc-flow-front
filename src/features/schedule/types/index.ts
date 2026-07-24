export interface Schedule {
  id: string
  name: string
  year: number
  period: number
  userCourseId: string
  courseId: string
}

export interface CreateScheduleDto {
  name: string
  year: number
  period: number
  userCourseId: string
  courseId: string
}

export interface UpdateScheduleDto {
  name?: string
  year?: number
  period?: number
}

export interface AssociateSubjectDto {
  subjectId: string
}
