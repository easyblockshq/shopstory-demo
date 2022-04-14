import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'
import ProductListing from '../../components/sections/ProductListing/ProductListing'
import fetchAllCollectionHandles from '../../data/shopify/fetchAllCollectionHandles'
import fetchCollectionByHandle from '../../data/shopify/fetchCollectionByHandle'
import { filterCollection } from '../../data/shopify/filterCollection'
import { Path, PLPProps } from '../../types'
import { decomposeHandle } from '../../utils/collectionsHandle'
import { decodeCollectionProps, encodeCollectionProps } from '../../utils/encodeCollectionProps'

const Page: NextPage<PLPProps> = (props) => {
  const newProps = useMemo(() => decodeCollectionProps(props), [props.collection])

  return (
    <>
      <Head>
        <title>{props.collection.title}</title>
      </Head>
      <ProductListing {...newProps} key={props.collection.handle} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: Path[] = []

  if (process.env.IS_VERCEL_PREVIEW !== 'true') {
    const handles = await fetchAllCollectionHandles()
    paths = handles.map((h) => ({ params: h }))
  }

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.handle) throw new Error('Catch all accessed without given [handle]')
  if (typeof params.handle !== 'string') throw new Error('Catch all accessed with wrong type of [handle]')

  const { handle, values } = decomposeHandle(params.handle)

  if (!handle) {
    return {
      notFound: true
    }
  }

  const responses = await Promise.all([fetchCollectionByHandle(handle)])
  const fullCollection = responses[0]

  if (!fullCollection) {
    return {
      notFound: true
    }
  }

  const { filters, collection, pagination, numberOfItems } = filterCollection(fullCollection, values)

  const newProps = encodeCollectionProps({ collection, filters, pagination, fullCollection, numberOfItems })

  return {
    props: {
      ...newProps
    },
    revalidate: 60
  }
}

export default Page
