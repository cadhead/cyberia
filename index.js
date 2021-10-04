import 'dotenv/config';
import os from 'os';

import {
  name as APP_NAME,
  version as APP_VERSION
} from './package.json';

import { app } from './cyberia';
import { io } from './socket.io-server';
import mongoose from 'mongoose';
import http from 'http';

const { console } = global;

const server = http.createServer(app);
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
const appInfo = `${APP_NAME} v.${APP_VERSION}`;

const getMemoryUsageInfo = () => {
  const memoryUsageFormat = a => Math.round(((a / 1024 / 1024) * 100) / 100);
  const memUsed = memoryUsageFormat(process.memoryUsage().heapUsed);
  const memTotal = memoryUsageFormat(os.freemem());

  return { memUsed, memTotal };
};

// console.info('\x1b[32mConnected to a database.\x1b[0m');

export const mongoConnection = mongoose.connect(process.env.MONGO_URI)
  .then((m) => m.connection.getClient());

io.attach(server);
server.listen(port, () => {
  const { memUsed, memTotal } = getMemoryUsageInfo();
  // console.info('');
  console.info(`\x1b[32m${appInfo} running successfully.\x1b[0m`);
  console.info('');
  console.info('\x1b[1mMemory usage:\x1b[0m', `${memUsed} / ${memTotal} MB`);
  console.info('');
  console.info('This program comes with \x1b[4mabsolutely no warranty\x1b[0m.');
  console.info('This is free software, and you are welcome to redistribute it under certain conditions.');
  console.info('');
});
