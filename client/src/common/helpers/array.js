export const arrayMove = (arr, from, to) => {
  const temp = [...arr];

  if (from !== to) {
    temp.splice(from, 1);
    temp.splice(to, 0, arr[from]);
  }

  return temp;
}
