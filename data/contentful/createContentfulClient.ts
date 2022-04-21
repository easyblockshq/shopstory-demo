import { createClient } from 'contentful'
import { getContentfulConfiguration } from '../../utils/getContentfulConfiguration'

export function createContentfulClient(preview: boolean) {
  const contentfulConfiguration = getContentfulConfiguration()

  return createClient({
    ...contentfulConfiguration,
    space: contentfulConfiguration.space,
    accessToken: preview ? contentfulConfiguration.previewAccessToken : contentfulConfiguration.accessToken,
    host: preview ? 'preview.contentful.com' : undefined
  })
}
