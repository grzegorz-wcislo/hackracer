import React, { useState, useEffect } from 'react';
import LineGenerator from './lineGenerator';

function App(): JSX.Element {
  const [lineGenerator] = useState<LineGenerator>(new LineGenerator(80));
  const [text, setText] = useState<string>(lineGenerator.getLine());
  const [garbage, setGarbage] = useState<string>('');
  const [timestamps, setTimestamps] = useState<number[]>([]);

  const nextLine = (): void => {
    setText(lineGenerator.getLine());
    setGarbage('');
    setTimestamps([]);
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    const key = e.key;
    console.log(e);

    const index = timestamps.length;

    if (key === 'Backspace') {
      setGarbage((g) => g.slice(0, -1));
      return;
    }

    if (key.length > 1) return;

    if (text[index] === key && garbage.length === 0) {
      setTimestamps((t) => [...t, Date.now()]);
      if (text.length <= index + 1) nextLine();
    } else {
      setGarbage((g) => g + key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return (): void => document.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="App">
      <p style={{ fontFamily: 'monospace', fontSize: '32px' }}>
        <span>{text.slice(0, timestamps.length)}</span>
        <span style={{ color: 'red' }}>{garbage}</span>
        <span style={{ backgroundColor: 'black', color: 'white' }}>
          {/* {text.slice(timestamps.length, timestamps.length + 1)} */}
          {text.slice(timestamps.length + garbage.length, timestamps.length +garbage.length+ 1)}
        </span>
        <span>{text.slice(timestamps.length + garbage.length + 1)}</span>
      </p>
      <p>{garbage}</p>
    </div>
  );
}

export default App;
