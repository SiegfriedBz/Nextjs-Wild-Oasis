import BookingAction from '@/app/_components/booking/BookingAction'
import type { TBooking } from '@/app/_types/booking.types'
import { formatDistanceFromNow } from '@/app/_utils/date.utils'
import { format, isPast, isToday } from 'date-fns'
import Image from 'next/image'

type TProps = {
  booking: TBooking
  onDelete: (bookingid: number) => void
  onRefund: (bookingid: number) => void
}

// Client-Component
function BookingCard({ booking, onDelete, onRefund }: TProps) {
  const {
    id,
    startDate,
    endDate,
    numOfNights,
    totalPrice,
    numOfGuests,
    hasBreakfast,
    createdAt,
    stripeRefundAmount,
    stripeRefundDate
  } = booking

  const cabinName = booking?.cabin?.name
  const cabinImg = booking?.cabin?.image
  const isRefundedBooking = stripeRefundAmount != null
  const isPastBooking = isPast(new Date(startDate))

  return (
    <div
      className='grid group max-md:grid-cols-1 md:grid-cols-[max-content_1fr_max-content]
        rounded-md
        border border-primary-900
        hover:border-accent-200 hover:border-opacity-70
        shadow-sm shadow-primary-800 
        hover:shadow-sm hover:shadow-primary-700
        transition 
        duration-300 
        ease-in-out 
        overflow-hidden'
    >
      {/* Image */}
      {cabinImg && (
        <div className='relative rounded-md overflow-hidden self-center sm:min-h-full max-md:aspect-video md:aspect-square'>
          <Image
            src={cabinImg}
            fill
            alt={`Cabin ${cabinName}`}
            className='max-md:rounded-t-md md:rounded-l-md shadow-sm shadow-primary-700 object-cover sm:border-r sm:border-primary-800'
          />
        </div>
      )}

      {/* Details */}
      <div className='flex-grow max-sm:mt-4 max-sm:px-6 max-md:px-4 md:px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            {numOfNights} nights in Cabin {cabinName}
          </h3>
          {isRefundedBooking ? (
            <span className='bg-yellow-800 rounded-md text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center'>
              refunded
            </span>
          ) : isPastBooking ? (
            <span className='bg-yellow-800 rounded-md text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center'>
              past
            </span>
          ) : (
            <span className='bg-green-800  rounded-md text-green-200 group-hover:text-accent-100 h-7 px-3 uppercase text-xs font-bold flex items-center'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-lg text-primary-300 mt-4 mb-2 group-hover:text-accent-400'>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex gap-5 mt-auto mb-2 items-baseline'>
          <p className='text-xl font-semibold text-accent-400'>${totalPrice}</p>
          <ul className='max-sm:ms-3 sm:ms-4 list-disc flex max-sm:space-x-6 sm:space-x-8'>
            <li className='text-lg text-primary-300 whitespace-nowrap'>
              {numOfGuests} guest{numOfGuests > 1 && 's'}
            </li>
            {hasBreakfast && (
              <li className='text-lg text-primary-300 whitespace-nowrap'>
                With Breakfast
              </li>
            )}
          </ul>
        </div>

        {isRefundedBooking ? (
          <p className='ml-auto text-sm text-primary-400'>
            Refunded{' '}
            {format(
              new Date(stripeRefundDate as string),
              'EEE, MMM dd yyyy, p'
            )}
          </p>
        ) : (
          <p className='ml-auto text-sm text-primary-400'>
            Booked {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div
        className={`grid max-md:grid-rows-1 md:grid-rows-2
         border-l border-primary-800 max-md:w-full md:w-max`}
      >
        <div className='max-md:hidden w-full bg-gradient-to-r from-primary-950 to-primary-900' />
        {isPastBooking || isRefundedBooking ? (
          // Client-Component
          <BookingAction
            bookingId={id}
            onAction={onDelete}
            actionLabel='Delete'
          />
        ) : (
          // Client-Component
          <BookingAction
            bookingId={id}
            onAction={onRefund}
            actionLabel='Refund'
          />
        )}
      </div>
    </div>
  )
}

export default BookingCard
