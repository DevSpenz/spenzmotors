import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Simple in-memory user store
// In production, this should be stored in a database
const ADMIN_USER = {
  id: '1',
  email: 'admin@spenzamotors.com',
  password: 'admin123', // In production, this should be hashed!
  name: 'Admin User'
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Validate credentials
        if (
          credentials.email === ADMIN_USER.email &&
          credentials.password === ADMIN_USER.password
        ) {
          return {
            id: ADMIN_USER.id,
            email: ADMIN_USER.email,
            name: ADMIN_USER.name
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
