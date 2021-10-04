import path from 'path';
import sessionsCfg from './sessions';
import { config } from 'dotenv';

export const commonConfig = {
  publicPath: path.join(process.cwd(), 'www'),
  ytAPIKey: config()
};

export const sessionsConfig = sessionsCfg;

export const helmetConfig = {};
