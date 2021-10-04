import passport from 'passport';
import { validationResult } from 'express-validator';
import { createUser, isFirstRegistration, isUserExist } from '../controllers/user';

export const render = (req, res) => {
  res.locals.page.title = 'authentication';
  res.locals.page.message = req.flash('error');

  res.render('login');
};

export const registration = async (req, res) => {
  const { email, username, password } = req.body;

  const errors = validationResult(req);

  if (await isUserExist(username)) {
    req.flash('error', { param: 'registration', msg: 'Username is already taken.' });
    return res.redirect('/login');
  }

  if (!errors.isEmpty()) {
    req.flash('error', errors.array());

    return res.redirect('/login');
  }

  try {
    const isFirstUser = await isFirstRegistration();
    const user = createUser({
      email,
      username,
      password,
      group: isFirstUser ? 999 : 0
    });

    await user.save();

    return res.redirect('/login');
  } catch (error) {
    // req.flash('error', [...errors.array(), 'User already exists.']);
  }

  return res.redirect('/login');
};

export const authenticate = (req, res) => {
  return passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
  })(req, res);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};
