import { FC } from 'react'
import { getCollectionColor } from '../../../data/shopify/filterCollection'
import { ShopifyProduct } from '../../../types'
import { formatPrice } from '../../../utils/formatPrice'
import { Link } from '../Link/Link'
import { Media } from '../Media/Media'
import styles from './productCard.module.css'

const ProductCard: FC<ShopifyProduct> = (product) => {
  return (
    <Link href={'/products/' + product.handle} className={styles.wrapper}>
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
        {product.relatedProducts && product.relatedProducts?.length > 1 && (
          <div className={styles.related}>
            {product.relatedProducts.map((rproduct, i) => {
              let relatedLinkClasses = [styles.relatedProduct]
              if (product.handle === rproduct.handle) {
                relatedLinkClasses.push(styles.relatedProductActive)
              }

              if (rproduct.material && rproduct.material?.length > 0) {
                return (
                  <Link href={'/products/' + rproduct.handle} key={i} className={styles.relatedLink}>
                    <div className={relatedLinkClasses.join(' ')}>
                      <div
                        className={styles.relatedMaterial}
                        style={{ backgroundColor: getCollectionColor(rproduct.material[0].name)?.hex }}
                      ></div>
                    </div>
                  </Link>
                )
              }
            })}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
