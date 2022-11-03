import type { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import contentfulCompilationSetup from '@shopstory/core/dist/client/contentful/clientSetup'
import { shopstoryConfig } from '../../shopstory/shopstoryConfig'
import { shopstoryContentfulParams } from '../../shopstory/shopstoryContentfulParams'
import Shopstory from '@shopstory/core/dist/client/Shopstory'
import { Metadata, RenderableContentPiece } from '@shopstory/core/dist/client/types'
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper'
import { fetchLandingPageEntry } from '../../data/contentful/fetchLandingPageEntry'
import { ShopstoryClient } from '@shopstory/core/dist/client/ShopstoryClient'
import { DemoShopstoryProvider } from '../../shopstory/ShopstoryProvider'

type LandingPageProps = {
  content: RenderableContentPiece
  meta: Metadata
}

const LandingPage: NextPage<LandingPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageWrapper>
        {/* Below we're simply rendering Shopstory compiled content */}
        <DemoShopstoryProvider meta={props.meta}>
          <Shopstory content={props.content} />
        </DemoShopstoryProvider>
      </PageWrapper>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<LandingPageProps, { slug: string }> = async (context) => {
  let { params, preview, locale = 'en-US' } = context

  if (!params) {
    return { notFound: true }
  }

  // Here we simply fetch Contentful entry of the type "Landing Page".
  const entry = await fetchLandingPageEntry(params.slug, { preview: !!preview, locale })

  if (!entry) {
    return { notFound: true }
  }

  /**
   * Important!!! Shopstory compilation.
   *
   * This is a crucial step to integrate Shopstory but it is very simple. All you need to do is pass Shopstory-managed JSON field to the Shopstory compilation function. The returned object is "renderable".
   */
  const shopstoryClient = new ShopstoryClient(
    shopstoryConfig,
    contentfulCompilationSetup({ ...shopstoryContentfulParams, enablePreview: !!preview }),
    {
      locale
    }
  )

  const content = shopstoryClient.add(entry.fields.shopstory)
  const meta = await shopstoryClient.fetch()

  return {
    props: { content, meta },
    revalidate: 10
  }
}

export default LandingPage
