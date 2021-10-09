import { useState } from 'preact/hooks';

export const useChat = (socket, lastMessages) => {
  const [messages, setMessages] = useState([...lastMessages]);

  const addMessage = (newMessage) => {
    setMessages(m => [...m, newMessage]);
  }

  const sendMessage = (newMessage) => {
    addMessage(newMessage);
    socket.emit('user:chat', newMessage);
  };

  return [messages, sendMessage, addMessage];
}
