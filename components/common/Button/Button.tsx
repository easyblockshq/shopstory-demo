import React, { FC } from 'react'
import { StyledClickable, StyledClickableProps } from '../StyledClickable/StyledClickable'

export type ButtonProps = StyledClickableProps & {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  active?: boolean
}

export const Button: FC<ButtonProps> = ({ children, disabled, type, active = true, as = 'button', ...restProps }) => {
  return (
    <StyledClickable as={as} active={active} disabled={disabled} type={type} {...restProps}>
      {children}
    </StyledClickable>
  )
}
