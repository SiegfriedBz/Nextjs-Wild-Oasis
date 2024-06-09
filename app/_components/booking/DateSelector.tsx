'use client'

import {
  type TBookingContext,
  useBookingContext
} from '@/app/_hooks/useBookingContext'
import { isAlreadyBooked } from '@/app/_utils/date.utils'
import { isPast, isSameDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type TProps = {
  bookedDates: Date[]
  minBookingLength: number
  maxBookingLength: number
}

const DateSelector = ({
  bookedDates,
  minBookingLength,
  maxBookingLength
}: TProps) => {
  const [numberOfMonths, setNumberOfMonths] = useState(1)
  const context = useBookingContext()
  const { range, setRange } = context as TBookingContext

  // set displayed number of months = f(windowSize)
  useEffect(() => {
    const isSmallScreen = window.innerWidth < 580
    setNumberOfMonths(isSmallScreen ? 1 : 2)
  }, [])

  console.log('range', range)

  const rangeToDisplay = isAlreadyBooked({
    range: { from: range.from as Date, to: range.to as Date },
    datesArr: bookedDates
  })
    ? undefined
    : range

  return (
    <DayPicker
      mode='range'
      className='max-lg:pt-12 lg:pt-16 max-lg:pb-12 place-self-center'
      onSelect={(range) => {
        range?.from && setRange({ from: range.from, to: range.to })
      }}
      selected={rangeToDisplay}
      min={minBookingLength + 1}
      max={maxBookingLength}
      fromMonth={new Date()}
      fromDate={new Date()}
      toYear={new Date().getFullYear() + 5}
      captionLayout='dropdown'
      numberOfMonths={numberOfMonths}
      disabled={(curDate) => {
        return (
          isPast(curDate) ||
          bookedDates.some((date) => {
            return isSameDay(date, curDate)
          })
        )
      }}
    />
  )
}

export default DateSelector
