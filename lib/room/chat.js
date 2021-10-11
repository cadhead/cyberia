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
    user: {
      username: user.username,
      group: user.group,
      avatar: user.avatar
    },
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
