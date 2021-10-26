import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

function ChatInput({ add, update }) {
  const input = useRef(null);
  const [value, setValue] = useState();

  useEffect(() => {
    if (input && update.value) {
      setValue((val) => `${val || ''} ${update.value || ''} `)
      update.reset();

      input.current.focus();
    }
  }, [update, value]);

  const validate = () => {
    if (!value) return false;
    if (value.replace(/\s/g, '') === '') return false;

    return true;
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const sendMessage = (e) => {
    if (e.keyCode !== 13) return;
    if (!validate()) return;

    setValue('');

    add({
      user: window.USER,
      timestamp: Date.now(),
      text: value.substr(0, 300).trim(),
      meta: 'user-message'
    });
  }

  return (
    <div className="Chat__Input mt-3">
      <input
        ref={input}
        value={value}
        onChange={onChange}
        onKeyPress={sendMessage}
        className="Input"
        type="text"
        placeholder={window.USER ? "Type something..." : "You can't text before you not logged in."}
        disabled={!window.USER}
      />
    </div>
  );
}

export default ChatInput;
