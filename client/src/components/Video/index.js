import './video.scss';

import { h, Fragment } from 'preact';
import PlayList from './playlist';
import YoutubeIframe from './yt-iframe';

function Video({ playlistManager }) {
  const [
    playlistItems,
    currentPlaylistItem,
    addVideo,
    setNextPlaylistItem,
    setCurrentPlaylistItem,
    removePlaylistItem,
    pinPlaylistItem
  ] = playlistManager;

  return (
    <Fragment>
      <div className="Video__EmbedVideo">
        {currentPlaylistItem ? 'Loading...' : 'Nothing plays, yet. 😪'}
        {currentPlaylistItem
          && <YoutubeIframe ytID={currentPlaylistItem.ytID} />
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
          remove={removePlaylistItem}
          pin={pinPlaylistItem}
        />
      </div>
    </Fragment>
  );
}

export default Video;
