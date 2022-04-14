import type { NextPage } from 'next'
import Head from 'next/head'
import SectionWelcome from '../components/sections/SectionWelcome/SectionWelcome'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Demo store.</title>
      </Head>

      <SectionWelcome />
    </>
  )
}

export default Home
