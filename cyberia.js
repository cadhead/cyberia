import { execExpressConfig } from './config/express-config';
import { sessionsConfig, helmetConfig, commonConfig } from './config';

import express from 'express';
import helmet from 'helmet';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import { applySocketMiddleware } from './socket.io-server';
import { router } from './routes';
import { applyModels } from './models';
import passport from 'passport';
import { authLocalStrategy } from './passport/local';
import User from './models/user';

export const app = express();

execExpressConfig(app);

app.use(
  // helmet(helmetConfig),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(commonConfig.publicPath),
  flash()
);

passport.use('local', authLocalStrategy);

(async function apply() {
  await applyModels();

  const sessionMiddleware = expressSession(sessionsConfig());
  // temporary solution, because of 'connect-mongo'

  app.use(
    sessionMiddleware,
    passport.initialize(),
    passport.session()
  );

  applySocketMiddleware(
    sessionMiddleware,
    passport.initialize(),
    passport.session()
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);

    done(null, user);
  });

  app.use(router);

  await (await import('./lib/room')).default();
}());
