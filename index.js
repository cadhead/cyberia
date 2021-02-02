import 'dotenv/config';
import os from 'os';

import {
  name as APP_NAME,
  version as APP_VERSION
} from './package.json';

import app from './app';
import { io } from './socket.io-server';
import http from 'http';

const { console } = global;

const server = http.createServer(app);

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
const host = process.env.HOST || 'localhost';
const appInfo = `${APP_NAME} v.${APP_VERSION}`;

function getDomain(addr) {
  return typeof addr === 'string'
    ? `http://${addr}/`
    : `http://${addr.address}:${addr.port}/`;
}

const getMemoryUsageInfo = () => {
  const memoryUsageFormat = a => Math.round(((a / 1024 / 1024) * 100) / 100);
  const memUsed = memoryUsageFormat(process.memoryUsage().heapUsed);
  const memTotal = memoryUsageFormat(os.freemem());

  return { memUsed, memTotal };
};

function localSetup(error) {
  if (error) {
    throw new Error(error);
  }

  const { memUsed, memTotal } = getMemoryUsageInfo();
  const printInDevMode = (...mess) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(...mess);
    }
  };

  console.info('');
  console.info(`\x1b[32m${appInfo} running successfully.\x1b[0m`);
  console.info('');
  printInDevMode('\x1b[1mListening on:\x1b[34m', getDomain(server.address()), '\x1b[0m');
  console.info('\x1b[1mMemory usage:\x1b[0m', `${memUsed} / ${memTotal} MB`);
  printInDevMode('');
  printInDevMode('This program comes with \x1b[4mabsolutely no warranty\x1b[0m.');
  printInDevMode('This is free software, and you are welcome to redistribute it under certain conditions.');
  console.info('');
}

function herokuSetup(error) {
  if (error) {
    throw new Error(error);
  }

  const { memUsed, memTotal } = getMemoryUsageInfo();

  console.info(`${appInfo} successfully running on heroku.`);
  console.info('Memory usage:', `${memUsed} / ${memTotal} MB`);
}

io.attach(server);

switch (process.env.NODE_ENV) {
  case 'heroku': {
    server.listen(port, herokuSetup);

    break;
  }

  default: {
    server.listen(port, host, localSetup);
  }
}
