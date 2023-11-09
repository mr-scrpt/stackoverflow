import * as z from 'zod'

export const QuestionFormSchema = z.object({
  title: z.string().min(5).max(130),
})
