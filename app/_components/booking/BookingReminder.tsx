'use client'

import LinkUnder from '@/app/_components/LinkUnder'
import {
  type TBookingContext,
  useBookingContext
} from '@/app/_hooks/useBookingContext'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const BookingReminder = () => {
  const [isVisible, setIsVisible] = useState(true)
  const context = useBookingContext()
  const { range, lastVisitedCabinId } = context as TBookingContext

  if (!range?.from || !range?.to) return null

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 200 }}
          transition={{ duration: 0.3 }}
          className='
            group
            u-gradient-accent
            z-[9]
            fixed 
            max-sm:bottom-4
            sm:bottom-8
            max-sm:right-2
            max-md:right-4
            md:left-1/2
            md:-translate-x-1/2

            min-h-20
            max-h-24

            rounded-xl
            text-primary-800 
            font-semibold 
            shadow-xl shadow-slate-900 
            ring-1 ring-accent-200
            hover:ring-accent-50
            flex
            items-center justify-center
            px-4
          '
        >
          <div
            className='w-full flex
            items-center justify-center flex-col my-4
            mx-8
            '
          >
            <div className='whitespace-nowrap'>
              <span>Don&apos;t forget to</span>
              <LinkUnder
                href={`/cabins/${lastVisitedCabinId}#select-date`}
                label='book your dates'
                className='mx-2 whitespace-nowrap'
              />
            </div>
            <span>
              from {format(new Date(), 'MMM dd yyyy')} to{' '}
              {format(new Date(), 'MMM dd yyyy')}
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className={twMerge(
              'absolute top-2 right-2 btn',
              'hover:ring-1 hover:ring-accent-400 hover:text-accent-200 p-1 max-md:ms-2 md:ms-4 rounded-full text-primary-800 font-extraboldbold transition duration-300'
            )}
          >
            <XMarkIcon className='h-4 w-4' />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default BookingReminder
