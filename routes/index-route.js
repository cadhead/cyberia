import express from 'express';
import { before } from '../controllers/pages';
import { render } from '../controllers/common';

const index = express.Router();

const controllers = [
  before,
  render
];

index.get('/', ...controllers);

export default index;
