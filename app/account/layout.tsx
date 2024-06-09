import SideNavigation from '@/app/_components/navigation/SideNavigation'
import SignOutButton from '@/app/_components/SignOutButton'
import { auth } from '@/app/_lib/auth'
import React from 'react'

type TProps = Readonly<{
  children: React.ReactNode
}>

const layout = async ({ children }: TProps) => {
  const session = await auth()

  return (
    <div className='grid max-lg:grid-rows-[4rem_1fr] max-lg:gap-y-8 lg:grid-cols-[12rem_1fr] xl:grid-cols-[16rem_1fr] lg:gap-x-8 min-h-[calc(100svh-var(--header-h)-4rem)]'>
      <div className='max-sm:overflow-x-auto u-no-scrollbar'>
        {/* Client-Component */}
        <SideNavigation session={session}>
          {/* Server-Component */}
          <SignOutButton />
        </SideNavigation>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default layout
