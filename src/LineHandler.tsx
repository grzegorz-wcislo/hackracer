import React, { useState, useEffect } from 'react';
import CurrentLine from './CurrentLine';

interface LineHandlerProps {
  text: string;
  onLineFinished: (errors: number[]) => void;
}

function LineHandler({ text, onLineFinished }: LineHandlerProps): JSX.Element {
  const [garbage, setGarbage] = useState<string>('');
  const [errors, setErrors] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<number[]>([]);

  const nextLine = (): void => {
    setGarbage('');
    setErrors([]);
    setTimestamps([]);
    onLineFinished(errors);
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

      if (garbage === '') {
        setErrors((errors) => {
          if (errors[errors.length - 1] === index) return errors;
          else return [...errors, index];
        });
      }

      if (index + garbage.length >= text.length - 1) return;

      setGarbage((g) => g + (key === ' ' ? '█' : key));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return (): void => document.removeEventListener('keydown', onKeyDown);
  });

  return <CurrentLine {...{ text, timestamps, garbage, errors }} />;
}

export default LineHandler;
