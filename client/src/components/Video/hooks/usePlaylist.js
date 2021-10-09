import { useEffect, useState } from "preact/hooks";
import { arrayMove } from "../../../common/helpers/array";

const getYoutubeVideoSnippet = async (id) => {
  const APIKey = 'AIzaSyAPHTeGKACKMAhCfuC1-utWlD4vCMnIVps';
  const APIResponse = await (await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${APIKey}`)).json();
  const snippet = APIResponse.items[0].snippet;

  return snippet;
}

export const usePlaylist = (socket) => {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [currentPlaylistItem, setCurrentPlaylistItem] = useState(playlistItems[0]);

  useEffect(() => {
    if (!currentPlaylistItem) {
      setCurrentPlaylistItem(playlistItems[0]);
    }
  }, [currentPlaylistItem, playlistItems]);

  const addVideo = async ({
    title, url, ytID
  }) => {
    if (!url.match('(http|https)://(www.)?youtube|youtu.be')) return;
    const youtubeID = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
    if (playlistItems.find((i) => i.ytID === ytID || i.ytID === youtubeID)) return;

    const info = await getYoutubeVideoSnippet(youtubeID);

    setPlaylistItems([
      ...playlistItems,
      {
        title: title || info.title || 'Raw video',
        url,
        ytID: ytID || youtubeID,
        addedBy: window.USER.username
      }
    ]);
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
    setCurrentPlaylistItem(null);
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
    pinPlaylistItem
  ];
};
