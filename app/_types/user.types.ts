import type { TCountryData } from './country.types'

/** User / Guest */
export type TBaseUser = {
  name: string
  email: string
}

export type TSessionUser = TBaseUser & {
  image: string
  guestId: TGuest['id']
}

export type TGuest = TBaseUser & {
  id?: number
  nationality?: TCountryData['name']
  countryFlag?: TCountryData['flag']
  nationalId?: string
  createdAt?: Date | string
}

export type TGuestData = TBaseUser & {
  id?: number
  nationality?: TCountryData['name']
  country_flag?: TCountryData['flag']
  national_id?: string
  created_at?: Date | string
}

export type TUpdateGuestData = {
  nationality?: TCountryData['name']
  country_flag?: TCountryData['flag']
  national_id?: string
}
