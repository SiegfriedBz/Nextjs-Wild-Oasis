import * as z from 'zod'

const createBookingZodSchema = z.object({
  // hidden fields
  total_price: z.number(),
  cabin_id: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  num_of_nights: z.number({
    required_error: 'Please select your booking dates'
  }),
  status: z.string().optional(),
  is_paid: z.boolean().optional(),
  // user input fields
  num_of_guests: z
    .number({
      required_error: 'Please enter the number of guests'
    })
    .refine((data) => data > 0, 'Please enter the number of guests'),
  observations: z.string().optional(),
  has_breakfast: z.boolean()
})

type TMutateBookingInput = z.infer<typeof createBookingZodSchema> & {
  guest_id?: number
  stripe_intent_id?: string
  stripe_charge_id?: string
  stripe_refund_amount?: number
  stripe_refund_date?: string
}

export { createBookingZodSchema, type TMutateBookingInput }
