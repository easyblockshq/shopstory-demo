import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    externalResolver: true
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(500).json({ key: 'SAVING_ERROR' })

  const options = {
    method: 'POST',
    headers: { Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      data: `{"token": "${process.env.KLAVIYO_PUBLIC_API_KEY}", "event": "Subscribe list", "customer_properties": {"$email": "${req.body.email}"}}`
    })
  }
  if (req.method === 'POST') {
    fetch(`https://a.klaviyo.com/api/track`, options)
      .then((res) => res.json())
      .then((json) => {
        if (json == '1') {
          return res.status(200).json(json)
        }

        return res.status(500).json({ key: 'SAVING_ERROR' })
      })
      .catch(() => {
        res.status(500).json({ key: 'GENERAL_ERROR' })
      })
  } else {
    res.status(405).end()
  }
}
