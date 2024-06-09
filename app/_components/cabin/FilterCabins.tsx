'use client'

import SpinnerMini from '@/app/_components/SpinnerMini'
import colourStyles from '@/app/_styles/reactSelectStyles'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select from 'react-select'

type TOption = {
  value: string
  label: string
}
const capacityOptions: TOption[] = [
  { value: '2', label: '1-2 Guests' },
  { value: '4', label: '1-4 Guests' },
  { value: '6', label: '1-6 Guests' },
  { value: '8', label: '1-8 Guests' },
  { value: '10', label: '1-10 Guests' }
]
const priceOptions: TOption[] = [
  { value: '399', label: '399' },
  { value: '899', label: '899' },
  { value: '9999', label: 'All' }
]

const FilterCabins = () => {
  const [isClient, setIsClient] = useState(false)
  const [selectedCapacityOption, setSelectedCapacityOption] =
    useState<TOption | null>(() => capacityOptions[4])
  const [selectedPriceOption, setSelectedPriceOption] =
    useState<TOption | null>(() => priceOptions[2])

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = ({
    field,
    value
  }: {
    field: 'maxCapacity' | 'maxPrice'
    value: TOption['value']
  }) => {
    newSearchParams.set(field, value)
    const newUrl = `${pathname}?${newSearchParams}`

    router.push(newUrl, { scroll: false })
  }

  const handleClear = () => {
    // update local state
    setSelectedCapacityOption(capacityOptions[4])
    setSelectedPriceOption(priceOptions[2])

    // update url state
    newSearchParams.delete('maxCapacity')
    newSearchParams.delete('maxPrice')

    const newUrl = `${pathname}?${newSearchParams}`

    router.push(newUrl, { scroll: false })
  }

  return (
    <form className='mb-12 grid sm:grid-cols-1 md:grid-cols-3 max-md:gap-4 md:gap-8 lg:gap-12 xl:gap-14'>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='maxCapacity'>Cabin capacity</label>
        {isClient ? (
          <Select<TOption, false>
            id='maxCapacity'
            name='maxCapacity'
            styles={colourStyles<TOption>()}
            value={selectedCapacityOption}
            onChange={(option) => {
              setSelectedCapacityOption(option)
              option &&
                handleChange({ field: 'maxCapacity', value: option.value })
            }}
            options={capacityOptions}
          />
        ) : (
          <div className='w-full py-2 px-4 flex items-center'>
            <SpinnerMini />
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-2'>
        <label htmlFor='maxPrice'>Max price ($)</label>
        {isClient ? (
          <Select<TOption, false>
            id='maxPrice'
            name='maxPrice'
            styles={colourStyles<TOption>()}
            value={selectedPriceOption}
            onChange={(option) => {
              setSelectedPriceOption(option)
              option && handleChange({ field: 'maxPrice', value: option.value })
            }}
            options={priceOptions}
          />
        ) : (
          <div className='w-full py-2 px-4 flex items-center'>
            <SpinnerMini />
          </div>
        )}
      </div>

      <button
        type='button'
        onClick={handleClear}
        className='btn-sm btn-accent self-end inline-block max-md:mt-2'
      >
        Clear filters
      </button>
    </form>
  )
}

export default FilterCabins
