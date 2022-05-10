import styles from './productDetails.module.css'
import React, { FC, useState } from 'react'
import { ShopifyProduct } from '../../../types'
import { formatPrice } from '../../../utils/formatPrice'
import AddToBagButton from '../../common/AddToBagButton/AddToBagButton'
import { Media } from '../../common/Media/Media'
import Link from 'next/link'
import { getCollectionColor } from '../../../data/shopify/filterCollection'
import { ToastPortal } from '../../common/Toast/ToastPortal'
import { Toast } from '../../common/Toast/Toast'

const ProductDetails: FC<{ product: ShopifyProduct }> = ({ product }) => {
  const [isToastActive, setIsToastActive] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false)

  const openToast = () => {
    if (!isToastActive && !isToastVisible) {
      setTimeout(function () {
        setIsToastVisible(false)
        setTimeout(function () {
          setIsToastActive(false)
        }, 700)
      }, 3000)
      setIsToastActive(true)
      setIsToastVisible(true)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        {product.media &&
          product.media.map((item, i) => {
            const aspectRatio = item.mediaObject.width / item.mediaObject.height
            const minWidth = aspectRatio ? aspectRatio * 520 + 'px' : undefined
            return (
              <div
                key={i}
                className={styles.galleryItem}
                style={{
                  minWidth: minWidth
                }}
              >
                <Media media={item} sizes={`(min-width: 1000px) calc(100vw - 480px), ${minWidth}`} />
              </div>
            )
          })}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.details}>
            {product.material && product.material?.length > 0 && (
              <div className={styles.material}>{getCollectionColor(product.material[0].name)?.fullName}</div>
            )}
            <div className={styles.prices}>
              {product.price && <p className={styles.priceStandard}>{formatPrice(product.price)}</p>}
              {product.compareAtPrice && <p className={styles.priceCompare}>{formatPrice(product.compareAtPrice)}</p>}
            </div>
            {product.relatedProducts && product.relatedProducts?.length > 1 && (
              <div className={styles.related}>
                {product.relatedProducts.map((relatedProduct, i) => {
                  let relatedLinkClasses = [styles.relatedProduct]
                  if (product.handle === relatedProduct.handle) {
                    relatedLinkClasses.push(styles.relatedProductActive)
                  }
                  return (
                    <Link href={'/products/' + relatedProduct.handle} key={i}>
                      <a className={relatedLinkClasses.join(' ')}>
                        {relatedProduct.primaryImage ? (
                          <Media media={relatedProduct.primaryImage} sizes="80px" />
                        ) : (
                          <div className={styles.placeholder}>No image</div>
                        )}
                      </a>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          <div className={styles.actions}>
            <AddToBagButton
              onClick={() => {
                openToast()
              }}
            />
            <ToastPortal>
              {isToastActive && <Toast message={'This is a demo store'} isVisible={isToastVisible} />}
            </ToastPortal>
          </div>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
