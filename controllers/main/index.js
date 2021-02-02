export const render = (req, res) => {
  res.locals.page.title = 'Index';
  res.render('index');
};
