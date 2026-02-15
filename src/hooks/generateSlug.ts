export const generateSlug = ({ data }: any) => {
  if (data.slug) {
    return data
  }

  if (!data.title) {
    return data
  }

  const slug = data.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return {
    ...data,
    slug,
  }
}
