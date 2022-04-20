import React, { FC } from 'react'
import styles from './Button.module.css'

export type ButtonAppearance = 'naked' | 'solidBlack' | 'solidWhite' | 'solidGrey' | 'outlineBlack'

type SharedButtonProps = {
  type?: 'submit' | 'reset' | 'button'
  appearance?: ButtonAppearance
  size?: 'standard' | 'medium'
}

type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement> | React.HTMLProps<HTMLLinkElement>, 'size'> &
  SharedButtonProps & { as?: 'button' | 'a' }

export const Button: FC<ButtonProps> = (props) => {
  const { children, as, appearance = 'naked', size, className, ...restProps } = props

  let classes = []

  if (className) {
    classes.push(className)
  }

  if (appearance) {
    switch (appearance) {
      case 'naked':
        break
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
    }
  }

  if (size) {
    switch (size) {
      case 'medium':
        classes.push(styles.sizeMedium)
        break
    }
  }

  if (props.as === 'a') {
    return (
      // @ts-ignore
      <a className={classes.join(' ')} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      // @ts-ignore
      <button className={classes.join(' ')} {...restProps}>
        {children}
      </button>
    )
  }
}
