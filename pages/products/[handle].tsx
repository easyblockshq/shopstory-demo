import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import ProductDetails from '../../components/sections/ProductDetails/ProductDetails'
import fetchAllProductHandles from '../../data/shopify/fetchAllProductHandles'
import fetchProductByHandle from '../../data/shopify/fetchProductByHandle'
import { Path, ShopifyProduct } from '../../types'

const Page: NextPage<ShopifyProduct> = (product) => {
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <ProductDetails product={product} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: Path[] = []

  if (process.env.IS_VERCEL_PREVIEW !== 'true') {
    const handles = await fetchAllProductHandles()
    paths = handles.map((h) => ({ params: h }))
  }

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.handle) throw new Error('Catch all accessed without given [handle]')
  if (typeof params.handle !== 'string') throw new Error('Catch all accessed with wrong type of [handle]')

  const responses = await Promise.all([fetchProductByHandle(params.handle)])
  const product = responses[0]

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...product
    },
    revalidate: 10
  }
}

export default Page
