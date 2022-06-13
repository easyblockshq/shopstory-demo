import type { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper'
import { BannerSection } from '../../components/blocks/BannerSection/BannerSection'
import { Asset, Entry } from 'contentful'
import { ProductsGridSection } from '../../components/blocks/ProductsGridSection/ProductsGridSection'
import fetchCollectionByHandle from '../../data/shopify/fetchCollectionByHandle'
import { fetchPageEntry } from '../../data/contentful/fetchPageEntry'
import { TwoColumnsSection } from '../../components/blocks/TwoColumnsSection/TwoColumnsSection'
import compile from '@shopstory/core/dist/client/compile'
import contentfulCompilationSetup from '@shopstory/core/dist/client/contentful/compilationSetup'
import { shopstoryCompilationConfig } from '../../shopstory/shopstoryCompilationConfig'
import { shopstoryContentfulParams } from '../../shopstory/shopstoryContentfulParams'
import Shopstory from '@shopstory/core/dist/client/Shopstory'

type LandingPageProps = {
  blocks: any[]
}

const LandingPage: NextPage<LandingPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageWrapper>
        {props.blocks.map((block: any) => {
          if (block.type === 'blockBanner') {
            return <BannerSection {...block.data} />
          } else if (block.type === 'blockProductsGrid') {
            return <ProductsGridSection {...block.data} />
          } else if (block.type === 'blockTwoColumns') {
            return <TwoColumnsSection {...block.data} />
          } else if (block.type === 'shopstoryBlock') {
            return <Shopstory src={block.shopstoryCompiledContent} />
          } else {
            throw new Error(`unknown block type: ${block.sys.contentType.sys.id}`)
          }
        })}
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
  const entry = await fetchPageEntry(params.slug, { preview: !!preview, locale })

  if (!entry) {
    return { notFound: true }
  }

  const blocks: any[] = await Promise.all(
    entry.fields.blocks.map(async (block: Entry<any>) => {
      const type = block.sys.contentType.sys.id

      if (type === 'blockBanner') {
        const image: Asset = block.fields.image

        return {
          type,
          data: {
            title: block.fields.title,
            description: block.fields.description,
            image: {
              src: `https:${image.fields.file.url}`,
              width: image.fields.file.details.image?.width,
              height: image.fields.file.details.image?.height
            },
            button: block.fields.buttonLabel
              ? {
                  label: block.fields.buttonLabel,
                  url: block.fields.buttonLink
                }
              : null
          }
        }
      } else if (type === 'blockProductsGrid') {
        const collection = await fetchCollectionByHandle(block.fields.collection)

        return {
          type,
          data: {
            title: block.fields.title,
            products: collection?.products.slice(0, block.fields.maxItems ?? 12)
          }
        }
      } else if (type === 'blockTwoColumns') {
        return {
          type,
          data: {
            leftText: block.fields.leftText,
            rightText: block.fields.rightText,
            button: block.fields.buttonLabel
              ? {
                  label: block.fields.buttonLabel,
                  url: block.fields.buttonLink
                }
              : null
          }
        }
      } else if (type === 'shopstoryBlock') {
        const shopstoryCompiledContent = await compile(
          block.fields.config,
          shopstoryCompilationConfig,
          contentfulCompilationSetup({ ...shopstoryContentfulParams, enablePreview: !!preview }),
          {
            locale
          }
        )

        return {
          type,
          shopstoryCompiledContent
        }
      } else {
        throw new Error(`uknown block type: ${type}`)
      }
    })
  )

  return {
    props: {
      blocks
    },
    revalidate: 10
  }
}

export default LandingPage
