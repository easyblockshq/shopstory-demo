import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <button>Menu</button>
      </div>
      <div className={styles.brand}>Demo store.</div>
      <div className={styles.nav}>
        <a href="#">What’s new</a>
        <a href="#">Furniture</a>
        <a href="#">Accessories</a>
      </div>
      <div className={styles.rightContainer}>Icons</div>
    </div>
  )
}

export default Header
