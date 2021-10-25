import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

const RawVideo = ({ item }) => {
  const { url } = item;
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const { duration, timeLeft } = item;

    video.muted = true;
    video.play();
    video.muted = false;

    if (Math.abs(item.timeLeft - video.currentTime) < 3) return;

    if (duration) {
      video.currentTime = timeLeft
    }
  }, [item]);

  return (
    <video ref={videoRef} className="Video__Responsive" src={url} controls>Your browser does not support HTML5 video</video>
  );
}

export default RawVideo;
