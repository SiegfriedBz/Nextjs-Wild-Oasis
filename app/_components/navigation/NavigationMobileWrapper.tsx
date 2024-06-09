'use client'

import BurgerMenuButton from '@/app/_components/BurgerMenuButton'
import ModalProvider from '@/app/_components/modal/Modal'

type TProps = {
  children: React.ReactNode
}
const NavigationMobileWrapper = ({ children }: TProps) => {
  return (
    <ModalProvider>
      <ModalProvider.OpenButton
        windowNameToOpen='mobile-nav'
        className='
          max-sm:h-12 max-sm:w-12
          max-md:h-14 max-md:w-14
          md:h-16 md:w-16
          flex 
          items-center 
          rounded-full 
          ring-1 ring-accent-200
        text-primary-100
          bg-gradient-to-tr from-primary-800 to-primary-600
        '
      >
        <BurgerMenuButton />
      </ModalProvider.OpenButton>
      <ModalProvider.Window isFullHeight={true} windowNameToOpen='mobile-nav'>
        <div
          className='z-[999999]
            h-[100lvh]
            w-full
            flex flex-col items-center justify-center
            mx-auto 
            pb-4
            font-semibold
            opacity-90
            rounded-l-xl
            ring-1 ring-accent-50
            text-primary-100
            bg-gradient-to-tr from-primary-800 to-primary-600
          '
        >
          {children}
        </div>
      </ModalProvider.Window>
    </ModalProvider>
  )
}

export default NavigationMobileWrapper
