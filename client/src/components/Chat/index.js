import './chat.scss';
import './chat-message.scss';
import './chat-avatar.scss';

import { h } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';

import ChatMessage from './chat-message';
import ChatInput from './chat-input';

function Chat({ messages, sendMessage }) {
  const scrollSpaceElement = useRef(null);
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    if (scrollSpaceElement.current.lastChild) {
      scrollSpaceElement.current.lastChild.scrollIntoView(false);
    }
  }, [messages]);

  const onUserTagged = (e) => {
    const username = e.target.textContent;

    setInputValue(`${inputValue || ''}@${username} `);
  }

  return (
    <div className="Chat__Buffer">
      <div ref={scrollSpaceElement} className="Scroll">
        {messages.map((message) => {
          return (
            <ChatMessage
              data={message}
              key={message.timestamp}
              onUserTagged={onUserTagged}
            />
          )
        })}
      </div>
      <ChatInput add={sendMessage} value={inputValue} setValue={setInputValue} />
    </div>
  );
}

export default Chat;
