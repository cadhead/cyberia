import { io, config } from '../../socket.io-server';
import Room from '../../models/room';
import manager, { initializeRoom } from './manager';
import {
  initializePlaylists,
  playlistItemRemove,
  playlistItems,
  playListItemSetCurrent
} from './playlist';
import { currentVideoTimeLeft, initializeVideo } from './video';

export default async () => {
  const rooms = await Room.find();

  rooms.forEach((room) => {
    const { uniqName } = room;
    const roomIO = io.of(`/${config.routes.room}/${uniqName}`);

    initializeRoom(room);
    initializePlaylists(room);
    initializeVideo(room);

    setInterval(() => {
      const playlist = playlistItems[room.uniqName];
      const currentItem = playlist.find(i => i.current === true);
      if (!currentItem || !currentItem.duration) {
        return;
      }

      currentVideoTimeLeft[uniqName] = currentVideoTimeLeft[uniqName]
        ? currentVideoTimeLeft[uniqName] + 1 : 0.1;
      if (currentItem.duration > 0 && currentVideoTimeLeft[uniqName] >= currentItem.duration + 3) {
        const nextItemIndex = playlist.indexOf(currentItem) + 1;
        const nextItem = playlist[nextItemIndex] ? playlist[nextItemIndex] : playlist[0];

        if (!currentItem.isPinned) playlistItemRemove({ room }, currentItem);
        else playListItemSetCurrent({ room }, nextItem);

        roomIO.emit('playlist', playlist);
      }

      roomIO.emit('video:sync', currentVideoTimeLeft[uniqName]);
    }, 1000);

    roomIO.on('connection', (socket) => {
      const events = Object.keys(manager);

      events.forEach((ev) => {
        socket.on(ev, manager[ev].bind(undefined, { socket, room, io: roomIO }));
      });
    });
  });
};
