import supabase from '@/app/_lib/supabase'

import type {
  TGuest,
  TGuestData,
  TUpdateGuestData
} from '@/app/_types/user.types'
import AppError from '@/app/_utils/AppError.utils'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

/** GET */
// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const { data, error }: PostgrestSingleResponse<TGuestData> = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single()

  let guest: TGuest | null = null

  if (data?.id) {
    guest = formatServerGuestData(data)
  }

  // No error here! We handle the possibility of no guest in the sign in callback
  return guest
}

/** CREATE */
export async function createGuest(newGuest: TGuest) {
  const newGuestData = {
    name: newGuest.name,
    email: newGuest.email
  }

  const { data, error }: PostgrestSingleResponse<TGuestData> = await supabase
    .from('guests')
    .insert([newGuestData])
    .select('*')
    .single()

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Guest could not be created'
    })
  }

  let guest: TGuest | null = null

  if (data?.id) {
    guest = formatServerGuestData(data)
  }

  return guest
}

/** UPDATE */
// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest({
  guestId,
  updatedFields
}: {
  guestId: number
  updatedFields: TUpdateGuestData
}) {
  console.log('updatedFields', updatedFields)
  const { data, error }: PostgrestSingleResponse<TGuestData> = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', guestId)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Guest could not be updated'
    })
  }

  let guest: TGuest | null = null

  if (data) {
    guest = formatServerGuestData(data)
  }

  return guest
}

// Helper
const formatServerGuestData = (guestData: TGuestData) => {
  const guest = {
    id: guestData?.id,
    name: guestData?.name,
    email: guestData?.email,
    nationality: guestData?.nationality,
    nationalId: guestData?.national_id,
    countryFlag: guestData?.country_flag,
    createdAt: guestData?.created_at
  }

  return guest as TGuest
}
