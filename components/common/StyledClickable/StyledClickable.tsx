import styles from './styledClickable.module.css'
import React, { FC } from 'react'
import { ButtonProps } from '../Button/Button'
import { LinkObjProps } from '../Link/Link'

export const StyledClickable: FC<ButtonProps | LinkObjProps> = ({
  children,
  as,
  appearance,
  additionalClass,
  ...restProps
}) => {
  let classes = []

  if (additionalClass) {
    classes.push(additionalClass)
  }

  if (appearance) {
    switch (appearance) {
      case 'solidBlack':
        classes.push(styles.solidBlack)
        break
      case 'solidRed':
        classes.push(styles.solidRed)
        break
    }
  }

  if (as === 'a') {
    return (
      <a className={classes.join(' ')} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes.join(' ')} {...restProps}>
        {children}
      </button>
    )
  }
}

type Appearance = 'solidBlack' | 'solidRed' | undefined

export type StyledClickableProps = {
  as?: 'a' | 'button'
  //size?: 'large' | 'medium' | 'small' | 'wide'
  appearance?: Appearance
  tabIndex?: number
  children: any
  additionalClass?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void
}

StyledClickable.displayName = 'StyledClickable'
