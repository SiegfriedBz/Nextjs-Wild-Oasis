import { auth } from '@/app/_lib/auth'
import type { TSessionUser } from '@/app/_types/user.types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your account'
}

const Account = async () => {
  const session = await auth()
  const user = session?.user as TSessionUser | null
  const firstName = user?.name?.split(' ')?.at(0)

  return <span className='text-2xl text-accent-400'>Welcome, {firstName}</span>
}

export default Account
