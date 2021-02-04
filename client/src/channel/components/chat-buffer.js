import { h, Component } from 'preact';
import './chat.scss';
import ChatMessage from './chat-message';

export default class ChatBuffer extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    this.channel.on('chat', (message) => {
      this.setState({ messages: this.formatMessages(message) });
    });
  }

  formatMessages(message) {
    const { messages } = this.state;
    const lastMessage = messages[messages.length - 1];
    const isSameUser = lastMessage
      ? (lastMessage.user.username === message.user.username)
      : false;

    if (!isSameUser) {
      messages.push(message);
    } else {
      lastMessage.timestamp = message.timestamp;
      lastMessage.text.push(...message.text);
    }

    return messages;
  }

  displayMessages() {
    return this.state.messages.map(({ user, text, timestamp }, index) => (
      <ChatMessage
        key={index}
        user={user}
        message={text}
        timestamp={timestamp}
      />
    ));
  }

  render() {
    this.channel = this.props.channel;

    return (
      <div class="card__content">
        {
          this.state.messages.length
            ? this.displayMessages()
            : 'Nobody leave a sign this layer.'
        }
      </div>
    );
  }
}
