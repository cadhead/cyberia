import express from 'express';
import { before } from '../controllers';
import { error, render } from '../controllers/main/error';

const errorRoute = express.Router();

const controllers = [
  before,
  error,
  render
];

errorRoute.use(...controllers);

export default errorRoute;
