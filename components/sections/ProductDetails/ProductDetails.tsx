import styles from './productDetails.module.css'
import React, { FC } from 'react'
import { ShopifyProduct } from '../../../types'
import { formatPrice } from '../../../utils/formatPrice'
import AddToBagButton from '../../common/AddToBagButton'
import { Media } from '../../common/Media/Media'

const ProductDetails: FC<{ product: ShopifyProduct }> = ({ product }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        {product.media &&
          product.media.map((item, i) => (
            <div key={i} className={styles.galleryItem}>
              <Media media={item} ratio={'landscape3'} sizes="(min-width: 1000px) calc(100vw - 480px), 100vw" />
            </div>
          ))}
      </div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.details}>
          <div className={styles.material}>Oak</div>
          <div className={styles.prices}>
            {product.price && <p className={styles.priceStandard}>{formatPrice(product.price)}</p>}
            {product.compareAtPrice && <p className={styles.priceCompare}>{formatPrice(product.compareAtPrice)}</p>}
          </div>
        </div>
        <div className={styles.actions}>
          <AddToBagButton
            onClick={() => {
              console.log('AddToBagButton click')
            }}
          />
        </div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </div>
    </div>
  )
}

export default ProductDetails
