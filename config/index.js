import path from 'path';

import sessionsCfg from './sessions';

export const viewsConfig = {
  path: path.join(process.cwd(), 'templates')
};

export const publicsConfig = {
  path: path.join(process.cwd(), 'public'),
  extends: []
};

export const sessionsConfig = sessionsCfg;
