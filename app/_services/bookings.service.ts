import supabase from '@/app/_lib/supabase'
import fs from 'fs'
import path from 'path'

import type { TBooking, TBookingData } from '@/app/_types/booking.types'
import AppError from '@/app/_utils/AppError.utils'
import type { TMutateBookingInput } from '@/app/_zod/createBooking.zod'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { eachDayOfInterval } from 'date-fns'

/** GET */
export async function getBooking(id: number) {
  const { data, error }: PostgrestSingleResponse<TBookingData> = await supabase
    .from('bookings')
    .select('*, cabin: cabins(name, image, max_capacity)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Booking could not be loaded'
    })
  }

  const booking = formatServerBookingData(data)

  return booking as TBooking
}

export async function getGuestBookings(guestId: number) {
  const { data, error }: PostgrestSingleResponse<TBookingData[]> =
    await supabase
      .from('bookings')
      // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
      .select('*, cabin:cabins (name, image, max_capacity)')
      .eq('guest_id', guestId)
      .order('start_date')

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Bookings could not be loaded'
    })
  }

  const bookings = data.map((booking) => {
    return formatServerBookingData(booking as TBookingData)
  })

  return bookings as TBooking[]
}

export async function getBookedDatesByCabinId(cabinId: number) {
  let today: Date | string = new Date()
  today.setUTCHours(0, 0, 0, 0)
  today = today.toISOString()

  // Getting bookings
  const { data, error }: PostgrestSingleResponse<TBookingData[]> =
    await supabase
      .from('bookings')
      .select('*')
      .eq('cabin_id', cabinId)
      .or(`start_date.gte.${today},status.eq.checked-in`)

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Bookings could not be loaded'
    })
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.start_date),
        end: new Date(booking.end_date)
      })
    })
    .flat()

  return bookedDates as Date[]
}

/** CREATE */
export async function createBooking(newBooking: TMutateBookingInput) {
  const { data, error }: PostgrestSingleResponse<TBookingData> = await supabase
    .from('bookings')
    .insert([newBooking])
    .select('*, cabin: cabins(name, image, max_capacity)')
    .single()

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Booking could not be created'
    })
  }

  const booking = formatServerBookingData(data)

  return booking
}

/** UPDATE */
export async function updateBooking({
  id,
  updatedFields
}: {
  id?: number
  updatedFields: Partial<TMutateBookingInput>
}) {
  const { data, error }: PostgrestSingleResponse<TBookingData> = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select('*, cabin: cabins(name, image, max_capacity)')
    .single()

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Booking could not be updated'
    })
  }

  const booking = formatServerBookingData(data)
  return booking
}

/** DELETE */
export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Booking could not be deleted'
    })
  }

  console.log('=== deleteBooking data', data)
  return data
}

// Helpers
const formatServerBookingData = (bookingData: TBookingData) => {
  const fetchedCabin = bookingData.cabin as {
    name: string
    image: string
    max_capacity: number
  }

  const booking = {
    id: bookingData.id,
    stripeIntentId: bookingData.stripe_intent_id,
    stripeRefundAmount: bookingData.stripe_refund_amount,
    stripeRefundDate: bookingData.stripe_refund_date,
    status: bookingData.status,
    startDate: bookingData.start_date,
    endDate: bookingData.end_date,
    numOfNights: bookingData.num_of_nights,
    numOfGuests: bookingData.num_of_guests,
    totalPrice: bookingData.total_price,
    hasBreakfast: bookingData.has_breakfast,
    createdAt: bookingData.created_at,
    guestId: bookingData.guest_id,
    cabinId: bookingData.cabin_id,
    cabin: {
      name: fetchedCabin.name,
      image: fetchedCabin.image,
      maxCapacity: fetchedCabin.max_capacity
    }
  }

  return booking
}
