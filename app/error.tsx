'use client' // Error components must be Client Components

import { Metadata } from 'next'
import { useEffect } from 'react'

export const metadata: Metadata = {
  title: 'Error'
}

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>ERROR!</p>
      <p className='text-lg'>{error.message}</p>

      <button
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  )
}
