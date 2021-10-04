import express from 'express';
import { before } from '../controllers/pages';
import { render } from '../controllers/room';
import { config as socketConfig } from '../socket.io-server';

const roomRoute = express.Router();
const roomNamespace = socketConfig.routes.room;

const controllers = [
  before,
  render
];

roomRoute.get(`/${roomNamespace}/:room_id`, ...controllers);
roomRoute.get(`/${roomNamespace}`, (req, res) => res.redirect('/'));

export default roomRoute;
