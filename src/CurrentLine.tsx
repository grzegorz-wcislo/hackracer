import React from 'react';
import CharType, { typeClass } from './CharType';

interface CurrentLineParams {
  text: string;
  timestamps: number[];
  errors: number[];
  garbage: string;
}

function CurrentLine({
  text,
  timestamps,
  errors,
  garbage,
}: CurrentLineParams): JSX.Element {
  const tsl = timestamps.length;
  const gl = garbage.length;

  const beforeCursor = text
    .slice(0, tsl)
    .split('')
    .map((char, index) => {
      return {
        char,
        index,
        type: errors.includes(index) ? CharType.ERROR : CharType.TYPED,
      };
    });

  const garb = garbage.split('').map((char, index) => {
    return {
      char,
      index: tsl + index,
      type: CharType.GARBAGE,
    };
  });

  const cursor = {
    char: text[tsl + gl],
    index: tsl + gl,
    type: CharType.CURSOR,
  };

  const afterCursor = text
    .slice(tsl + gl + 1)
    .split('')
    .map((char, index) => {
      return {
        char,
        index: tsl + gl + 1 + index,
        type: CharType.UNTYPED,
      };
    });

  const characters = [...beforeCursor, ...garb, cursor, ...afterCursor];

  return (
    <p className="line line-curr">
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

export default CurrentLine;
