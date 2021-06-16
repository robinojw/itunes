import { MediaContent } from '../src/utils/media_content';
import dotenv from 'dotenv';
import express from 'express';

const cors = require('cors');
const fetch = require('node-fetch');
const figlet = require('figlet');
const chalk = require('chalk');

const RESOURCE = 'https://itunes.apple.com/search?';

dotenv.config();

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 8081);

// Make the json response from the api accessible via the port 8081
app.get(`/:media/:query`, async (req, res) => {
  const media: string = req.params.media;
  const query: string = req.params.query;

  res.send({
    message: await getMedia(media, query)
  });
});

app.listen(app.get('port'), () => {
  console.log(
    chalk.bold.blueBright(
      figlet.textSync('HP Techinical Test', {
        horizontalLayout: 'full'
      })
    ),
    `\n Author: ${chalk.underline.greenBright(
      'Robin White, github/robinojw'
    )}\n\n`,
    `Express server is running at http://localhost:${app.get(
      'port'
    )} in ${app.get('env')} mode\n`
  );
  console.log(' Press CTRL-C to stop\n');
});

/**
 * Get list of media from iTunes api
 * @param media media type i.e album, podcast, movie
 * @param query search query i.e Oasis
 * @returns A raw json object from the api in the format message > results
 */
const getMedia = async (
  media: string,
  query: string
): Promise<MediaContent> => {
  const searchTerm = query.toLowerCase().replace(/%20/g, '+');

  return await fetch(
    RESOURCE + new URLSearchParams({ term: searchTerm, entity: media })
  )
    .then((res: any) => res.json())
    .catch((error: Error) =>
      console.log(`Unable to complete request with error: ${error}`)
    );
};

export default app;
