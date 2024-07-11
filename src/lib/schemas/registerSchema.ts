
import {z} from 'zod';

export const registerSchema = z.object({
  username:z.string().min(3, {
    message: 'Username must be at least 3 characters'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters'
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters"
  })
})

export type RegisterSchema = z.infer<typeof registerSchema>