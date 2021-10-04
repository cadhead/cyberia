import { h } from 'preact';
import MessageText from './message-text';

function ChatMessage({ data, onUserTagged }) {
  const {
    user, text, timestamp
  } = data;

  const userNoAvatarPlaceholder = user.username[0].toUpperCase();
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date(timestamp).toLocaleDateString();

  return (
    <div className="Chat__Message">
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
    </div>
  );
}

export default ChatMessage;
