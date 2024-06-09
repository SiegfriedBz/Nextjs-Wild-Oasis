/** Settings */
export type TAppSettings = {
  breakfastPrice: number
  minBookingLength: number
  maxBookingLength: number
}
export type TAppSettingsData = {
  breakfast_price: number
  min_booking_length: number
  max_booking_length: number
}

/** Misc. */
export type TLink = {
  href: string
  label: string
}

export type TReactSelectOption = {
  label: string
  value: string
}
