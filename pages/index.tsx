import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { shopstoryConfig } from '../shopstory/shopstoryConfig'
import { Metadata, RenderableContent } from '@shopstory/core'
import { Shopstory } from '@shopstory/core/react'
import { fetchHomepageEntry } from '../data/contentful/fetchHomepageEntry'
import { PageWrapper } from '../components/common/PageWrapper/PageWrapper'
import { ShopstoryClient } from '@shopstory/core/client'
import { DemoShopstoryProvider } from '../shopstory/ShopstoryProvider'

type HomeProps = {
  content: RenderableContent
  meta: Metadata
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
      </Head>

      <PageWrapper>
        <DemoShopstoryProvider>
          <Shopstory content={props.content} meta={props.meta} />
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

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale,
    contentful: {
      preview: !!preview
    }
  })

  const content = shopstoryClient.add(entry.fields.shopstory)
  const meta = await shopstoryClient.build()

  return {
    props: { content, meta },
    revalidate: 10
  }
}

export default Home
