import React, { useState, useEffect } from 'react';

function App(): JSX.Element {
  const text = 'Lorem ipsum';

  const [garbage, setGarbage] = useState<string>('');
  const [timestamps, setTimestamps] = useState<number[]>([]);

  const onKeyDown = (e: KeyboardEvent): void => {
    const key = e.key;
    console.log(e);

    const index = timestamps.length;

    if (key === 'Backspace') {
      setGarbage((g) => g.slice(0, g.length - 1));
      return;
    }

    if (key.length > 1) return;

    if (text[index] === key) {
      setTimestamps([...timestamps, Date.now()]);
    } else {
      console.log({ garbage });
      setGarbage((g) => g + key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return (): void => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="App">
      <p>{text}</p>
      <p>{garbage}</p>
    </div>
  );
}

export default App;
