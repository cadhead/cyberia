import MongoStore from 'connect-mongo';
import { mongoConnection } from '..';

export default () => {
  return {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 6 * 60 * 60 * 1000,
      secure: false
    },
    store: MongoStore.create({ clientPromise: mongoConnection }),
    rolling: true,
    resave: false,
    saveUninitialized: false
  };
};
