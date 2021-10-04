import { render as renderError } from './common/error';
import createError from 'http-errors';

export const render = (req, res, next) => {
  res.locals.page.title = 'Admin panel';
  res.locals.page.access = 4;

  if (res.locals.page.access > res.locals.user.group) {
    return renderError(createError(404, {
      message: 'Room not exist'
    }), req, res, next);
  }

  return res.render('admin');
};

export const checkAdmin = (req, res, next) => {
  const { user } = req;

  return user.group >= 4 ? next() : res.redirect('/');
};
