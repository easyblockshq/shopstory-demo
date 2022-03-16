import { mapProduct } from './mapProduct'
import { removeEdges } from './removeEdges'

export const mapCollection = (collection: any) => {
  return {
    id: collection.id,
    handle: collection.handle,
    descriptionHtml: collection.descriptionHtml,
    title: collection.title,
    products: removeEdges(collection.products).map(mapProduct)
  }
}
