import styles from './productListing.module.css'
import React, { FC, useState } from 'react'
import { PLPProps } from '../../../types'
import ProductCard from '../../common/ProductCard/ProductCard'
import { useRouter } from 'next/router'

const ProductListing: FC<PLPProps> = (props) => {
  const router = useRouter()
  const query = router.query

  const [collection, setCollection] = useState(props.collection)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{props.collection.title}</h1>
          {props.collection.descriptionHtml && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: props.collection.descriptionHtml }}
            />
          )}
        </div>
        <div className={styles.filters}>Filter</div>
      </div>
      <div className={styles.productGrid}>
        {collection &&
          collection.products.length > 0 &&
          collection.products.map((product, i) => <ProductCard {...product} key={i} />)}
      </div>
    </div>
  )
}

export default ProductListing
