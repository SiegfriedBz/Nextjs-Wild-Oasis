import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You'
}

const ThankYou = () => {
  return (
    <div className='text-center space-y-6 mt-4'>
      <h1 className='max-sm:text-3xl sm:text-4xl mb-5 text-accent-400 font-medium'>
        Thank you for your reservation!
      </h1>
      <Link
        href='/account/bookings'
        className='underline text-xl text-accent-500 inline-block'
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  )
}

export default ThankYou
