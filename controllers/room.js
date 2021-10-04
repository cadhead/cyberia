import Room from '../models/room';
import { getUsersCount } from '../lib/room/manager';
import { render as renderError } from './common/error';
import createError from 'http-errors';

export const isRoomExist = async (uniqName) => {
  const room = await Room.findOne({ uniqName });

  return !!room;
};

export const render = async (req, res, next) => {
  res.locals.page.title = 'room';

  if (!await isRoomExist(req.params.room_id)) {
    return renderError(createError(404, {
      message: 'Room not exist'
    }), req, res, next);
  }

  return res.render('layouts/room');
};

export const createRoom = ({ uniqName, owner, isPrivate }) => {
  const room = new Room({ uniqName, owner, isPrivate });

  return room;
};

export const getRoomsList = async () => {
  const rooms = await Room.find();
  let list = [];

  rooms.forEach(r => {
    const { uniqName, owner, ranks } = r;
    const room = {
      uniqName,
      owner,
      ranks,
      userscount: getUsersCount(r)
    };

    list = [...list, room];
  });

  return list;
};
