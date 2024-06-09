'use client'

import { createContext, useContext } from 'react'

export type TBookingRange = {
  from: Date | undefined
  to: Date | undefined
}

export type TBookingContext = {
  lastVisitedCabinId?: number
  setLastVisitedCabinId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >
  totalPrice: number
  numOfNights: number
  range: TBookingRange
  setRange: React.Dispatch<React.SetStateAction<TBookingRange>>
  resetRange: () => void
  numOfGuests: number
  setNumOfGuests: React.Dispatch<React.SetStateAction<number>>
  hasBreakfast: boolean
  setHasBreakfast: React.Dispatch<React.SetStateAction<boolean>>
  breakfastPrice: number
  setBreakfastPrice: React.Dispatch<React.SetStateAction<number>>
  regularPrice: number
  setRegularPrice: React.Dispatch<React.SetStateAction<number>>
  discount: number
  setDiscount: React.Dispatch<React.SetStateAction<number>>
}

export const BookingContext = createContext<TBookingContext | undefined>(
  undefined
)

export const useBookingContext = () => {
  const context = BookingContext

  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider')
  }

  return useContext(context)
}
