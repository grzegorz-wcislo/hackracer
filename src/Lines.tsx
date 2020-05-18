import React, { useState } from 'react';
import Line from './Line';
import LineHandler from './LineHandler';
import LineGenerator from './lineGenerator';

function Lines(): JSX.Element {
  const [lineGenerator] = useState<LineGenerator>(new LineGenerator(80));
  const [texts, setTexts] = useState<[string, string, string]>([
    '...',
    lineGenerator.getLine(),
    lineGenerator.getLine(),
  ]);

  const onLineFinished = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTexts(([_, t1, t2]) => [t1, t2, lineGenerator.getLine()]);
  };

  return (
    <div className="lines">
      <Line text={texts[0]} types={['prev']} />
      <LineHandler text={texts[1]} onLineFinished={onLineFinished} />
      <Line text={texts[2]} types={['next']} />
    </div>
  );
}

export default Lines;
