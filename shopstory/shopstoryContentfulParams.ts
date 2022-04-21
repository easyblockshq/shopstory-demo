import { ContentfulParams } from '@shopstory/core/dist/client/contentful/types'
import { getContentfulConfiguration } from '../utils/getContentfulConfiguration'

export const shopstoryContentfulParams: ContentfulParams = {
  ...getContentfulConfiguration(),
  enablePreview: true
}
