import { CompilationConfig } from '@shopstory/core/dist/client/types';
import { shopstoryRuntimeConfig } from './shopstoryRuntimeConfig';

// const locale: Locale = {
//   country: 'nl',
//   lang: 'en',
//   prefix: 'nl-en'
// };
//
// const fetchProductBySku = async (sku: string): Promise<Product> => {
//   const fullPath = getCatalogPath(`/products/filter?sku=${sku}`, locale);
//   return fetchProduct(fullPath);
// };
//
// const productCardMapper = (product: Product): { productType: ProductType; variants: Variant[]; product: Variant } => {
//   return {
//     product: product.currentVariant,
//     productType: product.productType,
//     variants: product.variants
//   };
// };

export const shopstoryCompilationConfig: CompilationConfig = {
  runtimeConfig: shopstoryRuntimeConfig,
  spaceId: 'shopstory-demo',
  // types: {
  //   product: {
  //     fetch: async (ids: string[]) => {
  //       const ret: Record<string, any> = {};
  //       const promises: Promise<Product>[] = [];
  //
  //       ids.forEach(id => {
  //         const promise = fetchProductBySku(id);
  //         promises.push(promise);
  //         promise.then((product: Product) => {
  //           if (product) {
  //             ret[id] = productCardMapper(product);
  //           }
  //         });
  //       });
  //
  //       await Promise.all(promises);
  //
  //       return ret;
  //     }
  //   }
  // }
};
