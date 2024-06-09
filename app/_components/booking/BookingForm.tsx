'use client'

import SelectNumOfGuestRS from '@/app/_components/SelectNumOfGuestsRS'
import {
  type TBookingContext,
  useBookingContext
} from '@/app/_hooks/useBookingContext'
import type { TBooking } from '@/app/_types/booking.types'
import type { TReactSelectOption } from '@/app/_types/misc.types'
import type { TGuest } from '@/app/_types/user.types'
import {
  createBookingZodSchema,
  type TMutateBookingInput
} from '@/app/_zod/createBooking.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Stripe from 'stripe'
import { twMerge } from 'tailwind-merge'

type TProps = {
  createUnConfirmedBookingAction: ({
    bookingData
  }: {
    bookingData: TMutateBookingInput
  }) => Promise<TBooking>

  getStripeCheckoutAction: ({
    bookingId,
    cabinId,
    totalPrice
  }: {
    bookingId: number
    cabinId: number
    totalPrice: number
  }) => Promise<Stripe.Response<Stripe.Checkout.Session>['id']>

  guestName: TGuest['name']
  cabinId: number
  maxCapacity: number
  children: React.ReactNode
}

const BookingForm = ({
  createUnConfirmedBookingAction,
  getStripeCheckoutAction,
  guestName,
  cabinId,
  maxCapacity,
  children
}: TProps) => {
  // react select state
  const [selectedNumOfGuestOption, setSelectedNumOfGuestOption] =
    useState<TReactSelectOption | null>(null)

  // booking context
  const bookingContext = useBookingContext()
  const {
    totalPrice,
    numOfNights,
    range,
    numOfGuests,
    setNumOfGuests,
    setHasBreakfast,
    setLastVisitedCabinId
  } = bookingContext as TBookingContext

  const {
    register,
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TMutateBookingInput>({
    resolver: zodResolver(createBookingZodSchema)
  })

  // initialize/set react-hook-form values & cleanup
  useEffect(() => {
    if (!cabinId) return

    setValue('cabin_id', cabinId)

    // set cabinId for BookingReminder
    setLastVisitedCabinId(cabinId)
  }, [setValue, cabinId, setLastVisitedCabinId])

  useEffect(() => {
    setValue('num_of_guests', 0)

    return () => {
      setValue('num_of_guests', 0)
    }
  }, [setValue])

  useEffect(() => {
    setValue('has_breakfast', false)

    return () => {
      setValue('has_breakfast', false)
    }
  }, [setValue])

  useEffect(() => {
    setValue('total_price', totalPrice)

    return () => {
      setValue('total_price', 0)
    }
  }, [setValue, totalPrice])

  useEffect(() => {
    setValue(
      'start_date',
      range?.from ? (range as { from: Date; to: Date }).from.toISOString() : ''
    )
    setValue(
      'end_date',
      range?.to ? (range as { from: Date; to: Date }).to.toISOString() : ''
    )
    setValue('num_of_nights', numOfNights)
  }, [setValue, range, numOfNights])

  // Server-action
  const action: () => void = handleSubmit(async (bookingData) => {
    try {
      /** 1. Create unconfirmed booking in DB */
      const bookingResponse = await createUnConfirmedBookingAction({
        bookingData
      })

      const bookingId = bookingResponse?.id
      console.log('=== BookingForm bookingId', bookingId)

      /** 2. Get Stripe Checkout Session (BE) */
      const stripeResponseId = await getStripeCheckoutAction({
        bookingId,
        cabinId: bookingData.cabin_id,
        totalPrice: bookingData.total_price
      })

      // Check if response is valid
      if (!stripeResponseId)
        throw new Error('Error getting Stripe Checkout Session')

      // Load Stripe (FE)
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )
      // Check if Stripe is loaded
      if (!stripe) {
        throw new Error('Error loading Stripe')
      }

      /** 2. Notify user */
      toast.success('Redirecting to checkout...')

      /** 3. Redirect to Stripe Checkout => create check out form and Charge Credit card */
      const result = await stripe.redirectToCheckout({
        sessionId: stripeResponseId
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Error in BookingForm action:', error)
      toast.error('Error processing booking, please try again')
    }
  })

  const submitButtonIsDisabled =
    isSubmitting || !getValues('num_of_nights') || !getValues('num_of_guests')

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 max-sm:px-8 sm:px-16 py-2 flex justify-between items-center'>
        <p className='whitespace-nowrap'>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <p className='text-accent-200'>{guestName.split(' ')[0]}</p>
          <div className='relative w-8 h-8'>{children}</div>
        </div>
      </div>

      <form
        action={action}
        className='bg-primary-900 py-10 max-sm:px-8 sm:px-16 text-lg flex gap-5 flex-col'
      >
        {/* hidden fields */}
        <input type='hidden' {...register('cabin_id')} />
        <input type='hidden' {...register('start_date')} />
        <input type='hidden' {...register('end_date')} />
        <input type='hidden' {...register('num_of_nights')} />
        {errors?.num_of_nights && (
          <p className='text-red-500'>{errors?.num_of_nights?.message}</p>
        )}
        <input type='hidden' {...register('total_price')} />

        {/* user input fields */}
        <div className='space-y-2'>
          <label htmlFor='numOfGuests'>How many guests?</label>
          <Controller
            control={control}
            name='num_of_guests'
            render={({ field: { onChange } }) => (
              <SelectNumOfGuestRS
                maxCapacity={maxCapacity}
                selectedNumOfGuestOption={selectedNumOfGuestOption}
                onChangeNumOfGuestOption={(option) => {
                  // update state passed to React-SELECT
                  setSelectedNumOfGuestOption(option)
                  // update React-HOOK-FORM "num_of_guests" field state
                  onChange(option ? parseInt(option.value, 10) : 0)
                  // update booking context
                  setNumOfGuests(option ? parseInt(option.value, 10) : 0)
                }}
              />
            )}
          />
          {errors?.num_of_guests && (
            <p className='text-red-500'>{errors?.num_of_guests?.message}</p>
          )}
        </div>

        <div className='my-2 flex space-x-4'>
          <input
            type='checkbox'
            {...register('has_breakfast')}
            defaultChecked={getValues('has_breakfast')}
            // update booking context
            onChange={(e) => setHasBreakfast(e.target.checked)}
            id='hasBreakFast'
            className='accent-accent-500'
          />
          <label htmlFor='hasBreakFast'>Add a delicious breakfast ?</label>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            {...register('observations')}
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
          {errors?.observations && (
            <p className='text-red-500'>{errors?.observations?.message}</p>
          )}
        </div>

        {/* flex-*-reverse to use peer-* */}
        <div className='flex sm:flex-row-reverse group justify-end max-sm:flex-col-reverse items-center max-sm:gap-4 sm:gap-6'>
          <button
            disabled={submitButtonIsDisabled}
            className={twMerge(
              'btn-sm btn-accent',
              `peer md:px-8 md:py-4
                text-accent-100 
                font-semibold 
                disabled:cursor-not-allowed 
                disabled:bg-gradient-to-r disabled:from-gray-500 disabled:to-gray-500
                disabled:text-gray-300
                whitespace-nowrap
              `
            )}
          >
            Reserve now
          </button>
          <p className='peer-hover:text-accent-200 max-sm:text-base sm:text-lg whitespace-nowrap sm:ms-auto'>
            {!numOfNights ? (
              <span>Start by selecting dates</span>
            ) : !numOfGuests ? (
              <span>Select the number of guests</span>
            ) : (
              <span>
                Book for{' '}
                <span className='text-accent-200'>{numOfNights} nights</span>
              </span>
            )}
          </p>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
