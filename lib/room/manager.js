import {
  initializeChat, sendUserMessage, lastMessages, sendServerMessage
} from './chat';
import { playlistItemAdd, playlistItems } from './playlist';

export const users = {};

const calculateUsersInRoom = (room) => {
  if (!users[room.uniqName]) return 0;

  return Object.keys(users[room.uniqName].sids).length + users[room.uniqName].anons.size;
};

export const getUsersCount = (room) => calculateUsersInRoom(room);

export const isRoomHasUser = (room, user) => {
  return !!users[room.uniqName].sids[user.username];
};

export const initializeRoom = (room) => {
  const { uniqName } = room;

  users[uniqName] = {
    sids: {},
    anons: new Set()
  };

  initializeChat(room);
};

const onUserJoin = (socket, room) => {
  const { user } = socket.request;

  if (!isRoomHasUser(room, user)) {
    users[room.uniqName].sids[user.username] = new Set();
    socket.broadcast.emit('user:join_room', { username: user.username });
  }

  users[room.uniqName].sids[user.username].add(socket.id);

  sendServerMessage({ socket, message: { text: `@${user.username} has joined` } });
  sendServerMessage({
    socket,
    message: {
      text: 'You have successfully connected.'
    },
    toUser: true
  });
};

const onGuestJoin = (socket, room) => {
  sendServerMessage({
    socket,
    message: {
      text: 'You have successfully connected. But you can\'t write here. Login first.'
    },
    toUser: true
  });

  users[room.uniqName].anons.add(socket.id);
};

export default {
  'user:join_room': ({ socket, room }) => {
    const { user } = socket.request;

    if (user) onUserJoin(socket, room);
    else onGuestJoin(socket, room);

    socket.emit('user:join_room', {
      lastMessages: lastMessages[room.uniqName] || [],
      users: Object.keys(users[room.uniqName].sids),
      playlistItems: playlistItems[room.uniqName] || []
    });
  },
  disconnect: ({ socket, room }) => {
    const { user } = socket.request;

    if (!user) {
      users[room.uniqName].anons.delete(socket.id);
      return;
    }

    if (!users[room.uniqName]) return;
    if (!users[room.uniqName].sids[user.username]) return;

    users[room.uniqName].sids[user.username].delete(socket.id);

    if (users[room.uniqName].sids[user.username].size === 0) {
      delete users[room.uniqName].sids[user.username];
      socket.broadcast.emit('user:leave_room', { username: user.username });
      sendServerMessage({ socket, message: { text: `@${user.username} has leave` } });
    }
  },
  'user:chat': ({ socket, room }, { text }) => {
    const { user } = socket.request;

    sendUserMessage({ socket, room, message: { text, user } });
  },
  'playlist:add': async ({ socket, room }, item) => {
    const playlistItem = await playlistItemAdd({ socket, room }, item);

    if (playlistItem) {
      socket.broadcast.emit('playlist', playlistItems[room.uniqName]);
      socket.emit('playlist', playlistItems[room.uniqName]);
    }
  }
};
