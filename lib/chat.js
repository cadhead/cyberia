export const formatChatMessageText = (text = '') => {
  return text.substring(0, 300);
};

export const validate = (messageString = '') => {
  return messageString.trim().substring(0, 300);
};
