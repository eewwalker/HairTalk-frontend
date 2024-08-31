
import {z} from 'zod';

export const questionSchema = z.object({
  userId: z.string(),
  title:z.string(),
  content: z.string(),
  tags: z.string()
})

export type QuestionSchema = z.infer<typeof questionSchema>