import type { NextPage } from 'next'
import Head from 'next/head'
import SectionWelcome from '../components/sections/SectionWelcome'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionWelcome />
    </>
  )
}

export default Home
