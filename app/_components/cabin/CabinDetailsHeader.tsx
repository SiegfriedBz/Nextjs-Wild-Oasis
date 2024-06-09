import TextExpander from '@/app/_components/cabin/TextExpander'
import type { TCabin } from '@/app/_types/cabin.types'
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

type TProps = {
  cabin: TCabin
}
const CabinDetailsHeader = ({ cabin }: TProps) => {
  const { name, maxCapacity, image, description } = cabin
  return (
    <>
      <div
        className='grid max-lg:grid-cols-1 lg:grid-cols-[3fr_4fr] 
          max-lg:gap-8
          lg:gap-20 
          max-lg:p-2
          lg:py-4 lg:px-10 
          max-lg:mb-16
          lg:mb-24
          rounded-md 
          ring-1 ring-primary-100 
          shadow-sm shadow-primary-100 
          border border-primary-800 
        '
      >
        <div className='relative max-sm:m-1 max-lg:m-2 max-lg:aspect-video lg:aspect-square lg:-translate-x-6'>
          <Image
            src={image}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            alt={`Cabin ${name}`}
            className='object-cover 
              max-lg:rounded-md 
              lg:rounded-l-md 
              lg:rounded-r-3xl 
              border 
              border-accent-50 lg:border-l-accent-500 lg:border-t-accent-500
              shadow-sm shadow-primary-100 
              '
          />
        </div>

        <div>
          <h3
            className='text-accent-100 font-black 
              max-sm:text-3xl
              max-lg:text-5xl lg:text-7xl   
              bg-primary-950
              rounded-bl-3xl
              mb-2
              max-sm:p-1
              max-lg:p-2
              lg:mb-4 
              lg:p-4 lg:pb-2
              lg:translate-x-[-254px] 
              lg:w-[150%]
            '
          >
            Cabin {name}
          </h3>

          <div className='max-sm:p-1 max-lg:p-2'>
            <TextExpander className='text-lg text-primary-300 mb-10'>
              {description}
            </TextExpander>
            <ul className='flex flex-col gap-4 mt-4 mb-3'>
              <li className='flex gap-3 items-center'>
                <UsersIcon className='h-5 w-5 text-primary-600' />
                <span className='text-lg'>
                  For up to <span className='font-bold'>{maxCapacity}</span>{' '}
                  guests
                </span>
              </li>
              <li className='flex gap-3 items-center'>
                <MapPinIcon className='h-5 w-5 text-primary-600' />
                <span className='text-lg'>
                  Located in the heart of the{' '}
                  <span className='font-bold'>Dolomites</span> (Italy)
                </span>
              </li>
              <li className='flex gap-3 items-center'>
                <EyeSlashIcon className='h-5 w-5 text-primary-600' />
                <span className='text-lg'>
                  Privacy <span className='font-bold'>100%</span> guaranteed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2
          className='max-sm:text-3xl
              max-lg:text-4xl lg:text-5xl text-accent-500 font-semibold text-center'
        >
          <span>
            Reserve Cabin {name}{' '}
            <span className='text-accent-200 '>today.</span>
          </span>
        </h2>
      </div>
    </>
  )
}

export default CabinDetailsHeader
