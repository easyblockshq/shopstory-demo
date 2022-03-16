import React, { FC } from 'react'
import { StyledClickable, StyledClickableProps } from '../StyledClickable/StyledClickable'

export type ButtonProps = StyledClickableProps & {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button: FC<ButtonProps> = ({ children, disabled, type, ...restProps }) => {
  return (
    <StyledClickable as={'button'} disabled={disabled} type={type} {...restProps}>
      {children}
    </StyledClickable>
  )
}
