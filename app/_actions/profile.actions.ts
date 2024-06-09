'use server'

import { auth } from '@/app/_lib/auth'
import { updateGuest } from '@/app/_services/guests.service'
import { TUpdateGuestData } from '@/app/_types/user.types'
import AppError from '@/app/_utils/AppError.utils'
import type { TUpdateProfileInput } from '@/app/_zod/updateProfile.zod'
import { revalidatePath } from 'next/cache'

/** Profile */
export async function updateGuestAction({
  guestData
}: {
  guestData: TUpdateProfileInput
}) {
  try {
    const data: TUpdateGuestData = {
      nationality: '',
      country_flag: '',
      national_id: ''
    }

    const session = await auth()
    if (!session) {
      throw new AppError({
        statusCode: 401,
        message: 'You are not authenticated'
      })
    }

    const guestId = session.user?.guestId as number

    // const nationalityData = guestData.get('nationality')
    const nationalityData = guestData.nationality
    if (nationalityData) {
      data.nationality = (nationalityData as string).split('%').at(0) as string
      data.country_flag = (nationalityData as string).split('%').at(1) as string
    }

    // const national_id = guestData.get('national_id')
    const national_id = guestData.national_id
    if (national_id) {
      const isValid = isValidAlphanumeric(national_id as string)
      if (!isValid) {
        throw new AppError({
          statusCode: 404,
          message: 'Please enter a valid national ID (4-24 characters)'
        })
      }
      data.national_id = national_id as string
    }

    const updatedGuest = await updateGuest({ guestId, updatedFields: data })

    // Revalidate the profile page
    revalidatePath('/account/profile')

    return updatedGuest
  } catch (error) {
    console.log('Error in updateGuestAction:', error)
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

// Helpers
function isValidAlphanumeric(str: string) {
  const regex = /^[a-zA-Z0-9]{4,24}$/
  return regex.test(str)
}
