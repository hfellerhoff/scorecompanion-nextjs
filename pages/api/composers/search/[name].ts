import type { NextApiRequest, NextApiResponse } from 'next';
import {
  OPEN_OPUS_COMPOSERS_BY_NAME,
  OPEN_OPUS_COMPOSERS_POPULAR,
  OPEN_OPUS_RANDOM_WORKS,
} from '../../../../constants/OpenOpus';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.name) {
    res.status(400);
    res.end;
  }

  console.log(
    OPEN_OPUS_COMPOSERS_BY_NAME +
      decodeURIComponent(req.query.name as string) +
      '.json'
  );

  const result = await fetch(
    OPEN_OPUS_COMPOSERS_BY_NAME +
      decodeURIComponent(req.query.name as string) +
      '.json'
  );
  const data = await result.json();

  if (data.status.success === 'true') {
    res.status(200).json(data);
  } else {
    res.status(400);
    res.end();
  }
};
