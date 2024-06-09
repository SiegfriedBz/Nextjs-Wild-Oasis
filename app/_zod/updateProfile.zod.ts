import * as z from 'zod'

const updateProfileZodSchema = z
  .object({
    // name: string
    // email: string
    national_id: z.string().optional(),
    nationality: z.string().optional()
  })
  .refine(
    (data) =>
      data?.national_id &&
      data.national_id.length >= 4 &&
      data.national_id.length <= 24,
    {
      message: 'National ID must be 4-24 characters long',
      path: ['national_id']
    }
  )

type TUpdateProfileInput = z.infer<typeof updateProfileZodSchema>

export { updateProfileZodSchema, type TUpdateProfileInput }
