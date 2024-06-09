import type { TSessionUser } from '@/app/_types/user.types'
import defaulTSessionUserImage from '@/public/default-user.jpg'
import Image from 'next/image'

type TProps = {
  user: TSessionUser | null
  className: string
  width: number
  height: number
}
const UserAvatar = ({
  user = null,
  className = '',
  width = 40,
  height = 40
}: Partial<TProps>) => {
  return (
    <Image
      src={user?.image || defaulTSessionUserImage}
      alt={user?.name || "User's profile image"}
      width={width}
      height={height}
      referrerPolicy='no-referrer'
      className={`rounded-full 
        ring-1 ring-primary-200 
        group-hover:ring-accent-500 
        group-focus:ring-accent-500  
        ${className}
        transition-colors
      `}
    />
  )
}

export default UserAvatar
