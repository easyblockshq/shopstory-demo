import '../public/fonts/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/common/Header/Header'
import Footer from '../components/common/Footer/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { setAppElement } from 'react-modal'
import LoaderSection from '../components/sections/LoaderSection/LoaderSection'
import { Toast } from '../components/common/Toast/Toast'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    setAppElement('#modalContainer')
  }, [])

  const pageContent = (
    <>
      {router.isFallback && <LoaderSection />}
      {!router.isFallback && <Component {...pageProps} />}
    </>
  )

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!pageProps.noHeaderAndFooter && (
        <>
          <Header />
          {pageContent}
          <Footer />
        </>
      )}

      {pageProps.noHeaderAndFooter && pageContent}

      <div id={'modalContainer'} />
      <div id={'toastContainer'} />
    </>
  )
}

export default MyApp
