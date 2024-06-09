'use server'

import { auth } from '@/app/_lib/auth'
import {
  createBooking,
  deleteBooking,
  getBooking,
  getGuestBookings
} from '@/app/_services/bookings.service'
import AppError from '@/app/_utils/AppError.utils'
import type { TMutateBookingInput } from '@/app/_zod/createBooking.zod'
import { revalidatePath } from 'next/cache'
import { TBooking } from '../_types/booking.types'

/** Booking */
export async function createUnConfirmedBookingAction({
  bookingData
}: {
  bookingData: TMutateBookingInput
}) {
  try {
    const session = await auth()
    if (!session) {
      throw new AppError({
        statusCode: 401,
        message: 'You are not authenticated'
      })
    }

    const guestId = session.user?.guestId as number
    const newBooking = {
      ...bookingData,
      guest_id: guestId,
      status: 'unconfirmed',
      is_paid: false
    }

    const newUnConfirmedBooking = await createBooking(newBooking)

    return newUnConfirmedBooking
  } catch (error) {
    console.log('Error in createUnConfirmedBookingAction:', error)
    if (error instanceof AppError) {
      throw error
    } else {
      const err = error as Error
      throw new AppError({
        statusCode: 500,
        message: err.message
      })
    }
  }
}

export async function deleteBookingAction({
  bookingId
}: {
  bookingId: number
}) {
  try {
    const session = await auth()
    if (!session) {
      throw new AppError({
        statusCode: 401,
        message: 'You are not authenticated'
      })
    }

    // Check is currentUser's booking
    const guestId = session.user.guestId
    const booking: TBooking = await getBooking(bookingId)
    const isGuestBooking = booking.guestId === guestId

    if (!isGuestBooking) {
      throw new AppError({
        statusCode: 403,
        message: 'You can only delete your own bookings'
      })
    }

    // Delete booking
    const data = await deleteBooking(bookingId)

    // Revalidate path
    revalidatePath('/account/bookings')

    return data
  } catch (error) {
    console.log('Error in deleteBookingAction:', error)
    if (error instanceof AppError) {
      throw error
    } else {
      const err = error as Error
      throw new AppError({
        statusCode: 500,
        message: err.message
      })
    }
  }
}
