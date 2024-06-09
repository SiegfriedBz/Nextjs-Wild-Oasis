import type { TCabin } from '@/app/_types/cabin.types'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type TProps = {
  bookingId: number
  guestEmail: string
  cabinData: TCabin
  totalBookingPrice: number
}
export const getStripeCheckoutSession = async ({
  bookingId,
  guestEmail,
  cabinData,
  totalBookingPrice
}: TProps) => {
  const { id: cabinId, name, image, description } = cabinData

  const refererUrl = process.env.CORS_ALLOWED_ORIGIN
  const origin = new URL(refererUrl as string).origin

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${origin}/thank-you`,
    cancel_url: `${origin}/cabins/${cabinId}`,
    customer_email: guestEmail,
    client_reference_id: bookingId.toString(),
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Cabin ${name}`,
            description: `${description.slice(0, 84)}...
            👋 👉 Card: 4242 4242 4242 4242 - 04/32 - 424`,
            // works only with live hosted imgs
            images: [image]
          },
          unit_amount: Number(totalBookingPrice) * 100 // CENTS
        },
        quantity: 1
      }
    ]
  })

  return stripeSession
}
