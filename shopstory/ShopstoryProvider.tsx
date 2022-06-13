import React from 'react'
import { Button } from '../components/common/Button/Button'
import Link from 'next/link'
import ProductCard from '../components/common/ProductCard/ProductCard'
import { ShopstoryProvider } from '@shopstory/core/dist/client/Shopstory'

const ShopstoryButton = React.forwardRef(({ label, ...restProps }: any, ref) => {
  return <Button {...restProps}>{label}</Button>
})

/**
 * Shopstory allows for custom "link actions". Here we define a link wrapper for next/link.
 */
function NextLinkProvider({ Component, componentProps, values }: any) {
  return (
    <Link href={values.pagePath} passHref={true}>
      <Component {...componentProps} />
    </Link>
  )
}

export const MyShopstoryProvider: React.FC<{}> = ({ children }) => {
  return (
    <ShopstoryProvider
      components={{
        ProductCard,
        Button: ShopstoryButton
      }}
      links={{
        MyLink: NextLinkProvider
      }}
    >
      {children}
    </ShopstoryProvider>
  )
}
