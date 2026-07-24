import { z } from 'zod'
import { createCourseLinkSchema } from './create-course-link.schema'

export const updateCourseLinkSchema = createCourseLinkSchema.partial()
export type UpdateCourseLinkSchema = z.infer<typeof updateCourseLinkSchema>
