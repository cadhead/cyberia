import { useEffect, useState } from "preact/hooks";
import { arrayMove } from "../../../common/helpers/array";

export const usePlaylist = (socket) => {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [currentPlaylistItem, setCurrentPlaylistItem] = useState(playlistItems[0]);

  useEffect(() => {
    if (!playlistItems.includes(currentPlaylistItem)) {
      const current = playlistItems.find((item) => item.current === true);
      setCurrentPlaylistItem(current || null);
    }
  }, [currentPlaylistItem, playlistItems]);

  const addVideo = async ({ url }) => {
    socket.emit('playlist:add', { url });
  }

  const setNextPlaylistItem = (item) => {
    if (item === currentPlaylistItem) return;

    let temp = [...playlistItems];

    const fromIndex = temp.indexOf(item);
    const toIndex = temp.indexOf(currentPlaylistItem);

    temp = arrayMove(temp, fromIndex, fromIndex > toIndex ? toIndex + 1 : toIndex);

    setPlaylistItems([...temp])
  }

  const removePlaylistItem = (item) => {
    const temp = [...playlistItems];
    const index = temp.indexOf(item);
    temp.splice(index, 1);

    setPlaylistItems([...temp]);
  }

  const pinPlaylistItem = (item) => {
    const temp = [...playlistItems];
    const index = temp.indexOf(item);
    temp[index].isPinned = !temp[index].isPinned;

    setPlaylistItems([...temp]);
  }

  return [
    playlistItems,
    currentPlaylistItem,
    addVideo,
    setNextPlaylistItem,
    setCurrentPlaylistItem,
    removePlaylistItem,
    pinPlaylistItem,
    setPlaylistItems
  ];
};
