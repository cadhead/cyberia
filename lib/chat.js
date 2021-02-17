import { escape } from './helpers';
import * as marked from './marked';

export const formatChatMessageText = (text = '') => {
  return text.substring(0, 300);
};

export const validate = (messageString = '') => {
  let safeMessageString = messageString.trim().substring(0, 300);

  safeMessageString = marked.parse(escape(safeMessageString));

  return safeMessageString;
};
