import './list.scss';
import './item.scss';

document.querySelectorAll('.RoomList .description').forEach(el => {
  el.addEventListener('click', () => el.classList.toggle('active'));
})
