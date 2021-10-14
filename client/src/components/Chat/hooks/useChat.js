import { useState } from 'preact/hooks';

export const useChat = (socket) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages(m => [...m, newMessage]);
  }

  const sendMessage = (newMessage) => {
    addMessage(newMessage);
    socket.emit('user:chat', newMessage);
  };

  return [messages, setMessages, sendMessage, addMessage];
}
