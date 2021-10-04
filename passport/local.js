import { Strategy } from 'passport-local';
import User from '../models/user';
import { comparePassword } from '../controllers/user';

export const authLocalStrategy = new Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  const user = await User.findOne({ username });

  if (!user) return done(null, false, { message: 'User not exist.' });
  if (!comparePassword(user, password)) return done(null, false, { message: 'Invalid password.' });

  return done(null, user);
});
