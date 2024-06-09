import SpinnerMini from '@/app/_components/SpinnerMini'
import { getCabins } from '@/app/_services/cabins.service'
import aboutOneImg from '@/public/about-1.jpg'
import aboutTwoImg from '@/public/about-2.jpg'
import { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'

export const metadata: Metadata = {
  title: 'About us'
}

const About = () => {
  return (
    <div className='grid grid-cols-5 max-lg:gap-x-8 lg:gap-x-24 max-md:gap-y-16 md:gap-y-32 text-lg items-center'>
      <div className='max-md:col-span-5 md:col-span-3'>
        <h1 className='max-sm:text-3xl sm:text-4xl mb-5 text-accent-400 font-medium'>
          Welcome to The Wild Oasis
        </h1>

        <div className='space-y-8'>
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>

          <Suspense fallback={<CabinCountFallback />}>
            <CabinCount />
          </Suspense>

          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className='max-md:col-span-5 md:col-span-2'>
        <Image
          src={aboutOneImg}
          placeholder='blur'
          className='object-cover rounded-md ring-1 ring-primary-50 shadow-sm shadow-primary-50 hover:shadow-md hover:shadow-primary-50 hover:scale-[1.015] transition duration-300 ease-in-out'
          alt='Family sitting around a fire pit in front of cabin'
        />
      </div>

      <div className='max-md:col-span-5 md:col-span-2'>
        <Image
          src={aboutTwoImg}
          placeholder='blur'
          className='object-cover rounded-md ring-1 ring-primary-50 shadow-sm shadow-primary-50 hover:shadow-md hover:shadow-primary-50 hover:scale-[1.015] transition duration-300 ease-in-out'
          alt='Family that manages The Wild Oasis'
        />
      </div>

      <div className='max-md:col-span-5 md:col-span-3'>
        <h1 className='max-sm:text-3xl sm:text-4xl mb-5 text-accent-400 font-medium'>
          Managed by our family since 1962
        </h1>

        <div className='space-y-8'>
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div className='w-full flex'>
            <Link
              href='/cabins'
              className={twMerge(
                'btn btn-accent',
                `max-md:mx-auto rounded-md inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all`
              )}
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

const CabinCountWrap = ({ count }: { count?: number }) => {
  return (
    <p className='inline-flex items-center'>
      Our {count !== undefined ? count : <SpinnerMini />} luxury cabins provide
      a cozy base, but the real freedom and peace you&apos;ll find in the
      surrounding mountains. Wander through lush forests, breathe in the fresh
      air, and watch the stars twinkle above from the warmth of a campfire or
      your hot tub.
    </p>
  )
}
const CabinCount = async () => {
  noStore()
  const cabins = await getCabins()
  const count = cabins.length

  return <CabinCountWrap count={count} />
}

const CabinCountFallback = () => {
  return <CabinCountWrap />
}
