import { updateGuestAction } from '@/app/_actions/profile.actions'
import UpdateProfileForm from '@/app/_components/profile/UpdateProfileForm'
import { auth } from '@/app/_lib/auth'
import { getCountries } from '@/app/_services/countries.service'
import { getGuest } from '@/app/_services/guests.service'
import type { TCountryData } from '@/app/_types/country.types'
import type { TGuest, TSessionUser } from '@/app/_types/user.types'

import { redirect } from 'next/navigation'

// Server-Component
const UpdateProfile = async () => {
  // Get user session from auth
  const session = await auth()
  const user = session?.user as TSessionUser

  if (!user) {
    return redirect('/login')
  }

  const [guest, countries] = (await Promise.all([
    getGuest((user as TSessionUser).email),
    getCountries()
  ])) as [TGuest, TCountryData[]]

  return (
    // Client-Component
    <UpdateProfileForm
      updateGuestAction={updateGuestAction}
      guest={guest}
      countries={countries}
    />
  )
}

export default UpdateProfile
