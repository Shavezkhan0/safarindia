import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { payloadCloudinaryPlugin } from '@jhb.software/payload-cloudinary-plugin'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Destinations } from './collections/Destinations'
import { Packages } from './collections/Packages'
import { Enquiries } from './collections/Enquiries'
import { Banners } from './collections/Banners'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — YatraGo CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  onInit: async (payload) => {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 0,
      depth: 0,
    })

    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@safarindia.com',
          password: 'SafariIndia@2024!',
          name: 'Super Admin',
          role: 'superadmin',
        },
        draft: false,
      })
      console.log('✅ Default admin user created: admin@safarindia.com / SafariIndia@2024!')
    }
  },
  collections: [Users, Media, Destinations, Packages, Enquiries, Banners],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: process.env.CORS ? process.env.CORS.split(',') : [],
  csrf: process.env.CSRF ? process.env.CSRF.split(',') : [],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    payloadCloudinaryPlugin({
      collections: {
        media: true,
      },
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
      credentials: {
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
      },
      folder: process.env.CLOUDINARY_FOLDER || 'safarindia',
    }),
  ],
})
