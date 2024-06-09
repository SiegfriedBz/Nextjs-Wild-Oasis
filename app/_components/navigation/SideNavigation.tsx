'use client'

import type { TSessionUser } from '@/app/_types/user.types'
import { CalendarDaysIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid'
import type { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SIDE_NAV_LINKS = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className='h-5 w-5 currentColor opacity-80' />
  },
  {
    name: 'Bookings',
    href: '/account/bookings',
    icon: <CalendarDaysIcon className='h-5 w-5 currentColor opacity-80' />
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className='h-5 w-5 currentColor opacity-80' />
  }
]

type TProps = {
  session: Session | null
  children: React.ReactNode
}

// Client-Component
// Session from server
const SideNavigation = ({ session, children }: TProps) => {
  const pathname = usePathname()
  const user = session?.user as TSessionUser | null

  if (!user) return null

  return (
    <nav className='h-full max-lg:border-b lg:border-r border-primary-900'>
      <ul className='flex lg:flex-col max-lg:justify-between lg:gap-2 h-full max-sm:text-base sm:text-lg'>
        {SIDE_NAV_LINKS.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 ${
                pathname === link.href
                  ? 'bg-primary-900 text-accent-400'
                  : 'hover:bg-primary-900 hover:text-primary-100'
              }  transition-colors flex items-center gap-4 font-semibold `}
              href={link.href}
            >
              <span className='pb-1'>{link.icon}</span>
              <span className='whitespace-nowrap'>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className='lg:mt-auto'>
          {/* Server-Component SignOutButton */}
          {children}
        </li>
      </ul>
    </nav>
  )
}

export default SideNavigation
