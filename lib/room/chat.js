import { getUserProfile } from '../user';

export const lastMessages = {};
export const lastMessagesLimit = 10;

export const initializeChat = (room) => {
  const { uniqName } = room;

  lastMessages[uniqName] = [];
};

export const sendUserMessage = ({ socket, room, message }) => {
  const { user, text } = message;
  const formatedMessage = {
    text,
    user: getUserProfile(user),
    timestamp: Date.now(),
    meta: 'user-message'
  };

  const roomMessages = lastMessages[room.uniqName];

  if (roomMessages.length >= lastMessagesLimit) {
    roomMessages.splice(0, roomMessages.length - lastMessagesLimit + 1);
  }

  roomMessages.push(formatedMessage);

  socket.broadcast.emit('user:chat', formatedMessage);
};

export const sendServerMessage = ({
  socket, message, toUser = false
}) => {
  const { text } = message;
  const formatedMessage = {
    text,
    timestamp: Date.now(),
    meta: 'server-message'
  };

  if (toUser) socket.emit('server:chat', formatedMessage);
  else socket.broadcast.emit('server:chat', formatedMessage);
};
