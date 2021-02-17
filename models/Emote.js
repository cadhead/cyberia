/**
 * Emote Model imitation
 */

export const Emote = [
  {
    name: 'dnb', aliases: [], content: 'http://i.imgur.com/wWLVmRV.gif', private: false
  },
  {
    name: 'pizdos', aliases: [], content: 'https://i.imgur.com/dMfnZLg.png', private: false
  }
];

Object.assign(Emote, {
  findByChannel: (channelName) => {
    return Emote.filter(emote => emote.channel === channelName);
  },

  findPublic: () => {
    return Emote.filter(emote => !emote.private);
  },

  findAll: () => {
    return Emote;
  }
});
