import axios from 'axios';

export const playlistItems = {};

const getYoutubeVideoSnippet = async (id) => {
  const APIKey = 'AIzaSyAPHTeGKACKMAhCfuC1-utWlD4vCMnIVps';
  const APIResponse = await (await axios(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${APIKey}`)).data;
  const snippet = APIResponse.items[0].snippet;

  return snippet;
};

const getPlaylistItemYouTube = async (playlist, { url }) => {
  const id = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];

  if (playlist.find((i) => i.ytID === id)) return null;

  const { title } = await getYoutubeVideoSnippet(id);

  return {
    url,
    title,
    ytID: id
  };
};

const getPlaylistItemInfo = (playlist, { url }) => {
  if (playlist.find((i) => i.url === url)) return null;

  if (url.match('(http|https)://(www.)?youtube|youtu.be')) {
    return getPlaylistItemYouTube(playlist, { url });
  }

  return null;
};

export const initializePlaylists = (room) => {
  const { uniqName } = room;

  playlistItems[uniqName] = [];
};

export const playListItemSetCurrent = ({ room }, item) => {
  const { url } = item;
  const { uniqName } = room;
  const previousItem = playlistItems[uniqName].find((it) => it.current === true) || {};
  const currentItem = playlistItems[uniqName].find((it) => it.url === url);

  previousItem.current = false;
  currentItem.current = true;
};

export const playlistItemAdd = async ({ socket, room }, item) => {
  const { uniqName } = room;
  const itemInfoByType = await getPlaylistItemInfo(playlistItems[uniqName], item);
  const playlistItem = {
    ...itemInfoByType,
    addedBy: socket.request.user.username
  };

  if (!playlistItem.url) {
    return null;
  }

  playlistItems[uniqName].push(playlistItem);
  if (playlistItems[uniqName].length === 1) playListItemSetCurrent({ room }, item);
  return playlistItem;
};
