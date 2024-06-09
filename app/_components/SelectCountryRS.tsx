'use client'

import SpinnerMini from '@/app/_components/SpinnerMini'
import colourStyles from '@/app/_styles/reactSelectStyles'
import type { TCountryData } from '@/app/_types/country.types'
import type { TReactSelectOption } from '@/app/_types/misc.types'
import Image from 'next/image'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import Select, { GroupBase, OptionProps } from 'react-select'

type TProps = {
  placeHolder: string
  selectedCountryOption: TReactSelectOption | null
  onChangeCountryOption: (option: TReactSelectOption) => void
  allCountriesData: TCountryData[]
}

const SelectCountryRS = ({
  placeHolder,
  selectedCountryOption,
  onChangeCountryOption,
  allCountriesData
}: TProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <SpinnerMini />

  // Map the countries to the format needed for react-select
  const countryOptions = allCountriesData.map((c: TCountryData) => ({
    value: `${c.name}%${c.flag}`,
    label: `${c.name}`
  }))

  return (
    <Select<TReactSelectOption, false>
      components={{ Option: CustomOption }}
      styles={colourStyles<TReactSelectOption>()}
      options={countryOptions}
      placeholder={placeHolder}
      value={selectedCountryOption}
      onChange={(option) => {
        onChangeCountryOption(option as TReactSelectOption)
      }}
    />
  )
}

export default SelectCountryRS

type TCustomOptionProps = OptionProps<
  TReactSelectOption,
  false,
  GroupBase<TReactSelectOption>
> & {
  innerProps: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}
const CustomOption = ({ data, innerProps }: TCustomOptionProps) => {
  const [nationality, countryFlag] = data.value.split('%')

  return (
    <div
      {...innerProps}
      className='flex items-center
        p-4
        space-x-4
        cursor-pointer
        bg-primary-900
        text-accent-50
        hover:bg-accent-500
      '
    >
      <p>{nationality}</p>
      <Image src={countryFlag} width={30} height={30} alt='countryFlag' />
    </div>
  )
}
