import BookingWrapper from '@/app/_components/booking/BookingWrapper'
import CabinDetailsHeader from '@/app/_components/cabin/CabinDetailsHeader'
import Spinner from '@/app/_components/Spinner'
import { getCabin, getCabins } from '@/app/_services/cabins.service'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type TParams = {
  params: {
    cabinId: string
  }
}

export async function generateMetadata({ params }: TParams) {
  const { cabinId } = params
  const cabin = await getCabin(Number(cabinId))
  const cabinName = cabin?.name

  return {
    title: cabinName ? `Cabin ${cabinName}` : 'Cabin'
  }
}

export const generateStaticParams = async () => {
  const cabins = await getCabins()

  return cabins.map((cabin) => {
    return {
      cabinId: String(cabin.id)
    }
  })
}

const CabinDetails = async ({ params }: TParams) => {
  const { cabinId } = params
  const cabin = await getCabin(Number(cabinId))

  if (!cabin) {
    return notFound()
  }

  return (
    <div className='max-md:w-full md:max-w-6xl mx-auto md:mt-8'>
      {/* Server Component */}
      <CabinDetailsHeader cabin={cabin} />

      <div className='min-h-96 grid max-lg:grid-cols-1 lg:grid-cols-2 max-lg:space-y-8 lg:space-x-8 mt-10 border border-primary-800'>
        {/* Async Server Component */}
        <Suspense fallback={<Spinner />}>
          <BookingWrapper cabin={cabin} />
        </Suspense>
      </div>
    </div>
  )
}

export default CabinDetails
