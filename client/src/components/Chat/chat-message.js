import { Fragment, h } from 'preact';
import MessageText from './message-text';

function ChatMessage({ data, onUserTagged }) {
  const {
    user, text, timestamp, meta
  } = data;

  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date(timestamp).toLocaleDateString();

  const UserMessage = () => {
    const userNoAvatarPlaceholder = user.username[0].toUpperCase();

    return (
      <Fragment>
        <div className="ChatAvatar">
        {
          user.avatar
            ? <img className="ChatAvatar__image" src={user.avatar} alt={`${user.username}\`s avatar`} />
            : <span className="ChatAvatar__image">{userNoAvatarPlaceholder}</span>
        }
      </div>
      <div className="ChatMessage">
        <div onClick={onUserTagged} className="ChatMessage__Username">{user.username}</div>
        <div className="ChatMessage__Timestamp" title={date}>{time}</div>
        <div className="ChatMessage__Text"><MessageText text={text} /></div>
      </div>
      </Fragment>
    )
  }

  const ServerMessage = () => {
    return (
      <Fragment>
        <div className="ChatMessage--server">
          <div className="ChatMessage__Text" title={`${date}, ${time}`}><MessageText text={text} /></div>
        </div>
      </Fragment>
    )
  }

  return (
    <div className="Chat__Message" >
      {meta === 'user-message' && <UserMessage />}
      {meta === 'server-message' && <ServerMessage />}
    </div>
  );
}

export default ChatMessage;
