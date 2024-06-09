import heroImg from '@/public/bg.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='pt-4 min-h-[calc(100svh-var(--header-h)-4rem)]'>
      <Image
        src={heroImg}
        fill
        placeholder='blur'
        priority={true}
        alt='Mountains and forests with two cabins'
        className='object-cover object-top'
      />

      <div className='relative text-center'>
        <h1
          className='
            max-sm:text-5xl max-md:text-6xl max-lg:text-7xl lg:text-8xl
            text-primary-50 
            max-sm:mb-[62vw]
            max-md:mb-[48vw]
            max-lg:mb-[24vw]
            max-xl:mb-[26vw]
            max-2xl:mb-[4vw]
            2xl:mb-[8vw]
            tracking-tight 
            font-normal
          '
        >
          Welcome to paradise.
        </h1>
        <Link href='/cabins' className='btn btn-accent'>
          Explore luxury cabins
        </Link>
      </div>
    </main>
  )
}
