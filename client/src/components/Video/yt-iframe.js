import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import YouTubeVideo from 'react-youtube';

const YoutubeIframe = ({ item, timeSync }) => {
  const opts = {
    playerVars: {
      autoplay: 1
    }
  }

  const [player, setPlayer] = useState();

  const onReady = (e) => {
    setPlayer(e.target);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!player) return;

    const currentTime = await player.getCurrentTime();

    console.log(timeSync)

    if (Math.abs(timeSync - currentTime) < 3) return;

    if (item.duration) {
      player.seekTo(timeSync);
      player.playVideo();
    }
  }, [item, player, timeSync]);

  return (
    <YouTubeVideo
      containerClassName="Video__Responsive"
      opts={opts}
      videoId={item.ytID}
      onReady={onReady}
    />
  );
}

export default YoutubeIframe;
