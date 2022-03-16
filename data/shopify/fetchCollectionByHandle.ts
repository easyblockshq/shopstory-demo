import { mapCollection } from '../../utils/mapCollection'
import fetchShopify from './fetchShopify'
import { fetchCollectionByHandleQuery } from './graphql/fetchCollectionByHandleQuery'

const fetchCollectionByHandle = async (handle: string) => {
  let collection: any = null
  let collectionProducts: any = []
  let lastProductCursor = null
  let hasNextPage = false

  do {
    const data: any = await fetchShopify(fetchCollectionByHandleQuery, { handle: handle, cursor: lastProductCursor })

    if (!data.collectionByHandle) return null

    hasNextPage = data.collectionByHandle.products.pageInfo.hasNextPage
    if (hasNextPage) {
      lastProductCursor =
        data.collectionByHandle.products.edges[data.collectionByHandle.products.edges.length - 1].cursor
    }
    collectionProducts = [...collectionProducts, ...data.collectionByHandle.products.edges]

    if (!collection) {
      collection = data.collectionByHandle
    }
  } while (hasNextPage)

  if (!collection) {
    return null
  }

  collection.products.edges = collectionProducts

  collection = mapCollection(collection)

  return { ...collection }
}

export default fetchCollectionByHandle
