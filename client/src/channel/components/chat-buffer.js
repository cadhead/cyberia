import { h, Component } from 'preact';
import './chat.scss';
import ChatMessage from './chat-message';

export default class ChatBuffer extends Component {
  state = {
    messages: [
      {
        user: {
          username: 'Lain Iwakura',
          avatar: 'https://i.imgur.com/C4KNuj4.png'
        },
        text: 'You must be logged in for connect to this layer.'
      }
    ]
  }

  componentDidMount() {
    this.channel.on('chat', (message) => {
      this.setState({
        messages: this.formatMessages(message)
      });
    });
  }

  formatMessages(message) {
    const { messages } = this.state;

    messages.push(message);

    return messages;
  }

  getLastChat(message) {
    const before = this.state.messages[this.state.messages.indexOf(message) - 1];

    return before ? before.user.username : null;
  }

  displayMessages() {
    return this.state.messages.map((message, index) => (
      <ChatMessage
        key={index}
        message={message}
        lastChat = {this.getLastChat(message)}
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
            : ''
        }
      </div>
    );
  }
}
