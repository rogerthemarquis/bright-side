import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/isAdmin'
import { isAdminOrSelf } from '../../access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: isAdmin, // Only admins can create new users
    delete: isAdmin, // Only admins can delete users
    read: isAdminOrSelf, // Users can read their own profile, admins can read all
    update: isAdminOrSelf, // Users can update their own profile, admins can update all
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      defaultValue: 'artist',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Artist',
          value: 'artist',
        },
      ],
      hasMany: true,
      access: {
        update: ({ req: { user } }) => {
          // Only admins can change roles
          return Boolean(user?.roles?.includes('admin'))
        },
      },
      admin: {
        description: 'Admin has full access. Artists can manage their own content.',
      },
    },
  ],
  timestamps: true,
}
