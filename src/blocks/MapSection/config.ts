import type { Block } from 'payload'

export const MapSection: Block = {
  slug: 'mapSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Located in downtown Omaha',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      defaultValue: '1200 N 12th St Ste 180, Omaha, NE 68102',
      required: true,
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps Embed URL',
      admin: {
        description: 'Get this from Google Maps > Share > Embed a map',
      },
      required: true,
    },
    {
      name: 'directionsLink',
      type: 'text',
      label: 'Get Directions Link',
      admin: {
        description: 'Link to open directions in Google Maps',
      },
      required: true,
    },
  ],
  interfaceName: 'MapSectionBlock',
}
