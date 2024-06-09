export const dynamic = 'force-dynamic'

import Spinner from '@/app/_components/Spinner'
import UpdateProfile from '@/app/_components/profile/UpdateProfile'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Your Profile'
}

const Profile = () => {
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-4'>
        Update your guest profile
      </h2>

      <p className='mb-8 text-primary-200'>
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <Suspense fallback={<Spinner />}>
        {/* Server-Component */}
        <UpdateProfile />
      </Suspense>
    </div>
  )
}

export default Profile
