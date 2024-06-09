'use client'

import { useCallback, useEffect, useState } from 'react'

type TProps = {
  numOfNights: number
  numOfGuests: number
  hasBreakfast: boolean
  breakfastPrice: number
  regularPrice: number
  discount: number
}

const useBookingPrice = ({
  numOfNights,
  numOfGuests,
  hasBreakfast,
  breakfastPrice,
  regularPrice,
  discount
}: TProps) => {
  const [totalPrice, setTotalPrice] = useState(0)

  const calcBookingPrice = useCallback(() => {
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

  useEffect(() => {
    const totalPrice = calcBookingPrice()
    setTotalPrice(totalPrice)
  }, [calcBookingPrice])

  return totalPrice
}

export default useBookingPrice
