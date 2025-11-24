import type { Block } from 'payload'

export const ArtistProfile: Block = {
  slug: 'artistProfile',
  interfaceName: 'ArtistProfileBlock',
  fields: [
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'artistName',
      type: 'text',
      required: true,
    },
    {
      name: 'specialty',
      type: 'text',
      admin: {
        description: 'e.g., Traditional, Realism, Japanese, etc.',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
  ],
}
