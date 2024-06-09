'use client'

type TProps = {
  bookingId: number

  getStripeRefundAction: ({
    bookingId
  }: {
    bookingId: number
  }) => Promise<unknown>
}

const BookingRefundButton = ({
  bookingId,

  getStripeRefundAction
}: TProps) => {
  const action = async () => {
    const refundResponse = await getStripeRefundAction({
      bookingId
    })
    console.log('refundResponse', refundResponse)
  }

  return (
    <form action={action}>
      <button type='submit'>REFUND</button>
    </form>
  )
}

export default BookingRefundButton
