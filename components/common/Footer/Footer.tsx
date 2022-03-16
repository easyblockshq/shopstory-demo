import { Link } from '../Link/Link'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p className={styles.heading}>Sign up to Shopstory waitlist</p>
        <form className={styles.form}>
          <div className={styles.formContainer}>
            <input type="email" placeholder="your e-mail" required />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div className={styles.bottom}>
        <p>© Shopstory demo store 2022</p>
        <p>
          Content credits: <Link href={`/`}>noo.ma</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer
