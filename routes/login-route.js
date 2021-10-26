import express from 'express';
import {
  render, authenticate, logout, registration
} from '../controllers/auth';
import { before } from '../controllers/pages';
import { body } from 'express-validator';

const loginRoute = express.Router();

const registrationBodyValidate = [
  body('email')
    .isEmail()
    .withMessage('Please, provide correct email adress.'),
  body('username')
    .isLength({ min: 3 })
    .withMessage('Please, provide correct username. It must be at least 6 chars long.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 chars long.')
];

loginRoute.get('/login', before, render);
loginRoute.post('/login', authenticate);
loginRoute.get('/logout', logout);

loginRoute.post('/login/new', registrationBodyValidate, registration);

export default loginRoute;
