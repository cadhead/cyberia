import { h, render } from 'preact';

import io from 'socket.io-client';

import './src/common/reset.css';
import './src/index.scss';
import './src/index.mobile.scss';

import './src/components/Button';
import './src/components/Input';
import './src/components/Header';
import { setNavbarActiveItem } from './src/components/Navbar';
import './src/components/RoomList';
import './src/components/Footer';
import './src/components/TabsList';
import '@fortawesome/fontawesome-free/css/all.min.css';

const currentRoute = window.location.pathname.split('/')[1];
const replaceNode = document.querySelector('#app');

(async function apply() {
  let Loader;

  setNavbarActiveItem();

  if (replaceNode) {
    Loader = (await import('./src/components/Loader')).default;
    render(<Loader />, replaceNode);
  }

  if (currentRoute === 'r') {
    const roomUniqName = window.location.pathname.split('/')[2];
    const socket = io(`/r/${roomUniqName}`);

    socket.emit('user:join_room', { room: roomUniqName })
    socket.on('user:join_room', async (data) => {
      const Room = (await import('./src/Room')).default;
      render(<Room data={data} socket={socket} />, replaceNode)
    });
  }
}());
