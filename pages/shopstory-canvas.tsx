import React from 'react'

import Launcher from '@shopstory/core/dist/client/Launcher'
import ContentfulCMS from '@shopstory/core/dist/client/contentful/editorSetup'
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
      <Launcher
        editorConfig={shopstoryEditorConfig}
        config={shopstoryConfig}
        cms={ContentfulCMS(shopstoryContentfulParams)}
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
