/**
 * Shopstory compilation config.
 */

import { CompilationConfig } from '@shopstory/core/dist/client/types'
import { shopstoryRuntimeConfig } from './shopstoryRuntimeConfig'
import { fetchProductsByIds } from '../data/shopify/fetchProductsByIds'
import fetchProducts from '../data/shopify/fetchProducts'

export const shopstoryCompilationConfig: CompilationConfig = {
  runtimeConfig: shopstoryRuntimeConfig,
  spaceId: 'shopstory-demo',
  types: {
    /**
     * In shopstoryRuntimeConfig we used "product" type in a ProductCard schema. This is not Shopstory-defined type, so we must pass the instruction how to fetch it.
     *
     * Below we're defining "fetch function" that transforms product ids to the product objects necessary for ProductCard. It is totally custom and up to the developers.
     */
    product: {
      fetch: async (ids: string[]) => {
        const ret: Record<string, any> = {}

        const products = await fetchProductsByIds(ids)
        await Promise.all(
          products.map(async (product) => {
            const relatedTag = product.tags?.find((tag: any) => tag.startsWith('related'))
            const relatedProducts = await fetchProducts('tag:' + relatedTag)
            ret[product.id] = { ...product, relatedProducts }
          })
        )

        return ret
      }
    }
  }
}
