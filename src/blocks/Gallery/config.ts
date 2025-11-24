import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Portfolio',
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select images to display in the gallery',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}
