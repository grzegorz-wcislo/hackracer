import React, { useState } from 'react';
import PrevLine from './PrevLine';
import Line from './Line';
import LineHandler from './LineHandler';
import LineGenerator from './lineGenerator';

function Lines(): JSX.Element {
  const [lineGenerator] = useState<LineGenerator>(new LineGenerator(80));
  const [texts, setTexts] = useState<[string, string, string]>([
    'h4ck r4c3r',
    lineGenerator.getLine(),
    lineGenerator.getLine(),
  ]);
  const [prevErrors, setPrevErrors] = useState<number[]>([1, 5, 8]);

  const onLineFinished = (errors: number[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTexts(([_, t1, t2]) => [t1, t2, lineGenerator.getLine()]);
    setPrevErrors(errors);
  };

  return (
    <div className="lines">
      <PrevLine text={texts[0]} errors={prevErrors} />
      <LineHandler text={texts[1]} onLineFinished={onLineFinished} />
      <Line text={texts[2]} types={['next']} />
    </div>
  );
}

export default Lines;
