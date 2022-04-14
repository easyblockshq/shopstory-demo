import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query.page

  if (!page) {
    return res.status(401).json({ message: 'Invalid page' })
  }

  res.setPreviewData({})
  res.redirect(302, 'http://' + req.headers.host + page)
}
