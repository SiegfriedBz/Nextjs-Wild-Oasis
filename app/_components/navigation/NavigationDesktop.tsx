import NavLinks from '@/app/_components/navigation/NavLinks'
import { NAV_LINKS } from '@/app/_constants'
import type { TSessionUser } from '@/app/_types/user.types'

import type { Session } from 'next-auth'

type TProps = {
  session: Session | null
}
// Server-Component
const NavigationDesktop = ({ session }: TProps) => {
  const user = session?.user as TSessionUser
  const isLoggedIn = !!user?.email

  return NavLinks({
    user,
    links: NAV_LINKS,
    isLoggedIn,
    className: 'max-lg:gap-x-8 lg:gap-x-16'
  })
}

export default NavigationDesktop
