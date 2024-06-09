'use server'

import { signIn, signOut } from '@/app/_lib/auth'

/** Auth */
export async function signInAction() {
  await signIn('google', {
    redirectTo: '/account'
  })
}

export async function signOutAction() {
  await signOut({
    redirectTo: '/'
  })
}
