'use client'

import SpinnerMini from '@/app/_components/SpinnerMini'
import colourStyles from '@/app/_styles/reactSelectStyles'
import type { TReactSelectOption } from '@/app/_types/misc.types'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import Select, { GroupBase, OptionProps } from 'react-select'

type TProps = {
  selectedNumOfGuestOption: TReactSelectOption | null
  onChangeNumOfGuestOption: (option: TReactSelectOption) => void
  maxCapacity: number
}

const SelectNumOfGuestRS = ({
  selectedNumOfGuestOption,
  onChangeNumOfGuestOption,
  maxCapacity
}: TProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <SpinnerMini />

  // Map the numOfGuests to the format needed for react-select
  const allNumOfGuestOptions = Array.from(
    { length: maxCapacity },
    (_, i) => i + 1
  ).map((x) => ({
    value: `${x}`,
    label: `${x} ${x === 1 ? 'guest' : 'guests'}`
  }))

  return (
    <Select<TReactSelectOption, false>
      components={{ Option: CustomOption }}
      styles={colourStyles<TReactSelectOption>()}
      options={allNumOfGuestOptions}
      value={selectedNumOfGuestOption}
      onChange={(option) => {
        onChangeNumOfGuestOption(option as TReactSelectOption)
      }}
    />
  )
}

export default SelectNumOfGuestRS

type TCustomOptionProps = OptionProps<
  TReactSelectOption,
  false,
  GroupBase<TReactSelectOption>
> & {
  innerProps: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}
const CustomOption = ({ data, innerProps }: TCustomOptionProps) => {
  const numOfGuest = data.label

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
      <p>{numOfGuest}</p>
    </div>
  )
}
