import { $PAGE, $USER } from './common/commonvars';

export const before = async (req, res, next) => {
  Object.assign(res.locals, {
    user: req.user || $USER,
    page: $PAGE
  });

  Object.assign(res.locals.page, {
    messages: req.flash('messages'),
    errors: req.flash('error')
  });

  next();
};
