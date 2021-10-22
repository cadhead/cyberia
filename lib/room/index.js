import { io, config } from '../../socket.io-server';
import Room from '../../models/room';
import manager, { initializeRoom } from './manager';
import { initializePlaylists, playlistItemRemove, playlistItems } from './playlist';

export default async () => {
  const rooms = await Room.find();

  rooms.forEach((room) => {
    const { uniqName } = room;
    const roomIO = io.of(`/${config.routes.room}/${uniqName}`);

    initializeRoom(room);
    initializePlaylists(room);

    setInterval(() => {
      const currentItem = playlistItems[room.uniqName].find(i => i.current === true);
      if (!currentItem) {
        return;
      }

      currentItem.timeLeft = currentItem.timeLeft ? currentItem.timeLeft + 3 : 0.1;

      if (currentItem.timeLeft >= currentItem.duration + 3) {
        playlistItemRemove({ room }, currentItem);
      }

      roomIO.emit('playlist', playlistItems[room.uniqName]);
    }, 3000);

    roomIO.on('connection', (socket) => {
      const events = Object.keys(manager);

      events.forEach((ev) => {
        socket.on(ev, manager[ev].bind(undefined, { socket, room, io: roomIO }));
      });
    });
  });
};
