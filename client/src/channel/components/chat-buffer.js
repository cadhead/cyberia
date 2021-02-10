import { h, Component } from 'preact';
import './chat.scss';
import ChatMessage from './chat-message';

export default class ChatBuffer extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    this.channel.on('chat', this.addMessage.bind(this));
    this.channel.on('chat update', this.addMessage.bind(this));
  }

  addMessage(message) {
    this.setState({
      messages: this.formatMessages(message)
    });
  }

  formatMessages(message) {
    const { messages } = this.state;

    let formatedText = message.text;
    formatedText = this.channel.emotes.parse(formatedText);

    Object.assign(message, {
      text: formatedText
    }, message);

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
