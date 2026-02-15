import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    adminThumbnail: ({ doc }) =>
      (doc?.sizes as any)?.thumbnail?.url || (doc?.url as string),
    disableLocalStorage: true, 
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text (for SEO and accessibility)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (optional)',
    },
  ],
}
