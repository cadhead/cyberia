import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

const RawVideo = ({ item, timeSync }) => {
  const { url } = item;
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const { duration } = item;

    video.play();
    video.volume = 0.1;

    if (Math.abs(timeSync - video.currentTime) < 3) return;

    if (duration) {
      video.currentTime = timeSync
    }
  }, [item, timeSync]);

  return (
    <video ref={videoRef} className="Video__Responsive" src={url} controls>Your browser does not support HTML5 video</video>
  );
}

export default RawVideo;
