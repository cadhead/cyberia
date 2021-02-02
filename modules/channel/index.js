import { io } from '../../socket.io-server';
import { Channel } from '../../models/Channel';
import { Chat } from './Chat';
import { ChannelManager } from './Manager';
import {
  EVENT_CHAT_USER_MESSAGE,
  EVENT_CHANNEL_USER_JOIN
} from './events';

export default class ChannelModule {
  static allow = true;

  list = new Set();

  constructor() {
    this.initChannels();
  }

  static registerEvents(channel) {
    const { name, manager, chat } = channel;
    io.of('/layer/' + name).on('connection', (socket) => {
      socket.on(EVENT_CHAT_USER_MESSAGE, chat.handleMessage.bind(chat, socket));

      socket.on(EVENT_CHANNEL_USER_JOIN, manager.handleUserJoin.bind(manager, socket));
      socket.on('disconnect', manager.handleUserLeave.bind(manager, socket));

      setInterval(() => {
        socket.emit('channel data', {
          chatbuffer: chat.buffer,
          online: manager.online
        });
      }, 500);
    });
  }

  async initChannels() {
    const all = await Channel.findAll();

    all.forEach((channel) => {
      const { name, titile, isPrivate } = channel;
      if (!isPrivate) this.list.add({ name, titile });

      const manager = new ChannelManager(channel);
      const chat = new Chat(manager);

      ChannelModule.registerEvents({ name, chat, manager });
    });
  }
}
