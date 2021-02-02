import express from 'express';
import { before } from '../controllers';
import { render } from '../controllers/main/index';

const index = express.Router();

const controllers = [
  before,
  render
];

index.get('/', ...controllers);

export default index;
