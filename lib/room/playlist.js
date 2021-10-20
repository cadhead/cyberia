import axios from 'axios';
import { arrayMove } from '../array';

export const playlistItems = {};

const getYoutubeVideoInfo = async (id) => {
  const APIKey = 'AIzaSyAPHTeGKACKMAhCfuC1-utWlD4vCMnIVps';
  const baseURL = 'https://www.googleapis.com/youtube/v3/videos';
  const APIResponse = await (await axios(`${baseURL}?part=snippet,contentDetails&id=${id}&key=${APIKey}`)).data;
  const videoInfo = APIResponse.items[0];

  return {
    ...videoInfo.snippet,
    ...videoInfo.contentDetails
  };
};

export const isItemAlreadyInPool = (room, item) => {
  const { uniqName } = room;
  const playlist = playlistItems[uniqName];
  const { url } = item;

  if (playlist.find((i) => i.url === url)) return true;

  return false;
};

const parseDuration = (duration) => {
  const durationScale = [
    [/(\d+)D/, 24 * 3600],
    [/(\d+)H/, 3600],
    [/(\d+)M/, 60],
    [/(\d+)S/, 1]
  ];
  let time = 0;

  durationScale.forEach((i) => {
    const [regex, scale] = i;
    const m = duration.match(regex);

    if (m) {
      time += parseInt(m[1], 10) * scale;
    }
  });

  return time;
};

const getPlaylistItemYouTube = async (playlist, { url }) => {
  const id = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];

  if (playlist.find((i) => i.ytID === id)) return null;

  const { title, duration } = await getYoutubeVideoInfo(id);

  return {
    url,
    title,
    ytID: id,
    duration: parseDuration(duration)
  };
};

const getPlaylistItemInfo = async (playlist, { url }) => {
  if (url.match('(http|https)://(www.)?youtube|youtu.be')) {
    const itemInfo = await getPlaylistItemYouTube(playlist, { url });
    return itemInfo;
  }

  return null;
};

export const initializePlaylists = (room) => {
  const { uniqName } = room;

  playlistItems[uniqName] = [];
};

export const playListItemSetCurrent = ({ socket, room }, item) => {
  const { url } = item;
  const { uniqName } = room;
  const previousItem = playlistItems[uniqName].find((it) => it.current === true) || {};
  const currentItem = playlistItems[uniqName].find((it) => it.url === url);

  if (previousItem === currentItem) return;

  // eslint-disable-next-line no-use-before-define
  playlistItemRemove({ socket, room }, previousItem);

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

export const playListItemTogglePin = async ({ room }, item) => {
  const { url } = item;
  const { uniqName } = room;
  const candidateItem = playlistItems[uniqName].find((it) => it.url === url) || {};

  candidateItem.isPinned = !candidateItem.isPinned;
};

export const playlistItemRemove = async ({ socket, room }, item) => {
  const { url } = item;
  const { uniqName } = room;
  const candidateItem = playlistItems[uniqName].find((it) => it.url === url);

  if (candidateItem) {
    const index = playlistItems[uniqName].indexOf(candidateItem);

    playlistItems[uniqName].splice(index, 1);

    const currentItem = playlistItems[uniqName].find((it) => it.current === true) || null;
    if (!currentItem) {
      playListItemSetCurrent({ room }, playlistItems[uniqName][index]);

      socket.broadcast.emit('playlist', playlistItems[room.uniqName]);
      socket.emit('playlist', playlistItems[room.uniqName]);
    }
  }
};

export const playlistItemSetNext = ({ room }, item) => {
  const { url } = item;
  const { uniqName } = room;
  const currentItem = playlistItems[uniqName].find((it) => it.current === true);
  const candidateItem = playlistItems[uniqName].find((it) => it.url === url);

  if (currentItem === candidateItem) return;

  const fromIndex = playlistItems[uniqName].indexOf(candidateItem);
  const toIndex = playlistItems[uniqName].indexOf(currentItem);
  const temp = arrayMove(
    playlistItems[uniqName],
    fromIndex,
    fromIndex > toIndex ? toIndex + 1 : toIndex
  );

  playlistItems[uniqName] = [...temp];
};
