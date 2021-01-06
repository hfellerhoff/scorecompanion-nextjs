import type { NextApiRequest, NextApiResponse } from 'next'
import { OPEN_OPUS_RANDOM_WORKS } from '../../constants/OpenOpus';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await fetch(OPEN_OPUS_RANDOM_WORKS, {
    method: 'POST',
    });

  const data = await result.json()

  if (data.status.success === 'true') {
    res.status(200).json(data.works)
  } else {
    res.status(400)
  }
}
