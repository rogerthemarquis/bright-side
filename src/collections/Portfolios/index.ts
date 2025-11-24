import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePortfolio } from './hooks/revalidatePortfolio'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Portfolios: CollectionConfig<'portfolios'> = {
  slug: 'portfolios',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    artist: true,
  },
  admin: {
    defaultColumns: ['title', 'artist', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'portfolios',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'portfolios',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'artist',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Select the artist this portfolio belongs to',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'profile',
              type: 'group',
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
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'My Work',
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
            },
          ],
        },
        {
          label: 'Appointment Form',
          fields: [
            {
              name: 'appointmentForm',
              type: 'relationship',
              relationTo: 'forms',
              admin: {
                description: 'Select a form for appointment requests',
              },
            },
            {
              name: 'formTitle',
              type: 'text',
              defaultValue: 'Book an Appointment',
            },
            {
              name: 'formDescription',
              type: 'textarea',
              admin: {
                description: 'Optional description above the appointment form',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePortfolio],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
