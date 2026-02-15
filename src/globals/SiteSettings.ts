import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'SafariIndia',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Your Gateway to Incredible India',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Contact Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'WhatsApp Number (digits only, no +91)',
      admin: {
        description: 'Example: 9876543210',
      },
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
      ],
    },
    {
      name: 'seoDefaults',
      type: 'group',
      fields: [
        {
          name: 'defaultTitle',
          type: 'text',
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
        },
      ],
    },
  ],
}
