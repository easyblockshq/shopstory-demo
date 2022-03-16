import { FC } from 'react'
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
      </div>
    </Link>
  )
}

export default ProductCard
