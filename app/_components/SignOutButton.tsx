import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { signOutAction } from '@/app/_actions/auth.actions'

// Server-Component
const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <button
        type='submit'
        className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'
      >
        <ArrowRightStartOnRectangleIcon className='h-5 w-5 text-primary-600' />
        <span className='whitespace-nowrap'>Sign out</span>
      </button>
    </form>
  )
}

export default SignOutButton
