export const dynamic = 'force-dynamic'

import BookingListWrapper, {
  LoadingBookingListWrapper
} from '@/app/_components/booking/BookingListWrapper'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Bookings'
}

const Bookings = () => {
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Your bookings
      </h2>

      <Suspense fallback={<LoadingBookingListWrapper />}>
        {/* Server-Component */}
        <BookingListWrapper />
      </Suspense>
    </div>
  )
}

export default Bookings
