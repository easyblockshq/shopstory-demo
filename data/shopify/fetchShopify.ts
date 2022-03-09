import { GraphQLClient } from 'graphql-request'

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN
const URL = process.env.NEXT_PUBLIC_STOREFRONT_URL
if (!URL || !ACCESS_TOKEN) throw new Error('Please setup env variables for the project')

const client = new GraphQLClient(URL, {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
  }
})

async function fetchShopify(query: string, variables: any) {
  try {
    const data = await client.request(query, variables)
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export default fetchShopify
