import socketIO from 'socket.io';

export const io = socketIO();

export const config = {
  routes: {
    channel: '/l/'
  }
};
