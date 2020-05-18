import React from 'react';

interface CurrentLineParams {
  text: string;
  timestamps: number[];
  errors: number[];
  garbage: string;
}

enum CharType {
  UNTYPED,
  CURSOR,
  TYPED,
  ERROR,
  GARBAGE,
}

interface Char {
  index: number;
  char: string;
  type: CharType;
}

const typeClass = (type: CharType): string => {
  switch (type) {
    case CharType.UNTYPED:
      return 'char char-untyped';
    case CharType.CURSOR:
      return 'char char-cursor';
    case CharType.TYPED:
      return 'char char-typed';
    case CharType.ERROR:
      return 'char char-error';
    case CharType.GARBAGE:
      return 'char char-garbage';
  }
};

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

  // console.log(characters);

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
