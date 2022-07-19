import React from 'react'

import Launcher from '@shopstory/core/dist/client/Launcher'
import ContentfulCMS from '@shopstory/core/dist/client/contentful/cms'
import { shopstoryEditorConfig } from '../shopstory/shopstoryEditorConfig'
import { shopstoryContentfulParams } from '../shopstory/shopstoryContentfulParams'

/**
 * This is Shopstory "canvas page".
 *
 * When you open Shopstory editor in Contentful, this page is used as "canvas" for rendering content.
 *
 */
function ShopstoryEditorPage() {
  return <Launcher editorConfig={shopstoryEditorConfig} cms={ContentfulCMS(shopstoryContentfulParams)} />
}

export async function getStaticProps() {
  return {
    props: {
      noHeaderAndFooter: true
    }
  }
}

export default ShopstoryEditorPage
