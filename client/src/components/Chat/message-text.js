import { Fragment, h } from 'preact';
import processString from 'react-process-string';

const emotes = [
  { url: '/assets/emotes/drum_dance.gif', name: 'drum_dance' },
  { url: '/assets/emotes/lain_love.png', name: 'lain_love' },
  { url: '/assets/emotes/okid.gif', name: 'okid' },
  { url: '/assets/emotes/pizdos_cat.png', name: 'pizdos_cat' },
  { url: '/assets/emotes/scanlon.gif', name: 'scanlon' },
  { url: '/assets/emotes/rolling_yoba.gif', name: 'rolling_yoba' },
  { url: '/assets/emotes/yoba.png', name: 'yoba' },
  { url: '/assets/emotes/yoba_in_doubt.png', name: 'yoba_in_doubt' },
  { url: '/assets/emotes/sad_yoba.png', name: 'sad_yoba' },
  { url: '/assets/emotes/facepalm_yoba.png', name: 'facepalm_yoba' },
  { url: '/assets/emotes/teasing_yoba.png', name: 'teasing_yoba' }
];

const link = {
  regex: /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/gim,
  fn: (key, result) => (
    <span key={key}>
      <a target="_blank" href={`${result[0]}`} rel="noreferrer">{result[2]}{result[3]}</a>
    </span>
  )
};

const user = {
  regex: /@([a-z0-9_-]+?)( |,|$|\.)/gim,
  fn: (key, result) => (
    <a className="username" target="_blank" href={`/u/${result[1]}`} key={key} rel="noreferrer">{result[1]}{' '}</a>
  )
};

const imageDomainsAllowed = [
  window.location.host,
  'i.imgur.com',
  '.+?.userapi.com',
  '2ch.hk',
  '.+?.4chan.org',
  'cdn.myanimelist.net',
  '.+?.mangas.rocks',
  '.+?.readmanga.io'
];

const img = {
  regex: new RegExp(`((http|https)://+?(${imageDomainsAllowed.join('|')})[^?#]+?[.](?:jpg|jpeg|png|bmp|gif))`, 'gim'),
  fn: (key, result) => (
    <Fragment key={key}>
      <img className="ChatMessage__CustomImage" src={result[0]} alt={`user's image from ${result[3]}`} />
    </Fragment>
  )
};

const emote = {
  regex: /(:)([a-z0-9_-]+?)(:)/gim,
  fn: (key, result) => {
    const emote = emotes.find(e => e.name === result[2])
    if (!emote) return result.input;
    return (
      <img className="emote" src={emote.url} key={key} alt={`:${result[2]}:`} title={`:${result[2]}:`} />
    )
  }
};

function MessageText({text}) {
  let config = [img, link, user, emote];

  return (
    <Fragment>
      {processString(config)(text)}
    </Fragment>
  )
}

export default MessageText;
