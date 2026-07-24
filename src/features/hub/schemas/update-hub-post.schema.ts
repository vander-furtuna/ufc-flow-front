import { z } from 'zod'
import { createHubPostSchema } from './create-hub-post.schema'

export const updateHubPostSchema = createHubPostSchema.partial()
export type UpdateHubPostSchema = z.infer<typeof updateHubPostSchema>
