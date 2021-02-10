import validator from 'validator';

export const formatChatMessageText = (text = '') => {
  return text.substring(0, 300);
};

export const validate = (messageString = '') => {
  let safeMessageString = messageString.trim().substring(0, 300);

  safeMessageString = validator.escape(safeMessageString);

  return safeMessageString;
};
