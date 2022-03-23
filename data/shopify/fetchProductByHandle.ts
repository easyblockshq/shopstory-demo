import { mapProduct } from '../../utils/mapProduct'
import fetchProducts from './fetchProducts'
import fetchShopify from './fetchShopify'
import { fetchProductByHandleQuery } from './graphql/fetchProductQuery'

const fetchProductByHandle = async (handle: string) => {
  const data = await fetchShopify(fetchProductByHandleQuery, { handle })

  if (!data) throw new Error("(fetchProductByHandle) Handle doesn't exist in Shopify: " + handle)

  let product = data.productByHandle

  if (!product) {
    return null
  }

  product = mapProduct(product)

  const relatedTag = product.tags.find((tag: any) => tag.startsWith('related'))
  const relatedProducts = await fetchProducts('tag:' + relatedTag)

  return { ...product, relatedProducts }
}

export default fetchProductByHandle
