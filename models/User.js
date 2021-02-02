/**
 * Database Model imitation
 */

import { getEncryptedPassword } from '../lib/user';

const adminPass = getEncryptedPassword('test123pass');

export class User {
  static collection = []

  constructor(data) {
    Object.assign(this, data);
  }

  get profile() {
    const {
      username, email, group, avatar, aliases
    } = this;

    return {
      username,
      email,
      group,
      avatar,
      aliases
    };
  }

  static isExist(username) {
    return User.collection.filter(user => user.username === username).length > 0;
  }

  static findOne(username) {
    return User.collection.filter(room => room.username === username)[0];
  }
}

User.collection.push(new User({
  id: 0,
  username: 'Admin',
  passHash: adminPass.passHash,
  passSalt: adminPass.passSalt,
  email: 'nekorides@gmail.com',
  lastIP: '',
  aliases: [],
  group: 255,
  avatar: ''
}));
