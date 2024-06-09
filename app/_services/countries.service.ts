// TODO: Add error handling
import AppError from '@/app/_utils/AppError.utils'
import { TCountryData } from '../_types/country.types'

/** GET */
export async function getCountries() {
  try {
    const res = await fetch(
      'https://countriesnow.space/api/v0.1/countries/flag/images'
    )
    const data = await res.json()

    const countries = data.data.map((country: any) => {
      if (country.name.length > 28)
        return { name: country.name.slice(0, 28), flag: country.flag }

      return {
        name: country.name,
        flag: `https://flagcdn.com/${country.iso2.toLowerCase()}.svg`
      }
    })

    return countries as TCountryData[]
  } catch (error) {
    const err = error as Error
    console.log(err.message)
    // throw new AppError({
    //   statusCode: 500,
    //   message: 'Could not fetch countries'
    // })
  }
}
