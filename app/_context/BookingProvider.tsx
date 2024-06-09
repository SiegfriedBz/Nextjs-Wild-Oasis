'use client'

import { useCallback, useEffect, useState } from 'react'
import { BookingContext } from '@/app/_hooks/useBookingContext'
import { differenceInDays } from 'date-fns'

export const initBookingRange = { from: undefined, to: undefined }

type TProps = {
  children: React.ReactNode
}
const BookingProvider = ({ children }: TProps) => {
  const [lastVisitedCabinId, setLastVisitedCabinId] = useState<
    number | undefined
  >(undefined)
  const [range, setRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>(initBookingRange)
  const [numOfGuests, setNumOfGuests] = useState(0)
  const [hasBreakfast, setHasBreakfast] = useState(false)
  const [breakfastPrice, setBreakfastPrice] = useState(15)
  const [regularPrice, setRegularPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  // Calculated from range
  const [numOfNights, setNumOfNights] = useState(0)
  // Calculated from all local state
  const [totalPrice, setTotalPrice] = useState(0)

  const calcTotalPrice = useCallback(() => {
    const basePrice = (regularPrice - discount) * numOfNights
    const breakfastTotal = hasBreakfast
      ? breakfastPrice * numOfGuests * numOfNights
      : 0
    const totalPrice = basePrice + breakfastTotal
    return totalPrice
  }, [
    numOfNights,
    numOfGuests,
    hasBreakfast,
    breakfastPrice,
    regularPrice,
    discount
  ])

  const calcNumOfNights = useCallback(() => {
    if (!range?.from || !range?.to) {
      return 0
    }
    return differenceInDays(new Date(range.to), new Date(range.from))
  }, [range])

  useEffect(() => {
    const numOfNights = calcNumOfNights()
    setNumOfNights(numOfNights)

    return () => {
      setNumOfNights(0)
    }
  }, [calcNumOfNights])

  useEffect(() => {
    const totalPrice = calcTotalPrice()
    setTotalPrice(totalPrice)

    return () => {
      setTotalPrice(0)
    }
  }, [calcTotalPrice])

  const resetRange = () => setRange(initBookingRange)

  return (
    <BookingContext.Provider
      value={{
        totalPrice,
        numOfNights,
        range,
        setRange,
        resetRange,
        numOfGuests,
        setNumOfGuests,
        hasBreakfast,
        setHasBreakfast,
        breakfastPrice,
        setBreakfastPrice,
        regularPrice,
        setRegularPrice,
        discount,
        setDiscount,
        lastVisitedCabinId,
        setLastVisitedCabinId
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export default BookingProvider
