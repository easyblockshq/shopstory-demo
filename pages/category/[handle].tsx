import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'
import ProductListing from '../../components/sections/ProductListing'
import fetchAllCollectionHandles from '../../data/shopify/fetchAllCollectionHandles'
import fetchCollectionByHandle from '../../data/shopify/fetchCollectionByHandle'
import { PLPProps } from '../../types'

const Page: NextPage<PLPProps> = (props) => {
  //const newProps = useMemo(() => decodeCollectionProps(props), [props.collection])

  const newProps = props
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
  let paths: any[] = []

  if (process.env.IS_VERCEL_PREVIEW !== 'true') {
    const handles = await fetchAllCollectionHandles()
    paths = handles.map((h) => ({ params: h }))
  }

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.handle) throw new Error('Catch all accessed without given [handle]')
  if (typeof params.handle !== 'string') throw new Error('Catch all accessed with wrong type of [handle]')

  const responses = await Promise.all([fetchCollectionByHandle(params.handle)])
  const collection = responses[0]

  if (!collection) {
    return {
      notFound: true
    }
  }

  const props = { collection }
  //const newProps = encodeCollectionProps(props)
  const newProps = props

  return {
    props: {
      ...newProps
    },
    revalidate: 60
  }
}

export default Page
