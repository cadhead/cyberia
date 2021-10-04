import { h } from 'preact';

function PlayList(props) {
  const {
    items, current, setCurrent, setNext, remove, pin
  } = props;

  const PlayButton = (video) => (
    <button onClick={() => setCurrent(video)} className="Button sm">
      <i className="fas fa-play-circle" /> Play
    </button>
  );

  const PlayNextButton = (video) => (
    <button onClick={() => setNext(video)} className="Button sm">
      <i className="fas fa-arrow-circle-right" /> Play Next
    </button>
  );

  const PinButton = (video) => (
    <button onClick={() => pin(video)} className="Button sm">
      <i className="fas fa-star" /> {video.isPinned ? 'Unpin' : 'Pin'}
    </button>
  );

  const DeleteButton = (video) => (
    <button onClick={() => remove(video)} className="Button--danger sm">
      <i className="fas fa-trash" /> Delete
    </button>
  );

  const AddedByButton = (video) => (
    <a className="Button sm" href={`/u/${video.addedBy}`} target="_blank" rel="noreferrer">
      <i className="fas fa-user pl-1" /> Added by {video.addedBy}
    </a>
  );

  return (
    <ul className="PlayList__List">
      <div className="Scroll">
        {items.map((video) => {
          return (
            <li key={video.ytID} className={`PlayList__Item ${current === video && 'active'}`}>
              <span className="title">
                {current === video && <i className="fas fa-play" />}
                <a href={video.url} title={video.title} target="_blank" rel="noreferrer">{video.title}</a>
                {video.isPinned && <small className="pl-2 pr-2"><i className="fas fa-star" />Pinned</small>}
              </span>
              <span className="controlls">
                {PlayButton(video)}
                {PlayNextButton(video)}
                {PinButton(video)}
                {DeleteButton(video)}
                {AddedByButton(video)}
              </span>
            </li>
          );
        })}
      </div>
    </ul>
  );
}

export default PlayList;
