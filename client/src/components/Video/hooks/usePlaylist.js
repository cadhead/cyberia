import { useEffect, useState } from "preact/hooks";
import { arrayMove } from "../../../../../lib/array";

export const usePlaylist = (socket) => {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [currentPlaylistItem, setCurrentPlaylistItem] = useState(playlistItems[0]);

  useEffect(() => {
    const current = playlistItems.find((item) => item.current === true);
    setCurrentPlaylistItem(current || null);
  }, [currentPlaylistItem, playlistItems]);

  const addVideo = ({ url }) => {
    socket.emit('playlist:add', { url });
  }

  const playVideo = (({ url }) => {
    socket.emit('playlist:play', { url });
  });

  const setNextPlaylistItem = (item) => {
    if (item === currentPlaylistItem) return;

    let temp = [...playlistItems];

    const fromIndex = temp.indexOf(item);
    const toIndex = temp.indexOf(currentPlaylistItem);

    temp = arrayMove(temp, fromIndex, fromIndex > toIndex ? toIndex + 1 : toIndex);

    setPlaylistItems([...temp])
  }

  const removePlaylistItem = ({ url }) => {
    socket.emit('playlist:remove', { url });
  }

  const pinPlaylistItem = ({ url }) => {
    socket.emit('playlist:pin', { url });
  }

  return [
    playlistItems,
    currentPlaylistItem,
    addVideo,
    setNextPlaylistItem,
    playVideo,
    removePlaylistItem,
    pinPlaylistItem,
    setPlaylistItems
  ];
};
