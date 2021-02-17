export class Media {
  id = 0

  title = 'Raw media'

  duration = 0

  type = 0

  constructor({ title, type, duration }) {
    Object.assign(this, {
      title, type, duration
    });
  }
}
