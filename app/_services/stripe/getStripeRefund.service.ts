import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type TProps = {
  stripeIntentId: string
}
export const getStripeRefund = async ({ stripeIntentId }: TProps) => {
  const refund = await stripe.refunds.create({
    payment_intent: stripeIntentId
  })

  return refund
}
