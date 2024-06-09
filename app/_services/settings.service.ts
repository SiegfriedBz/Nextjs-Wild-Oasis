import supabase from '@/app/_lib/supabase'

import type { TAppSettings, TAppSettingsData } from '@/app/_types/misc.types'
import AppError from '@/app/_utils/AppError.utils'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

/** GET */
export async function getSettings() {
  const { data, error }: PostgrestSingleResponse<TAppSettingsData> =
    await supabase.from('settings').select('*').single()

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Settings could not be loaded'
    })
  }

  const settings = {
    breakfastPrice: data.breakfast_price,
    minBookingLength: data.min_booking_length,
    maxBookingLength: data.max_booking_length
  }

  return settings as TAppSettings
}
