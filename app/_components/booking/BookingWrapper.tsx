import DateSelectorAndPriceWrapper from '@/app/_components/booking//DateSelectorAndPriceWrapper'
import BookingFormWrapper from '@/app/_components/booking/BookingFormWrapper'
import Spinner from '@/app/_components/Spinner'
import { getSettings } from '@/app/_services/settings.service'
import type { TCabin } from '@/app/_types/cabin.types'
import { Suspense } from 'react'

// Server-component
const BookingWrapper = async ({ cabin }: { cabin: TCabin }) => {
  const appSettings = await getSettings()
  const { minBookingLength, maxBookingLength, breakfastPrice } = appSettings

  return (
    <>
      <Suspense fallback={<Spinner />}>
        {/* async Server-component */}
        <DateSelectorAndPriceWrapper
          cabin={cabin}
          minBookingLength={minBookingLength}
          maxBookingLength={maxBookingLength}
          breakfastPrice={breakfastPrice}
        />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {/* async Server-component */}
        <BookingFormWrapper cabin={cabin} />
      </Suspense>
    </>
  )
}

export default BookingWrapper

const GetAppSettings = async () => {}
