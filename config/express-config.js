import path from 'path';

export const execExpressConfig = (app) => {
  app
    .set('views', path.join(process.cwd(), 'templates'))
    .set('view engine', 'pug')
    .set('trust proxy', true);
};
