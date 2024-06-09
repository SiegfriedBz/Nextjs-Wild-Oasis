'use server'

import { auth } from '@/app/_lib/auth'
import { getCabin } from '@/app/_services/cabins.service'
import { getStripeCheckoutSession } from '@/app/_services/stripe/getStripeCheckoutSession.service'
import AppError from '@/app/_utils/AppError.utils'
import Stripe from 'stripe'

/** Stripe */
export async function getStripeCheckoutAction({
  bookingId,
  cabinId,
  totalPrice
}: {
  bookingId: number
  cabinId: number
  totalPrice: number
}) {
  try {
    const [session, cabin] = await Promise.all([auth(), getCabin(cabinId)])

    if (!session) {
      throw new AppError({
        statusCode: 401,
        message: 'You are not authenticated'
      })
    }

    if (!cabin?.id) {
      throw new AppError({
        statusCode: 404,
        message: 'Cabin not found'
      })
    }

    const guestEmail = session.user.email as string

    // Get Stripe Checkout Session from service
    const stripeSession = await getStripeCheckoutSession({
      bookingId,
      guestEmail,
      cabinData: cabin,
      totalBookingPrice: totalPrice
    })
    const stripeSessionId: Stripe.Response<Stripe.Checkout.Session>['id'] =
      stripeSession?.id

    return stripeSessionId
  } catch (error) {
    console.log('Error in getStripeCheckoutAction:', error)
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
