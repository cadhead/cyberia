import { h } from 'preact';

import YouTubeVideo from 'react-youtube';

const YoutubeIframe = ({ ytID }) => {
  const opts = {
    playerVars: {
      autoplay: 1
    }
  }

  return (
    <YouTubeVideo containerClassName="Video__Responsive" opts={opts} videoId={ytID} />
  );
}

export default YoutubeIframe;
