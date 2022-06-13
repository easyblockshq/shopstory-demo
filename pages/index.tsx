import type { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import compile from '@shopstory/core/dist/client/compile'
import contentfulCompilationSetup from '@shopstory/core/dist/client/contentful/compilationSetup'
import { shopstoryCompilationConfig } from '../shopstory/shopstoryCompilationConfig'
import { shopstoryContentfulParams } from '../shopstory/shopstoryContentfulParams'
import { CompilationOutput } from '@shopstory/core/dist/client/types'
import Shopstory from '@shopstory/core/dist/client/Shopstory'
import { fetchHomepageEntry } from '../data/contentful/fetchHomepageEntry'
import { PageWrapper } from '../components/common/PageWrapper/PageWrapper'

type HomeProps = {
  shopstoryCompiledContent: CompilationOutput
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
      </Head>

      <PageWrapper>
        <Shopstory src={props.shopstoryCompiledContent} />
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

export default Home
