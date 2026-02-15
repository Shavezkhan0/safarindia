import type { CollectionConfig } from 'payload'
import { generateSlug } from '../hooks/generateSlug'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'destination', 'category', 'price', 'isFeatured', 'isActive'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [generateSlug],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Auto-generated from title. Do not edit.',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: {
        description: 'Max 160 characters. Shown on package cards.',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Hill Station', value: 'hill-station' },
        { label: 'Beach', value: 'beach' },
        { label: 'Heritage & Culture', value: 'heritage' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Wildlife', value: 'wildlife' },
        { label: 'Pilgrimage', value: 'pilgrimage' },
        { label: 'Honeymoon', value: 'honeymoon' },
      ],
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'days',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'nights',
          type: 'number',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'price',
      type: 'group',
      fields: [
        {
          name: 'original',
          type: 'number',
          required: true,
          label: 'Original Price (₹)',
        },
        {
          name: 'discounted',
          type: 'number',
          label: 'Discounted Price (₹)',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'INR',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'isMain',
          type: 'checkbox',
          label: 'Set as Main Image',
        },
      ],
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional promotional video',
      },
    },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'activities',
          type: 'array',
          fields: [
            {
              name: 'activity',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'includes',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'excludes',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'groupSize',
      type: 'group',
      fields: [
        {
          name: 'min',
          type: 'number',
          label: 'Minimum People',
        },
        {
          name: 'max',
          type: 'number',
          label: 'Maximum People',
        },
      ],
    },
    {
      name: 'startDates',
      type: 'array',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
    },
  ],
}
