export type ShopifyPrice = {
  amount: string
  currencyCode: string
}

export type ShopifyMedia = {
  originalSrc: string
  id?: string
  altText?: string
  from?: 'shopify'
  type?: 'IMAGE' | 'VIDEO'
  sources?: any
}

export type ShopifyProduct = {
  title: string
  descriptionHtml: string
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice
  media: [MediaObject]
}

export type ShopifyProductVariantRes = {
  id: string
  title: string
  priceV2: ShopifyPrice
  compareAtPriceV2: ShopifyPrice
}

export type ImageObject = {
  src: string
  width: number
  height: number
  alt?: string
  format?: string
  id: string
  from: 'shopify'
}

export type MediaObject =
  | {
      mediaType: 'image'
      mediaObject: ImageObject
    }
  | {
      mediaType: 'video'
      mediaObject: any
    }
