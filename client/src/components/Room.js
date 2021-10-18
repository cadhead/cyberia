import { h, Fragment } from 'preact';
import Chat from './Chat';
import Video from './Video';
import { useChat } from './Chat/hooks/useChat';
import { useDidMount } from './hooks/useDidMount';
import { usePlaylist } from './Video/hooks/usePlaylist';

const Room = ({ socket }) => {
  const roomName = window.location.pathname.split('/')[2];
  const [chatMessages, setChatMessages, sendChatMessage, addChatMessage] = useChat(socket);
  const [
    playlistItems,
    currentPlaylistItem,
    addVideo,
    setNextPlaylistItem,
    setCurrentPlaylistItem,
    removePlaylistItem,
    pinPlaylistItem,
    setPlaylistItems
  ] = usePlaylist(socket);

  function handleJoin(data) {
    setChatMessages(m => [...data.lastMessages, ...m]);
    setPlaylistItems(p => [...p, ...data.playlistItems]);
  }

  function handleLeave({ /* username */ }) {
    // ..
  }

  function handleChatMessage(message) {
    addChatMessage(message);
  }

  function handleChatMessageFromServer(message) {
    addChatMessage(message);
  }

  function handlePlaylistUpdate(playlist) {
    setPlaylistItems(playlist);
  }

  useDidMount(() => {
    document.title = roomName;
    socket.emit('user:join_room', { room: roomName });
    socket.on('user:join_room', handleJoin);
    socket.on('user:leave_room', handleLeave);
    socket.on('user:chat', handleChatMessage);
    socket.on('server:chat', handleChatMessageFromServer);
    socket.on('playlist', handlePlaylistUpdate);
  });

  return (
    <Fragment>
      <div className="Video Box">
        <Video socket={socket} playlistManager={[
          playlistItems,
          currentPlaylistItem,
          addVideo,
          setNextPlaylistItem,
          setCurrentPlaylistItem,
          removePlaylistItem,
          pinPlaylistItem
        ]} />
      </div>
      <div className="Chat Box">
        <Chat messages={chatMessages} sendMessage={sendChatMessage} />
      </div>
    </Fragment>
  )
}

export default Room;
