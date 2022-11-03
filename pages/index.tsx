import type { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import contentfulClientSetup from '@shopstory/core/dist/client/contentful/clientSetup'
import { shopstoryConfig } from '../shopstory/shopstoryConfig'
import { shopstoryContentfulParams } from '../shopstory/shopstoryContentfulParams'
import { Metadata, RenderableContentPiece } from '@shopstory/core/dist/client/types'
import Shopstory from '@shopstory/core/dist/client/Shopstory'
import { fetchHomepageEntry } from '../data/contentful/fetchHomepageEntry'
import { PageWrapper } from '../components/common/PageWrapper/PageWrapper'
import { ShopstoryClient } from '@shopstory/core/dist/client/ShopstoryClient'
import { DemoShopstoryProvider } from '../shopstory/ShopstoryProvider'

type HomeProps = {
  content: RenderableContentPiece
  meta: Metadata
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
      </Head>

      <PageWrapper>
        <DemoShopstoryProvider meta={props.meta}>
          <Shopstory content={props.content} />
        </DemoShopstoryProvider>
      </PageWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps, { slug: string }> = async (context) => {
  let { preview, locale = 'en-US' } = context

  const entry = await fetchHomepageEntry({ preview: !!preview, locale })

  if (!entry) {
    return { notFound: true }
  }

  const shopstoryClient = new ShopstoryClient(
    shopstoryConfig,
    contentfulClientSetup({ ...shopstoryContentfulParams, enablePreview: !!preview }),
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

export default Home
