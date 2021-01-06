import type { NextApiRequest, NextApiResponse } from 'next';
import {
  API_COMPOSERS_BY_ID,
  API_COMPOSERS_BY_NAME,
  OPEN_OPUS_RANDOM_WORKS,
  OPEN_OPUS_WORKS_SEARCH,
} from '../../constants/OpenOpus';
import { Composer } from '../../models/OpenOpus';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { composer, genre, title },
  } = req;

  console.log('==========');

  console.log(composer);
  console.log(genre);
  console.log(title);

  if (composer) {
    const baseURL = process.env.VERCEL_URL || 'http://localhost:3000';
    const composerSearchURL =
      baseURL + API_COMPOSERS_BY_NAME + encodeURIComponent(composer as string);
    console.log(composerSearchURL);
    const composerRes = await fetch(composerSearchURL);
    const composerJson = await composerRes.json();
    const composerData = composerJson.composers[0];

    let endURL = `${composerData.id}/genre/${genre || 'url'}`;
    if (title) endURL += `/search/${title}`;
    endURL += '.json';

    console.log(OPEN_OPUS_WORKS_SEARCH + endURL);

    const result = await fetch(OPEN_OPUS_WORKS_SEARCH + endURL, {
      method: 'GET',
    });
    const data = await result.json();

    res.status(200).json(data);
  } else {
    res.status(400);
    res.end();
  }
};
