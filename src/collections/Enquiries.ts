import type { CollectionConfig } from 'payload'

const populatePackageFields = async ({ data, req, operation }: any) => {
  if (!data) return data
  if (operation === 'create' || operation === 'update') {
    if (data.packageRef) {
      try {
        const pkg = await req.payload.findByID({
          collection: 'packages',
          id: data.packageRef,
          depth: 0,
          overrideAccess: true,
        })
        if (pkg) {
          data.packageTitle = (pkg as any).title as string
          data.packageSlug = typeof (pkg as any).slug === 'string' ? (pkg as any).slug : ''
        }
      } catch (error) {
        console.error('Error fetching package:', error)
      }
    }
  }
  return data
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'mobileNumber',
    group: 'Leads',
    defaultColumns: ['mobileNumber', 'packageTitle', 'status', 'createdAt'],
    description: 'All booking enquiries submitted by website visitors',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [populatePackageFields],
  },
  fields: [
    {
      name: 'packageRef',
      type: 'relationship',
      relationTo: 'packages' as const,
      required: false,
      label: 'Package',
    },
    {
      name: 'packageTitle',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-filled when enquiry is saved',
      },
    },
    {
      name: 'packageSlug',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'mobileNumber',
      type: 'text',
      required: true,
      validate: (value: any) => {
        if (!value) return true
        const regex = /^[6789]\d{9}$/
        if (!regex.test(value)) {
          return 'Please enter a valid 10-digit Indian mobile number'
        }
        return true
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: '🔵 New', value: 'new' },
        { label: '🟡 Contacted', value: 'contacted' },
        { label: '🟢 Converted', value: 'converted' },
        { label: '⚫ Closed', value: 'closed' },
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Admin Notes',
      admin: {
        description: 'Internal notes - not visible to customer',
      },
    },
  ],
}
