import { h, render } from 'preact';
import { EventEmitter } from 'events';
import io from 'socket.io-client';
import {
  EVENT_CHAT_USER_MESSAGE,
  EVENT_CHANNEL_USER_JOIN,
  EVENT_CHANNEL_USER_LEAVE
} from '../../../modules/channel/events';
import Chat from './components/chat-buffer';
import Emotes from './Emotes';

const { pathname } = window.location;
const LainIwakura = {
  username: 'Lain Iwakura',
  avatar: 'https://i.imgur.com/C4KNuj4.png'
};

export default class Channel extends EventEmitter {
  static usernameField = document.querySelector('#chatusername');

  static chatinputField = document.querySelector('#chatinput');

  static chatBufferElement = document.querySelector('#chatbuffer');

  static mediaBufferElement = document.querySelector('#mediabuffer');

  data = {
    chatbuffer: [],
    emotes: [],
    online: 0
  }

  constructor() {
    super();

    this.socket = io(pathname);

    this.registerEvents();
    this.emotes = new Emotes(this);
  }

  registerEvents() {
    this.socket.on('connect', this.handleConnect.bind(this));
    this.socket.on(EVENT_CHANNEL_USER_JOIN, this.handleJoin.bind(this));
    this.socket.on(EVENT_CHANNEL_USER_LEAVE, this.handleLeave.bind(this));
    this.socket.on(EVENT_CHAT_USER_MESSAGE, this.handleChatMessage.bind(this));

    Channel.usernameField.onkeypress = ({ keyCode }) => {
      if (!Channel.usernameField.value.trim() || keyCode !== 13) return;

      this.socket.emit(EVENT_CHANNEL_USER_JOIN, { username: Channel.usernameField.value });
      Channel.usernameField.style.color = '';
    };

    Channel.chatinputField.onkeypress = ({ keyCode }) => {
      if (!Channel.chatinputField.value.trim() || keyCode !== 13) return;

      this.socket.emit(EVENT_CHAT_USER_MESSAGE, {
        user: { username: Channel.usernameField.value },
        text: Channel.chatinputField.value
      });

      Channel.chatinputField.value = '';
    };
  }

  updateEmotes(data) {
    const { emotes } = data;

    if (!emotes || emotes === this.data.emotes) return;

    this.data.emotes = [...this.data.emotes, emotes];
    this.emit('load emotes', emotes);
  }

  loadChatbuffer(data) {
    const { chatbuffer } = data;

    this.data.chatbuffer = chatbuffer.map(message => this.prepareChatMessage(message));

    this.emit('chat');
  }

  prepareChatMessage(message) {
    Object.assign(message, {
      text: this.emotes.parse(message.text)
    }, message);

    return message;
  }

  handleConnect() {
    render(<Chat channel={this} />, Channel.chatBufferElement);

    this.socket.on('update channel data', (data) => [
      this.updateEmotes(data),
      this.loadChatbuffer(data)
    ]);
  }

  handleLeave(user) {
    this.handleChatMessage({
      user: LainIwakura,
      text: `${user.username} not with us for now.`,
      timestamp: Date.now()
    });
  }

  handleJoin(data) {
    const { user, response } = data;
    let wellcomeMessage = `${user.username} is part of this layer for now.`;

    if (data.response) {
      wellcomeMessage = response.text;

      if (data.response.success) {
        Channel.usernameField.disabled = true;
      } else {
        Channel.usernameField.style.color = 'red';
      }
    }

    this.handleChatMessage({
      user: LainIwakura,
      text: wellcomeMessage,
      timestamp: Date.now()
    });
  }

  handleChatMessage(message) {
    this.data.chatbuffer = [
      ...this.data.chatbuffer,
      this.prepareChatMessage(message)
    ];

    this.emit('chat');
  }
}
