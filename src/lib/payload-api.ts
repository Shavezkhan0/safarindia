import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPackages(params?: {
  category?: string
  destination?: string
  featured?: boolean
  page?: number
  limit?: number
  search?: string
}) {
  const payload = await getPayload({ config })

  const where: Record<string, any> = {
    isActive: { equals: true },
  }

  if (params?.featured) {
    where.isFeatured = { equals: true }
  }

  if (params?.category) {
    where.category = { equals: params.category }
  }

  if (params?.destination) {
    where.destination = { equals: params.destination }
  }

  if (params?.search) {
    where.title = { contains: params.search }
  }

  const result = await payload.find({
    collection: 'packages',
    where,
    depth: 2,
    page: params?.page || 1,
    limit: params?.limit || 12,
    sort: '-createdAt',
  })

  return result
}

export async function getFeaturedPackages() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'packages',
    where: {
      isActive: { equals: true },
      isFeatured: { equals: true },
    },
    depth: 2,
    limit: 8,
    sort: '-createdAt',
  })

  return result.docs
}

export async function getPackageBySlug(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'packages',
    where: {
      slug: { equals: slug },
      isActive: { equals: true },
    },
    depth: 3,
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getRelatedPackages(category: string, excludeId: string, limit = 4) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'packages',
    where: {
      and: [
        { category: { equals: category } },
        { isActive: { equals: true } },
        { id: { not_equals: excludeId } },
      ],
    },
    depth: 2,
    limit,
    sort: '-createdAt',
  })

  return result.docs
}

export async function getDestinations(params?: { featured?: boolean; category?: string }) {
  const payload = await getPayload({ config })

  const where: Record<string, any> = {
    isActive: { equals: true },
  }

  if (params?.featured) {
    where.isFeatured = { equals: true }
  }

  if (params?.category) {
    where.category = { equals: params.category }
  }

  const result = await payload.find({
    collection: 'destinations',
    where,
    depth: 1,
    sort: 'order',
  })

  return result.docs
}

export async function getDestinationBySlug(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'destinations',
    where: {
      slug: { equals: slug },
      isActive: { equals: true },
    },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getActiveBanners() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'banners',
    where: {
      isActive: { equals: true },
    },
    depth: 2,
    sort: 'order',
  })

  return result.docs
}

export async function getSiteSettings() {
  const payload = await getPayload({ config })

  const result = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })

  return result
}
