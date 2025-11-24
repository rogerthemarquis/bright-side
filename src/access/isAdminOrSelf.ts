import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

export const isAdminOrSelf = ({ req: { user } }: AccessArgs<User>) => {
  // Allow admins to access all users
  if (user?.roles?.includes('admin')) {
    return true
  }

  // Allow users to access only themselves
  return {
    id: {
      equals: user?.id,
    },
  }
}
