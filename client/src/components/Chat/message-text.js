import { Fragment, h } from 'preact';
import processString from 'react-process-string';

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
  'cyberiatv.com',
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

function MessageText({text}) {
  let config = [img, link, user];

  return (
    <Fragment>
      {processString(config)(text)}
    </Fragment>
  )
}

export default MessageText;
