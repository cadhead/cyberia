export class PlaylistItem {
  media = {}

  user = {}

  prev = null

  next = null

  constructor({ media, user }) {
    Object.assign(this, {
      media, user
    });
  }
}
