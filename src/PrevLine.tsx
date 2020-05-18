import React from 'react';
import CharType, { typeClass } from './CharType';

interface PrevLineProps {
  text: string;
  errors: number[];
}

function PrevLine({ text, errors }: PrevLineProps): JSX.Element {
  const characters = text.split('').map((char, index) => {
    return {
      char,
      index,
      type: errors.includes(index) ? CharType.ERROR : CharType.TYPED,
    };
  });
  return (
    <p className="line line-prev">
      {characters.map((c) => {
        return (
          <span key={c.index} className={typeClass(c.type)}>
            {c.char}
          </span>
        );
      })}
    </p>
  );
}

export default PrevLine;
