import CartIcon from '../../icons/CartIcon'
// import SearchIcon from '../../icons/SearchIcon'
import { Button } from '../Button/Button'
import styles from './header.module.css'
import Link from 'next/link'
import { ToastPortal } from '../Toast/ToastPortal'
import { Toast } from '../Toast/Toast'
import { useState } from 'react'

const Header = () => {
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
        <Link href={'/category/new'} passHref>
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
        {/* <Button
          onClick={() => {
            console.log('Search button click')
          }}
        >
          <SearchIcon />
        </Button> */}
        <Button
          onClick={() => {
            openToast()
          }}
        >
          <CartIcon />
        </Button>
      </div>
      <ToastPortal>
        {isToastActive && <Toast message={'This is a demo store'} isVisible={isToastVisible} />}
      </ToastPortal>
    </div>
  )
}

export default Header
