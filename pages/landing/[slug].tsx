import type { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import compile from '@shopstory/core/dist/client/compile'
import contentfulCompilationSetup from '@shopstory/core/dist/client/contentful/compilationSetup'
import { shopstoryCompilationConfig } from '../../shopstory/shopstoryCompilationConfig'
import { shopstoryRuntimeConfig } from '../../shopstory/shopstoryRuntimeConfig'
import { shopstoryContentfulParams } from '../../shopstory/shopstoryContentfulParams'
import { CompilationOutput } from '@shopstory/core/dist/client/types'
import Shopstory from '@shopstory/core/dist/client/Shopstory'
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper'
import { fetchLandingPageEntry } from '../../data/contentful/fetchLandingPageEntry'

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
  let { params, preview, locale = 'en-US' } = context

  if (!params) {
    return { notFound: true }
  }

  const entry = await fetchLandingPageEntry(params.slug, { preview: preview ?? true, locale })

  if (!entry) {
    return { notFound: true }
  }

  const shopstoryCompiledContent = await compile(
    entry.fields.shopstory,
    shopstoryCompilationConfig,
    contentfulCompilationSetup({ ...shopstoryContentfulParams, enablePreview: !!preview }),
    {
      locale
    }
  )

  return {
    props: { shopstoryCompiledContent },
    revalidate: 10
  }
}

export default LandingPage
