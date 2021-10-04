import './video.scss';

import { h, Fragment } from 'preact';
import PlayList from './playlist';
import { useEffect, useState } from 'preact/hooks';

const arrayMove = (arr, from, to) => {
  const temp = [...arr];

  if (from !== to) {
    temp.splice(from, 1);
    temp.splice(to, 0, arr[from]);
  }

  return temp;
}

const getYoutubeVideoSnippet = async (id) => {
  const APIKey = 'AIzaSyAPHTeGKACKMAhCfuC1-utWlD4vCMnIVps';
  const APIResponse = await (await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${APIKey}`)).json();
  const snippet = APIResponse.items[0].snippet;

  return snippet;
}

function Video({ }) {
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
    if (!url.match('http://(www.)?youtube|youtu.be')) return;
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

  const removeVideo = (video) => {
    const temp = [...playlistItems];
    const index = temp.indexOf(video);
    temp.splice(index, 1);

    setPlaylistItems([...temp]);
    setCurrentPlaylistItem(null);
  }

  const pinVideo = (video) => {
    const temp = [...playlistItems];
    const index = temp.indexOf(video);
    temp[index].isPinned = !temp[index].isPinned;

    setPlaylistItems([...temp]);
  }

  return (
    <Fragment>
      <div className="Video__EmbedVideo">
        {currentPlaylistItem ? 'Loading...' : 'Nothing plays, yet. 😪'}
        {currentPlaylistItem
          && <iframe
            className="Video__Responsive"
            id="ytapiplayer"
            frameborder="0"
            allowfullscreen="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
            src={`https://www.youtube.com/embed/${currentPlaylistItem.ytID}?autohide=1&amp;autoplay=1&amp;controls=1&amp;iv_load_policy=3&amp;rel=0&amp;wmode=transparent&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fcytu.be&amp;widgetid=1`}
          />
        }
      </div>
      <div className="PlayList">
        <div style="display: flex; justify-content: stretch; padding-bottom: 0.5rem">
          <input
            className="Input"
            value=""
            placeholder="Paste link, e.g. https://youtu.be/5qap5aO4i9A and press 'enter'"
            onKeyPress={(e) => e.keyCode === 13 && addVideo({
              url: e.target.value
            })} />
        </div>

        <PlayList
          items={playlistItems}
          current={currentPlaylistItem}
          setCurrent={setCurrentPlaylistItem}
          setNext={setNextPlaylistItem}
          remove={removeVideo}
          pin={pinVideo}
        />
      </div>
    </Fragment>
  );
}

export default Video;
