export const currentVideoTimeLeft = {};

export const initializeVideo = (room) => {
  const { uniqName } = room;

  currentVideoTimeLeft[uniqName] = 0.1;
};
