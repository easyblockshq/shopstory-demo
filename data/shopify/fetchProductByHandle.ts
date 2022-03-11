import { mapProduct } from '../../utils/mapProduct'
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

  return { ...product }
}

export default fetchProductByHandle
