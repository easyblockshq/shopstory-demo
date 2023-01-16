import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import ProductListing from '../../components/sections/ProductListing/ProductListing'
import fetchCollectionByHandle from '../../data/shopify/fetchCollectionByHandle'
import { filterCollection } from '../../data/shopify/filterCollection'
import { PLPProps } from '../../types'
import { decomposeHandle } from '../../utils/collectionsHandle'
import { fetchCollectionEntry } from '../../data/contentful/fetchCollectionEntry'

import { shopstoryConfig } from '../../shopstory/shopstoryConfig'
import { ShopstoryClient } from '@shopstory/core/client'

const Page: NextPage<PLPProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.collection.title}</title>
      </Head>
      <ProductListing {...props} key={props.collection.handle} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PLPProps> = async ({ params, preview, locale }) => {
  if (!params?.handle) throw new Error('Catch all accessed without given [handle]')
  if (typeof params.handle !== 'string') throw new Error('Catch all accessed with wrong type of [handle]')

  const { handle, values } = decomposeHandle(params.handle)

  if (!handle) {
    return {
      notFound: true
    }
  }

  const collectionEntry = await fetchCollectionEntry(handle, { locale, preview: !!preview })
  const shopifyCollectionHandle = collectionEntry?.fields.collectionId ?? handle

  const fullCollection = await fetchCollectionByHandle(shopifyCollectionHandle)
  if (!fullCollection) {
    return {
      notFound: true
    }
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: locale ?? 'en-US'
  })

  const renderableContent = shopstoryClient.add(collectionEntry?.fields.shopstory, {
    mode: 'grid'
  })

  const meta = await shopstoryClient.build()

  const { filters, collection, pagination, numberOfItems } = filterCollection(fullCollection, values)

  return {
    props: {
      fullCollection,
      collection,
      filters,
      pagination,
      numberOfItems,
      renderableContent,
      meta
    },
    revalidate: 60
  }
}

export default Page
