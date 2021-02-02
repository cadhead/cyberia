import createError from 'http-errors';
import { render as renderError } from '../main/error';
import { Channel } from '../../models/Channel';

export const checkExist = (req, res, next) => {
  const { channelName } = req.params;

  if (Channel.isExist(channelName)) {
    next();
  } else {
    renderError(createError(404, {
      message: 'Channel not exist'
    }), req, res, next);
  }
};

export const render = (req, res) => {
  const room = Channel.findOne(req.params.channelName);

  res.locals.page.title = room.title;

  res.render('channel');
};
