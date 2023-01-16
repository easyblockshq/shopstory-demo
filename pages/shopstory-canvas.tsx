import React from 'react'

import { Canvas } from '@shopstory/core/react'
import { shopstoryConfig } from '../shopstory/shopstoryConfig'
import { DemoShopstoryProvider } from '../shopstory/ShopstoryProvider'

/**
 * This is Shopstory "canvas page".
 *
 * When you open Shopstory editor in Contentful, this page is used as "canvas" for rendering content.
 *
 */
function ShopstoryEditorPage() {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryConfig} />
    </DemoShopstoryProvider>
  )
}

export async function getStaticProps() {
  return {
    props: {
      noHeaderAndFooter: true
    }
  }
}

export default ShopstoryEditorPage
