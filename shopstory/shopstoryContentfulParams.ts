import { ContentfulParams } from '@shopstory/core/contentful'
import { getContentfulConfiguration } from '../utils/getContentfulConfiguration'

export const shopstoryContentfulParams: ContentfulParams = {
  ...getContentfulConfiguration(),
  enablePreview: true
}
