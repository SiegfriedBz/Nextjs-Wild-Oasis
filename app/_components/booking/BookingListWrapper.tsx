import Spinner from '@/app/_components/Spinner'
import { auth } from '@/app/_lib/auth'
import { getGuestBookings } from '@/app/_services/bookings.service'
import Link from 'next/link'
import BookingList from './BookingList'

// Server-Component
const BookingListWrapper = async () => {
  const session = await auth()
  const guestId = session?.user.guestId as number
  const guestBookings = await getGuestBookings(guestId)

  return guestBookings.length === 0 ? (
    <p className='text-lg'>
      You have no booking yet. Check out our{' '}
      <Link className='underline text-accent-500' href='/cabins'>
        luxury cabins &rarr;
      </Link>
    </p>
  ) : (
    // Client-Component
    <BookingList guestBookings={guestBookings} />
  )
}

export default BookingListWrapper

export const LoadingBookingListWrapper = () => {
  return (
    <ul className='space-y-6'>
      {Array.from({ length: 8 }, (_, index) => {
        return <Spinner key={index} />
      })}
    </ul>
  )
}
