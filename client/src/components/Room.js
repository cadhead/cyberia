import { h, Fragment } from 'preact';
import Chat from './Chat';
import Video from './Video';
import { useChat } from './Chat/hooks/useChat';
import { useDidMount } from './hooks/useDidMount';
import { usePlaylist } from './Video/hooks/usePlaylist';
import { createBotMessage } from '../common/bot-message';

const Room = ({ socket }) => {
  const roomName = window.location.pathname.split('/')[2];
  const [chatMessages, setChatMessages, sendChatMessage, addChatMessage] = useChat(socket);
  const playlistManager = usePlaylist(socket);

  function handleJoin(data) {
    setChatMessages(m => [...data.lastMessages, ...m]);
  }

  function handleLeave({ /* username */ }) {
    // ..
  }

  function handleChatMessage(message) {
    addChatMessage(message);
  }

  function handleChatMessageFromServer(message) {
    addChatMessage(createBotMessage(message));
  }

  useDidMount(() => {
    document.title = roomName;
    socket.emit('user:join_room', { room: roomName });
    socket.on('user:join_room', handleJoin);
    socket.on('user:leave_room', handleLeave);
    socket.on('user:chat', handleChatMessage);
    socket.on('server:chat', handleChatMessageFromServer);
  });

  return (
    <Fragment>
      <div className="Video Box">
        <Video playlistManager={playlistManager} />
      </div>
      <div className="Chat Box">
        <Chat messages={chatMessages} sendMessage={sendChatMessage} />
      </div>
    </Fragment>
  )
}

export default Room;
