import m from 'marked';

const renderer = new m.Renderer();

m.setOptions({
  breaks: true,
  gfm: true,
  mangle: true,
  silent: false,
  smartLists: false,
  smartypants: false,
  xhtml: false
});

renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
};

renderer.heading = (text, level) => {
  return `<div class="chat-heading-${level}>${text}`;
};

export const parse = (t) => m(t, { renderer });
