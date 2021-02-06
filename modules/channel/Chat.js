import { validate } from '../../lib/chat';
import { EVENT_CHAT_USER_MESSAGE } from './events';

export class Chat {
  constructor(channelManager) {
    this.channel = channelManager;
    this.buffer = [];
  }

  sendMessage(socket, message) {
    this.buffer.push(message);

    if (this.buffer.length > 10) {
      this.buffer.shift();
    }

    this.channel.broadcast(socket, EVENT_CHAT_USER_MESSAGE, message);
    this.channel.broadcast(socket, EVENT_CHAT_USER_MESSAGE, message, false);
  }

  handleMessage(socket, data) {
    if (!socket.request.user) return;
    if (!data.text) return;

    const message = {
      text: validate(data.text),
      user: socket.request.user,
      timestamp: Date.now()
    }

    this.sendMessage(socket, message);
  }
}
