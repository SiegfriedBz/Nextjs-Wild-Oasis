'use client'

import BookingCard from '@/app/_components/booking/BookingCard'
import type { TBooking } from '@/app/_types/booking.types'
import { useOptimistic } from 'react'
import { deleteBookingAction } from '@/app/_actions/booking.actions'
import { getStripeRefundAction } from '@/app/_actions/stripe/getStripeRefundAction.actions'
import { toast } from 'react-toastify'

type TProps = {
  guestBookings: TBooking[]
}

const optimisticReducer = (
  state: TBooking[],
  { action, bookingId }: { action: string; bookingId: number }
) => {
  switch (action) {
    case 'optimisticDelete':
      return state.filter((b) => b.id !== bookingId)
    case 'optimisticRefund':
      return state.map((b) => {
        return b.id !== bookingId
          ? b
          : {
              ...b,
              totalPrice: 0,
              stripeRefundAmount: b.totalPrice,
              stripeRefundDate: new Date().toISOString()
            }
      })
    default:
      return state
  }
}

const BookingList = ({ guestBookings }: TProps) => {
  const [optimisticBookings, setOptimisticBookings] = useOptimistic(
    guestBookings,
    optimisticReducer
  )

  // useOptimistic - DELETE
  const handleDeleteBooking = async (bookingId: number) => {
    // call optimistid delete
    setOptimisticBookings({ action: 'optimisticDelete', bookingId })
    // call server action
    await deleteBookingAction({ bookingId })
    toast.success('Booking deleted successfully')
  }

  // useOptimistic - REFUND
  const handleRefundBooking = async (bookingId: number) => {
    // call optimistid refund
    setOptimisticBookings({ action: 'optimisticRefund', bookingId })
    // call server action
    await getStripeRefundAction({ bookingId })
    toast.success('Booking refunded successfully')
  }

  return (
    <ul className='max-w-6xl max-sm:space-y-8 max-md:space-y-12 md:space-y-6 xl:space-y-8'>
      {optimisticBookings.map((booking: TBooking) => (
        // Client-Component
        <BookingCard
          key={booking.id}
          booking={booking}
          onDelete={handleDeleteBooking}
          onRefund={handleRefundBooking}
        />
      ))}
    </ul>
  )
}

export default BookingList
