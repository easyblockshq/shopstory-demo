import { Button } from '../Button/Button'

const AddToBagButton = ({ ...restProps }) => {
  return (
    <Button appearance={'solidBlack'} {...restProps}>
      Add to cart
    </Button>
  )
}

export default AddToBagButton
