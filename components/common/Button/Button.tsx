import React, { FC } from 'react'
import { StyledClickable, StyledClickableProps } from '../StyledClickable/StyledClickable'

export type ButtonProps = StyledClickableProps & {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  active?: boolean
}

export const Button: FC<ButtonProps> = React.forwardRef(
  ({ children, disabled, type, active = true, as = 'button', ...restProps }, ref) => {
    return (
      <StyledClickable as={as} active={active} disabled={disabled} type={type} {...restProps} ref={ref}>
        {children}
      </StyledClickable>
    )
  }
)
