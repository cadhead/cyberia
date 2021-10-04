import express from 'express';
import { before } from '../controllers/pages';
import { render } from '../controllers/admin';

const admin = express.Router();

const controllers = [
  before,
  render
];

admin.get('/admin', ...controllers);

export default admin;
