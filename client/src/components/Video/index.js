import './video.scss';

import { h, Fragment } from 'preact';
import PlayList from './playlist';

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
          remove={removePlaylistItem}
          pin={pinPlaylistItem}
        />
      </div>
    </Fragment>
  );
}

export default Video;
