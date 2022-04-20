import CartIcon from '../../icons/CartIcon'
import SearchIcon from '../../icons/SearchIcon'
import { Button } from '../Button/Button'
import styles from './header.module.css'
import Link from 'next/link'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <Button
          onClick={() => {
            console.log('Menu button click')
          }}
        >
          Menu
        </Button>
      </div>

      <div className={styles.brand}>
        <Link href={`/`}>Demo store.</Link>
      </div>

      <div className={styles.nav}>
        <Link href={'/category/all'} passHref>
          <Button as={'a'}>What’s new</Button>
        </Link>

        <Link href={'/category/furniture'} passHref>
          <Button as={'a'}>Furniture</Button>
        </Link>

        <Link href={'/category/accessories'} passHref>
          <Button as={'a'}>Accessories</Button>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <Button
          onClick={() => {
            console.log('Search button click')
          }}
        >
          <SearchIcon />
        </Button>
        <Button
          onClick={() => {
            console.log('Cart button click')
          }}
        >
          <CartIcon />
        </Button>
      </div>
    </div>
  )
}

export default Header
