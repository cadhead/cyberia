import './index.scss';
import './src/ui';

const currentRoute = window.location.pathname.split('/')[1];

(async function apply() {
  if (currentRoute === 'layer') {
    const Channel = (await import('./src/channel')).default;

    // eslint-disable-next-line no-new
    new Channel();
  }
}());
