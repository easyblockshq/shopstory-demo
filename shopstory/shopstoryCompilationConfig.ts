/**
 * Shopstory compilation config.
 */

import { CompilationConfig } from '@shopstory/core/dist/client/types'
import { shopstoryRuntimeConfig } from './shopstoryRuntimeConfig'
import { fetchProductsByIds } from '../data/shopify/fetchProductsByIds'

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
        products.forEach((product) => {
          ret[product.id] = product
        })

        return ret
      }
    }
  }
}
