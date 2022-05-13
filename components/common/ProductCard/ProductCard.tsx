import { FC } from 'react'
import { getCollectionColor } from '../../../data/shopify/filterCollection'
import { ShopifyProduct } from '../../../types'
import { formatPrice } from '../../../utils/formatPrice'
import Link from 'next/link'
import { Media } from '../Media/Media'
import styles from './productCard.module.css'

const ProductCard: FC<{ product: ShopifyProduct }> = ({ product }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={'/products/' + product.handle}>
        <a>
          <div className={styles.thumbnail}>
            {product.primaryImage ? (
              <Media
                media={product.primaryImage}
                layout="fill"
                sizes="(min-width: 1300px) 33.3333vw, (min-width: 740px) 50vw, 100vw"
              />
            ) : (
              <div className={styles.placeholder}>No image</div>
            )}
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{product.title}</h2>
            {product.price && <p className={styles.priceStandard}>{formatPrice(product.price)}</p>}
          </div>
        </a>
      </Link>
      {product.relatedProducts && product.relatedProducts?.length > 1 && (
        <div className={styles.related}>
          {product.relatedProducts.map((relatedProduct, i) => {
            let relatedLinkClasses = [styles.relatedProduct]
            if (product.handle === relatedProduct.handle) {
              relatedLinkClasses.push(styles.relatedProductActive)
            }

            if (relatedProduct.color && relatedProduct.color?.length > 0) {
              return (
                <Link href={'/products/' + relatedProduct.handle} key={i}>
                  <a className={relatedLinkClasses.join(' ')}>
                    <div
                      className={styles.relatedColor}
                      style={{ backgroundColor: getCollectionColor(relatedProduct.color[0].name)?.hex }}
                    ></div>
                  </a>
                </Link>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default ProductCard
