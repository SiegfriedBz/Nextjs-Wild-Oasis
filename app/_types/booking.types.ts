/** Booking */
export type TBooking = {
  id: number
  stripeIntentId: string | null
  stripeRefundAmount: number | null
  stripeRefundDate: string | null
  guestId: number
  cabinId: number
  status: string
  startDate: string
  endDate: string
  numOfNights: number
  numOfGuests: number
  totalPrice: number
  hasBreakfast: boolean
  createdAt: string
  cabin: {
    name: string
    image: string
    maxCapacity: number
  }
}

export type TBookingData = {
  id: number
  stripe_intent_id: string | null
  stripe_refund_amount: number | null
  stripe_refund_date: string | null
  guest_id: number
  cabin_id: number
  status: string
  start_date: string
  end_date: string
  num_of_nights: number
  num_of_guests: number
  total_price: number
  has_breakfast: boolean
  created_at: string
  // know for sure that cabin is an object and not an array, but used to trick booking.service.ts
  cabin:
    | {
        name: string
        image: string
        max_capacity: number
      }
    | {
        name: string
        image: string
        max_capacity: number
      }[]
}
