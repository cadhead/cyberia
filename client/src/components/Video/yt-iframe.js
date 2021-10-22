import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import YouTubeVideo from 'react-youtube';

const YoutubeIframe = ({ item }) => {
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

    if (Math.abs(item.timeLeft - currentTime) < 3) return;

    player.seekTo(item.timeLeft);
    if (player.getPlayerState !== 1) player.playVideo();
  }, [item, player]);

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
