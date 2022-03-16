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
  handle: string
  descriptionHtml: string
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice
  media: [MediaObject]
  primaryImage?: MediaObject
  secondaryImage?: MediaObject
}

export type ShopifyCollection = {
  title: string
  id: string
  handle: string
  descriptionHtml?: string
  products: [ShopifyProduct]
}

export type PLPProps = {
  collection: ShopifyCollection
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
