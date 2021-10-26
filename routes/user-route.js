import express from 'express';
import { getUsersList } from '../controllers/user';

const userRoute = express.Router();

userRoute.get('/user/all', getUsersList);

export default userRoute;
