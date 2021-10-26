import { useState } from 'preact/hooks';

export const useChat = (socket) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    const temp = [...messages];
    const prevMessage = temp[temp.length - 1] || {};

    if (prevMessage.user) {
      if (prevMessage.user.username === newMessage.user.username) {
        prevMessage.text = Array.isArray(prevMessage.text)
          ? [...prevMessage.text, newMessage.text]
          : [prevMessage.text, newMessage.text]

        setMessages([...temp]);
        return;
      }
    }

    setMessages([...temp, newMessage]);
  }

  const sendMessage = (newMessage) => {
    addMessage(newMessage);
    socket.emit('user:chat', newMessage);
  };

  return [messages, setMessages, sendMessage, addMessage];
}
