import { useState } from 'preact/hooks';

export const useChat = (socket) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
    socket.emit('user:chat', newMessage);
  };

  return [messages, setMessages, sendMessage];
}
