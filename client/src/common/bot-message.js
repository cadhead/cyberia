export const createBotMessage = ({ text }) => {
  return {
    user: { username: 'Lain', avatar: 'https://i.imgur.com/C4KNuj4.png' },
    timestamp: Date.now(),
    text
  }
};
