import { h, Component } from 'preact';

export default class ChatMessage extends Component {
  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  avatar() {
    const { user } = this.props;

    return user.avatar
      ? <img src={user.avatar} />
      : <span className="avatar__dummy">{user.username[0].toUpperCase()}</span>;
  }

  scrollToLastMessage() {
    const lastMessagePart = this.base.lastChild
      .querySelector('.message__text p:last-child');

    lastMessagePart.scrollIntoView();
  }

  render() {
    const { user, message, timestamp } = this.props;

    if (this.state.error) return '';

    return (<div class="chat__message">
      <div class="avatar">{ this.avatar() }</div>
      <div className="message">
        <span className="message__username">{user.username}</span>
        <span className="message__text">
          {message.map((part, index) => <p key={index}>{part}</p>)}
        </span>
        <span className="message__timestamp">
          {timestamp}
        </span>
      </div>
    </div>);
  }
}
