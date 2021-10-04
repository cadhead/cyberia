import { h, Fragment } from 'preact';

import { useEffect } from 'preact/hooks';
import { createBotMessage } from './common/bot-message';
import Chat from './components/Chat';
import Video from './components/Video';
import { useChat } from './components/Chat/hooks/useChat';

function initLastMessages(data) {
  let lastMessages = data.lastMessages || data;

  if (data.lastMessages) {
    lastMessages.push(createBotMessage({
      text: 'You have successfully connected.'
    }));
  } else {
    lastMessages = [createBotMessage({ text: lastMessages })];
  }

  return lastMessages;
}

const Room = ({ socket, data }) => {
  const roomName = window.location.pathname.split('/')[2];
  const lastMessages = initLastMessages(data);
  const [chatMessages, sendChatMessage, addChatMessage] = useChat(socket, lastMessages);

  function handleJoin({ username }) {
    if (username) {
      addChatMessage(createBotMessage({
        text: `${username} has joined.`
      }));
    }
  }

  function handleLeave({ username }) {
    if (username) {
      addChatMessage(createBotMessage({
        text: `${username} has leave.`
      }));
    }
  }

  function handleChatMessage(message) {
    addChatMessage(message);
  }

  useEffect(() => {
    document.title = roomName;

    socket.on('user:join_room', handleJoin);
    socket.on('user:leave_room', handleLeave);
    socket.on('user:chat', handleChatMessage);

    chatMessages.forEach((m) => addChatMessage(m));
    lastMessages.forEach((m) => addChatMessage(m));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="Video Box">
        <Video />
      </div>
      <div className="Chat Box">
        <Chat messages={chatMessages} sendMessage={sendChatMessage} />
      </div>
    </Fragment>
  )
}

export default Room;
