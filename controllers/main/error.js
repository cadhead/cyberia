import createError from 'http-errors';

export const error = (req, res, next) => {
  next(createError(404));
};

// eslint-disable-next-line no-unused-vars
export const render = (err, req, res, next) => {
  Object.assign(res.locals.page, {
    title: `${err.status} ${err.message}`,
    error: err
  });

  res.status(err.status || 500);
  res.render(err.statusCode.toString());
};
