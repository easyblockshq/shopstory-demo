/**
 * Shopstory Editor config
 */

import { EditorConfig } from '@shopstory/core'
import { shopifyProductPickerField } from '@shopstory/core/shopify'

export const shopstoryEditorConfig: EditorConfig = {
  widgets: {
    /**
     * For custom "product" resource type we must define the editor widget.
     *
     * Here we're using built-in "shopifyProductPickerField" that automatically integrates with Shopify.
     *
     * It is easy to create custom widgets here and connect to any e-commerce platform.
     */
    product: () => {
      if (!process.env.NEXT_PUBLIC_STOREFRONT_NAME) {
        throw new Error('no shopify storefront name')
      }

      if (!process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN) {
        throw new Error('no shopify access token')
      }

      return shopifyProductPickerField({
        store: process.env.NEXT_PUBLIC_STOREFRONT_NAME,
        storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN
      })
    }
  }
}
