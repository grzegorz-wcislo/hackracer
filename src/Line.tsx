import React from 'react';

interface LineProps {
  text: string;
  types: string[];
}

function Line({ text, types }: LineProps): JSX.Element {
  const classes = 'line ' + types.map((t) => 'line-' + t).join(' ');

  return <p className={classes}>{text}</p>;
}

export default Line;
