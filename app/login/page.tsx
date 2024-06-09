import { Metadata } from 'next'
import SignInButton from '@/app/_components/SignInButton'

export const metadata: Metadata = {
  title: 'Login'
}

const Login = () => {
  return (
    <div className='flex flex-col gap-10 mt-10 items-center'>
      <h2 className='text-2xl font-semibold'>
        Sign in to access your guest area
      </h2>
      {/* Server-Component */}
      <SignInButton />
    </div>
  )
}

export default Login
