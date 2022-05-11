import { Entry } from 'contentful'
import { ContentfulQueryParams } from './ContentfulQueryParams'
import { createContentfulClient } from './createContentfulClient'

export async function fetchCollectionEntry(
  slug: string,
  options: ContentfulQueryParams
): Promise<Entry<any> | undefined> {
  const locale = options.locale ?? 'en-US'

  const client = createContentfulClient(options.preview)

  let entry: Entry<any>

  try {
    const response = await client.getEntries({
      limit: 1,
      include: 2,
      content_type: 'collectionPage',
      'fields.slug': slug,
      locale
    })

    entry = response.items[0]
  } catch (err) {
    return
  }

  if (!entry) {
    return
  }

  return entry
}
