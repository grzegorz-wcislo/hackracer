import React, { useState } from 'react';
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
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: '32px' }}>{texts[0]}</p>
      <LineHandler text={texts[1]} onLineFinished={onLineFinished} />
      <p style={{ fontFamily: 'monospace', fontSize: '32px' }}>{texts[2]}</p>
    </div>
  );
}

export default Lines;
