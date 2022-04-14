import type { NextPage } from 'next'
import Head from 'next/head'
import { createClient, Entry } from 'contentful'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import compile from '@shopstory/core/dist/client/compile'
import contentfulCompilationSetup from '@shopstory/core/dist/client/contentful/compilationSetup'
import { shopstoryCompilationConfig } from '../../shopstory/shopstoryCompilationConfig'
import { shopstoryRuntimeConfig } from '../../shopstory/shopstoryRuntimeConfig'
import { shopstoryContentfulParams } from '../../shopstory/shopstoryContentfulParams'
import { CompilationOutput } from '@shopstory/core/dist/client/types'
import Shopstory from '@shopstory/core/dist/client/Shopstory'
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper'

type LandingPageProps = {
  shopstoryCompiledContent: CompilationOutput
}

const LandingPage: NextPage<LandingPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageWrapper>
        <Shopstory runtimeConfig={shopstoryRuntimeConfig} src={props.shopstoryCompiledContent} />
      </PageWrapper>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<LandingPageProps, { slug: string }> = async (context) => {
  let { params, preview, previewData } = context

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: preview
      ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    host: preview ? 'preview.contentful.com' : undefined
  })

  if (!params) {
    return { notFound: true }
  }

  let entry: Entry<any>

  try {
    const response = await client.getEntries({
      limit: 1,
      include: 2,
      content_type: 'landingPage',
      'fields.slug': params.slug
    })

    entry = response.items[0]
  } catch (err) {
    return { notFound: true }
  }

  if (!entry) {
    return { notFound: true }
  }

  const config = entry.fields.shopstory

  const shopstoryCompiledContent = await compile(
    config,
    shopstoryCompilationConfig,
    contentfulCompilationSetup({ ...shopstoryContentfulParams, enablePreview: !!preview }),
    {
      locale: 'en-US'
    }
  )

  return {
    props: { shopstoryCompiledContent },
    revalidate: 10
  }
}

export default LandingPage
