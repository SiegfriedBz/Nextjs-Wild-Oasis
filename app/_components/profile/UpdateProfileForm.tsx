'use client'

import SelectCountryRS from '@/app/_components/SelectCountryRS'
import type { TCountryData } from '@/app/_types/country.types'
import type { TReactSelectOption } from '@/app/_types/misc.types'
import type { TGuest } from '@/app/_types/user.types'

import {
  type TUpdateProfileInput,
  updateProfileZodSchema
} from '@/app/_zod/updateProfile.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

type TProps = {
  updateGuestAction: ({
    guestData
  }: {
    guestData: TUpdateProfileInput
  }) => Promise<TGuest | null | undefined>
  guest: TGuest
  countries: TCountryData[]
}

// Client-Component
const UpdateProfileForm = ({ updateGuestAction, guest, countries }: TProps) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TUpdateProfileInput>({
    resolver: zodResolver(updateProfileZodSchema)
  })
  const [selectedCountryOption, setSelectedCountryOption] =
    useState<TReactSelectOption | null>(null)

  useEffect(() => {
    if (!guest) return

    // setValue('name', guest?.name || '')
    // setValue('email', guest?.email || '')
    setValue(
      'nationality',
      `${guest?.nationality || 'Switzerland'}%${
        guest?.countryFlag || 'https://flagcdn.com/ch.svg'
      }`
    )
  }, [setValue, guest])

  // const [optimisticGuest, updateOptimisticGuest] = useOptimistic<
  //   TGuest,
  //   string
  // >(guest, (state, updatedGuest) => [...state, { message: newMessage }])

  const action: () => void = handleSubmit(async (guestData) => {
    await updateGuestAction({ guestData })
    toast.success('Profile updated successfully')
  })

  return (
    <form
      action={action}
      className='flex gap-6 flex-col
        py-8 
        max-sm:px-2 
        sm:px-12 
        text-lg
        bg-primary-900 
      '
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          defaultValue={guest?.name || ''}
          // {...register('name')}
          disabled
          className='w-full
            px-5 py-3 
            bg-primary-200 
            text-primary-800 
            shadow-sm 
            rounded-sm 
            disabled:cursor-not-allowed 
            disabled:bg-gray-600 
            disabled:text-gray-400
          '
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          disabled
          defaultValue={guest?.email || ''}
          // {...register('email')}
          className='w-full 
            px-5 py-3 
            bg-primary-200 
            text-primary-800 
            shadow-sm 
            rounded-sm 
            disabled:cursor-not-allowed 
            disabled:bg-gray-600 
            disabled:text-gray-400
          '
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>Where are you from?</label>

          <Image
            src={guest?.countryFlag || 'https://flagcdn.com/ch.svg'}
            width={24}
            height={24}
            alt='Country flag'
            className='h-6 shadow-sm rounded-sm'
          />
        </div>

        <Controller
          control={control}
          name='nationality'
          render={({ field: { onChange } }) => (
            <SelectCountryRS
              placeHolder={`${guest?.nationality || 'Switzerland'}`}
              allCountriesData={countries}
              selectedCountryOption={selectedCountryOption}
              onChangeCountryOption={(option) => {
                // update state passed to React-SELECT
                setSelectedCountryOption(option)
                // update React-HOOK-FORM "nationality" field state
                onChange(option ? option.value : '')
              }}
            />
          )}
        />
        {errors?.nationality && (
          <p className='text-red-500'>{errors?.nationality?.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='national_id'>National ID number</label>
        <input
          {...register('national_id')}
          defaultValue={guest?.nationalId || ''}
          className='w-full
            px-5 py-3 
            bg-primary-200 
            text-primary-800 
            shadow-sm 
            rounded-sm
          '
        />
        {errors?.national_id && (
          <p className='text-red-500'>{errors?.national_id?.message}</p>
        )}
      </div>

      <div className='flex w-full justify-end items-center mt-2'>
        <Button />
      </div>
    </form>
  )
}

export default UpdateProfileForm

const Button = () => {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type='submit'
      className={twMerge(
        'btn btn-accent',
        `px-8 py-4
          text-primary-800 font-semibold
          disabled:cursor-not-allowed 
          disabled:bg-gradient-to-r disabled:from-gray-500 disabled:to-gray-400
          disabled:text-gray-300
          max-sm:w-full
        `
      )}
    >
      <span>{pending ? 'Updating...' : 'Update profile'}</span>
    </button>
  )
}
