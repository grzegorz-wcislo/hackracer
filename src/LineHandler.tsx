import React, { useState, useEffect } from 'react';

interface LineHandlerProps {
  text: string;
  onLineFinished: () => void;
}

function LineHandler({ text, onLineFinished }: LineHandlerProps): JSX.Element {
  const [garbage, setGarbage] = useState<string>('');
  const [timestamps, setTimestamps] = useState<number[]>([]);

  const nextLine = (): void => {
    setGarbage('');
    setTimestamps([]);
    onLineFinished();
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
      if (text.length <= index + 1) {
        nextLine();
      }
    } else {
      if (key === ' ' && index === 0) return;

      setGarbage((g) => g + (key === ' ' ? '█' : key));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return (): void => document.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="line">
      <p style={{ fontFamily: 'monospace', fontSize: '32px' }}>
        <span>{text.slice(0, timestamps.length)}</span>
        <span style={{ color: 'red' }}>{garbage}</span>
        <span style={{ backgroundColor: 'black', color: 'white' }}>
          {/* {text.slice(timestamps.length, timestamps.length + 1)} */}
          {text.slice(
            timestamps.length + garbage.length,
            timestamps.length + garbage.length + 1
          )}
        </span>
        <span>{text.slice(timestamps.length + garbage.length + 1)}</span>
      </p>
    </div>
  );
}

export default LineHandler;
