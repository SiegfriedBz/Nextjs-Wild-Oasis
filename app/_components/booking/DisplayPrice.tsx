'use client'

import {
  type TBookingContext,
  useBookingContext
} from '@/app/_hooks/useBookingContext'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = {
  regularPrice: number
  discount: number
  breakfastPrice: number
}

const DisplayPrice = ({ regularPrice, discount, breakfastPrice }: TProps) => {
  const context = useBookingContext()
  const {
    totalPrice,
    numOfNights,
    range,
    resetRange,
    numOfGuests,
    hasBreakfast,
    setRegularPrice,
    setDiscount,
    setBreakfastPrice
  } = context as TBookingContext

  // set bookingContext from cabin props & app settings
  useEffect(() => {
    // from cabin
    setRegularPrice(regularPrice)
    setDiscount(discount)
    // from app settings
    setBreakfastPrice(breakfastPrice)
  }, [
    setRegularPrice,
    regularPrice,
    setDiscount,
    discount,
    setBreakfastPrice,
    breakfastPrice
  ])

  const totalBreakfastPrice = !hasBreakfast
    ? 0
    : breakfastPrice * numOfGuests * numOfNights

  return (
    <div
      className={`flex items-center justify-between 
        u-gradient-accent
        text-primary-800 
        max-sm:px-4 sm:px-8 
        max-sm:h-fit 
        max-sm:py-4
        ${numOfNights && hasBreakfast ? 'min-h-24' : 'min-h-16'}
      `}
    >
      <div className='flex flex-col items-baseline gap-2'>
        <div className='flex max-sm:flex-col max-lg:flex-row max-xl:flex-col xl:flex-row items-baseline gap-2'>
          <div className='flex items-center'>
            <p className='flex gap-x-2 items-center'>
              {discount > 0 ? (
                <>
                  <span className='max-sm:text-xl sm:text-2xl'>
                    ${regularPrice - discount}
                  </span>
                  <span className='line-through font-semibold text-primary-700'>
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className='text-2xl'>${regularPrice}</span>
              )}
              <span className=''>/night</span>
            </p>

            <p
              className={`${
                numOfNights
                  ? 'rounded-md px-4 py-1 max-sm:text-xl sm:text-2xl'
                  : 'hidden'
              }`}
            >
              <span>&times;</span> <span>{numOfNights}</span>
            </p>
          </div>

          <p className={`${numOfNights ? 'flex items-baseline' : 'hidden'}`}>
            <span className='text-lg font-bold uppercase'>Total</span>{' '}
            <span className='ms-2 text-2xl font-semibold'>${totalPrice}</span>
          </p>
        </div>

        <p
          className={`${
            numOfNights && hasBreakfast
              ? 'flex items-baseline text-xl font-semibold'
              : 'hidden'
          }`}
        >
          inc. breakfast: ${totalBreakfastPrice}
        </p>
      </div>

      {range.from || range.to ? (
        <button
          className={twMerge(
            'btn ',
            `border bg-accent-600 hover:bg-accent-500 border-accent-300 
              py-2 px-4 
              text-base font-bold
              text-accent-200
              hover:text-accent-100
            `
          )}
          onClick={resetRange}
        >
          Clear
        </button>
      ) : null}
    </div>
  )
}

export default DisplayPrice
