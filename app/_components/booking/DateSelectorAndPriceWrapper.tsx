import DateSelector from '@/app/_components/booking/DateSelector'
import { getBookedDatesByCabinId } from '@/app/_services/bookings.service'
import type { TCabin } from '@/app/_types/cabin.types'
import type { TAppSettings } from '@/app/_types/misc.types'
import DisplayPrice from './DisplayPrice'

type TProps = {
  cabin: TCabin
  minBookingLength: TAppSettings['minBookingLength']
  maxBookingLength: TAppSettings['maxBookingLength']
  breakfastPrice: TAppSettings['breakfastPrice']
}
// Server-component
const DateSelectorAndPriceWrapper = async ({
  cabin,
  minBookingLength,
  maxBookingLength,
  breakfastPrice
}: TProps) => {
  const { regularPrice, discount } = cabin

  const bookedDates = await getBookedDatesByCabinId(cabin.id)

  return (
    <div
      className='flex flex-col justify-between scroll-mt-32'
      id='select-date'
    >
      {/* Client-component */}
      <DateSelector
        bookedDates={bookedDates}
        minBookingLength={minBookingLength}
        maxBookingLength={maxBookingLength}
      />
      {/* Client-component */}
      <DisplayPrice
        breakfastPrice={breakfastPrice}
        regularPrice={regularPrice}
        discount={discount}
      />
    </div>
  )
}

export default DateSelectorAndPriceWrapper
