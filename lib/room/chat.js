export const lastMessages = {};

export const initializeChat = (room) => {
  const { uniqName } = room;

  lastMessages[uniqName] = [];
};

export const sendUserMessage = ({ socket, room, message }) => {
  const mess = JSON.parse(JSON.stringify(message));

  Object.assign(mess, {
    meta: 'user-message'
  });

  lastMessages[room.uniqName].push(mess);

  socket.broadcast.emit('user:chat', mess);
};
