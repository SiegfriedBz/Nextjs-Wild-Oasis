import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import { updateBooking } from '@/app/_services/bookings.service'
import { revalidatePath } from 'next/cache'

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = headers().get('stripe-signature') as string

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400
    })
  }

  // Handle the checkoutSessionCompleted event
  if (event.type === 'checkout.session.completed') {
    const checkoutSessionCompleted = event.data.object
    const referenceId = checkoutSessionCompleted.client_reference_id

    const bookingId = parseInt(referenceId as string, 10)
    const paymentIntent = checkoutSessionCompleted.payment_intent as string

    console.log(`Stripe webhook CHECKOUT bookingId`, bookingId)
    console.log(`Stripe webhook CHECKOUT paymentIntent`, paymentIntent)

    if (!bookingId) {
      return new Response(`Webhook Error: bookingId not found`, {
        status: 400
      })
    }
    if (!paymentIntent) {
      return new Response(`Webhook Error: paymentIntent not found`, {
        status: 400
      })
    }

    // add stripe_intent_id to booking to handle future possible stripe refund
    const paidBooking = await updateBooking({
      id: bookingId,
      updatedFields: { is_paid: true, stripe_intent_id: paymentIntent }
    })

    revalidatePath('/account/bookings')
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response('RESPONSE EXECUTE', {
    status: 200
  })
}
