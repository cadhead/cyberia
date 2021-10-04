import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

function ChatInput({ add, value, setValue }) {
  const input = useRef(null);
  useEffect(() => {
    if (input) input.current.focus();
  }, [value]);

  const validate = () => {
    if (!value) return false;
    if (value.replace(/\s/g, '') === '') return false;

    return true;
  }

  const sendMessage = (e) => {
    if (e.keyCode !== 13) return;
    if (!validate()) return;

    add({
      user: window.USER,
      timestamp: Date.now(),
      text: value.substr(0, 300).trim()
    });

    setValue('');
  }

  return (
    <div className="Chat__Input mt-3">
      <input
        ref={input}
        value={value}
        onInput={e => setValue(e.target.value)}
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
