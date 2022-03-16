import React, { FC } from 'react'
import NextLink from 'next/link'
import { StyledClickable, StyledClickableProps } from '../StyledClickable/StyledClickable'

export type LinkObjProps = {
  href?: string
  shallow?: boolean
} & StyledClickableProps & {
    target?: '_blank'
    className?: string
    download?: boolean
  }

export const Link: FC<LinkObjProps> = ({
  children,
  download,
  appearance,
  href,
  tabIndex,
  target,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  className
}) => {
  const elementProps = {
    download,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    tabIndex,
    target
  }
  if (!href) return null
  return (
    <NextLink href={href} passHref prefetch={false}>
      <StyledClickable as={'a'} additionalClass={className} appearance={appearance} {...elementProps}>
        {children}
      </StyledClickable>
    </NextLink>
  )
}
