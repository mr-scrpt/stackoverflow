import { z } from 'zod'

export const ProfileFormSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  bio: z.string().min(10).max(500),
  portfolioWebsite: z.string().url().max(500),
  location: z.string().min(4).max(50),
})
