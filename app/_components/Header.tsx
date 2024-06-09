import Logo from '@/app/_components/Logo'
import NavigationDesktop from '@/app/_components/navigation/NavigationDesktop'
import NavigationMobileWrapper from '@/app/_components/navigation/NavigationMobileWrapper'
import NavigationMobile from '@/app/_components/navigation/NavigationMobile'
import { auth } from '@/app/_lib/auth'

const Header = async () => {
  const session = await auth()
  return (
    <header
      className='h-[var(--header-h)]
        border-b border-primary-900
        flex justify-between items-center
        px-2
      '
    >
      <Logo />

      {/* Mobile Nav */}
      <div className='md:hidden max-md:z-10'>
        {/* Client-Components */}
          <NavigationMobileWrapper>
            <NavigationMobile session={session}/>
          </NavigationMobileWrapper>
      </div>

      {/* Desktop Nav */}
      <div className='max-md:hidden md:w-full md:z-10'>
        {/* Server-Component */}
        <NavigationDesktop session={session} />
      </div>
    </header>
  )
}

export default Header
