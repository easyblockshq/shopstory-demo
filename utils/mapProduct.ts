import { ShopifyProductVariantRes } from '../types'
import { removeEdges } from './removeEdges'

export const mapProduct = (product: any) => {
  if (!product) {
    return null
  }
  const mapMedia = (media: any) => {
    if (media.mediaContentType === 'IMAGE') {
      return {
        mediaType: 'image',
        mediaObject: {
          src: media.originalSrc,
          width: media.width,
          height: media.height,
          alt: media.altText,
          id: media.id,
          from: 'shopify'
        }
      }
    } else if (media.mediaContentType === 'VIDEO') {
      return {
        mediaType: 'video',
        mediaObject: {
          from: 'shopify',
          sources: media.sources
        }
      }
    } else {
      return null
    }
  }

  const productVariants = removeEdges(product.variants)
  const productMedia = product.media ? removeEdges(product.media).map((item) => mapMedia(item)) : null

  const productImages = removeEdges(product.images).map((item) => mapMedia({ ...item, mediaContentType: 'IMAGE' }))

  let primaryImage = productImages[0] ?? null
  let secondaryImage = productImages[1] ?? null

  //const colorName = product.tags.find((tag) => tag.includes('color'))?.split('-')[1] ?? null

  //const sizes = productVariants.map((variant) => ({ id: variant.title, label: variant.title })) // Imporant! We treat size as ID. This removes duplicates from filtering, makes nice URLs for size filtering etc. We don't need this ID.

  //   const _color = COLORS.find((c) => c.name === colorName)
  //   const color = {
  //     name: colorName,
  //     hex: _color ? _color.hex : 'ruby',
  //     isLight: _color ? _color.isLight : false
  //   }

  const prices = productVariants.map((variant: any) => variant.priceV2)

  const compareAtPrices = productVariants.map((variant: any) => variant.compareAtPriceV2)

  const price = prices[0]
  const compareAtPrice = compareAtPrices[0]

  const restProduct = {
    //sizes,
    tags: product.tags,
    //color,
    media:
      product.media && productMedia
        ? [...productMedia.filter((e: any) => e.type === 'VIDEO'), ...productImages]
        : productImages,
    primaryImage,
    secondaryImage,
    relatedProducts: [],
    price,
    compareAtPrice
  }

  return {
    ...product,
    ...restProduct,
    variants: productVariants.map((variant) => ({
      //   title: variant.title,
      //   id: variant.id,
      //   quantityAvailable: variant.quantityAvailable,
      //   sku: variant.sku,
      //   available: variant.availableForSale,
      //   size: { id: variant.title, label: variant.title },
      isLowStock: false,
      isFinalSale: false,
      //color,
      productId: product.id,
      productHandle: product.handle
    }))
  }
}
