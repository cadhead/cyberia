/**
 * Database Model imitation
 */

export const Channel = [
  {
    title: 'Main channel',
    name: 'main'
  },
  {
    title: 'Test channel',
    name: 'test'
  }
];

Object.assign(Channel, {
  isExist: (name) => {
    return Channel.filter(room => room.name === name).length > 0;
  },
  findOne: (name) => {
    return Channel.filter(room => room.name === name)[0];
  },
  findAll: () => {
    return Channel;
  }
});
