import { getRoomsList } from '../room';

export const render = async (req, res) => {
  res.locals.page.title = 'wellcome';
  res.locals.rooms = await getRoomsList();

  res.render('index');
};
