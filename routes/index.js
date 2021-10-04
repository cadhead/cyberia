import fs from 'fs';
import path from 'path';

import express from 'express';

import errorRoute from './error';

export const router = express.Router();

const pathToRoutesFolder = path.join(process.cwd(), 'routes');

fs.readdir(pathToRoutesFolder, (fsError, filenames) => {
  if (fsError && process.env.NODE_ENV === 'development') {
    throw fsError;
  }

  filenames.forEach(filename => {
    if (filename.includes('route')) {
      try {
        // eslint-disable-next-line global-require
        const route = require(`./${filename}`);
        // have no idea how to do that without require()
        router.use(route.default);
      } catch (error) {
        if (error && process.env.NODE_ENV === 'development') {
          throw error;
        }
      }
    }
  });

  router.use(errorRoute);
});
