import CartIcon from '../../icons/CartIcon'
import SearchIcon from '../../icons/SearchIcon'
import { Button } from '../Button/Button'
import { Link } from '../Link/Link'
import styles from './header.module.css'

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
        <Link href={`/category/all`}>What’s new</Link>
        <Link href={`/category/furniture`}>Furniture</Link>
        <Link href={`/category/accessories`}>Accessories</Link>
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
