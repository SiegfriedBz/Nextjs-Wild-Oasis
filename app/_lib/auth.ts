import { createGuest, getGuest } from '@/app/_services/guests.service'
import type { DefaultSession, Session, User } from '@auth/core/types'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
  // Extend session to hold the guestId
  interface Session extends DefaultSession {
    user: User & { guestId: number }
  }
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    /** Protect routes */
    authorized({ auth }: { auth: Session | null }) {
      return !!auth?.user
    },
    /** Create user in DB if not exist */
    async signIn({ user }: { user: User }) {
      try {
        // Check if the user exists in the database
        const existingGuest = await getGuest(user.email as string)

        // If not, create a new guest
        if (!existingGuest) {
          await createGuest({
            name: user?.name as string,
            email: user?.email as string
          })
        }

        return true
      } catch (error) {
        return false
      }
    },
    /** Add guestId to session.user - runs AFTER signIn callback */
    async session({ session }: { session: Session }) {
      const existingGuest = await getGuest(session?.user?.email as string)
      if (existingGuest?.id) {
        session.user.guestId = existingGuest?.id as number
      }

      return session
    }
  },

  pages: {
    signIn: '/login'
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth(authConfig)
