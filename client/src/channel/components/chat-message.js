import { h, Component } from 'preact';

export default class ChatMessage extends Component {
  componentDidUpdate() {
    this.scrollIntoView();
  }

  componentWillUnmount() {
    this.scrollIntoView();
  }

  componentDidMount() {
    setTimeout(this.scrollIntoView.bind(this), 10);
  }

  renderFull() {
    const { user, text } = this.props.message;

    return (<div class="chat__message">
      <div class="avatar">{this.avatar()}</div>
      <div class="message">
        <span class="message__username">{user.username}</span>
        <span class="message__timestamp">{this.date()}</span>
        <span class="message__text">
          <p innerHTML={ text } />
        </span>
      </div>
    </div>);
  }

  renderPartial() {
    const { text } = this.props.message;

    return (<div class="chat__message">
      <div class="message">
        <span class="message__text">
          <p innerHTML={text} />
        </span>
        <span class="message__timestamp">{this.date()}</span>
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
      ? <small>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
      : '';
  }

  scrollIntoView() {
    this.base.scrollIntoView();
  }

  render() {
    const { user } = this.props.message;

    return this.props.lastChat !== user.username
      ? this.renderFull()
      : this.renderPartial();
  }
}
