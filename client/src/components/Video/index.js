import './video.scss';

import { h, Fragment } from 'preact';
import PlayList from './playlist';
import YoutubeIframe from './yt-iframe';
import RawVideo from './raw-video';

function Video({ playlistManager, timeSync }) {
  const [
    playlistItems,
    currentPlaylistItem,
    addVideo,
    setNextPlaylistItem,
    setCurrentPlaylistItem,
    removePlaylistItem,
    pinPlaylistItem
  ] = playlistManager;

  let VideoElement = <RawVideo item={currentPlaylistItem} timeSync={timeSync} />;

  if (currentPlaylistItem && currentPlaylistItem.ytID) {
    VideoElement = <YoutubeIframe item={currentPlaylistItem} timeSync={timeSync} />;
  }

  return (
    <Fragment>
      <div className="Video__EmbedVideo">
        {currentPlaylistItem ? 'Loading...' : 'Nothing plays, yet. 😪'}
        {currentPlaylistItem && VideoElement}
      </div>
      <div className="PlayList">
        <div style="display: flex; justify-content: stretch; padding-bottom: 0.5rem">
          <input
            className="Input"
            value=""
            placeholder="Paste link, e.g. https://youtu.be/5qap5aO4i9A and press 'enter'"
            onKeyPress={(e) => e.code === 'Enter' && addVideo({
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
