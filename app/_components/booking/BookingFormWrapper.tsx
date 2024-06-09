import { createUnConfirmedBookingAction } from '@/app/_actions/booking.actions'
import { getStripeCheckoutAction } from '@/app/_actions/stripe/getStripeCheckoutAction.actions'
import LoginMessage from '@/app/_components/LoginMessage'
import UserAvatar from '@/app/_components/UserAvatar'
import BookingForm from '@/app/_components/booking/BookingForm'
import { auth } from '@/app/_lib/auth'
import type { TCabin } from '@/app/_types/cabin.types'
import type { TSessionUser } from '@/app/_types/user.types'

type TProps = {
  cabin: TCabin
}

// Server-component
const BookingFormWrapper = async ({ cabin }: TProps) => {
  const { id: cabinId, maxCapacity } = cabin

  const session = await auth()
  const loggedinUser = session?.user as TSessionUser | null

  if (!loggedinUser) {
    return <LoginMessage />
  }

  return (
    // Client-component
    <BookingForm
      createUnConfirmedBookingAction={createUnConfirmedBookingAction}
      getStripeCheckoutAction={getStripeCheckoutAction}
      guestName={loggedinUser.name}
      cabinId={cabinId}
      maxCapacity={maxCapacity}
    >
      <UserAvatar user={loggedinUser} />
    </BookingForm>
  )
}

export default BookingFormWrapper
