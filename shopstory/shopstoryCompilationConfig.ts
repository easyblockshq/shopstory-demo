/**
 * Shopstory compilation config.
 */

import { CompilationConfig } from '@shopstory/core/dist/client/types'
import { fetchProductsByIds } from '../data/shopify/fetchProductsByIds'
import fetchProducts from '../data/shopify/fetchProducts'
import ProductCard from '../components/common/ProductCard/ProductCard'

export const shopstoryCompilationConfig: CompilationConfig = {
  spaceId: 'shopstory-demo',

  actions: [],

  /**
   * Aspect ratios are tokenized.
   */
  aspectRatios: [
    {
      id: '$gridMainObjectDefault',
      value: '10:7'
    }
  ],

  /**
   * Color tokens
   */
  colors: [
    {
      id: 'color_black_01',
      label: 'Black 01',
      value: '#252525'
    },
    {
      id: 'color_black_02',
      label: 'Black 02',
      value: '#4f4f4f'
    },
    {
      id: 'color_black_03',
      label: 'Black 03',
      value: '#000000'
    },
    {
      id: 'white_01',
      label: 'White 01',
      value: '#f9f8f3'
    },
    {
      id: 'white_02',
      label: 'White 02',
      value: '#bdbdbd'
    },
    {
      id: 'beige_01',
      label: 'Beige 01',
      value: '#f1f0ea'
    },
    {
      id: 'grey_01',
      label: 'Grey 01',
      value: '#a0a09d'
    },
    {
      id: 'grey_02',
      label: 'Grey 02',
      value: '#4F4F4F'
    }
  ],

  /**
   * Custom components.
   *
   * Here we connect custom components from the project to the Shopstory. Each custom components needs to have type, reference to the component and schema.
   *
   */
  components: [
    {
      id: 'ProductCard',
      type: 'card',
      schema: [
        /**
         * Product is a "custom type". In compilation config and editor config you will see how we define this type.
         */
        {
          prop: 'product',
          type: 'product'
        },
        {
          prop: 'relatedProductsMode',
          label: 'Related products - mode',
          type: 'select',
          options: [
            {
              id: 'disabled',
              label: 'Off',
              value: 'disabled'
            },
            {
              id: 'enabled',
              label: 'On',
              value: 'enabled'
            },
            {
              id: 'onHover',
              label: 'On hover',
              value: 'onHover'
            }
          ]
        },
        {
          prop: 'withBackdrop',
          label: 'Backdrop',
          type: 'boolean'
        }
      ]
    },
    {
      id: 'Button',
      type: 'button',
      schema: [
        {
          prop: 'appearance',
          type: 'select',
          options: ['solidBlack', 'solidGrey', 'solidWhite', 'outlineBlack', 'underlinedBlack']
        }
      ]
    }
  ],

  /**
   * Devices / breakpoints
   */
  devices: [
    {
      breakpoint: 480,
      h: 667,
      id: 'xs',
      label: 'Phone',
      w: 375
    },
    {
      breakpoint: 768,
      h: 375,
      hidden: true,
      id: 'sm',
      label: 'Phone SM h',
      w: 667
    },
    {
      breakpoint: 1024,
      h: 1024,
      id: 'md',
      label: 'Tablet',
      w: 768
      // hidden: true
    },
    {
      breakpoint: 1280,
      id: 'lg',
      w: 1024,
      h: 768,
      label: 'TabletH',
      hidden: true
    },
    {
      breakpoint: 1680,
      h: 768,
      id: 'xl',
      isMain: true,
      label: 'Laptop',
      w: 1366
    },
    {
      breakpoint: null,
      h: 920,
      hidden: true,
      id: '2xl',
      label: 'Desktop',
      w: 1920
    }
  ],

  /**
   * Font tokens
   */
  fonts: [
    {
      id: 'body',
      label: 'Body',
      value: {
        fontSize: 20,
        lineHeight: 1.8,
        fontFamily: 'test-soehne-mono'
      }
    },
    {
      id: 'body-small',
      label: 'Body small',
      value: {
        fontSize: 13,
        lineHeight: 1.8,
        fontFamily: 'test-soehne-mono'
      }
    },
    {
      id: 'heading1',
      label: 'Heading 1',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 48,
        lineHeight: 1.2,
        fontWeight: 700,
        '@sm': {
          fontSize: 36 // responsiveness is easy
        }
      }
    },
    {
      id: 'heading2',
      label: 'Heading 2',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 36,
        lineHeight: 1.2,
        fontWeight: 700,
        '@sm': {
          fontSize: 24 // responsiveness is easy
        }
      }
    },
    {
      id: 'heading3',
      label: 'Heading 3',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 21,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: 'heading4',
      label: 'Heading 4',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 16,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: 'heading5',
      label: 'Heading 5',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 13,
        lineHeight: 1.4,
        fontWeight: 600
      }
    }
  ],

  /**
   * Custom link actions.
   *
   * Below we define Next.js link. Each custom link action can have its own custom schema.
   */
  links: [
    {
      id: 'MyLink',
      label: 'URL Route',
      schema: [
        {
          prop: 'pagePath',
          type: 'string',
          defaultValue: '/'
        }
      ]
    }
  ],

  /**
   * Collection page grid information
   */
  mainGrid: {
    containerMargin: 0,
    horizontalGap: 1,
    numberOfItemsInRow: {
      '@initial': '3',
      '@sm': '2'
    },
    verticalGap: 24
  },

  /**
   * Space tokens.
   *
   * containerMargin.default is a default container margin for the page.
   */
  space: [
    {
      id: 'containerMargin.default',
      value: {
        '@initial': 96,
        '@xxl': 96,
        '@xl': 80,
        '@lg': 60,
        '@md': 40,
        '@sm': 24,
        '@xs': 24
      }
    },
    {
      id: 'containerMargin.large',
      value: {
        '@initial': 384,
        '@xxl': 384,
        '@xl': 280,
        '@lg': 160,
        '@md': 40,
        '@sm': 24,
        '@xs': 24
      }
    },
    {
      id: 'containerMargin.medium',
      value: {
        '@initial': 192,
        '@xxl': 192,
        '@xl': 160,
        '@lg': 92,
        '@md': 40,
        '@sm': 24,
        '@xs': 24
      }
    }
  ],

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
