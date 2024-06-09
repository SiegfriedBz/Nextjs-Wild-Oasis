'use client'

import ModalProvider from '@/app/_components/modal/Modal'
import SpinnerMini from '@/app/_components/SpinnerMini'
import useModal from '@/app/_hooks/useModal'
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useTransition } from 'react'
import { twMerge } from 'tailwind-merge'

type TBookingActionProps = {
  bookingId: number
  onAction: (bookingid: number) => void
  actionLabel: string
}

const BookingAction = ({
  bookingId,
  onAction,
  actionLabel
}: TBookingActionProps) => {
  return (
    <ModalProvider>
      <ModalProvider.OpenButton
        windowNameToOpen={`confirm-${actionLabel}-booking-${bookingId}`}
        className={twMerge(
          'btn-xs btn-secondary rounded-none rounded-br-sm',
          'min-w-24 items-center max-md:px-2 md:px-3 group flex-grow w-full flex max-sm:space-x-2 max-md:space-x-1 md:space-x-2 justify-center -mb-1'
        )}
      >
        <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
        <span className='mt-1'>{actionLabel}</span>
      </ModalProvider.OpenButton>
      <ModalProvider.Window
        windowNameToOpen={`confirm-${actionLabel}-booking-${bookingId}`}
      >
        <BookingActionConfirm
          bookingId={bookingId}
          onAction={onAction}
          actionLabel={actionLabel}
        />
      </ModalProvider.Window>
    </ModalProvider>
  )
}

export default BookingAction

const BookingActionConfirm = ({
  bookingId,
  onAction,
  actionLabel
}: TBookingActionProps) => {
  return (
    <div
      className='max-sm:px-4 sm:px-8 py-4 
        ring-1 ring-accent-200
      text-primary-100
        rounded-md
        w-full
        flex flex-col
        bg-gradient-to-tr from-primary-800 to-primary-600
        gap-y-2
      '
    >
      <h2 className='text-xl font-semibold'>{actionLabel} booking</h2>
      <div className='flex space-x-4 items-center w-full'>
        <div className='text-accent-600 mt-1'>
          <ExclamationTriangleIcon width='52' height='52' />
        </div>
        <p className='text-lg'>
          Are you sure you want to {actionLabel.toLowerCase()} your booking ?
        </p>
      </div>

      <TransitionConfirmButton
        bookingId={bookingId}
        onAction={onAction}
        actionLabel={actionLabel}
      />
    </div>
  )
}
const TransitionConfirmButton = ({
  bookingId,
  onAction,
  actionLabel
}: TBookingActionProps) => {
  const [isPending, startTransition] = useTransition()
  const { closeWindow } = useModal()

  const handleClick = () => {
    // close modal
    closeWindow()

    // start transition
    startTransition(() => {
      onAction(bookingId)
    })
  }
  return (
    <button
      type='button'
      onClick={handleClick}
      className={twMerge(
        'btn-sm btn-accent self-end',
        `text-primary-800 font-semibold
          max-sm:text-base
          disabled:cursor-not-allowed 
          min-w-32
    
        `
      )}
    >
      <>{isPending ? <SpinnerMini /> : <span>{actionLabel} booking</span>}</>
    </button>
  )
}
