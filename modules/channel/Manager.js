import {
  EVENT_CHANNEL_USER_JOIN,
  EVENT_CHANNEL_USER_LEAVE
} from './events';

import { User } from '../../models/User';
import { Emote } from '../../models/Emote';

export class ChannelManager {
  constructor(channel) {
    this.channel = channel;
    this.users = new Set();

    this.initializeEmotes();
  }

  get online() {
    return this.users.size;
  }

  get(key = '') {
    return key in this.channel
      ? this.channel[key]
      : this.channel;
  }

  initializeEmotes() {
    const publicEmotes = Emote.findPublic();
    const channelEmote = Emote.findByChannel(this.get('name'));

    this.emotes = [...publicEmotes, ...channelEmote];
  }

  // eslint-disable-next-line class-methods-use-this
  broadcast(socket, event, data, forAll = true) {
    if (!forAll) {
      socket.emit(event, data);

      return;
    }

    socket.broadcast.emit(event, data);
  }

  handleUserJoin(socket, guest = null) {
    const registeredUser = socket.request.user || {};

    const user = registeredUser.profile || guest;

    if (!user) return;
    if (!user.username) return;

    let response = {
      success: true,
      text: 'Congratulations. You have successfully connected.'
    };

    if (User.isExist(user.username) || this.users.has(user.username)) {
      response = {
        success: false,
        text: `Username ${user.username} is already taken.`
      };
    }

    this.broadcast(socket, EVENT_CHANNEL_USER_JOIN, {
      user, response
    }, false);

    if (response.success) {
      Object.assign(socket.request, { user });
      this.users.add(user.username);
      this.broadcast(socket, EVENT_CHANNEL_USER_JOIN, { user });
    }
  }

  handleUserLeave(socket) {
    if (!socket.request.user) return;

    const { username } = socket.request.user;

    if (this.users.has(username)) {
      this.users.delete(username);
      this.broadcast(socket, EVENT_CHANNEL_USER_LEAVE, socket.request.user);
    }
  }
}
