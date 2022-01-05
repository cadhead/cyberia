import { h, Fragment } from 'preact';
import Chat from './Chat';
import Video from './Video';
import { useChat } from './Chat/hooks/useChat';
import { useDidMount } from './hooks/useDidMount';
import { usePlaylist } from './Video/hooks/usePlaylist';
import { useState } from 'preact/hooks';

const Room = ({ socket }) => {
  const roomName = window.location.pathname.split('/')[2];
  const [chatMessages, setChatMessages, sendChatMessage] = useChat(socket);
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

  const [timeSync, setTimeSync] = useState(null);

  function handleJoin(data) {
    const { lastMessages, lastPlaylistItems } = data;

    if (lastMessages) setChatMessages(m => [...lastMessages, ...m]);
    if (lastPlaylistItems) setPlaylistItems(p => [...p, ...lastPlaylistItems]);
  }

  function handleLeave({ /* username */ }) {
    // ..
  }

  function handleChatMessage(message) {
    setChatMessages(m => [...m, message]);
  }

  function handleChatMessageFromServer(message) {
    setChatMessages(m => [...m, message]);
  }

  function handlePlaylistUpdate(playlist) {
    setPlaylistItems(playlist);
  }

  function handleSync(time) {
    setTimeSync(time);
  }

  useDidMount(() => {
    document.title = roomName;
    socket.emit('user:join_room', { room: roomName });
    socket.on('user:join_room', handleJoin);
    socket.on('user:leave_room', handleLeave);
    socket.on('user:chat', handleChatMessage);
    socket.on('server:chat', handleChatMessageFromServer);
    socket.on('playlist', handlePlaylistUpdate);
    socket.on('video:sync', handleSync);
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
        ]} timeSync={timeSync} />
      </div>
      <div className="Chat Box">
        <Chat messages={chatMessages} sendMessage={sendChatMessage} />
      </div>
    </Fragment>
  )
}

export default Room;
