import React, { FC } from 'react'
import { StyledClickable, StyledClickableProps } from '../StyledClickable/StyledClickable'

export type ButtonProps = StyledClickableProps & {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  active?: boolean
}

export const Button: FC<ButtonProps> = ({ children, disabled, type, active = true, ...restProps }) => {
  return (
    <StyledClickable as={'button'} active={active} disabled={disabled} type={type} {...restProps}>
      {children}
    </StyledClickable>
  )
}
