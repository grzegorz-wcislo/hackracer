import words from './words.json';

class LineGenerator {
  width: number;

  constructor(width: number) {
    this.width = width;
  }

  public getLine(): string {
    let result = '';
    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log(result);
      const word = this.getWord();
      if (result.length + word.length + 1 < this.width) {
        if (result) result += ' ';
        result += word;
      } else break;
    }
    return result;
  }

  private getWord(): string {
    return words[Math.floor(Math.random() * words.length)];
  };
}

export default LineGenerator;