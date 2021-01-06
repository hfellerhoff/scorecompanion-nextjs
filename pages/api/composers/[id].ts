import type { NextApiRequest, NextApiResponse } from 'next';
import {
  OPEN_OPUS_COMPOSERS_BY_ID,
  OPEN_OPUS_COMPOSER_GENRES,
} from '../../../constants/OpenOpus';
import {
  WIKIPEDIA_PAGE_BY_TITLE_END,
  WIKIPEDIA_PAGE_BY_TITLE_START,
  WIKIPEDIA_TITLE_SEARCH_END,
  WIKIPEDIA_TITLE_SEARCH_START,
} from '../../../constants/Wikipedia';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) res.status(404);

  // Get composer data
  const result = await fetch(
    OPEN_OPUS_COMPOSER_GENRES + req.query.id + '.json',
    {
      method: 'GET',
    }
  );
  const data = await result.json();

  if (data.status.success === 'true') {
    if (req.query.complete) {
      // Wikipedia
      const wikipediaFirstURL =
      WIKIPEDIA_TITLE_SEARCH_START +
      encodeURIComponent(data.composer.name) +
      WIKIPEDIA_TITLE_SEARCH_END;
      const wikipediaFirstResult = await fetch(wikipediaFirstURL);
      const wikipediaFirstData = await wikipediaFirstResult.json();
      const title = wikipediaFirstData.query.search[0].title;
      const parsedTitle = encodeURIComponent(title.replace(/\s+/g, '_'))
      
      const wikipediaSecondURL =
      WIKIPEDIA_PAGE_BY_TITLE_START +
      parsedTitle +
      WIKIPEDIA_PAGE_BY_TITLE_END;
      const wikipediaSecondResult = await fetch(wikipediaSecondURL);
      const wikipediaSecondData = await wikipediaSecondResult.json();
      console.log(wikipediaSecondData.query.pages[0].extract.split('\n'));

      res.status(200).json({
        openopus: data,
        wikipedia: {
          title,
          extract: wikipediaSecondData.query.pages[0].extract.split('\n'),
        },
      });
    } else {
      res.status(200).json({
        openopus: data,
      });
    }
  } else {
    res.status(400);
  }
};
