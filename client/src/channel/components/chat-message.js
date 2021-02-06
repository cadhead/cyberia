import { h, Component } from 'preact';

export default class ChatMessage extends Component {
  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  renderMessageFull() {
    const { user, text } = this.props.message;

    return (<div class="chat__message">
      <div class="avatar">{this.avatar()}</div>
      <div class="message">
        <span class="message__username">{user.username}</span>
        <span class="message__text">
          <p>{text} {this.date()}</p>
        </span>
      </div>
    </div>);
  }

  renderMessagePartial() {
    const { text } = this.props.message;

    return (<div class="chat__message">
      <div class="message">
        <span class="message__text">
          <p>{text} {this.date()}</p>
        </span>
      </div>
    </div>);
  }

  avatar() {
    const { user } = this.props.message;

    return user.avatar
      ? <img src={user.avatar} />
      : <span className="avatar__dummy">{user.username[0].toUpperCase()}</span>;
  }

  date() {
    const { timestamp } = this.props.message;

    return timestamp
      ? <small>({new Date(timestamp).toLocaleTimeString()})</small>
      : '';
  }

  scrollToLastMessage() {
    const lastMessagePart = this.base.lastChild
      .querySelector('.message__text p');

    lastMessagePart.scrollIntoView();
  }

  render() {
    const { user } = this.props.message;

    return this.props.lastChat !== user.username
      ? this.renderMessageFull()
      : this.renderMessagePartial();
  }
}
