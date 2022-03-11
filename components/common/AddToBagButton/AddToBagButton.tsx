import styles from './addToBagButton.module.css'

const AddToBagButton = (props: any) => {
  return (
    <button className={styles.button} {...props}>
      Add to cart
    </button>
  )
}

export default AddToBagButton
