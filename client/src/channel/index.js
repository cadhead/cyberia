import { h, render } from 'preact';
import io from 'socket.io-client';
import {
  EVENT_CHAT_USER_MESSAGE,
  EVENT_CHANNEL_USER_JOIN,
  EVENT_CHANNEL_USER_LEAVE
} from '../../../modules/channel/events';

const { pathname } = window.location;

export default class Channel {
  static usernameField = document.querySelector('#chatusername');

  static chatinputField = document.querySelector('#chatinput');

  static chatBufferElement = document.querySelector('#chatbuffer');

  constructor() {
    console.log(true);
  }
}
