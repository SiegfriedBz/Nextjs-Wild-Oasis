import CustomNavLink from '@/app/_components/navigation/CustomNavLink'
import UserAvatar from '@/app/_components/UserAvatar'
import type { TLink } from '@/app/_types/misc.types'
import type { TSessionUser } from '@/app/_types/user.types'

const NavLinks = ({
  onClick,
  user,
  links,
  isLoggedIn,
  className = ''
}: {
  onClick?: () => void
  user: TSessionUser | null
  links: TLink[]
  isLoggedIn: boolean
  className: string
}) => {
  return (
    <nav className='text-xl'>
      <ul className={`flex justify-end items-center ${className}`}>
        {links.map((link) => {
          const isAccountLink = link.href === '/account'
          return (
            <li key={link.href}>
              <CustomNavLink
                onClick={onClick}
                href={link.href}
                className={`hover:text-accent-400 focus:text-accent-400 transition-colors
                    ${
                      isAccountLink && isLoggedIn
                        ? 'group flex items-center max-md:space-x-2 md:space-x-4'
                        : ''
                    } `}
              >
                <span>{link.label}</span>
                {isAccountLink && isLoggedIn && <UserAvatar user={user} />}
              </CustomNavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavLinks
