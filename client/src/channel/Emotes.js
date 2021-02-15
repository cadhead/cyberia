export default class Emotes {
  buffer = {}

  constructor(channel) {
    this.channel = channel;

    this.add(this.channel.personalEmotes);

    this.channel.on('load emotes', this.add.bind(this));
  }

  add(emotes) {
    emotes.forEach(emote => {
      const { name, aliases = [], content } = emote;

      if (this.buffer[name]) return;

      Object.defineProperty(this.buffer, name, {
        value: { aliases, content },
        enumerable: true
      });
    });
  }

  static getCandidates(text) {
    return text.match(/:(.+?):/g) || [];
  }

  find(text) {
    const candidates = Emotes.getCandidates(text);
    const match = new Set();

    candidates.forEach((c) => {
      const emoteName = c.replaceAll(':', '').toLowerCase();
      const candidate = this.buffer[emoteName] ? emoteName : null;

      if (candidate) match.add(candidate);
    });

    return match;
  }

  static getTrigger(key) {
    return `:${key}:`;
  }

  parse(text) {
    let parsedText = text;

    this.find(text).forEach((key => {
      parsedText = parsedText
        .replaceAll(
          new RegExp(Emotes.getTrigger(key), 'ig'),
          `<img src="${this.buffer[key].content}" title=":${key}:">`
        );
    }));

    return parsedText;
  }
}
