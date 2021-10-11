export const lastMessages = {};
export const lastMessagesLimit = 10;

export const initializeChat = (room) => {
  const { uniqName } = room;

  lastMessages[uniqName] = [];
};

export const sendUserMessage = ({ socket, room, message }) => {
  const mess = JSON.parse(JSON.stringify(message));
  const roomMessages = lastMessages[room.uniqName];

  Object.assign(mess, {
    meta: 'user-message'
  });

  if (roomMessages.length >= lastMessagesLimit) {
    roomMessages.splice(0, roomMessages.length - lastMessagesLimit + 1);
  }

  roomMessages.push(mess);

  socket.broadcast.emit('user:chat', mess);
};
