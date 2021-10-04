import { io, config } from '../../socket.io-server';
import Room from '../../models/room';
import manager, { initializeRoom } from './manager';

export default async () => {
  const rooms = await Room.find();

  rooms.forEach((room) => {
    const { uniqName, title, isPrivate } = room;
    const roomIO = io.of(`/${config.routes.room}/${uniqName}`);

    initializeRoom(room);

    roomIO.on('connection', (socket) => {
      const events = Object.keys(manager);

      events.forEach((ev) => {
        socket.on(ev, manager[ev].bind(undefined, { socket, room, io: roomIO }));
      });
    });
  });
};
