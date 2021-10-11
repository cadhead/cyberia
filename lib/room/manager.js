import { initializeChat, sendUserMessage, lastMessages } from './chat';

export const users = {};

const calculateUsersInRoom = (room) => {
  if (!users[room.uniqName]) return 0;

  return Object.keys(users[room.uniqName].sids).length + users[room.uniqName].anons.size;
};

export const getUsersCount = (room) => calculateUsersInRoom(room);

export const initializeRoom = (room) => {
  const { uniqName } = room;

  users[uniqName] = {
    sids: {},
    anons: new Set()
  };

  initializeChat(room);
};

export default {
  'user:join_room': ({ socket, room }) => {
    const { user } = socket.request;

    if (!user) {
      socket.emit('user:join_room', 'You have successfully connected. But you can\'t write here. Login first.');
      users[room.uniqName].anons.add(socket.id);
      return;
    }

    const isUserAlreadyInRoom = !!users[room.uniqName].sids[user.username];

    if (!isUserAlreadyInRoom) {
      users[room.uniqName].sids[user.username] = new Set();
      socket.broadcast.emit('user:join_room', { username: user.username });
    }

    users[room.uniqName].sids[user.username].add(socket.id);

    socket.emit('user:join_room', {
      lastMessages: lastMessages[room.uniqName] || [],
      users: Object.keys(users[room.uniqName].sids)
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
    }
  },
  'user:chat': ({ socket, room }, { text }) => {
    const { user } = socket.request;

    sendUserMessage({ socket, room, message: { text, user } });
  }
};
