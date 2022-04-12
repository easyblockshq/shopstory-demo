import { CompilationConfig } from '@shopstory/core/dist/client/types';
import { shopstoryRuntimeConfig } from './shopstoryRuntimeConfig';
import { fetchProductsByIds } from '../data/shopify/fetchProductsByIds'

export const shopstoryCompilationConfig: CompilationConfig = {
  runtimeConfig: shopstoryRuntimeConfig,
  spaceId: 'shopstory-demo',
  types: {
    product: {
      fetch: async (ids: string[]) => {
        const ret: Record<string, any> = {};

        const products = await fetchProductsByIds(ids);
        products.forEach(product => {
          ret[product.id] = product;
        })

        return ret;
      }
    }
  }
};
