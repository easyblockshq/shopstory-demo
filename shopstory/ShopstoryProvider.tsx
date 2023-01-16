import React, { ReactNode } from 'react'
import { Button } from '../components/common/Button/Button'
import Link from 'next/link'
import ProductCard from '../components/common/ProductCard/ProductCard'
import { ShopstoryProvider } from '@shopstory/core/react'

const ShopstoryButton = React.forwardRef(
  ({ label, traceId, traceClicks, traceImpressions, ...restProps }: any, ref) => {
    return <Button {...restProps}>{label}</Button>
  }
)

ShopstoryButton.displayName = 'ShopstoryButton'

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

type MyShopstoryProviderProps = {
  children: ReactNode
}

export const DemoShopstoryProvider: React.FC<MyShopstoryProviderProps> = ({ children }) => {
  return (
    <ShopstoryProvider
      components={{
        ProductCard
      }}
      buttons={{
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
