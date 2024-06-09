import CabinCard from '@/app/_components/cabin/CabinCard'
import Spinner from '@/app/_components/Spinner'
import { getCabins } from '@/app/_services/cabins.service'
import type { TCabin } from '@/app/_types/cabin.types'

type TProps = {
  filter: Record<string, string>
}
const CabinList = async ({ filter }: TProps) => {
  const cabins: TCabin[] = await getCabins()

  if (!cabins.length) return null

  let filteredCabins = cabins

  if (filter?.maxCapacity) {
    filteredCabins = filteredCabins.filter(
      (cabin) => cabin.maxCapacity <= Number(filter.maxCapacity)
    )
  }

  if (filter?.maxPrice) {
    filteredCabins = filteredCabins.filter(
      (cabin) => cabin.regularPrice <= Number(filter.maxPrice)
    )
  }

  return (
    <>
      <div className='grid max-lg:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
        {filteredCabins?.map((cabin: TCabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </>
  )
}
export default CabinList

export const LoadingCabinList = () => {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {Array.from({ length: 8 }, (_, index) => {
        return <Spinner key={index} />
      })}
    </div>
  )
}
