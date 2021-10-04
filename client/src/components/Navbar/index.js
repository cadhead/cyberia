import './navbar.scss';

export const setNavbarActiveItem = () => {
  const { pathname } = window.location;
  const link = document.querySelector(`.Navbar__Menu a[href^="/${pathname.split("/")[1]}"]`);

  if (link) link.classList.add('active');
}
