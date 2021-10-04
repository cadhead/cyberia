import express from 'express';
import { before } from '../controllers/pages';
import { error, render } from '../controllers/common/error';

const errorRoute = express.Router();

const controllers = [
  before,
  error,
  render
];

errorRoute.use(...controllers);

export default errorRoute;
