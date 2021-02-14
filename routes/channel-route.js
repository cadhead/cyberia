import express from 'express';
import { before } from '../controllers';
import { render, checkExist } from '../controllers/channel';
import { config as ioConfig } from '../socket.io-server';

const channel = express.Router();

const controllers = [
  before,
  checkExist,
  render
];

channel.get(`${ioConfig.routes.channel}:channelName`, ...controllers);

export default channel;
