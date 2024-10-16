
import {z} from 'zod';

export const questionSchema = z.object({
  title:z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
  tags: z.array(z.string()).max(5, "maximum 5 tags allowed").optional()
})

export type QuestionSchema = z.infer<typeof questionSchema>