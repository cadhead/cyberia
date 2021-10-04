import socketIO from 'socket.io';
import Room from './models/room';

export const io = socketIO();

export const config = {
  routes: {
    room: 'r'
  }
};

export const applySocketMiddleware = async (...middlewares) => {
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  const rooms = await Room.find();

  rooms.forEach(r => {
    middlewares.forEach((middleware) => {
      io.of(`/${config.routes.room}/${r.uniqName}`).use(wrap(middleware));
    });
  });
};
