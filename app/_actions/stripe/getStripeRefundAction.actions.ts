'use server'

import { auth } from '@/app/_lib/auth'
import { getBooking, updateBooking } from '@/app/_services/bookings.service'
import { getStripeRefund } from '@/app/_services/stripe/getStripeRefund.service'
import AppError from '@/app/_utils/AppError.utils'
import { isFutureDate } from '@/app/_utils/date.utils'
import { revalidatePath } from 'next/cache'
import Stripe from 'stripe'

/** Stripe */
export async function getStripeRefundAction({
  bookingId
}: {
  bookingId: number
}) {
  try {
    const [session, booking] = await Promise.all([
      auth(),
      getBooking(bookingId)
    ])

    if (!session) {
      throw new AppError({
        statusCode: 401,
        message: 'You are not authenticated'
      })
    }

    // Check is currentUser's booking
    const guestId = session.user.guestId
    const isGuestBooking = booking.guestId === guestId

    if (!isGuestBooking) {
      throw new AppError({
        statusCode: 403,
        message: 'You can only get a refund on your own bookings'
      })
    }

    console.log('====== IN getStripeRefundAction bookingId', bookingId)
    console.log('====== IN getStripeRefundAction booking', booking)
    console.log(
      '====== IN getStripeRefundAction booking.stripeIntentId',
      booking.stripeIntentId
    )

    if (!booking?.id || !booking.stripeIntentId) {
      throw new AppError({
        statusCode: 404,
        message: 'Booking not found'
      })
    }

    // Check if booking in future
    const isBookingInFuture = isFutureDate(booking.startDate)
    if (!isBookingInFuture) {
      throw new AppError({
        statusCode: 400,
        message: 'Booking to refund must be in future'
      })
    }

    const stripeIntentId = booking.stripeIntentId as string
    const totalPriceBeforeRefund = booking.totalPrice

    // Get Stripe Checkout Session from service
    const refund: Stripe.Response<Stripe.Refund> = await getStripeRefund({
      stripeIntentId: stripeIntentId
    })

    if (!refund) {
      throw new AppError({ statusCode: 500, message: 'Error on refund' })
    }

    const refundAmount = refund.amount / 100

    const updatedTotalPrice = totalPriceBeforeRefund - refundAmount

    await updateBooking({
      id: bookingId,
      updatedFields: {
        total_price: updatedTotalPrice,
        stripe_refund_amount: refundAmount,
        stripe_refund_date: new Date().toISOString()
      }
    })

    revalidatePath('/account/bookings')

    return refundAmount
  } catch (error) {
    console.log('Error in stripeRefundAction:', error)
    if (error instanceof AppError) {
      throw error
    } else {
      const err = error as Error
      throw new AppError({
        statusCode: 500,
        message: err.message
      })
    }
  }
}
