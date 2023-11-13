import { z } from 'zod'

export const AnswerFormSchema = z.object({
  answer: z.string().min(100),
})
