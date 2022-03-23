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

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    setAppElement('#modalContainer')
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />

      {router.isFallback && <LoaderSection />}
      {!router.isFallback && <Component {...pageProps} />}

      <Footer />
      <div id={'modalContainer'} />
    </>
  )
}

export default MyApp
