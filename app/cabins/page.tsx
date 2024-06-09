import BookingReminder from '@/app/_components/booking/BookingReminder'
import CabinList, { LoadingCabinList } from '@/app/_components/cabin/CabinList'
import FilterCabins from '@/app/_components/cabin/FilterCabins'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Cabins'
}

type TSearchParams = {
  searchParams: Record<string, string>
}

const Cabins = ({ searchParams }: TSearchParams) => {
  return (
    <div className='relative'>
      <BookingReminder />
      <h1 className='max-sm:text-3xl sm:text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <FilterCabins />

      <Suspense fallback={<LoadingCabinList />}>
        <CabinList filter={searchParams} />
      </Suspense>
    </div>
  )
}

export default Cabins
