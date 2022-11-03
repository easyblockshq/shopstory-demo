import React from 'react'

import { Canvas } from '@shopstory/core/react'
import { contentfulEditorSetup } from '@shopstory/core/contentful/editorSetup'
import { shopstoryEditorConfig } from '../shopstory/shopstoryEditorConfig'
import { shopstoryContentfulParams } from '../shopstory/shopstoryContentfulParams'
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
      <Canvas
        editorConfig={shopstoryEditorConfig}
        config={shopstoryConfig}
        cms={contentfulEditorSetup(shopstoryContentfulParams)}
      />
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
