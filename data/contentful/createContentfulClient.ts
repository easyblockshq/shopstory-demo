import { createClient } from 'contentful'

export function createContentfulClient(preview: boolean) {
  return createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: preview
      ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    host: preview ? 'preview.contentful.com' : undefined
  })
}
