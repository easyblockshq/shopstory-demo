import styles from './styledClickable.module.css'
import React, { FC, ReactNode } from 'react'
import { ButtonProps } from '../Button/Button'
import { LinkObjProps } from '../Link/Link'

export type ButtonAppearance = 'solidBlack' | 'solidWhite' | 'solidGrey' | 'outlineBlack'

export const StyledClickable: FC<ButtonProps | LinkObjProps> = ({
  children,
  as,
  appearance,
  size,
  additionalClass,
  active = true,
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
      case 'solidWhite':
        classes.push(styles.solidWhite)
        break
      case 'solidGrey':
        classes.push(styles.solidGrey)
        break
      case 'outlineBlack':
        classes.push(styles.outlineBlack)
        break
      case 'radioButton':
        classes.push(styles.radioButton)
        break
      case 'checkboxButton':
        classes.push(styles.checkboxButton)
        break
      case 'colorButton':
        classes.push(styles.colorButton)
        break
    }
  }

  if (size) {
    switch (size) {
      case 'medium':
        classes.push(styles.sizeMedium)
        break
    }
  }

  if (!active) {
    classes.push(styles.inactive)
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

export type StyledClickableProps = {
  as?: 'a' | 'button'
  size?: 'large' | 'medium' | 'small' | 'wide'
  appearance?: ButtonAppearance
  active?: boolean
  tabIndex?: number
  children: ReactNode
  additionalClass?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void
}

StyledClickable.displayName = 'StyledClickable'
