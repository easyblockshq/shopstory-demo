import '../public/fonts/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { setAppElement } from 'react-modal'

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

      {router.isFallback && <div>Loading...</div>}
      {!router.isFallback && <Component {...pageProps} />}

      <Footer />
      <div id={'modalContainer'} />
    </>
  )
}

export default MyApp
