// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  computedUserHmac: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!process.env.COURIER_SECRET) {
    res.status(400)
    return
  }

  const computedUserHmac = crypto
    .createHmac('sha256', process.env.COURIER_SECRET)
    .update(req.body)
    .digest('hex')
  res.status(200).json({ computedUserHmac })
}
