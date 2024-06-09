'use client'

import NavLinks from '@/app/_components/navigation/NavLinks'
import { MOBILE_NAV_LINKS } from '@/app/_constants'
import useModal from '@/app/_hooks/useModal'
import type { TSessionUser } from '@/app/_types/user.types'

import type { Session } from 'next-auth'

type TProps = {
  session: Session | null
}
// Client-Component
// Session from server
const NavigationMobile = ({ session }: TProps) => {
  const { closeWindow } = useModal()

  const user = session?.user as TSessionUser
  const isLoggedIn = !!user?.email

  return NavLinks({
    onClick: closeWindow,
    user,
    links: MOBILE_NAV_LINKS,
    isLoggedIn,
    className: 'flex-col gap-y-8'
  })
}

export default NavigationMobile
