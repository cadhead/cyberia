import './notification.scss';

const notifications = document.querySelectorAll('[class*="Notification"]');

notifications.forEach((notification) => {
  const closeButton = notification.querySelector('.close');

  setTimeout(() => notification.classList.remove('hide'), 0);

  closeButton.onclick = () => {
    notification.classList.add('hide');
  }
});
